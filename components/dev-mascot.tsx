"use client"

import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface DevMascotProps {
  darkMode: boolean
  reducedEffects?: boolean
}

const lines = [
  "Quest accepted: build something weird today.",
  "Tip: recruiters click Projects first.",
  "Combo bonus: Ctrl/Cmd + K opens Command Deck.",
  "Current aura: shipping fast, polishing hard.",
  "Hidden skill unlocked: clean UI with strong UX.",
]

export default function DevMascot({ darkMode, reducedEffects = false }: DevMascotProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showBubble, setShowBubble] = useState(false)
  const [path, setPath] = useState<Array<{ x: number; y: number }>>([])
  const size = 68
  const margin = 16

  const fallbackPoint = useMemo(() => ({ x: 16, y: 16 }), [])

  useEffect(() => {
    if (reducedEffects) {
      setPath([fallbackPoint])
      return
    }

    const buildPath = () => {
      const maxX = Math.max(32, window.innerWidth - size - margin)
      const maxY = Math.max(120, window.innerHeight - size - margin)
      const minY = 90

      const points = [
        { x: margin, y: minY + 20 },
        { x: maxX * 0.75, y: minY + 50 },
        { x: maxX, y: maxY * 0.45 },
        { x: maxX * 0.55, y: maxY },
        { x: margin + 12, y: maxY * 0.72 },
        { x: maxX * 0.35, y: minY },
        { x: margin, y: minY + 20 },
      ]

      setPath(points)
    }

    buildPath()
    window.addEventListener("resize", buildPath)
    return () => window.removeEventListener("resize", buildPath)
  }, [reducedEffects, fallbackPoint])

  const onClick = () => {
    setLineIndex((prev) => (prev + 1) % lines.length)
    setShowBubble(true)
    window.setTimeout(() => setShowBubble(false), 2200)
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] pointer-events-none"
      animate={
        reducedEffects || path.length === 0
          ? { x: fallbackPoint.x, y: fallbackPoint.y }
          : {
              x: path.map((point) => point.x),
              y: path.map((point) => point.y),
            }
      }
      transition={
        reducedEffects || path.length === 0
          ? { duration: 0.2 }
          : {
              duration: 28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
      }
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={lines[lineIndex]}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={`mb-3 max-w-[220px] rounded-2xl px-4 py-2 text-xs font-semibold shadow-xl border pointer-events-none ${
              darkMode
                ? "bg-slate-900/95 border-white/10 text-pink-200"
                : "bg-white/95 border-black/10 text-pink-700"
            }`}
          >
            {lines[lineIndex]}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.06, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        className="relative h-[4.25rem] w-[4.25rem] pointer-events-auto"
        aria-label="Anime companion"
      >
        <Image
          src="/girl.png"
          alt="Cute anime girl companion"
          fill
          sizes="68px"
          className="object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
          priority={false}
        />
      </motion.button>
    </motion.div>
  )
}
