from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.core.database import Base


class User(Base):
    """
    Users table — stores both students and faculty.
    All AI analysis results (resume, skill gap etc.) are linked via user_id.
    """
    __tablename__ = "users"

    id           = Column(Integer, primary_key=True, index=True)
    email        = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    # Profile fields
    name         = Column(String, default="")
    role         = Column(String, default="student")          # "student" | "faculty"
    college      = Column(String, default="")
    branch       = Column(String, default="CSE")              # CSE, ECE, MECH …
    department   = Column(String, default="")
    target_role  = Column(String, default="Software Engineer")
    github_username = Column(String, default="")
    linkedin_url = Column(String, default="")
    skills       = Column(Text, default="")                   # comma-separated: "Python,React,SQL"

    # Timestamps
    created_at   = Column(DateTime(timezone=True), server_default=func.now())
    updated_at   = Column(DateTime(timezone=True), onupdate=func.now())
