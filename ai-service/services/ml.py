import joblib
import pandas as pd

from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

from database import engine


# ======================================
# Load Training Data
# ======================================
def load_training_data():

    query = """
    SELECT
        DATE(s.transaction_date) AS date,
        p.name AS product,
        ps.size_name,
        SUM(si.quantity) AS quantity
    FROM sale_items si

    JOIN sales s
        ON s.id = si.sale_id

    JOIN product_sizes ps
        ON ps.id = si.product_size_id

    JOIN products p
        ON p.id = ps.product_id

    GROUP BY
        DATE(s.transaction_date),
        p.name,
        ps.size_name

    ORDER BY date;
    """

    return pd.read_sql(query, engine)


# ======================================
# Prepare Dataset
# ======================================
def prepare_training_data():

    df = load_training_data()

    df["date"] = pd.to_datetime(df["date"])

    df["day"] = df["date"].dt.day
    df["month"] = df["date"].dt.month
    df["weekday"] = df["date"].dt.weekday

    product_encoder = LabelEncoder()
    size_encoder = LabelEncoder()

    df["product_id"] = product_encoder.fit_transform(df["product"])
    df["size_id"] = size_encoder.fit_transform(df["size_name"])

    X = df[
        [
            "day",
            "month",
            "weekday",
            "product_id",
            "size_id",
        ]
    ]

    y = df["quantity"]

    return X, y, product_encoder, size_encoder


# ======================================
# Train Model
# ======================================
def train_model():

    X, y, product_encoder, size_encoder = prepare_training_data()

    model = RandomForestRegressor(
        n_estimators=200,
        random_state=42,
    )

    model.fit(X, y)

    joblib.dump(model, "models/demand_model.pkl")
    joblib.dump(product_encoder, "models/product_encoder.pkl")
    joblib.dump(size_encoder, "models/size_encoder.pkl")

    return model


# ======================================
# Predict Demand
# ======================================
def predict_demand():

    model = joblib.load("models/demand_model.pkl")
    product_encoder = joblib.load("models/product_encoder.pkl")
    size_encoder = joblib.load("models/size_encoder.pkl")

    today = pd.Timestamp.today()

    day = today.day
    month = today.month
    weekday = today.weekday()

    query = """
    SELECT
        p.name,
        ps.size_name
    FROM product_sizes ps

    JOIN products p
        ON p.id = ps.product_id

    ORDER BY
        p.name,
        ps.size_name;
    """

    products = pd.read_sql(query, engine)

    predictions = []

    for _, row in products.iterrows():

        product = row["name"]
        size = row["size_name"]

        product_id = product_encoder.transform([product])[0]
        size_id = size_encoder.transform([size])[0]

        X = pd.DataFrame(
            [
                {
                    "day": day,
                    "month": month,
                    "weekday": weekday,
                    "product_id": product_id,
                    "size_id": size_id,
                }
            ]
        )

        quantity = model.predict(X)[0]

        predictions.append(
            {
                "product": product,
                "size": size,
                "predicted_quantity": round(
                    max(float(quantity), 0),
                    2,
                ),
            }
        )

    predictions.sort(
        key=lambda x: x["predicted_quantity"],
        reverse=True,
    )

    return predictions