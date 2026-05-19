"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  reducedEffects: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reducedEffects, setReducedEffects] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as any;
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const dataSaver = Boolean(nav.connection?.saveData);
    const slowNetwork = Boolean(
      nav.connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)
    );

    const updateEffects = () => {
      setReducedEffects(coarsePointer.matches || reducedMotion.matches || lowMemory || lowCpu || dataSaver || slowNetwork);
    };

    updateEffects();
    coarsePointer.addEventListener("change", updateEffects);
    reducedMotion.addEventListener("change", updateEffects);

    return () => {
      coarsePointer.removeEventListener("change", updateEffects);
      reducedMotion.removeEventListener("change", updateEffects);
    };
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", darkMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark", darkMode);
    }
  }, [darkMode, mounted]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, reducedEffects }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
