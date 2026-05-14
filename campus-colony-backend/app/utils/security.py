from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from enum import Enum
import os
import secrets
from jose import jwt, JWTError

from fastapi import Depends, HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    if os.getenv("APP_ENV", "development").lower() in {"production", "prod"}:
        raise RuntimeError("JWT_SECRET_KEY must be set in production")
    SECRET_KEY = secrets.token_urlsafe(32)

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
ACCESS_TOKEN_COOKIE_NAME = "cc_access_token"
COOKIE_SECURE = os.getenv("COOKIE_SECURE", os.getenv("APP_ENV", "development").lower() in {"production", "prod"})
COOKIE_SECURE = str(COOKIE_SECURE).lower() in {"1", "true", "yes", "on"}
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "none" if COOKIE_SECURE else "lax")

security = HTTPBearer(auto_error=False)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserRole(str, Enum):
    USER = "USER"
    ADMIN = "ADMIN"


ROLE_ALIASES = {
    "USER": UserRole.USER.value,
    "STUDENT": UserRole.USER.value,
    "ADMIN": UserRole.ADMIN.value,
}


def normalize_role(role: str | None) -> str:
    return ROLE_ALIASES.get((role or "").upper(), UserRole.USER.value)


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire, "type": "access"})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(
    request: Request,
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
):
    token = credentials.credentials if credentials else request.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=401, detail="Authentication required")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub") or payload.get("user_id")

        if user_id is None or payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token payload")

    except JWTError:
        raise HTTPException(status_code=401, detail="Token is invalid or expired")

    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(User).filter(User.id == user_id).first()

    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="User not found or inactive")

    return user
