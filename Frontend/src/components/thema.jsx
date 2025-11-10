// src/components/thema.jsx
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
// leer modo guardado al inicio
const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("dark-mode");
    return saved === "true";
});

const toggleDark = () => setIsDark(prev => {
    const newMode = !prev;
    localStorage.setItem("dark-mode", newMode); // guardarlo cada vez que cambia
    return newMode;
});

// si cambia, aplicar clase al html o body
useEffect(() => {
    if (isDark) {
    document.documentElement.classList.add("dark");
    } else {
    document.documentElement.classList.remove("dark");
    }
}, [isDark]);

return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
    {children}
    </ThemeContext.Provider>
);
};

export const useTheme = () => useContext(ThemeContext);
