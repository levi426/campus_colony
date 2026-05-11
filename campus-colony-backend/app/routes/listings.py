from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.listing import ListingCreate, ListingResponse
from app.services.listing_service import (
    create_listing,
    get_listings,
    delete_listing
)

from app.utils.security import get_current_user
from app.utils.dependencies import require_admin
from app.models.user import User

router = APIRouter()


@router.post("/", response_model=ListingResponse)
async def add_listing(
    title: str = Form(...),
    description: str = Form(None),
    price: float = Form(...),
    type: str = Form(...),
    area_id: int = Form(...),
    landlord_id: int = Form(...),
    latitude: float = Form(None),
    longitude: float = Form(None),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    data = ListingCreate(
        title=title,
        description=description,
        price=price,
        type=type,
        area_id=area_id,
        landlord_id=landlord_id,
        latitude=latitude,
        longitude=longitude
    )

    return create_listing(db, data, image)



@router.get("/")
def list_listings(
    sort: str = None,
    search: str = None,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    return get_listings(db, sort, search)


@router.get("/{listing_id}")
def get_listing_details(
    listing_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user)
):
    from sqlalchemy.orm import joinedload
    from app.models.listing import Listing
    
    listing = db.query(Listing).filter(Listing.id == listing_id).options(
        joinedload(Listing.area),
        joinedload(Listing.landlord)
    ).first()
    
    if not listing:
        raise HTTPException(status_code=404, detail="Listing not found")
    
    return {
        'id': listing.id,
        'title': listing.title,
        'description': listing.description,
        'price': listing.price,
        'type': listing.type,
        'image_url': listing.image_url,
        'latitude': listing.latitude,
        'longitude': listing.longitude,
        'area': {'id': listing.area.id, 'name': listing.area.name} if listing.area else None,
        'landlord': {
            'id': listing.landlord.id,
            'name': listing.landlord.name,
            'phone': listing.landlord.phone
        } if listing.landlord else None
    }


@router.delete("/{listing_id}")
def remove_listing(
    listing_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(require_admin)
):
    result = delete_listing(db, listing_id)

    if not result:
        raise HTTPException(status_code=404, detail="Listing not found")

    return {"message": "Listing deleted"}