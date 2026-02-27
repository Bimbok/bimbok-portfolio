"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconWrapperProps {
  icon: LucideIcon
  className?: string
  iconClassName?: string
  gradient?: string
  darkMode: boolean
  animate?: boolean
}

export function IconWrapper({
  icon: Icon,
  className,
  iconClassName,
  gradient = "from-pink-500 to-purple-500",
  darkMode,
  animate = true,
}: IconWrapperProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Outer Glow */}
      <motion.div
        className={cn(
          "absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 bg-gradient-to-r",
          gradient
        )}
        animate={
          animate
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }
            : {}
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main Container */}
      <motion.div
        className={cn(
          "relative flex items-center justify-center w-14 h-14 rounded-2xl border backdrop-blur-md transition-all duration-500 overflow-hidden",
          darkMode
            ? "bg-white/10 border-white/20 group-hover:bg-white/20 group-hover:border-white/30"
            : "bg-white/60 border-black/5 group-hover:bg-white/80 group-hover:border-black/10 shadow-lg"
        )}
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Subtle Inner Gradient */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br",
            gradient
          )}
        />

        {/* Icon with colored shadow */}
        <Icon
          className={cn(
            "w-7 h-7 transition-all duration-500 z-10",
            darkMode ? "text-white" : "text-gray-800",
            "group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]",
            iconClassName
          )}
        />
        
        {/* Animated accent dot */}
        <motion.div 
          className={cn(
            "absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r",
            gradient
          )}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}
