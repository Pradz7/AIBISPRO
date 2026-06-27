import { useEffect, useState } from "react";
import { getDemand } from "../api/ai";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getDemand();

      // ✅ FIX HERE
      setData(res.data.predictions || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Demand Dashboard</h1>

      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <b>{item.product}</b> - {item.size} → {item.predicted_quantity}
        </div>
      ))}
    </div>
  );
}