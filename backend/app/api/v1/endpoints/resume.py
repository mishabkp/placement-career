from fastapi import APIRouter, UploadFile, File, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
import io
import re
import json
from pypdf import PdfReader
from app.core.gemini import safe_generate, parse_json_response

router = APIRouter()

# ── Constants ──────────────────────────────────────────────────────────────────

COMMON_SECTIONS = [
    "experience", "education", "skills", "projects",
    "certifications", "achievements", "summary",
]

CORE_TECH_KEYWORDS = [
    "python", "javascript", "typescript", "react", "node", "sql", "postgresql",
    "mongodb", "docker", "kubernetes", "aws", "git", "rest", "api", "graphql",
    "c++", "java", "linux", "ci/cd", "machine learning", "fastapi",
]


# ── Routes ─────────────────────────────────────────────────────────────────────

@router.post("/parse", summary="Parse PDF Resume — Extract Text + ATS Score")
async def parse_resume(file: UploadFile = File(...)) -> Dict[str, Any]:
    """Upload a PDF resume and get basic ATS score + section detection."""
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    try:
        content = await file.read()
        reader = PdfReader(io.BytesIO(content))

        extracted_text = ""
        for page in reader.pages:
            text = page.extract_text()
            if text:
                extracted_text += text + "\n"

        if not extracted_text.strip():
            raise HTTPException(
                status_code=422,
                detail="Unable to extract text. The PDF may be image-only or scanned.",
            )

        text_lower = extracted_text.lower()
        word_count = len(re.findall(r"\b\w+\b", extracted_text))

        detected_sections = [s.title() for s in COMMON_SECTIONS if s in text_lower]
        detected_skills = [
            skill for skill in CORE_TECH_KEYWORDS
            if re.search(rf"\b{re.escape(skill)}\b", text_lower)
        ]

        section_score = min(40, len(detected_sections) * 8)
        skill_score = min(40, len(detected_skills) * 4)
        length_score = 20 if 200 <= word_count <= 900 else 10
        total_ats_score = section_score + skill_score + length_score

        return {
            "filename": file.filename,
            "pages": len(reader.pages),
            "word_count": word_count,
            "ats_score": total_ats_score,
            "detected_sections": detected_sections,
            "detected_skills": detected_skills,
            "preview_text": extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text,
            "full_text": extracted_text,
            "status": "success",
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {str(e)}")


# ── Pydantic model for analyze ─────────────────────────────────────────────────

class ResumeAnalyzeRequest(BaseModel):
    resume_text: str
    target_role: Optional[str] = "Software Engineer"


@router.post("/analyze", summary="AI-Powered Resume Deep Analysis (Gemini)")
async def analyze_resume(req: ResumeAnalyzeRequest):
    """
    Takes extracted resume text and returns detailed AI feedback:
    section scores, strengths, improvements, and missing ATS keywords.
    """
    # Trim to ~3000 chars to stay within token budget
    trimmed = req.resume_text[:3000]

    prompt = f"""
You are a professional resume reviewer for Indian CS students applying to top tech companies.

Target role: {req.target_role}

Resume text (may be truncated):
\"\"\"
{trimmed}
\"\"\"

Respond ONLY with valid JSON (no markdown fences, no formatting text):
{{
  "overall_score": 72,
  "section_scores": {{
    "experience": 80,
    "education": 90,
    "skills": 65,
    "projects": 70,
    "formatting": 75
  }},
  "strengths": [
    "Strength 1 with specific detail",
    "Strength 2 with specific detail",
    "Strength 3 with specific detail"
  ],
  "improvements": [
    "Specific improvement 1",
    "Specific improvement 2",
    "Specific improvement 3"
  ],
  "ats_keywords_missing": ["keyword1", "keyword2", "keyword3"],
  "summary": "A 2-sentence professional assessment of the resume."
}}
"""
    try:
        raw = safe_generate(prompt)
        result = parse_json_response(raw)
        return result
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON. Please retry.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Analysis Error: {str(e)}")
