from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.listing import Listing
from app.models.area import Area
from app.models.review import Review
from app.nlp.parser import parse_query


def get_area_names(db: Session):
    return [a.name for a in db.query(Area).all()]


def chatbot_search(query: str, db: Session):

    area_names = get_area_names(db)
    filters = parse_query(query, area_names)

    q = db.query(Listing)

    if filters.area:
        q = q.join(Area).filter(Area.name.ilike(f"%{filters.area}%"))


    if filters.type:
        q = q.filter(Listing.type.ilike(filters.type))


    if filters.max_price is not None:
        q = q.filter(Listing.price <= filters.max_price)

    if filters.min_price is not None:
        q = q.filter(Listing.price >= filters.min_price)

    if filters.min_rating is not None:
        q = (
            q.join(Review)
            .group_by(Listing.id)
            .having(func.avg(Review.rating) >= filters.min_rating)
        )

    return q.all()