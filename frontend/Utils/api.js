// frontend/Utils/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://super-duper-space-disco-4jgv4x4wvgwv25rp-5000.app.github.dev/api", // ⬅️ use your Codespace/Render link if deployed
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
