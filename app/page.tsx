"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ThemeToggle from "@/components/theme-toggle"
import ParticleBackground from "@/components/particle-background"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", darkMode ? "dark" : "light")
      document.documentElement.classList.toggle("dark", darkMode)
    }
  }, [darkMode, mounted])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        darkMode
          ? "bg-slate-950"
          : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      <CustomCursor darkMode={darkMode} />
      
      {/* Decorative Glows */}
      {darkMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <ParticleBackground darkMode={darkMode} />
      <Navigation darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Hero darkMode={darkMode} />
          <About darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
