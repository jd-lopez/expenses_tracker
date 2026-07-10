import React from "react";
import { useContext, createContext } from "react";
import { useState, useEffect } from "react";
import { useMemo } from "react";

const ThemeContext = createContext();
const THEME_KEY = "trackTheme";

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved ? saved === "dark" : false;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);
  const value = useMemo(() => ({ isDark, toggleTheme, setIsDark }), [isDark]);

  useEffect(() => {
    // Persist the current theme whenever it changes so refreshes keep the same mode.
    localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider value={value}> {children}</ThemeContext.Provider>
  );
}
export function useTheme() {
  const ctx = useContext(ThemeContext);

  // This guards against using the hook outside ThemeProvider, which would return null.
  if (!ctx) throw new Error("d");
  return ctx;
}
