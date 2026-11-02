from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.router import api_router
from app.core.database import engine, Base
import app.models  # noqa: F401 — ensures all models are registered with Base

# ── Create all DB tables on startup ───────────────────────────────────────────
try:
    Base.metadata.create_all(bind=engine)
except Exception as _db_err:
    import logging as _log
    _log.getLogger("placementpal").warning(
        f"DB table creation skipped on startup: {_db_err}. "
        "Server will still start — DB errors will surface per-request."
    )

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for AI-powered Career, Resume, and Placement Platform",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS Setup — allow localhost dev and any deployed https frontend (Vercel, Netlify, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=r"https://.*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root Endpoint
@app.get("/")
async def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API",
        "documentation": "/docs",
        "version": settings.VERSION
    }

# Include API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)

