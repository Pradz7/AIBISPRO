import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:3000";

export default function App() {
  const [demand, setDemand] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDemand = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/ai/demand`);

      console.log("API RESPONSE:", res.data);

      const predictions = res.data?.data?.predictions || [];

      setDemand(predictions);

    } catch (err) {
      console.error("API Error:", err);
      setDemand([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemand();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>AIBISPRO AI Dashboard</h1>

      <p style={styles.subtitle}>
        Real-time Demand Prediction (Random Forest Model)
      </p>

      {loading ? (
        <p style={styles.loading}>Loading AI data...</p>
      ) : demand.length > 0 ? (
        <div style={styles.grid}>
          {demand.slice(0, 12).map((item, index) => (
            <div key={index} style={styles.card}>
              <h3>{item.product}</h3>
              <p>Size: {item.size}</p>
              <p style={styles.value}>
                {item.predicted_quantity} units
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={styles.loading}>No data available</p>
      )}
    </div>
  );
}

// =========================
// STYLES
// =========================
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Arial",
    background: "#0f172a",
    minHeight: "100vh",
    color: "white",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#94a3b8",
    marginBottom: "20px",
  },
  loading: {
    color: "#38bdf8",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #334155",
  },
  value: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#22c55e",
    fontWeight: "bold",
  },
};