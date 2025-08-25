import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

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
    const token = localStorage.getItem("access_token");
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
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await axios.post(
            `${API_BASE_URL}/auth/token/refresh/`,
            {
              refresh: refreshToken,
            }
          );

          localStorage.setItem("access_token", response.data.access);
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
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
