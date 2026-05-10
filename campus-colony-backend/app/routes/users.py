from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.schemas.user import UserResponse
from app.services.user_service import get_all_users
from app.utils.dependencies import require_admin


router = APIRouter()


# GET ALL USERS (Admin Only)
@router.get("/", response_model=List[UserResponse])
def read_users(
    db: Session = Depends(get_db),
    current_user = Depends(require_admin)
):
    users = get_all_users(db)
    return users