from google import genai
from app.core.config import settings
import logging
import json
import re

logger = logging.getLogger("placementpal.gemini")

# Initialize client with API key from settings
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# Priority list of models to try in sequence (no duplicates)
CANDIDATE_MODELS = [
    "gemini-2.5-flash",
    "gemini-2.5-flash-lite",
    "gemma-4-31b-it",
    "gemma-4-26b-a4b-it",
]

MODEL = "gemini-2.5-flash"


def safe_generate(prompt: str, retries_per_model: int = 2) -> str:
    """
    Robust generator with multi-model fallback and retry logic.
    Tries candidate models sequentially if quota (429), unavailable (503), or 404 occurs.
    """
    last_error = None
    
    for model_name in CANDIDATE_MODELS:
        for attempt in range(retries_per_model):
            try:
                response = client.models.generate_content(
                    model=model_name,
                    contents=prompt
                )
                if response and response.text:
                    return response.text.strip()
            except Exception as e:
                err_msg = str(e)
                last_error = e
                # If model is 404 (not supported/deprecated), don't retry same model, switch to next model immediately
                if "404" in err_msg or "NOT_FOUND" in err_msg:
                    break
                # If rate limited (429) or high demand (503), break to try next candidate model
                if "429" in err_msg or "503" in err_msg or "RESOURCE_EXHAUSTED" in err_msg or "UNAVAILABLE" in err_msg:
                    break

    # If all API attempts fail, raise the last encountered error
    if last_error:
        raise last_error
    raise RuntimeError("Failed to generate content from AI models")


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
