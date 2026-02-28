"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Layout, Server, FileCode, Cpu, Coffee, Database, Globe, Zap, Terminal, Layers } from "lucide-react"
import { IconWrapper } from "./ui/icon-wrapper"

interface SkillsProps {
  darkMode: boolean
}

const skills = [
  { name: "React.js", level: 90, color: "from-blue-400 to-cyan-400", icon: Layout },
  { name: "Node.js", level: 85, color: "from-green-400 to-emerald-400", icon: Server },
  { name: "Python", level: 88, color: "from-yellow-400 to-orange-400", icon: FileCode },
  { name: "JavaScript/TypeScript", level: 92, color: "from-purple-400 to-pink-400", icon: Cpu },
  { name: "Java", level: 80, color: "from-red-400 to-rose-400", icon: Coffee },
  { name: "MongoDB", level: 75, color: "from-green-500 to-teal-400", icon: Database },
  { name: "Flask", level: 82, color: "from-gray-400 to-slate-400", icon: Globe },
  { name: "Socket.IO", level: 78, color: "from-indigo-400 to-purple-400", icon: Zap },
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
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <section id="skills" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-6xl font-black leading-[1.12] pb-2 mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 via-purple-400 to-blue-400" : "from-pink-600 via-purple-600 to-blue-600"
            } bg-clip-text text-transparent`}
          >
            Powering My Craft
          </h2>

          <div
            className={`w-32 h-1.5 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full`}
          />

          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto font-light`}>
            A versatile arsenal of technologies used to build scalable and intuitive digital experiences.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className={`p-6 rounded-[2rem] backdrop-blur-xl border transition-all duration-500 ${
                darkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/70 border-white/20 hover:bg-white/90 shadow-xl shadow-purple-500/5"
              } group overflow-hidden relative`}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient hint */}
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity rounded-full blur-3xl`} />

              <div className="flex flex-col items-center text-center">
                <IconWrapper 
                  icon={skill.icon} 
                  gradient={`bg-gradient-to-r ${skill.color}`} 
                  darkMode={darkMode} 
                  className="mb-6"
                />
                
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {skill.name}
                </h3>

                <div className={`w-full h-2 rounded-full ${darkMode ? "bg-white/10" : "bg-black/5"} overflow-hidden mb-2`}>
                  <motion.div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "circOut" }}
                  />
                </div>
                
                <span className={`text-sm font-bold tracking-tighter ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                  {skill.level}% MASTERY
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <div
            className={`p-10 rounded-[3rem] backdrop-blur-2xl border relative overflow-hidden ${
              darkMode
                ? "bg-gradient-to-br from-white/5 to-transparent border-white/10"
                : "bg-gradient-to-br from-white/80 to-purple-50/50 border-white shadow-2xl"
            }`}
          >
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500/5 via-transparent to-blue-500/5 pointer-events-none" />
             
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <IconWrapper icon={Terminal} gradient="from-gray-600 to-black" darkMode={darkMode} />
                <div>
                  <h3 className={`text-2xl font-black mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
                    Advanced Dev Environment
                  </h3>
                  <p className={`text-lg ${darkMode ? "text-gray-400" : "text-gray-600"} font-light leading-relaxed`}>
                    Power-user setup with <span className="text-pink-500 font-bold">Neovim (LazyVim)</span>, 
                    <span className="text-purple-500 font-bold"> WSL Ubuntu</span>, and 
                    <span className="text-blue-500 font-bold"> Arch Linux</span>. Engineered for maximum velocity and pixel-perfect precision.
                  </p>
                </div>
                <div className="flex gap-4">
                    <Layers className={`w-12 h-12 opacity-10 ${darkMode ? "text-white" : "text-black"}`} />
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
