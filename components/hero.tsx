"use client"

import { motion } from "framer-motion"
import { ChevronDown, Sparkles } from "lucide-react"

interface HeroProps {
  darkMode: boolean
}

export default function Hero({ darkMode }: HeroProps) {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-4 h-4 bg-pink-400 rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full opacity-40"
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-32 left-32 w-3 h-3 bg-blue-400 rounded-full opacity-50"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <motion.h1
            className={`text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r ${
              darkMode ? "from-pink-400 via-purple-400 to-blue-400" : "from-pink-600 via-purple-600 to-blue-600"
            } bg-clip-text text-transparent`}
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            Bimbok
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <Sparkles className={`w-6 h-6 ${darkMode ? "text-pink-400" : "text-pink-600"}`} />
            <p className={`text-xl md:text-2xl ${darkMode ? "text-gray-300" : "text-gray-700"} font-light`}>
              Full Stack Developer & Digital Creator
            </p>
            <Sparkles className={`w-6 h-6 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className={`text-lg md:text-xl ${
              darkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto leading-relaxed`}
          >
            Building digital solutions that make technology accessible to everyone, one line of code at a time ✨
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25"
                : "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25"
            } hover:shadow-xl hover:shadow-pink-500/40`}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-semibold border-2 transition-all duration-300 ${
              darkMode
                ? "border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
                : "border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
            }`}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <ChevronDown className={`w-8 h-8 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
      </motion.div>
    </section>
  )
}
