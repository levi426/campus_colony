from sqlalchemy.orm import Session
from app.models.user import User


# Get all users
def get_all_users(db: Session):
    return db.query(User).filter(User.role != "admin").all()