import axios from "axios";
import { storage } from "@/utils/storage";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = storage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeItem("token");
      storage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
