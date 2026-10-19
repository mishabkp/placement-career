from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from app.core.gemini import safe_generate, parse_json_response
import json

router = APIRouter()


class SkillGapRequest(BaseModel):
    current_skills: List[str]          # ["Python", "React", "SQL"]
    target_role: str                   # "Backend Developer at Google"
    experience_level: str = "fresher"  # "fresher" | "1-2 years" | "2-4 years"


@router.post("/analyze")
async def analyze_skill_gap(req: SkillGapRequest):
    """
    Analyzes gap between student's current skills and target role.
    Returns missing skills, priority order, and a weekly roadmap.
    """
    prompt = f"""
You are a technical career advisor for Indian CS students.

A student wants to become: {req.target_role}
Current skills: {', '.join(req.current_skills) if req.current_skills else 'None listed'}
Experience level: {req.experience_level}

Respond ONLY with valid JSON (no explanation, no markdown fences):
{{
  "match_percentage": 65,
  "missing_skills": ["Skill A", "Skill B", "Skill C"],
  "priority_skills": ["Most important skill", "Second priority", "Third priority"],
  "existing_relevant_skills": ["skill from their list that matters"],
  "estimated_weeks": 12,
  "roadmap": [
    {{"week": "1-2", "focus": "Topic name", "resources": ["Resource 1", "Resource 2"]}},
    {{"week": "3-4", "focus": "Topic name", "resources": ["Resource 1"]}},
    {{"week": "5-8", "focus": "Topic name", "resources": ["Resource 1"]}},
    {{"week": "9-12", "focus": "Topic name", "resources": ["Resource 1"]}}
  ],
  "placement_tip": "One specific actionable tip for campus placement"
}}
"""
    try:
        raw = safe_generate(prompt)
        result = parse_json_response(raw)
        return result
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned invalid JSON. Please retry.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Skill Gap Error: {str(e)}")
