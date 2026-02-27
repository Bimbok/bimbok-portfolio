"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ChevronDown, Sparkles, Rocket, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

interface HeroProps {
  darkMode: boolean
}

export default function Hero({ darkMode }: HeroProps) {
  const [mounted, setMounted] = useState(false)
  
  // Mouse tracking for 3D tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  useEffect(() => {
    setMounted(true)
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      x.set((e.clientX / innerWidth) - 0.5)
      y.set((e.clientY / innerHeight) - 0.5)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [x, y])

  if (!mounted) return null

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden perspective-1000">
      {/* Dynamic Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[10%] left-[15%] w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-purple-500/20 rounded-full blur-[100px]"
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Floating 3D Icons */}
      <motion.div
        className="absolute top-1/4 right-[10%] opacity-20 hidden lg:block"
        animate={{ y: [0, -30, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Rocket className={`w-20 h-20 ${darkMode ? "text-pink-400" : "text-pink-600"}`} />
      </motion.div>

      <div className="text-center z-10 px-4">
        <motion.div
          style={{ rotateX, rotateY }}
          className="transition-transform duration-200"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
             <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md border ${
                darkMode ? "bg-white/5 border-white/10 text-pink-300" : "bg-white border-black/5 text-pink-600 shadow-md"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold tracking-widest uppercase">Digital Architect</span>
            </motion.div>

            <h1
              className={`text-7xl md:text-9xl font-black mb-6 tracking-tighter`}
            >
              <span className={darkMode ? "text-white" : "text-gray-900"}>I'm </span>
              <span className={`bg-gradient-to-r ${
                darkMode ? "from-pink-400 via-purple-400 to-blue-400" : "from-pink-600 via-purple-600 to-blue-600"
              } bg-clip-text text-transparent animate-gradient-x`}>
                Bimbok
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className={`text-xl md:text-2xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto leading-relaxed font-light`}
            >
              Crafting immersive digital experiences with <span className="font-bold text-pink-500">MERN</span> & <span className="font-bold text-purple-500">Python</span>. 
              Bridging the gap between complexity and elegance.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 rounded-full font-bold overflow-hidden"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
              <span className="relative flex items-center gap-2 text-white">
                EXPLORE PROJECTS <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-10 py-5 rounded-full font-bold border-2 transition-all duration-300 ${
                darkMode
                  ? "border-white/10 text-white hover:bg-white/10"
                  : "border-black/5 text-gray-800 hover:bg-black/5"
              }`}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              SAY HELLO
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
          Scroll Down
        </span>
        <div className={`w-[1px] h-12 bg-gradient-to-b ${darkMode ? "from-pink-500 to-transparent" : "from-pink-400 to-transparent"}`} />
      </motion.div>
    </section>
  )
}
