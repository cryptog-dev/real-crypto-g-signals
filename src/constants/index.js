// Application constants
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export const USER_ROLES = {
  ADMIN: 'admin',
  PREMIUM: 'premium',
  FREE: 'free'
};

export const SIGNAL_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAIL: 'fail'
};

export const SIGNAL_DIRECTION = {
  LONG: 'long',
  SHORT: 'short'
};

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  ADMIN: '/admin'
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER: 'user',
  THEME: 'theme'
};

export const SOCIAL_LINKS = {
  TWITTER: "https://x.com/T_Cryptog",
  INSTAGRAM: "https://www.instagram.com/therealcrypto_g/",
  TELEGRAM: "https://t.me/therealcryptog_official#"
};

export const CONTACT_EMAIL = "therealcryptog.official@gmail.com";