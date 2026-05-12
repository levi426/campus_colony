from typing import Optional
from pydantic import BaseModel

class ListingFilter(BaseModel):
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    area: Optional[str] = None
    type: Optional[str] = None
    min_rating: Optional[float] = None
    sort_by: Optional[str] = None  