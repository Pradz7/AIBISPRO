mport { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  getDemand,
  getPromotion,
  getForecast,
  getRisk
} from "../../api/ai";

export default function AIDashboard() {

  const [demand, setDemand] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const load = async () => {
      const d = await getDemand();
      const p = await getPromotion();
      const f = await getForecast();
      const r = await getRisk();

      setDemand(d);
      setPromotion(p);
      setForecast(f);
      setRisk(r);
    };

    load();
  }, []);

  return (
    <div className="grid gap-6">

      {/* =========================
          FORECAST CHART
      ========================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          Revenue Forecast
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecast?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* =========================
          DEMAND TABLE
      ========================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          Top Demand Products
        </h2>

        <div className="space-y-2">
          {demand?.predictions?.slice(0, 5).map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-2"
            >
              <span>{item.product}</span>
              <span className="font-semibold">
                {item.predicted_quantity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          PROMOTION CARDS
      ========================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          AI Promotions
        </h2>

        <div className="grid md:grid-cols-3 gap-3">
          {promotion?.map((promo, i) => (
            <div
              key={i}
              className="p-3 border rounded-lg"
            >
              <p className="font-semibold">
                {promo.title || "Promotion"}
              </p>
              <p className="text-sm text-gray-500">
                {promo.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
          RISK PANEL
      ========================= */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-3">
          Stock Risk Alerts
        </h2>

        <div className="space-y-2">
          {risk?.map((r, i) => (
            <div
              key={i}
              className="flex justify-between text-red-500"
            >
              <span>{r.product}</span>
              <span>{r.status}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}