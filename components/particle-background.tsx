"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ParticleBackgroundProps {
  darkMode: boolean
  reducedEffects?: boolean
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

export default function ParticleBackground({ darkMode, reducedEffects = false }: ParticleBackgroundProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = []
      const isMobile = window.matchMedia("(pointer: coarse)").matches
      const particleCount = reducedEffects ? 0 : isMobile ? 16 : 50
      const colors = darkMode
        ? ["#ec4899", "#a855f7", "#3b82f6", "#06b6d4"]
        : ["#f472b6", "#c084fc", "#60a5fa", "#34d399"]

      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 5,
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
  }, [darkMode, reducedEffects])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
          }}
          animate={{
            y: reducedEffects ? 0 : [0, -30, 0],
            x: reducedEffects ? 0 : [0, Math.random() * 20 - 10, 0],
            scale: reducedEffects ? 1 : [1, 1.2, 1],
            opacity: reducedEffects ? 0.2 : [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: reducedEffects ? 0 : Number.POSITIVE_INFINITY,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
