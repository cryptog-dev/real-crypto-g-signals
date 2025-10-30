import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { authAPI } from "../utils/api";
import { STORAGE_KEYS, USER_ROLES } from "../constants";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    // Check if user is logged in on app start
    const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    const userData = localStorage.getItem(STORAGE_KEYS.USER);

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
        // Fetch fresh user data from server
        fetchUserInfo();
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
      }
    }
    setLoading(false);
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await authAPI.getUserInfo();
      const userData = response.data;
      setUser(userData);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user info:", error);
      // If token is invalid, clear user data
      if (error.response?.status === 401) {
        logout();
      }
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const { access, refresh } = response.data;

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);

      // Fetch user info from server to get actual role
      const userInfoResponse = await authAPI.getUserInfo();
      const userData = userInfoResponse.data;

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || "Registration failed",
      };
    }
  };

  const loginWithGoogle = async (credential) => {
    try {
      const response = await authAPI.googleLogin({ credential });
      const { access, refresh } = response.data;

      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);

      const userInfoResponse = await authAPI.getUserInfo();
      const userData = userInfoResponse.data;

      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.detail ||
          "Google login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setUser(null);
  };

  const isAdmin = () => user?.role === USER_ROLES.ADMIN;
  const isPremium = () => user?.role === USER_ROLES.PREMIUM;
  const isFree = () => user?.role === USER_ROLES.FREE;

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    isAdmin,
    isPremium,
    isFree,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
