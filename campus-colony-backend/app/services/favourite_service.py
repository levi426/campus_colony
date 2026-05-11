from sqlalchemy.orm import Session
from app.models.favourite import Favourite
from app.models.listing import Listing


def add_favourite(db: Session, user_id: int, listing_id: int):
    fav = Favourite(user_id=user_id, listing_id=listing_id)

    db.add(fav)
    db.commit()
    db.refresh(fav)

    return fav


def remove_favourite(db: Session, user_id: int, listing_id: int):
    fav = db.query(Favourite).filter(
        Favourite.user_id == user_id,
        Favourite.listing_id == listing_id
    ).first()

    if not fav:
        return None

    db.delete(fav)
    db.commit()

    return True


def get_favourites(db: Session, user_id: int):
    from sqlalchemy.orm import joinedload
    favourites = db.query(Favourite).filter(Favourite.user_id == user_id).options(
        joinedload(Favourite.listing).joinedload(Listing.area),
        joinedload(Favourite.listing).joinedload(Listing.landlord)
    ).all()
    # Return listing data with relationships for each favourite
    return [{
        'id': fav.id,
        'listing_id': fav.listing_id,
        'listing': {
            'id': fav.listing.id,
            'title': fav.listing.title,
            'description': fav.listing.description,
            'price': fav.listing.price,
            'type': fav.listing.type,
            'image_url': fav.listing.image_url,
            'area': {'id': fav.listing.area.id, 'name': fav.listing.area.name} if fav.listing.area else None,
            'landlord': {'id': fav.listing.landlord.id, 'name': fav.listing.landlord.name, 'phone': fav.listing.landlord.phone} if fav.listing.landlord else None
        }
    } for fav in favourites if fav.listing]
