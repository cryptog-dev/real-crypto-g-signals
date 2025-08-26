import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Always apply dark mode
    const root = window.document.documentElement;
    root.classList.add("dark");
    // Remove any existing light mode classes
    root.classList.remove("light");
    // Update local storage for consistency
    localStorage.setItem("theme", "dark");
  }, []);

  // No need for toggle functionality
  return (
    <ThemeContext.Provider value={{ darkMode: true }}>
      {children}
    </ThemeContext.Provider>
  );
};
