from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token, get_current_user_id
from app.models.user import User
from app.schemas.user import UserRegister, UserLogin, TokenResponse, UserPublic, UserProfileUpdate

router = APIRouter()


def _user_to_public(user: User) -> UserPublic:
    """Convert DB User row → UserPublic schema (splits skills CSV → list)."""
    skills_list = [s.strip() for s in user.skills.split(",") if s.strip()] if user.skills else []
    return UserPublic(
        id=user.id,
        name=user.name,
        email=user.email,
        role=user.role,
        college=user.college,
        branch=user.branch,
        department=user.department or f"B.Tech {user.branch} '26",
        target_role=user.target_role,
        github_username=user.github_username or "",
        linkedin_url=user.linkedin_url or "",
        skills=skills_list,
    )


# ── POST /auth/register ────────────────────────────────────────────────────────
@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(body: UserRegister, db: Session = Depends(get_db)):
    """Register a new student or faculty account."""
    # Check duplicate email
    existing = db.query(User).filter(User.email == body.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="Email already registered.")

    user = User(
        email=body.email,
        hashed_password=hash_password(body.password),
        name=body.name,
        role=body.role,
        college=body.college,
        branch=body.branch,
        department=f"B.Tech {body.branch} '26",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=token, user=_user_to_public(user))


# ── POST /auth/login ───────────────────────────────────────────────────────────
@router.post("/login", response_model=TokenResponse)
def login(body: UserLogin, db: Session = Depends(get_db)):
    """Login with email + password, returns JWT token + user info."""
    user = db.query(User).filter(User.email == body.email).first()
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    token = create_access_token(data={"sub": str(user.id)})
    return TokenResponse(access_token=token, user=_user_to_public(user))


# ── GET /auth/me ───────────────────────────────────────────────────────────────
@router.get("/me", response_model=UserPublic)
def get_me(
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Returns the currently logged-in user's profile (requires Bearer token)."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return _user_to_public(user)


# ── PUT /auth/profile ──────────────────────────────────────────────────────────
@router.put("/profile", response_model=UserPublic)
def update_profile(
    body: UserProfileUpdate,
    user_id: int = Depends(get_current_user_id),
    db: Session = Depends(get_db)
):
    """Update the logged-in user's profile fields."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    update_data = body.model_dump(exclude_unset=True)

    # Convert skills list → comma-separated string for storage
    if "skills" in update_data and isinstance(update_data["skills"], list):
        update_data["skills"] = ",".join(update_data["skills"])

    for field, value in update_data.items():
        setattr(user, field, value)

    db.commit()
    db.refresh(user)
    return _user_to_public(user)
