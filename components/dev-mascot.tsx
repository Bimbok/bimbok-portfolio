"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface DevMascotProps {
  darkMode: boolean;
  reducedEffects?: boolean;
}

const tapLines = [
  "Quest accepted: build something weird today.",
  "Tip: recruiters click Projects first.",
  "Combo bonus: Ctrl/Cmd + K opens Command Deck.",
  "Current aura: shipping fast, polishing hard.",
  "Hidden skill unlocked: clean UI with strong UX.",
];

const aboutLines = [
  "He is Bimbok, a full-stack developer from Kolkata.",
  "He builds expressive, accessible web experiences.",
  "Core stack: React, Next.js, Node.js, Python, MongoDB.",
  "He enjoys terminal workflows, Neovim, and clean UI systems.",
  "Currently pursuing B.Tech in Information Technology.",
  "Focused on building digital solutions that simplify real-world problems.",
  "Comfortable across C, C++, Java, and modern JavaScript ecosystems.",
  "Explores Linux deeply — from Arch setups to Hyprland customization.",
  "Believes great software should feel effortless to the end user.",
  "Loves turning complex system concepts into practical implementations.",
  "Hackathon enthusiast with an AI-first mindset.",
  "Always optimizing — code, workflow, and life.",
  "Main DPS energy in both Genshin and development.",
  "Driven by curiosity, consistency, and clean architecture.",
  "Lives in the terminal with zsh, Kitty, and a strict Gruvbox aesthetic.",
  "Creator of bimagic, streamlining git workflows with fzf automation.",
  "Built 'Sizuka', a custom programming language developed entirely from scratch in Java.",
  "Expanding his systems programming toolkit with Rust and Go.",
  "Developing 'Ping', a dedicated networking platform acting as a LinkedIn for gamers.",
  "Experimenting with computer vision and AI to build apps like moodReader.",
  "Built TUI-based music players and custom C++ file managers for fun.",
  "Codes in FiraCode Nerd Font and thrives in a highly customized Neovim environment.",
  "When not debugging, he's probably grinding Wuthering Waves or catching up on Jujutsu Kaisen.",
  "Hackathon veteran, building impactful, edge-case-tested projects like NyayaConnect.",
  "Architecting seamless real-time communication with apps like ChatFlow.",
  "Jamming to Suzume no Tojimari while compiling code.",
  "He uses Arch, btw — and meticulously configures every dotfile.",
  "Navigating the digital world through a highly customized Hyprland setup.",
  "Treats his Linux environment like an ongoing software development project.",
  "Swaps bloated desktop environments for the speed of Ghostty, Kitty, and Neovim.",
  "Believes in the Arch philosophy: building the system strictly from the ground up.",
  "His ideal workspace is just a Gruvbox-themed terminal running zsh and tmux.",
  "Finds peace in reading documentation and fixing broken dependencies.",
  "Customizing everything from the bootloader down to his FiraCode font ligatures.",
];
const TAP_BPM_STORAGE_KEY = "music-tap-bpm-v1";
const MUSIC_STATE_EVENT = "brand-song-state";
const MUSIC_BPM_EVENT = "brand-song-bpm";

export default function DevMascot({
  darkMode,
  reducedEffects = false,
}: DevMascotProps) {
  const [tapIndex, setTapIndex] = useState(0);
  const [bubbleText, setBubbleText] = useState(aboutLines[0]);
  const [showBubble, setShowBubble] = useState(false);
  const [path, setPath] = useState<Array<{ x: number; y: number }>>([]);
  const [lastTapAt, setLastTapAt] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicBpm, setMusicBpm] = useState<number | null>(null);
  const aboutIndexRef = useRef(0);
  const size = 68;
  const margin = 16;

  const fallbackPoint = useMemo(() => ({ x: 16, y: 16 }), []);

  useEffect(() => {
    const showAutoBubble = () => {
      if (Date.now() - lastTapAt < 3200) return;
      aboutIndexRef.current = (aboutIndexRef.current + 1) % aboutLines.length;
      setBubbleText(aboutLines[aboutIndexRef.current]);
      setShowBubble(true);
      window.setTimeout(() => setShowBubble(false), 3000);
    };

    const initialTimer = window.setTimeout(showAutoBubble, 1400);
    const intervalTimer = window.setInterval(showAutoBubble, 7400);

    return () => {
      window.clearTimeout(initialTimer);
      window.clearInterval(intervalTimer);
    };
  }, [lastTapAt]);

  useEffect(() => {
    const audio = document.getElementById("brand-song") as HTMLAudioElement | null;
    setIsMusicPlaying(Boolean(audio && !audio.paused));

    const storedBpm = window.localStorage.getItem(TAP_BPM_STORAGE_KEY);
    if (storedBpm) {
      const parsed = Number(storedBpm);
      setMusicBpm(Number.isFinite(parsed) ? parsed : null);
    }

    const onState = (event: Event) => {
      const payload = (event as CustomEvent<{ isPlaying?: boolean }>).detail;
      if (typeof payload?.isPlaying === "boolean") {
        setIsMusicPlaying(payload.isPlaying);
      }
    };

    const onBpm = (event: Event) => {
      const payload = (event as CustomEvent<{ bpm?: number | null }>).detail;
      if (typeof payload?.bpm === "number") {
        setMusicBpm(payload.bpm);
      } else if (payload?.bpm === null) {
        setMusicBpm(null);
      }
    };

    window.addEventListener(MUSIC_STATE_EVENT, onState as EventListener);
    window.addEventListener(MUSIC_BPM_EVENT, onBpm as EventListener);

    return () => {
      window.removeEventListener(MUSIC_STATE_EVENT, onState as EventListener);
      window.removeEventListener(MUSIC_BPM_EVENT, onBpm as EventListener);
    };
  }, []);

  useEffect(() => {
    if (reducedEffects) {
      setPath([fallbackPoint]);
      return;
    }

    const buildPath = () => {
      const maxX = Math.max(32, window.innerWidth - size - margin);
      const maxY = Math.max(120, window.innerHeight - size - margin);
      const minY = 90;

      const points = [
        { x: margin, y: minY + 20 },
        { x: maxX * 0.75, y: minY + 50 },
        { x: maxX, y: maxY * 0.45 },
        { x: maxX * 0.55, y: maxY },
        { x: margin + 12, y: maxY * 0.72 },
        { x: maxX * 0.35, y: minY },
        { x: margin, y: minY + 20 },
      ];

      setPath(points);
    };

    buildPath();
    window.addEventListener("resize", buildPath);
    return () => window.removeEventListener("resize", buildPath);
  }, [reducedEffects, fallbackPoint]);

  const onClick = () => {
    const nextIndex = (tapIndex + 1) % tapLines.length;
    setTapIndex(nextIndex);
    setBubbleText(tapLines[nextIndex]);
    setShowBubble(true);
    setLastTapAt(Date.now());
    window.setTimeout(() => setShowBubble(false), 2200);
  };

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] pointer-events-none"
      animate={
        reducedEffects || path.length === 0
          ? { x: fallbackPoint.x, y: fallbackPoint.y }
          : {
              x: path.map((point) => point.x),
              y: path.map((point) => point.y),
            }
      }
      transition={
        reducedEffects || path.length === 0
          ? { duration: 0.2 }
          : {
              duration: isMusicPlaying
                ? Math.max(8, ((path.length - 1) * 3 * 60) / (musicBpm ?? 124))
                : 28,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }
      }
    >
      <AnimatePresence>
        {showBubble && (
          <motion.div
            key={bubbleText}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className={`relative mb-3 max-w-[230px] rounded-2xl px-4 py-2 text-xs font-semibold shadow-xl border pointer-events-none ${
              darkMode
                ? "bg-slate-900/95 border-white/10 text-pink-200"
                : "bg-white/95 border-black/10 text-pink-700"
            }`}
          >
            {bubbleText}
            <span
              className={`absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-r border-b ${
                darkMode
                  ? "bg-slate-900 border-white/10"
                  : "bg-white border-black/10"
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onClick}
        animate={
          !reducedEffects && isMusicPlaying
            ? {
                rotate: [-4, 6, -4],
                y: [0, -6, 0],
                scale: [1, 1.08, 1],
              }
            : undefined
        }
        transition={
          !reducedEffects && isMusicPlaying
            ? {
                duration: (60 / (musicBpm ?? 124)) * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }
            : undefined
        }
        whileHover={{ scale: 1.06, rotate: -4 }}
        whileTap={{ scale: 0.94 }}
        className="relative h-[4.25rem] w-[4.25rem] pointer-events-auto"
        aria-label="Anime companion"
      >
        <Image
          src="/girl.png"
          alt="Cute anime girl companion"
          fill
          sizes="68px"
          className="object-contain drop-shadow-[0_10px_16px_rgba(0,0,0,0.35)]"
          priority={false}
        />
      </motion.button>
    </motion.div>
  );
}
