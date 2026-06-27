import axios from "axios";

const API = "http://localhost:3000";

const unwrap = (res) => res.data.data;

// ==========================
// DEMAND
// ==========================
export const getDemand = async () => {
  const res = await axios.get(`${API}/ai/demand`);
  return unwrap(res);
};

// ==========================
// PROMOTION
// ==========================
export const getPromotion = async () => {
  const res = await axios.get(`${API}/ai/promotion`);
  return unwrap(res);
};

// ==========================
// RECOMMENDATION
// ==========================
export const getRecommendations = async () => {
  const res = await axios.get(`${API}/ai/recommendations`);
  return unwrap(res);
};

// ==========================
// FORECAST
// ==========================
export const getForecast = async () => {
  const res = await axios.get(`${API}/ai/forecast`);
  return unwrap(res);
};

// ==========================
// RISK
// ==========================
export const getRisk = async () => {
  const res = await axios.get(`${API}/ai/risk`);
  return unwrap(res);
};