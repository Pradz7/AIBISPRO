import warnings
import logging

# suppress ML/NumPy deprecation spam
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=FutureWarning)

# also suppress joblib logging noise
logging.getLogger("joblib").setLevel(logging.ERROR)

from fastapi import FastAPI
from routes.ai import router

app = FastAPI(
    title="AIBISPRO AI",
    version="1.0",
)

app.include_router(router)