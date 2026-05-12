import re

PROPERTY_TYPES = ["house", "flat", "hostel", "room"]

def extract_price(text: str):
    min_price = None
    max_price = None

    match = re.search(r"(under|less than|max)\s*(\d+)", text)
    if match:
        max_price = float(match.group(2))


    match = re.search(r"(above|more than|min)\s*(\d+)", text)
    if match:
        min_price = float(match.group(2))

    return min_price, max_price


def extract_type(text: str):
    for t in PROPERTY_TYPES:
        if t in text:
            return t
    return None


def extract_rating(text: str):
    match = re.search(r"(rating|rated)\s*(above|greater than)?\s*(\d+)", text)
    if match:
        return float(match.group(3))
    return None


def extract_sort(text: str):
    if "cheap" in text or "low price" in text:
        return "price_asc"
    if "expensive" in text or "high price" in text:
        return "price_desc"
    if "best" in text or "top" in text:
        return "rating"
    return None


def extract_area(text: str, db):
    areas = db.query("areas").all()  
    for area in areas:
        if area.name.lower() in text:
            return area.name
    return None