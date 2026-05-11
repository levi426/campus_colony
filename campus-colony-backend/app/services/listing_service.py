from sqlalchemy.orm import Session, joinedload
from app.models.listing import Listing
from app.utils.helpers import upload_image


def create_listing(db: Session, data, image_file=None):
    image_url = None

    if image_file:
        image_url = upload_image(image_file.file)

    listing = Listing(
        **data.model_dump(),
        image_url=image_url
    )

    db.add(listing)
    db.commit()
    db.refresh(listing)

    return listing


def get_listings(db: Session, sort: str = None, search: str = None):
    query = db.query(Listing).options(
        joinedload(Listing.area),
        joinedload(Listing.landlord)
    )

    if search:
        query = query.filter(Listing.title.ilike(f"%{search}%"))

    if sort == "price_asc":
        query = query.order_by(Listing.price.asc())

    elif sort == "price_desc":
        query = query.order_by(Listing.price.desc())

    return query.all()


def delete_listing(db: Session, listing_id: int):
    listing = db.query(Listing).filter(Listing.id == listing_id).first()

    if not listing:
        return None

    db.delete(listing)
    db.commit()

    return True