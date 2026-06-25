from fastapi import APIRouter
import logging

from utils.response import success, error

from services.analytics import (
    load_sales,
    dashboard_summary,
    forecast_sales,
    restock_prediction,
)

from services.ml import predict_demand
from services.recommendation import recommendation_engine
from services.insights import generate_business_insights
from services.risk import low_stock_risk
from services.basket import market_basket_analysis
from services.promotion import promotion_recommendation

router = APIRouter(prefix="/ai", tags=["AI"])

logger = logging.getLogger("ai-service")


# ---------------------------
# HEALTH
# ---------------------------
@router.get("/health")
def health():
    return success({"status": "running"})


# ---------------------------
# SALES
# ---------------------------
@router.get("/sales")
def sales():
    try:
        df = load_sales()

        return success({
            "rows": len(df),
            "columns": list(df.columns),
            "preview": df.head(10).to_dict(orient="records")
        })

    except Exception as e:
        logger.exception("Sales endpoint failed")
        return error("Failed to load sales data", e)


# ---------------------------
# DASHBOARD
# ---------------------------
@router.get("/dashboard")
def dashboard():
    try:
        return success(dashboard_summary())
    except Exception as e:
        logger.exception("Dashboard failed")
        return error("Dashboard error", e)


# ---------------------------
# FORECAST
# ---------------------------
@router.get("/forecast")
def forecast():
    try:
        return success(forecast_sales())
    except Exception as e:
        logger.exception("Forecast failed")
        return error("Forecast error", e)


# ---------------------------
# RESTOCK
# ---------------------------
@router.get("/restock")
def restock():
    try:
        return success({
            "products": restock_prediction()
        })
    except Exception as e:
        logger.exception("Restock failed")
        return error("Restock prediction error", e)


# ---------------------------
# DEMAND
# ---------------------------
@router.get("/demand")
def demand():
    try:
        return success({
            "predictions": predict_demand()
        })
    except Exception as e:
        logger.exception("Demand failed")
        return error("Demand prediction error", e)


# ---------------------------
# RECOMMENDATION
# ---------------------------
@router.get("/recommendations")
def recommendations():
    try:
        return success(recommendation_engine())
    except Exception as e:
        logger.exception("Recommendation failed")
        return error("Recommendation engine error", e)


# ---------------------------
# INSIGHTS
# ---------------------------
@router.get("/insights")
def insights():
    try:
        return success(generate_business_insights())
    except Exception as e:
        logger.exception("Insights failed")
        return error("Insights generation error", e)


# ---------------------------
# RISK
# ---------------------------
@router.get("/risk")
def risk():
    try:
        return success(low_stock_risk())
    except Exception as e:
        logger.exception("Risk failed")
        return error("Risk analysis error", e)


# ---------------------------
# BASKET
# ---------------------------
@router.get("/basket")
def basket():
    try:
        return success(market_basket_analysis())
    except Exception as e:
        logger.exception("Basket failed")
        return error("Basket analysis error", e)


# ---------------------------
# PROMOTION (YOUR MAIN SYSTEM)
# ---------------------------
@router.get("/promotion")
def promotion():
    try:
        return success(promotion_recommendation())
    except Exception as e:
        logger.exception("Promotion failed")
        return error("Promotion engine crashed", e)