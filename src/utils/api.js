import axios from "axios";
import { API_BASE_URL, STORAGE_KEYS } from "../constants";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          return api(originalRequest);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register/", userData),
  login: (credentials) => api.post("/auth/token/", credentials),
  refreshToken: (refresh) => api.post("/auth/token/refresh/", { refresh }),
  getUserInfo: () => api.get("/auth/user/"),
  googleLogin: (payload) => api.post("/auth/google/", payload),
  updateProfile: (userData) => api.put("/auth/user/update/", userData),
};

// Blogs API
export const blogsAPI = {
  getAll: () => api.get("/blogs/"),
  create: (blogData) => api.post("/blogs/", blogData),
  getById: (id) => api.get(`/blogs/${id}/`),
  update: (id, blogData) => api.put(`/blogs/${id}/`, blogData),
  delete: (id) => api.delete(`/blogs/${id}/`),
};

// Signals API
export const signalsAPI = {
  getAll: () => api.get("/signals/"),
  create: (signalData) => api.post("/signals/", signalData),
  getById: (id) => api.get(`/signals/${id}/`),
  update: (id, signalData) => api.put(`/signals/${id}/`, signalData),
  delete: (id) => api.delete(`/signals/${id}/`),
};

export default api;
