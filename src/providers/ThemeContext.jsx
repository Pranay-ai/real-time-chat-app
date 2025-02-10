import { createContext, useReducer, useEffect } from "react";

// Define theme actions
const TOGGLE_THEME = "TOGGLE_THEME";

// Reducer function to handle theme changes
const themeReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return state === "light" ? "dark" : "light";
    default:
      return state;
  }
};

// Create ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component
export const ThemeProvider = ({ children }) => {
  // Load initial theme from localStorage or default to "light"
  const storedTheme = localStorage.getItem("theme") || "light";

  // Use useReducer instead of useState
  const [theme, dispatch] = useReducer(themeReducer, storedTheme);

  // Apply theme to <html> tag & store in localStorage
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle theme function using dispatch
  const toggleTheme = () => {
    dispatch({ type: TOGGLE_THEME });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
