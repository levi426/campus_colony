from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.admin_service import User_Management, get_admin_dashboard_data
from app.schemas.admin import Admin_User_Mangaement
from app.utils.dependencies import require_admin
from app.models.user import User

router = APIRouter()

@router.get("/User_Management", response_model=Admin_User_Mangaement)
def admin_user_management(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return User_Management(db)

@router.get("/dashboard")
def get_dashboard(
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    return get_admin_dashboard_data(db)
