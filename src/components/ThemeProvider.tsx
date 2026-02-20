import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("silverile-theme");
    return (stored as Theme) || "light";
  });

  useEffect(() => {
    // Apply theme to <html> for Tailwind dark-mode utilities
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Also apply to all .silverile-landing wrappers for scoped CSS vars
    document.querySelectorAll(".silverile-landing").forEach((el) => {
      el.classList.remove("light", "dark");
      el.classList.add(theme);
    });

    localStorage.setItem("silverile-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
