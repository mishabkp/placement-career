from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.gemini import safe_generate

router = APIRouter()


class Message(BaseModel):
    role: str      # "user" or "model"
    content: str


class ChatRequest(BaseModel):
    message: str
    history: List[Message] = []
    context: Optional[str] = "interview"  # "interview", "resume", "career"


class ChatResponse(BaseModel):
    reply: str
    suggestions: List[str] = []


@router.post("/chat", response_model=ChatResponse)
async def ai_chat(req: ChatRequest):
    """
    General AI chat — Interview coach, Resume advisor, Career guide.
    Context: "interview" | "resume" | "career"
    """
    system_prompts = {
        "interview": (
            "You are an expert technical interview coach for Indian engineering students. "
            "Help them practice DSA, system design, and behavioral questions. "
            "Give concise, constructive feedback (under 150 words). Use examples where helpful."
        ),
        "resume": (
            "You are a professional resume reviewer specializing in Indian tech placements. "
            "Give specific, actionable feedback to improve ATS score and readability. "
            "Be concise (under 150 words)."
        ),
        "career": (
            "You are a career guidance counselor for Indian CS students. "
            "Give practical advice about placements, skill-building, and career growth. "
            "Be encouraging and specific (under 150 words)."
        ),
    }

    system = system_prompts.get(req.context, system_prompts["interview"])

    # Build conversation with last 5 history messages only (save tokens)
    history_text = ""
    for msg in req.history[-5:]:
        prefix = "User" if msg.role == "user" else "Assistant"
        history_text += f"{prefix}: {msg.content}\n"

    full_prompt = f"{system}\n\n{history_text}User: {req.message}\nAssistant:"

    try:
        reply_text = safe_generate(full_prompt)

        context_suggestions = {
            "interview": [
                "Explain the time complexity",
                "Show me a better approach",
                "Give me a similar problem to practice",
            ],
            "resume": [
                "How do I improve my skills section?",
                "What keywords am I missing?",
                "How can I quantify my achievements?",
            ],
            "career": [
                "What companies should I target?",
                "How do I prepare for campus placements?",
                "What skills are in demand now?",
            ],
        }

        suggestions = context_suggestions.get(req.context, [])
        return ChatResponse(reply=reply_text, suggestions=suggestions)

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Error: {str(e)}")
