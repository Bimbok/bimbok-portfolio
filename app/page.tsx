"use client"

import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ThemeToggle from "@/components/theme-toggle"

const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false })
const CommandDeck = dynamic(() => import("@/components/command-deck"), { ssr: false })
const DevMascot = dynamic(() => import("@/components/dev-mascot"), { ssr: false })

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [reducedEffects, setReducedEffects] = useState(false)
  const [partyMode, setPartyMode] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setDarkMode(true)
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string }
      deviceMemory?: number
    }
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4
    const lowCpu = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4
    const dataSaver = Boolean(nav.connection?.saveData)
    const slowNetwork = Boolean(
      nav.connection?.effectiveType && ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType),
    )

    const updateEffects = () => {
      setReducedEffects(coarsePointer.matches || reducedMotion.matches || lowMemory || lowCpu || dataSaver || slowNetwork)
    }

    updateEffects()
    coarsePointer.addEventListener("change", updateEffects)
    reducedMotion.addEventListener("change", updateEffects)

    return () => {
      coarsePointer.removeEventListener("change", updateEffects)
      reducedMotion.removeEventListener("change", updateEffects)
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

  const triggerPartyMode = () => {
    if (reducedEffects) return
    setPartyMode(true)
    window.setTimeout(() => setPartyMode(false), 2200)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 relative ${
        darkMode
          ? "bg-slate-950"
          : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
      }`}
    >
      {!reducedEffects && <CustomCursor darkMode={darkMode} />}
      
      {/* Decorative Glows */}
      {darkMode && !reducedEffects && (
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

      <ParticleBackground darkMode={darkMode} reducedEffects={reducedEffects} />
      <Navigation darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <CommandDeck darkMode={darkMode} setDarkMode={setDarkMode} onSurprise={triggerPartyMode} />
      <DevMascot darkMode={darkMode} reducedEffects={reducedEffects} />

      {partyMode && (
        <div className="fixed inset-0 pointer-events-none z-[65]">
          {Array.from({ length: 22 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute h-2.5 w-2.5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: "-10px",
                background:
                  index % 2 === 0
                    ? "linear-gradient(120deg, #ec4899, #a855f7)"
                    : "linear-gradient(120deg, #3b82f6, #22d3ee)",
              }}
              initial={{ y: -10, opacity: 0, rotate: 0 }}
              animate={{ y: "110vh", opacity: [0, 1, 0.9, 0], rotate: 360 }}
              transition={{
                duration: 1.8 + Math.random() * 0.8,
                ease: "easeOut",
                delay: Math.random() * 0.25,
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <Hero darkMode={darkMode} reducedEffects={reducedEffects} />
          <About darkMode={darkMode} />
          <Skills darkMode={darkMode} />
          <Projects darkMode={darkMode} />
          <Contact darkMode={darkMode} />
        </motion.main>
      </AnimatePresence>
    </div>
  )
}
