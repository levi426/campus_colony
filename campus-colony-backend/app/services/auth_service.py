from sqlalchemy.orm import Session
from app.models.user import User
from app.utils.security import UserRole, create_access_token, hash_password, normalize_role, verify_password

def create_user(db: Session, name: str, email: str, password: str):
    hashed = hash_password(password)
    user = User(name=name, email=email, password=hashed, role=UserRole.USER.value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not user.is_active:
        return None
    if not verify_password(password, user.password):
        return None
    return user

def login_user(db: Session, email: str, password: str):
    user = authenticate_user(db, email, password)
    if not user:
        return None

    role = normalize_role(user.role)
    
    token = create_access_token({
        "sub": str(user.id),
        "role": role
    })

    return {
        "access_token": token,
        "token_type": "bearer",
        "role": role
    }
