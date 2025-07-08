"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface SkillsProps {
  darkMode: boolean
}

const skills = [
  { name: "React.js", level: 90, color: "from-blue-400 to-cyan-400" },
  { name: "Node.js", level: 85, color: "from-green-400 to-emerald-400" },
  { name: "Python", level: 88, color: "from-yellow-400 to-orange-400" },
  { name: "JavaScript/TypeScript", level: 92, color: "from-purple-400 to-pink-400" },
  { name: "Java", level: 80, color: "from-red-400 to-rose-400" },
  { name: "MongoDB", level: 75, color: "from-green-500 to-teal-400" },
  { name: "Flask", level: 82, color: "from-gray-400 to-slate-400" },
  { name: "Socket.IO", level: 78, color: "from-indigo-400 to-purple-400" },
]

export default function Skills({ darkMode }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="skills" className="py-20 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Skills & Technologies
          </h2>

          <div
            className={`w-24 h-1 mx-auto mb-8 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } rounded-full`}
          />

          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className={`p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/70 border-white/20 hover:bg-white/90"
              } shadow-xl hover:shadow-2xl group`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{skill.name}</h3>
                <span className={`text-lg font-semibold ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {skill.level}%
                </span>
              </div>

              <div className={`w-full h-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"} overflow-hidden`}>
                <motion.div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/30 rounded-full"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                      delay: index * 0.2,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div
            className={`p-8 rounded-3xl backdrop-blur-sm border ${
              darkMode
                ? "bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-500/20"
                : "bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200"
            } shadow-xl`}
          >
            <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
              Development Environment
            </h3>
            <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Neovim with LazyVim • WSL Ubuntu • Arch Linux via Termux • Custom Linux setups for optimal productivity
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
