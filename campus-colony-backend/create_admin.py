import os
from dotenv import load_dotenv

from app.database import SessionLocal
from app.models.review import Review
from app.models.favourite import Favourite
from app.models.listing import Listing
from app.models.landlord import Landlord
from app.models.area import Area
from app.models.user import User
from app.utils.security import hash_password

load_dotenv()

admin_email = os.getenv("ADMIN_EMAIL")
admin_password = os.getenv("ADMIN_PASSWORD")
admin_name = os.getenv("ADMIN_NAME", "Admin")

if not admin_email or not admin_password:
    raise RuntimeError("Missing ADMIN_EMAIL or ADMIN_PASSWORD")

if len(admin_password) < 12:
    raise RuntimeError("ADMIN_PASSWORD must be at least 12 characters long")

with SessionLocal() as db:
    # Find existing admin
    admin = db.query(User).filter(User.email == admin_email).first()

    if admin:
        # UPDATE existing admin (no delete)
        admin.password = hash_password(admin_password)
        admin.role = "ADMIN"
        admin.is_active = True
        admin.name = admin_name
    else:
        # CREATE new admin
        admin = User(
            name=admin_name,
            email=admin_email,
            password=hash_password(admin_password),
            role="ADMIN",
            is_active=True,
        )
        db.add(admin)

    db.commit()

print("Admin upsert completed successfully")