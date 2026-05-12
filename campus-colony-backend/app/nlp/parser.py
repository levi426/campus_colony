import re

def parse_query(text: str, area_names: list[str]):

    text_lower = text.lower()

    filters = {
        "type": None,
        "area": None,
        "max_price": None,
        "min_price": None,
        "min_rating": None
    }

    for t in ["flat", "house", "hostel"]:
        if t in text_lower:
            filters["type"] = t

    for area in area_names:
        if area.lower() in text_lower:
            filters["area"] = area
            break

    price_match = re.search(r"(below|under|less than)\s*(\d+)", text_lower)
    if price_match:
        filters["max_price"] = float(price_match.group(2))

    price_match2 = re.search(r"(above|more than|greater than)\s*(\d+)", text_lower)
    if price_match2:
        filters["min_price"] = float(price_match2.group(2))

    rating_match = re.search(r"(above|more than|greater than)\s*(\d+)\s*rating", text_lower)
    if rating_match:
        filters["min_rating"] = float(rating_match.group(2))

    return type("Filters", (), filters)