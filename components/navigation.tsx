"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef, useMemo } from "react"
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
  const [visualizerLevels, setVisualizerLevels] = useState<number[]>(Array.from({ length: 12 }, () => 0.3))
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const rafRef = useRef<number | null>(null)
  const visualizerEnergy = useMemo(
    () => visualizerLevels.reduce((sum, level) => sum + level, 0) / visualizerLevels.length,
    [visualizerLevels],
  )

  const buildWavePath = (amplitude: number, phase: number, lobes = 6) => {
    const points: string[] = []
    const cx = 64
    const cy = 64
    const baseRadius = 39
    const maxAmp = 16

    for (let degree = 0; degree <= 360; degree += 6) {
      const theta = (degree * Math.PI) / 180
      const wave = Math.sin(theta * lobes + phase) * amplitude * maxAmp
      const radius = baseRadius + wave
      const x = cx + Math.cos(theta) * radius
      const y = cy + Math.sin(theta) * radius
      points.push(`${degree === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`)
    }

    return `${points.join(" ")} Z`
  }

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

  useEffect(() => {
    const stopVisualizer = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
      setVisualizerLevels(Array.from({ length: 12 }, () => 0.3))
    }

    const startVisualizer = async () => {
      const audio = audioRef.current
      if (!audio) return

      const AudioContextCtor =
        window.AudioContext ||
        (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

      if (!AudioContextCtor) return

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContextCtor()
      }

      if (audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume()
      }

      if (!sourceRef.current) {
        sourceRef.current = audioContextRef.current.createMediaElementSource(audio)
      }

      if (!analyserRef.current) {
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        analyserRef.current.smoothingTimeConstant = 0.72
        sourceRef.current.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)
      }

      const analyser = analyserRef.current
      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const tick = () => {
        analyser.getByteFrequencyData(dataArray)
        const bins = 12
        const chunk = Math.floor(bufferLength / bins)
        const nextLevels = Array.from({ length: bins }, (_, index) => {
          let sum = 0
          for (let i = 0; i < chunk; i++) {
            sum += dataArray[index * chunk + i]
          }
          const average = chunk > 0 ? sum / chunk : 0
          const boosted = Math.pow(average / 255, 0.78) * 1.35
          return Math.max(0.24, Math.min(1, boosted))
        })
        setVisualizerLevels(nextLevels)
        rafRef.current = window.requestAnimationFrame(tick)
      }

      tick()
    }

    if (isPlaying) {
      void startVisualizer()
    } else {
      stopVisualizer()
    }

    return () => {
      stopVisualizer()
    }
  }, [isPlaying])

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

      {isPlaying && (
        <div
          className={`fixed top-24 right-4 md:right-6 z-[55] h-28 w-28 rounded-full border backdrop-blur-xl shadow-2xl ${
            darkMode ? "bg-black/45 border-white/15" : "bg-white/70 border-black/10"
          }`}
        >
          <svg viewBox="0 0 128 128" className="absolute inset-0">
            <defs>
              <linearGradient id="vizGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="52%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
              <filter id="vizGlow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="2.2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {[0, 0.12, 0.24, 0.36, 0.48, 0.6].map((offset, index) => (
              <path
                key={index}
                d={buildWavePath(
                  Math.min(1, visualizerEnergy * 1.25 + offset * 0.55),
                  index * 0.55 + visualizerEnergy * 6.2,
                )}
                fill="none"
                stroke="url(#vizGradient)"
                strokeWidth={index === 0 ? 2.8 : 1.4}
                strokeOpacity={index === 0 ? 0.95 : 0.42}
                filter={index < 2 ? "url(#vizGlow)" : undefined}
              />
            ))}

            <circle cx="64" cy="64" r="36" fill="rgba(2,6,23,0.88)" />
            <circle cx="64" cy="64" r="34" fill="none" stroke="url(#vizGradient)" strokeWidth="2.3" />
          </svg>
        </div>
      )}

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
