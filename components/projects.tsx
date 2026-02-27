"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Zap, Brain, Code, ArrowUpRight } from "lucide-react"
import { IconWrapper } from "./ui/icon-wrapper"

interface ProjectsProps {
  darkMode: boolean
}

const projects = [
  {
    id: 1,
    title: "Documentation Hub",
    description: "A very vast code storage app, with proper highlighting, brief description.",
    tech: ["MongoDB", "Mongoose", "Express.js", "Node.js"],
    github: "https://github.com/Bimbok/documentationHub",
    demo: "https://bimbokdocs.vercel.app/",
    icon: Brain,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Weather - Weathea",
    description: "A beautiful and feature-rich weather application. Built for simplicity.",
    tech: ["MongoDB", "Express.js", "Node.js", "Stripe"],
    github: "https://github.com/Bimbok/weatherApp",
    demo: "https://weathia.vercel.app/",
    icon: Code,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "Multi-room chat application with real-time messaging, file sharing, and user presence.",
    tech: ["Socket.IO", "Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/Bimbok/Now-Chat",
    demo: "https://now-chat-4e5c.onrender.com/",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "This anime-inspired portfolio website built with Next.js, featuring smooth animations.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "https://github.com/Bimbok/bimbok-portfolio",
    demo: "https://bimbok-portfolio.vercel.app/",
    icon: Code,
    gradient: "from-purple-500 to-indigo-500",
  },
]

export default function Projects({ darkMode }: ProjectsProps) {
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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <section id="projects" className="py-24 px-4 relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Proof of Concept
          </h2>

          <div
            className={`w-32 h-1.5 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full`}
          />

          <p className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto font-light leading-relaxed`}>
            Selected works that define my technical expertise and creative vision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-10"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 ${
                darkMode ? "hover:shadow-[0_0_40px_rgba(236,72,153,0.1)]" : "hover:shadow-[0_0_40px_rgba(236,72,153,0.05)]"
              }`}
            >
              {/* Card Background with Animated Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />
              
              <div
                className={`relative w-full h-full rounded-[2.4rem] p-8 md:p-10 backdrop-blur-2xl border transition-all duration-500 ${
                  darkMode 
                    ? "bg-slate-900/80 border-white/5 group-hover:bg-slate-900/40" 
                    : "bg-white/90 border-black/5 group-hover:bg-white/70 shadow-2xl shadow-black/5"
                }`}
              >
                <div className="flex justify-between items-start mb-8">
                  <IconWrapper 
                    icon={project.icon} 
                    gradient={`bg-gradient-to-r ${project.gradient}`} 
                    darkMode={darkMode} 
                  />
                  <div className="flex gap-3">
                    <motion.a 
                      href={project.github}
                      whileHover={{ y: -3 }}
                      className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
                    >
                      <Github className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`} />
                    </motion.a>
                    <motion.a 
                      href={project.demo}
                      whileHover={{ y: -3 }}
                      className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
                    >
                      <ExternalLink className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`} />
                    </motion.a>
                  </div>
                </div>

                <h3 className={`text-3xl font-black mb-4 ${darkMode ? "text-white" : "text-gray-900"} tracking-tight`}>
                  {project.title}
                </h3>

                <p className={`text-lg leading-relaxed mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"} font-light`}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${
                        darkMode 
                          ? "bg-white/5 border-white/10 text-gray-400" 
                          : "bg-black/5 border-black/5 text-gray-500"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-40 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                   <ArrowUpRight className={`w-10 h-10 ${darkMode ? "text-white" : "text-gray-900"}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
