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
    window.setTimeout(() => setPartyMode(false), 3200)
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
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(236,72,153,0.35), rgba(59,130,246,0.2) 40%, transparent 68%)",
            }}
          />

          {Array.from({ length: 3 }).map((_, ring) => (
            <motion.div
              key={`ring-${ring}`}
              className="absolute left-1/2 top-[42%] rounded-full border"
              style={{
                width: 60 + ring * 90,
                height: 60 + ring * 90,
                marginLeft: -(30 + ring * 45),
                marginTop: -(30 + ring * 45),
                borderColor: ring % 2 === 0 ? "rgba(236,72,153,0.7)" : "rgba(59,130,246,0.65)",
              }}
              initial={{ scale: 0.2, opacity: 0.8 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 1.15 + ring * 0.15, ease: "easeOut", delay: ring * 0.08 }}
            />
          ))}

          {Array.from({ length: 18 }).map((_, index) => (
            <motion.span
              key={`streak-${index}`}
              className="absolute left-1/2 top-[42%] w-[3px] h-24 origin-bottom rounded-full"
              style={{
                marginLeft: -1.5,
                transform: `rotate(${index * 20}deg)`,
                background:
                  index % 2 === 0
                    ? "linear-gradient(to top, rgba(236,72,153,0.95), rgba(236,72,153,0))"
                    : "linear-gradient(to top, rgba(59,130,246,0.95), rgba(59,130,246,0))",
              }}
              initial={{ scaleY: 0.2, opacity: 0 }}
              animate={{ scaleY: [0.3, 1.35, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.95, ease: "easeOut", delay: (index % 6) * 0.04 }}
            />
          ))}

          {Array.from({ length: 58 }).map((_, index) => (
            <motion.span
              key={`dot-${index}`}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${-10 - Math.random() * 120}px`,
                width: `${2 + Math.random() * 6}px`,
                height: `${8 + Math.random() * 22}px`,
                borderRadius: Math.random() > 0.5 ? "999px" : "2px",
                background:
                  index % 2 === 0
                    ? "linear-gradient(120deg, #ec4899, #a855f7)"
                    : "linear-gradient(120deg, #3b82f6, #22d3ee)",
                boxShadow:
                  index % 2 === 0 ? "0 0 12px rgba(236,72,153,0.55)" : "0 0 12px rgba(59,130,246,0.55)",
              }}
              initial={{ y: -20, opacity: 0, rotate: 0, scale: 0.6 }}
              animate={{
                y: "120vh",
                x: `${(Math.random() - 0.5) * 120}px`,
                opacity: [0, 1, 1, 0],
                rotate: Math.random() > 0.5 ? 720 : -720,
                scale: [0.6, 1, 0.7],
              }}
              transition={{
                duration: 1.9 + Math.random() * 1.4,
                ease: "easeOut",
                delay: Math.random() * 0.45,
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
