import joblib
import os

# =========================================================
# MODEL PATHS
# =========================================================
MODEL_DIR = "models"

MODEL_PATH = os.path.join(MODEL_DIR, "demand_model.pkl")
PRODUCT_ENCODER_PATH = os.path.join(MODEL_DIR, "product_encoder.pkl")
SIZE_ENCODER_PATH = os.path.join(MODEL_DIR, "size_encoder.pkl")
META_PATH = os.path.join(MODEL_DIR, "model_meta.pkl")


# =========================================================
# LOAD ALL MODELS (MAIN FUNCTION USED BY app.py)
# =========================================================
def load_assets():
    """
    Load trained ML model + encoders.
    This is used by FastAPI app on startup or runtime.
    """

    model = joblib.load(MODEL_PATH)
    product_encoder = joblib.load(PRODUCT_ENCODER_PATH)
    size_encoder = joblib.load(SIZE_ENCODER_PATH)

    metadata = None
    if os.path.exists(META_PATH):
        metadata = joblib.load(META_PATH)

    return {
        "model": model,
        "product_encoder": product_encoder,
        "size_encoder": size_encoder,
        "metadata": metadata
    }


# =========================================================
# OPTIONAL: LOAD INDIVIDUALLY (if needed elsewhere)
# =========================================================
def load_model():
    return joblib.load(MODEL_PATH)


def load_product_encoder():
    return joblib.load(PRODUCT_ENCODER_PATH)


def load_size_encoder():
    return joblib.load(SIZE_ENCODER_PATH)