"use client"

import { FormEvent, useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TerminalSquare } from "lucide-react"

interface CommandDeckProps {
  darkMode: boolean
  setDarkMode: (darkMode: boolean) => void
  onSurprise: () => void
}

const sections = ["home", "about", "skills", "projects", "contact"] as const
type SectionName = (typeof sections)[number]

const helpText = [
  "help - list commands",
  "home/about/skills/projects/contact - jump to section",
  "theme - toggle light/dark",
  "social - show links",
  "surprise - trigger party mode",
  "clear - clear console",
]

export default function CommandDeck({ darkMode, setDarkMode, onSurprise }: CommandDeckProps) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [log, setLog] = useState<string[]>([
    "BIMBOK COMMAND DECK ONLINE",
    'Type "help" and press Enter.',
  ])

  const panelStyle = useMemo(
    () =>
      darkMode
        ? "bg-slate-950/90 border-white/10 text-emerald-300"
        : "bg-white/90 border-black/10 text-emerald-700",
    [darkMode],
  )

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const scrollTo = (section: SectionName) => {
    const id = section === "home" ? "hero" : section
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const addLog = (line: string) => setLog((prev) => [...prev.slice(-8), line])

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase()
    addLog(`> ${raw}`)

    if (!command) {
      return
    }

    if (command === "help") {
      helpText.forEach((line) => addLog(line))
      return
    }

    if (command === "theme") {
      setDarkMode(!darkMode)
      addLog(`Theme switched to ${!darkMode ? "dark" : "light"}.`)
      return
    }

    if (command === "clear") {
      setLog(["Console cleared.", 'Type "help" to continue.'])
      return
    }

    if (command === "social") {
      addLog("github.com/Bimbok")
      addLog("linkedin.com/in/bratik-mukherjee-1067462a6")
      addLog("youtube.com/@hellohellothisibimbok")
      return
    }

    if (command === "surprise") {
      onSurprise()
      addLog("Party mode activated.")
      return
    }

    if (sections.includes(command as SectionName)) {
      scrollTo(command as SectionName)
      addLog(`Jumping to ${command}.`)
      return
    }

    addLog(`Unknown command: ${command}`)
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    runCommand(input)
    setInput("")
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-6 left-6 z-[70] px-4 py-2 rounded-full border backdrop-blur-xl text-xs font-bold tracking-wider ${
          darkMode ? "bg-black/50 border-white/20 text-emerald-300" : "bg-white/80 border-black/15 text-emerald-700"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          <TerminalSquare className="w-4 h-4" />
          COMMAND DECK
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-20 left-4 right-4 sm:left-6 sm:right-auto sm:w-[420px] z-[80] border rounded-2xl shadow-2xl backdrop-blur-2xl ${panelStyle}`}
          >
            <div className="px-4 py-3 border-b border-current/20 text-xs font-bold tracking-widest">
              MISSION TERMINAL
            </div>
            <div className="px-4 py-3 h-52 overflow-auto font-mono text-sm space-y-1">
              {log.map((line, index) => (
                <p key={`${line}-${index}`} className="break-words">
                  {line}
                </p>
              ))}
            </div>
            <form onSubmit={onSubmit} className="px-4 pb-4">
              <label htmlFor="command-input" className="sr-only">
                Command Input
              </label>
              <input
                id="command-input"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                autoFocus
                placeholder="Type a command..."
                className={`w-full rounded-xl border bg-transparent px-3 py-2 outline-none font-mono text-sm ${
                  darkMode
                    ? "border-white/15 placeholder:text-emerald-300/40"
                    : "border-black/15 placeholder:text-emerald-700/50"
                }`}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
