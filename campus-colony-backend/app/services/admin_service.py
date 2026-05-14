from sqlalchemy.orm import Session
from app.models.user import User
from app.models.listing import Listing
from app.models.review import Review
from sqlalchemy import func
from app.utils.security import UserRole


def User_Management(db:Session):
    total_users     = db.query(User).count()
    total_students  = db.query(User).filter(User.role.in_([UserRole.USER.value, "student", "user"])).count()
    total_landlords = db.query(User).filter(User.role == "landlord").count()
    total_listings  = db.query(Listing).count()
    active_listings = db.query(Listing).filter(Listing.is_active == True).count()
    total_reviews   = db.query(Review).count()

    return {
        "total_users":     total_users,
        "total_students":  total_students,
        "total_landlords": total_landlords,
        "total_listings":  total_listings,
        "active_listings": active_listings,
        "total_reviews":   total_reviews,
    }


def get_admin_dashboard_data(db: Session):
    # 1. Calculate Summary Stats
    total_listings = db.query(Listing).count()
    total_users = db.query(User).count()
    avg_score = db.query(func.avg(Listing.score)).scalar() or 0
    
    # 2. Get Recent Listings for the table
    # We take the 5 most recent ones
    recent_listings = db.query(Listing).order_by(Listing.created_at.desc()).limit(5).all()
    
    return {
        "stats": {
            "total_listings": total_listings,
            "total_users": total_users,
            "avg_area_score": round(avg_score, 1),
            "listings_growth": 48 # Hardcoded for now, or calculate vs last week
        },
        "recent_listings": recent_listings
    }
