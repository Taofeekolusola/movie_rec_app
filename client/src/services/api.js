import axios from "axios";

const api = axios.create({
  baseURL: "https://movie-rec-app-4fu8.onrender.com/api",
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