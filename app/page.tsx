"use client"

import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "@/components/hero"
import { useTheme } from "@/context/theme-context"

const About = dynamic(() => import("@/components/about"))
const Skills = dynamic(() => import("@/components/skills"))
const Projects = dynamic(() => import("@/components/projects"))
const Contact = dynamic(() => import("@/components/contact"))

export default function Home() {
  const { darkMode, reducedEffects } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <Hero darkMode={darkMode} reducedEffects={reducedEffects} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </motion.main>
    </AnimatePresence>
  )
}
