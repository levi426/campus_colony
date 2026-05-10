from pydantic import BaseModel, EmailStr
from typing import Optional


# ---------- Existing ----------
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    institution: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------- NEW: User Response ----------
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str
    is_active: bool
    institution: Optional[str]

    class Config:
        from_attributes = True