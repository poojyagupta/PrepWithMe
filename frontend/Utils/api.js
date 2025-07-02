// frontend/Utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://opulent-space-sniffle-gjvxgx75xvq2vwg6-5000.app.github.dev/api", // ⬅️ use your Codespace/Render link if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
