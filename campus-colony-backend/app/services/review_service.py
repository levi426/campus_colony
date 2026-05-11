from sqlalchemy.orm import Session, joinedload
from fastapi import HTTPException
from app.models.review import Review
from app.models.listing import Listing

def create_review(db: Session, user_id: int, listing_id: int, content: str, rating: int):

    # check listing exists
    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    existing = db.query(Review).filter(
        Review.user_id == user_id,
        Review.listing_id == listing_id
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="You already reviewed this listing")

    review = Review(
        content=content,
        rating=rating,
        user_id=user_id,
        listing_id=listing_id
    )

    db.add(review)
    db.commit()
    db.refresh(review)

    return review

def get_listing_reviews(db: Session, listing_id: int):

    listing = db.query(Listing).filter(Listing.id == listing_id).first()
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")

    reviews = db.query(Review).options(joinedload(Review.user)).filter(Review.listing_id == listing_id).all()

    total = len(reviews)

    if total == 0:
        return {
            "average_rating": 0,
            "total_reviews": 0,
            "reviews": []
        }

    avg = sum(r.rating for r in reviews) / total

    return {
        "average_rating": round(avg, 2),
        "total_reviews": total,
        "reviews": reviews
    }


def update_review(db: Session, review_id: int, user_id: int, content=None, rating=None):

    review = db.query(Review).filter(Review.id == review_id).first()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # owner check
    if review.user_id != user_id:
        raise HTTPException(status_code=403, detail="Not allowed")

    if content is not None:
        review.content = content

    if rating is not None:
        review.rating = rating

    db.commit()
    db.refresh(review)

    return review


def delete_review(db: Session, review_id: int, user):

    review = db.query(Review).filter(Review.id == review_id).first()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    # owner OR admin
    if review.user_id != user.id and user.role != "admin":
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(review)
    db.commit()

    return {"message": "Review deleted"}