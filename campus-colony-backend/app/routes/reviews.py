from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.review import ReviewCreate, ReviewUpdate, ListingReviewResponse
from app.services import review_service
from app.utils.security import get_current_user
from app.utils.dependencies import require_user

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/{listing_id}")
def create_review(
    listing_id: int,
    data: ReviewCreate,
    db: Session = Depends(get_db),
    user = Depends(require_user)
):
    return review_service.create_review(
        db,
        user.id,
        listing_id,
        data.content,
        data.rating
    )


@router.get("/listing/{listing_id}", response_model=ListingReviewResponse)
def get_reviews(
    listing_id: int,
    db: Session = Depends(get_db)
):
    return review_service.get_listing_reviews(db, listing_id)


@router.put("/{review_id}")
def update_review(
    review_id: int,
    data: ReviewUpdate,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return review_service.update_review(
        db,
        review_id,
        user.id,
        data.content,
        data.rating
    )


@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    user = Depends(get_current_user)
):
    return review_service.delete_review(db, review_id, user)
