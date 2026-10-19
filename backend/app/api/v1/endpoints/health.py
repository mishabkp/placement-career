from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health", summary="API Health Check")
async def health_check():
    return {
        "status": "healthy",
        "service": "PlacementPal AI Backend",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }
