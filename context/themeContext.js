// themeContext.js
import React, { createContext, useState } from "react";
import { Appearance } from "react-native";

// Create a context for theme
export const ThemeContext = createContext();

// Create a provider component
export const ThemeProvider = ({ children }) => {
  // Get system theme
  const systemTheme = Appearance.getColorScheme();

  // Set initial theme, using system theme or default to 'light'
  const [theme, setTheme] = useState(systemTheme || "light");

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
