import axios from "axios";

const AI_URL = "http://127.0.0.1:8000";

export class AIService {

  static async demand() {
    const res = await axios.get(`${AI_URL}/ai/demand`);
    return res.data;
  }

  static async promotion() {
    const res = await axios.get(`${AI_URL}/ai/promotion`);
    return res.data;
  }

  static async forecast() {
    const res = await axios.get(`${AI_URL}/ai/forecast`);
    return res.data;
  }

  static async risk() {
    const res = await axios.get(`${AI_URL}/ai/risk`);
    return res.data;
  }
}