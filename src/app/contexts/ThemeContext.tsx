import { useEffect, useState, type PropsWithChildren } from "react";
import { ThemeContext, type Theme } from "./themeContextStore";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "light" || stored === "dark") {
        return stored;
      }
      // Check system preference
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
    } catch {
      // localStorage or matchMedia not available
    }
    return "light";
  });

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // localStorage not available in test environment
    }
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
