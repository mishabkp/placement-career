from fastapi import APIRouter
from app.api.v1.endpoints import health, resume, ai, skill_gap, github, auth

api_router = APIRouter()

api_router.include_router(health.router, tags=["Health"])
api_router.include_router(auth.router, prefix="/auth", tags=["Auth"])
api_router.include_router(resume.router, prefix="/resume", tags=["Resume"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Chat"])
api_router.include_router(skill_gap.router, prefix="/skill-gap", tags=["Skill Gap"])
api_router.include_router(github.router, prefix="/github", tags=["GitHub"])

