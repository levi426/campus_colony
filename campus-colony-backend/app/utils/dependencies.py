from fastapi import Depends, HTTPException
from app.utils.security import UserRole, get_current_user, normalize_role
from app.models.user import User


def require_admin(user: User = Depends(get_current_user)):
    if normalize_role(user.role) != UserRole.ADMIN.value:
        raise HTTPException(status_code=403, detail="Admin access required")
    return user


def require_user(user: User = Depends(get_current_user)):
    if normalize_role(user.role) != UserRole.USER.value:
        raise HTTPException(status_code=403, detail="User access required")
    return user


require_student = require_user
