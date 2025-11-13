// components/ThemeToggle.tsx
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative h-6 w-12 md:w-16 md:h-8  rounded-full transition-all duration-500 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 shadow-lg ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-600 to-gray-700 focus:ring-gray-400"
          : "bg-gradient-to-r from-blue-400 to-purple-500 focus:ring-purple-300"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {/* Track */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-600 to-black border border-gray-400"
            : "bg-gradient-to-r from-blue-400 to-purple-500 border border-purple-300" 
        }`}
      />

      {/* Thumb */}
      <div
        className={`absolute top-1 w-4 h-4 md:w-6 md:h-6 rounded-full shadow-lg transition-all duration-500 ease-in-out ${
          theme === "dark"
            ? "translate-x-7 md:translate-x-9 bg-gray-500"
            : "translate-x-1 bg-white"
        }`}
      >
        {/* Icons inside thumb */}
        <div className="absolute inset-0 flex items-center justify-center">
          {theme === "light" ? (
            <span className="text-amber-500 text-xs md:text-sm">☀️</span>
          ) : (
            <span className="text-gray-600 text-xs md:text-sm">🌙</span>
          )}
        </div>
      </div>

      {/* Background stars for dark mode effect */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-1 left-2 w-1 h-1 bg-gray-300 rounded-full opacity-80"></div>
        <div className="absolute bottom-1 left-4 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-60"></div>
        <div className="absolute top-3 right-3 w-0.5 h-0.5 bg-gray-300 rounded-full opacity-70"></div>
      </div>

      {/* Cloud effect for light mode */}
      <div
        className={`absolute inset-0 rounded-full transition-opacity duration-500 ${
          theme === "light" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute top-2 right-3 w-1 h-1 bg-white/80 rounded-full opacity-70"></div>
        <div className="absolute bottom-2 right-6 w-0.5 h-0.5 bg-white/60 rounded-full opacity-50"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
