import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const instance = axios.create({
  baseURL: API,
});

// attach token automatically
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
