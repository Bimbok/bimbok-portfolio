"use client"

import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"

interface ThemeToggleProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
}

export default function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      onClick={() => setDarkMode(!darkMode)}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
        darkMode
          ? "bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20"
          : "bg-black/10 border-black/20 text-purple-600 hover:bg-black/20"
      } shadow-lg hover:shadow-xl`}
      whileHover={{ scale: 1.1, rotate: 180 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        key={darkMode ? "moon" : "sun"}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
      </motion.div>
    </motion.button>
  )
}
