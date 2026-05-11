from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.utils.security import get_current_user
from app.models.user import User
from app.models.favourite import Favourite

router = APIRouter()


@router.post("/{listing_id}")
def add_favourite(
    listing_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    fav = Favourite(user_id=user.id, listing_id=listing_id)

    db.add(fav)
    db.commit()

    return {"message": "Added to favourites"}



@router.delete("/{listing_id}")
def remove_favourite(
    listing_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    fav = db.query(Favourite).filter(
        Favourite.user_id == user.id,
        Favourite.listing_id == listing_id
    ).first()

    if not fav:
        raise HTTPException(status_code=404, detail="Not in favourites")

    db.delete(fav)
    db.commit()

    return {"message": "Removed from favourites"}


@router.get("/")
def my_favourites(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    from app.services.favourite_service import get_favourites
    return get_favourites(db, user.id)