import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeContext";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 bg-gray-300 dark:bg-gray-700 
                 rounded-full p-1 transition-all duration-300"
    >
      {/* Animated Sun & Moon Icons */}
      <motion.div
        className="absolute w-6 h-6 bg-white dark:bg-yellow-500 rounded-full flex items-center justify-center"
        initial={{ x: theme === "light" ? 0 : 26 }}
        animate={{ x: theme === "light" ? 0 : 26 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {theme === "light" ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-900" />}
      </motion.div>
    </button>
  );
};

export default ThemeToggleButton;
