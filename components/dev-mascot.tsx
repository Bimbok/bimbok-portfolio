"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface DevMascotProps {
  darkMode: boolean
}

const lines = [
  "Quest accepted: build something weird today.",
  "Tip: recruiters click Projects first.",
  "Combo bonus: Ctrl/Cmd + K opens Command Deck.",
  "Current aura: shipping fast, polishing hard.",
  "Hidden skill unlocked: clean UI with strong UX.",
]

export default function DevMascot({ darkMode }: DevMascotProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [showBubble, setShowBubble] = useState(false)

  const onClick = () => {
    setLineIndex((prev) => (prev + 1) % lines.length)
    setShowBubble(true)
    window.setTimeout(() => setShowBubble(false), 2200)
  }

  return (
    <div className="fixed right-5 bottom-6 z-[70]">
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={lines[lineIndex]}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={`mb-3 max-w-[240px] rounded-2xl px-4 py-2 text-xs font-semibold shadow-xl border ${
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
        drag
        dragConstraints={{ top: -120, left: -40, right: 40, bottom: 20 }}
        whileDrag={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Number.POSITIVE_INFINITY }}
        className={`relative h-14 w-14 rounded-full border shadow-lg ${
          darkMode
            ? "bg-gradient-to-br from-pink-500/90 to-purple-600/90 border-white/20"
            : "bg-gradient-to-br from-pink-400 to-purple-500 border-white/60"
        }`}
        aria-label="Interactive mascot"
      >
        <span className="absolute inset-0 m-auto block h-2 w-2 rounded-full bg-white/90 top-4 left-4" />
        <span className="absolute inset-0 m-auto block h-2 w-2 rounded-full bg-white/90 top-4 right-4" />
        <span className="absolute left-1/2 -translate-x-1/2 bottom-4 h-1.5 w-6 rounded-full bg-white/90" />
      </motion.button>
    </div>
  )
}
