import { useTheme } from "../contexts/ThemeContext";
import "./ThemeToggle.css";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`${theme === "light" ? "Dark" : "Light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
