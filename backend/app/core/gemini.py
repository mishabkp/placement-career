from google import genai
from google.genai import types
from app.core.config import settings
import logging
import json
import re
import httpx

logger = logging.getLogger("placementpal.gemini")

# Initialize client with API key from settings
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# Priority list — confirmed available via client.models.list() for this API key
CANDIDATE_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-latest",
    "gemini-flash-lite-latest",
]

MODEL = "gemini-2.5-flash"

# Per-request timeout (seconds) — prevents infinite hanging on slow API responses
_TIMEOUT_SECONDS = 30


def safe_generate(prompt: str, retries_per_model: int = 2) -> str:
    """
    Robust generator with multi-model fallback, retry logic, and timeout.
    Tries candidate models sequentially if quota (429), unavailable (503), or 404 occurs.
    Raises RuntimeError with a clear message on auth errors or total failure.
    """
    last_error = None

    for model_name in CANDIDATE_MODELS:
        for attempt in range(retries_per_model):
            try:
                logger.debug(f"Trying model={model_name} attempt={attempt + 1}")
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config=types.GenerateContentConfig(
                        http_options=types.HttpOptions(timeout=_TIMEOUT_SECONDS * 1000),
                    ),
                )

                # Valid text response — success
                if response and response.text and response.text.strip():
                    logger.debug(f"Success with model={model_name}")
                    return response.text.strip()

                # Empty text — check if safety filter blocked it
                finish_reason = None
                try:
                    finish_reason = response.candidates[0].finish_reason if response.candidates else None
                except Exception:
                    pass

                if finish_reason and str(finish_reason) not in ("STOP", "1", "FinishReason.STOP"):
                    logger.warning(f"{model_name} blocked by safety filter: {finish_reason}")
                    break  # Try next model

                logger.warning(f"{model_name} returned empty text on attempt {attempt + 1}")
                last_error = RuntimeError(f"{model_name} returned an empty response")

            except Exception as e:
                err_msg = str(e)
                last_error = e
                logger.warning(f"{model_name} attempt {attempt + 1} error: {err_msg[:140]}")

                # Auth / key invalid — stop immediately, no point retrying
                if any(k in err_msg for k in ["401", "403", "API_KEY_INVALID", "PERMISSION_DENIED"]):
                    raise RuntimeError(
                        "Gemini API key is invalid or has insufficient permissions. "
                        "Please update GEMINI_API_KEY in backend/.env with a valid key from "
                        "https://aistudio.google.com/app/apikey"
                    ) from e

                # Model not found / deprecated — skip to next model
                if "404" in err_msg or "NOT_FOUND" in err_msg:
                    break

                # Rate limit / overload — skip to next model
                if any(k in err_msg for k in ["429", "503", "RESOURCE_EXHAUSTED", "UNAVAILABLE"]):
                    break

    if last_error:
        raise last_error
    raise RuntimeError("All Gemini models failed to produce a response. Please try again later.")


def parse_json_response(raw: str) -> dict:
    """Cleans markdown wrappers and safely extracts JSON object."""
    cleaned = raw.strip()
    # Remove markdown code block markers
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)
    cleaned = cleaned.strip()

    # Try direct parse
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Fallback: find outer { ... }
        match = re.search(r"(\{.*\})", cleaned, re.DOTALL)
        if match:
            return json.loads(match.group(1))
        raise
