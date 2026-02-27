"use client"

import { useEffect, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface CustomCursorProps {
  darkMode: boolean
}

export default function CustomCursor({ darkMode }: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // Smooth springs for trailing effect
  const springConfig = { damping: 20, stiffness: 200 }
  const springX = useSpring(0, springConfig)
  const springY = useSpring(0, springConfig)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      springX.set(e.clientX)
      springY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onMouseDown = () => setIsHovering(true)
    const onMouseUp = () => setIsHovering(false)

    // Check if user is hovering over interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mouseup", onMouseUp)
    window.addEventListener("mouseover", onOver)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mouseup", onMouseUp)
      window.removeEventListener("mouseover", onOver)
    }
  }, [isVisible, springX, springY])

  if (typeof window === "undefined" || !isVisible) return null

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{
          x: position.x - 5,
          y: position.y - 5,
          backgroundColor: darkMode ? "white" : "white",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Trailing Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border rounded-full pointer-events-none z-[100] transition-colors duration-300"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.3)",
          borderWidth: isHovering ? "2px" : "1px",
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.3 : 1,
        }}
      />
      
      {/* Pulse effect on hover */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[99] bg-pink-500/10 blur-md"
          style={{
            x: position.x - 24,
            y: position.y - 24,
          }}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.8 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      )}
    </>
  )
}
