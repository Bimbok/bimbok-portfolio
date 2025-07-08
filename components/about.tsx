"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Heart, Gamepad2, Users, FileCode2 } from "lucide-react"

interface AboutProps {
  darkMode: boolean
}

export default function About({ darkMode }: AboutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            About Me
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className={`w-24 h-1 mx-auto mb-8 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } rounded-full`}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/70 border-white/20 hover:bg-white/90"
              } shadow-xl hover:shadow-2xl`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                Hi, I'm Bimbok! 👋
              </h3>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                I'm Bratik Mukherjee currently pursuing B.Tech in Information Technology at Techno Main Saltlake (TMSL). I have a strong
                passion for creating digital solutions that are not only powerful but also accessible to people with
                limited technical knowledge.
              </p>
            </motion.div>

            <motion.div
              className={`p-8 rounded-3xl backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/70 border-white/20 hover:bg-white/90"
              } shadow-xl hover:shadow-2xl`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>My Dream 🌟</h3>
              <p className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                My dream is to build apps and platforms that make tech easy for everyone. I believe technology should be
                a bridge, not a barrier.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-6"
          >
            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl text-center backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-pink-500/20 to-purple-500/20 border-pink-500/30"
                  : "bg-gradient-to-br from-pink-100 to-purple-100 border-pink-200"
              } hover:scale-105`}
              whileHover={{ y: -5 }}
            >
              <Code className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-pink-400" : "text-pink-600"}`} />
              <h4 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Full Stack Dev</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>MERN Stack, Python, Flask</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl text-center backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-purple-500/20 to-blue-500/20 border-purple-500/30"
                  : "bg-gradient-to-br from-purple-100 to-blue-100 border-purple-200"
              } hover:scale-105`}
              whileHover={{ y: -5 }}
            >
              <Heart className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
              <h4 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Tech Enthusiast</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Neovim, Linux, Customization</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl text-center backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-blue-500/20 to-green-500/20 border-blue-500/30"
                  : "bg-gradient-to-br from-blue-100 to-green-100 border-blue-200"
              } hover:scale-105`}
              whileHover={{ y: -5 }}
            >
              <Gamepad2 className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <h4 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Quest Seeker</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>COD Mobile, Genshin Impact</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className={`p-6 rounded-2xl text-center backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-green-500/20 to-pink-500/20 border-green-500/30"
                  : "bg-gradient-to-br from-green-100 to-pink-100 border-green-200"
              } hover:scale-105`}
              whileHover={{ y: -5 }}
            >
              <FileCode2 className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-green-400" : "text-green-600"}`} />
              <h4 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>Coding Tongues</h4>
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              C, C++, JAVA, Javascript, Python, Kotlin
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
