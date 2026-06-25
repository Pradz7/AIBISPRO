from fastapi import FastAPI
from routes.ai import router as ai_router
from services.model_loader import load_assets

app = FastAPI()

# preload ML model at startup (VERY IMPORTANT)
@app.on_event("startup")
def startup_event():
    load_assets()
    print("ML Model loaded into memory")

app.include_router(ai_router)