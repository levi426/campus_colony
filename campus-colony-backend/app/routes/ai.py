from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.ai import RentPredictionRequest
from app.services.ai_service import predict_rent
from app.services.chatbot_service import chatbot_search
from app.database import get_db
from app.nlp.parser import parse_query
# ✅ SINGLE router
router = APIRouter(tags=["AI"])


# 🔹 RENT PREDICTION
@router.post("/predict-rent")
def predict_rent_api(request: RentPredictionRequest):
    data = request.dict()
    prediction = predict_rent(data)

    return {
        "success": True,
        "predicted_rent": round(prediction, 2)
    }


# 🔹 CHATBOT
from app.schemas.ai import ChatbotRequest

@router.post("/chatbot")
def chatbot(request: ChatbotRequest, db: Session = Depends(get_db)):
    results = chatbot_search(request.query, db)
    return {
     "query": request.query,
     "count": len(results),
     "results": results
}