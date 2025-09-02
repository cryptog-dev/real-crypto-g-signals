import React, { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    try {
      // Get saved theme from localStorage, default to dark for finance app
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? savedTheme === "dark" : true;
    } catch (error) {
      console.error("Error accessing localStorage for theme:", error);
      return true; // Fallback to dark mode
    }
  });

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      try {
        localStorage.setItem("theme", newMode ? "dark" : "light");
      } catch (error) {
        console.error("Error saving theme to localStorage:", error);
      }
      return newMode;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(darkMode ? "dark" : "light");
  }, [darkMode]);

  const themeName = darkMode ? "Market Night" : "Market Day";

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode, themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};