# models/__init__.py — import all models here so SQLAlchemy discovers them
from app.models.user import User

__all__ = ["User"]
