import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5003/api",
});

// ✅ Attach token with "Bearer " prefix
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // ✅ FIXED
  }
  return config;
});

export default api;
