from fastapi import FastAPI
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
import os

from app.database import Base, engine

# Models (important for table creation)
from app.models.listing import Listing
from app.models.landlord import Landlord
from app.models.area import Area
from app.models.review import Review  
from app.models.user import User       
from app.models.favourite import Favourite

# Routers
from app.routes.areas import router as areas_router
from app.routes.auth import router as auth_router
from app.routes.landlords import router as landlords_router
from app.routes.listings import router as listings_router
from app.routes.ai import router as ai_router
from app.routes.reviews import router as reviews_router  
from app.routes.favourites import router as favourites_router
from app.routes.admin import router as admin_router
from app.utils.dependencies import require_admin
from app.models.user import User
from app.routes.users import router as users_router


# ✅ CREATE APP ONLY ONCE
app = FastAPI(title="Campus Colony API")


# ✅ CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://campus-colony.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ✅ Create tables
Base.metadata.create_all(bind=engine)


# 🔗 ROUTES
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(users_router, prefix="/users", tags=["Users"])
app.include_router(areas_router, prefix="/areas", tags=["Areas"])
app.include_router(landlords_router, prefix="/landlords", tags=["Landlords"])
app.include_router(listings_router, prefix="/listings", tags=["Listings"])
app.include_router(ai_router, prefix="/ai", tags=["AI / Chatbot"])
app.include_router(reviews_router, tags=["Reviews"])
app.include_router(favourites_router, prefix="/favourites", tags=["Favourites"])
app.include_router(admin_router, prefix="/admin", tags=["Admin"])


# 🌐 ROOT
@app.get("/")
def root():
    return {"message": "Campus Colony API running 🚀"}


# 📊 TABLES
@app.get("/tables")
def get_tables(admin: User = Depends(require_admin)):
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema='public';
        """))
        return [row[0] for row in result]


# ⚠️ RESET DB (DEV ONLY)
@app.post("/reset-db")
def reset_db(admin: User = Depends(require_admin)):
    reset_enabled = os.getenv("RESET_DB_ENABLED", "false").lower() in {"1", "true", "yes", "on"}
    is_production = os.getenv("APP_ENV", "development").lower() in {"production", "prod"}

    if is_production or not reset_enabled:
        raise HTTPException(status_code=403, detail="Database reset is disabled")

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return {"message": "Database reset successfully"}


# 🧬 SCHEMA VIEW
@app.get("/schema")
def get_schema(admin: User = Depends(require_admin)):
    with engine.connect() as conn:
        result = conn.execute(text("""
            SELECT 
                table_name,
                column_name,
                data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
            ORDER BY table_name, ordinal_position;
        """))

        schema = {}

        for table, column, dtype in result:
            if table not in schema:
                schema[table] = []
            schema[table].append({
                "column": column,
                "type": dtype
            })

        return schema
