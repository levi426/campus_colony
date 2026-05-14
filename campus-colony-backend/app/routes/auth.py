from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import create_user, login_user
from app.utils.security import (
    ACCESS_TOKEN_COOKIE_NAME,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    COOKIE_SAMESITE,
    COOKIE_SECURE,
    get_current_user,
    normalize_role,
)

router = APIRouter()


@router.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user.name, user.email, user.password)


@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    result = login_user(db, user.email, user.password)
    if not result:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=result["access_token"],
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )
    return {
        "token_type": "cookie",
        "role": result["role"],
    }


@router.post("/logout")
def logout(response: Response):
    response.delete_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
    )
    return {"message": "Logged out"}


@router.get("/me")
def me(current_user = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "role": normalize_role(current_user.role),
        "is_active": current_user.is_active,
        "institution": current_user.institution,
    }
