"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  darkMode: boolean
}

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation({ darkMode }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = navItems.map((item) => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const toggleBrandSong = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
      return
    }

    try {
      await audio.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio
        id="brand-song"
        ref={audioRef}
        src="/Suzume_No_Tojimari.mp3"
        loop
        preload="metadata"
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Floating Navigation */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto px-6 py-3 rounded-full backdrop-blur-xl border transition-all duration-500 ${
            darkMode 
              ? `bg-black/40 border-white/10 ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.5)]" : ""}` 
              : `bg-white/60 border-white/40 ${scrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.1)]" : ""}`
          }`}
        >
          <div className="flex items-center gap-2 md:gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`text-xl font-black bg-gradient-to-r ${
                darkMode ? "from-pink-400 to-purple-400" : "from-pink-600 to-purple-600"
              } bg-clip-text text-transparent cursor-pointer hidden sm:block mr-4`}
              onClick={() => {
                scrollToSection("#hero")
                void toggleBrandSong()
              }}
            >
              BIMBOK
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-5 py-2 rounded-full transition-all duration-500 text-sm font-bold tracking-tight ${
                    activeSection === item.href.substring(1)
                      ? darkMode ? "text-white" : "text-black"
                      : darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute inset-0 rounded-full ${
                        darkMode ? "bg-white/10" : "bg-black/5"
                      }`}
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Nav Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-full ${
                darkMode ? "text-white bg-white/5" : "text-gray-800 bg-black/5"
              }`}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </motion.nav>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 z-[60] backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 ${
              darkMode ? "bg-black/90" : "bg-white/95"
            }`}
          >
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              onClick={() => setIsOpen(false)}
              className={`absolute top-10 right-10 p-4 rounded-full ${
                darkMode ? "bg-white/10 text-white" : "bg-black/5 text-black"
              }`}
            >
              <X className="w-8 h-8" />
            </motion.button>

            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`text-5xl font-black tracking-tighter ${
                  activeSection === item.href.substring(1)
                    ? darkMode ? "text-pink-400" : "text-pink-600"
                    : darkMode ? "text-white/40 hover:text-white" : "text-black/30 hover:text-black"
                }`}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
