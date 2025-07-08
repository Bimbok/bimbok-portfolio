"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Github, Zap, Brain, Code } from "lucide-react"

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
    description: "A beautiful and feature-rich weather application. ",
    tech: ["MongoDB", "Express.js", "Node.js", "Stripe"],
    github: "https://github.com/Bimbok/weatherApp",
    demo: "https://weathia.vercel.app/",
    icon: Code,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 3,
    title: "Real-time Chat Application",
    description: "Multi-room chat application with real-time messaging, file sharing, and user presence indicators.",
    tech: ["Socket.IO", "Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/Bimbok/Now-Chat",
    demo: "https://now-chat-4e5c.onrender.com/",
    icon: Zap,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "This anime-inspired portfolio website built with Next.js, featuring smooth animations and responsive design.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "#",
    demo: "#",
    icon: Code,
    gradient: "from-purple-500 to-indigo-500",
  },
]

export default function Projects({ darkMode }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

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
    <section id="projects" className="py-20 px-4" ref={ref}>
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
            Featured Projects
          </h2>

          <div
            className={`w-24 h-1 mx-auto mb-8 bg-gradient-to-r ${
              darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
            } rounded-full`}
          />

          <p className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto`}>
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project) => {
            const IconComponent = project.icon
            const isFlipped = flippedCard === project.id

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="relative h-72 sm:h-80 perspective-1000"
                onMouseEnter={() => setFlippedCard(project.id)}
                onMouseLeave={() => setFlippedCard(null)}
              >
                <motion.div
                  className="relative w-full h-full transition-transform duration-700 transform-style-preserve-3d"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                >
                  {/* Front of card */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl p-4 sm:p-6 backdrop-blur-sm border ${
                      darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
                    } shadow-xl flex flex-col`}
                  >
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-4 sm:mb-6 flex-shrink-0`}
                    >
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${darkMode ? "text-white" : "text-gray-800"} flex-shrink-0`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"} flex-grow mb-4`}
                    >
                      {project.description}
                    </p>

                    <div className="flex-shrink-0 mt-auto">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {project.tech.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                              darkMode ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span
                            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium ${
                              darkMode ? "bg-white/10 text-gray-300" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl p-6 backdrop-blur-sm border ${
                      darkMode ? "bg-white/5 border-white/10" : "bg-white/70 border-white/20"
                    } shadow-xl rotate-y-180 flex flex-col justify-center items-center text-center`}
                  >
                    <h3 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-800"}`}>
                      Technologies Used
                    </h3>

                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            darkMode
                              ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30"
                              : "bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 border border-pink-200"
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                          darkMode
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </motion.a>

                      <motion.a
                        href={project.demo}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r ${project.gradient} text-white transition-all duration-300 hover:shadow-lg`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
