import React, { createContext, useContext, useEffect, useState } from "react";

export type Theme = "crystal" | "obsidian";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_theme");
      if (saved === "obsidian" || saved === "crystal") {
        return saved;
      }
    }
    return "crystal";
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (theme === "obsidian") {
      root.classList.add("dark");
      body?.classList.add("dark");
      root.setAttribute("data-theme", "obsidian");
      root.style.colorScheme = "dark";
      root.style.backgroundColor = "#09080E";
      root.style.color = "#F5F3FA";
      if (body) {
        body.style.backgroundColor = "#09080E";
        body.style.color = "#F5F3FA";
      }
    } else {
      root.classList.remove("dark");
      body?.classList.remove("dark");
      root.setAttribute("data-theme", "crystal");
      root.style.colorScheme = "light";
      root.style.backgroundColor = "#F8F7FC";
      root.style.color = "#111015";
      if (body) {
        body.style.backgroundColor = "#F8F7FC";
        body.style.color = "#111015";
      }
    }
    localStorage.setItem("portfolio_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === "crystal" ? "obsidian" : "crystal"));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
