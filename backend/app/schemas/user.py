from pydantic import BaseModel
from typing import Optional


# ── Register ───────────────────────────────────────────────────────────────────
class UserRegister(BaseModel):
    name: str
    email: str
    password: str
    role: str = "student"           # "student" | "faculty"
    college: str = ""
    branch: str = "CSE"


# ── Login ──────────────────────────────────────────────────────────────────────
class UserLogin(BaseModel):
    email: str
    password: str


# ── Token response ─────────────────────────────────────────────────────────────
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserPublic"


# ── Public user info (returned after login / profile fetch) ───────────────────
class UserPublic(BaseModel):
    id: int
    name: str
    email: str
    role: str
    college: str
    branch: str
    department: str
    target_role: str
    github_username: str
    linkedin_url: str
    skills: list[str]

    model_config = {"from_attributes": True}


# ── Profile update ─────────────────────────────────────────────────────────────
class UserProfileUpdate(BaseModel):
    name: Optional[str] = None
    college: Optional[str] = None
    branch: Optional[str] = None
    department: Optional[str] = None
    target_role: Optional[str] = None
    github_username: Optional[str] = None
    linkedin_url: Optional[str] = None
    skills: Optional[list[str]] = None     # Frontend sends list, backend joins/splits


TokenResponse.model_rebuild()
