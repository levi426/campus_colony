from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import UserRole


# Get all users
def get_all_users(db: Session):
    return db.query(User).filter(User.role != UserRole.ADMIN.value, User.role != "admin").all()
