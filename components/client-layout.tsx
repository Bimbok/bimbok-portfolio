"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/navigation";
import ThemeToggle from "@/components/theme-toggle";
import dynamic from "next/dynamic";
import { ThemeProvider, useTheme } from "@/context/theme-context";
import { Toaster } from "@/components/ui/sonner";

const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false });
const SplashCursor = dynamic(() => import("@/components/splash-cursor"), { ssr: false });
const CommandDeck = dynamic(() => import("@/components/command-deck"), { ssr: false });
const DevMascot = dynamic(() => import("@/components/dev-mascot"), { ssr: false });

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { darkMode, setDarkMode, reducedEffects } = useTheme();
  const [partyMode, setPartyMode] = useState(false);

  const triggerPartyMode = () => {
    if (reducedEffects) return;
    setPartyMode(true);
    window.setTimeout(() => setPartyMode(false), 3200);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 relative ${
      darkMode ? "bg-slate-950" : "bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50"
    }`}>
      {!reducedEffects && (
        <SplashCursor
          SIM_RESOLUTION={96}
          DYE_RESOLUTION={900}
          CURL={4}
          SPLAT_RADIUS={0.22}
          SPLAT_FORCE={5600}
          COLOR_UPDATE_SPEED={8}
          RAINBOW_MODE={false}
          COLOR={darkMode ? "#A855F7" : "#EC4899"}
        />
      )}
      {!reducedEffects && <CustomCursor darkMode={darkMode} />}
      
      {/* Decorative Glows */}
      {darkMode && !reducedEffects && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <motion.div 
            className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"
            animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      <ParticleBackground darkMode={darkMode} reducedEffects={reducedEffects} />
      <Navigation darkMode={darkMode} />
      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <CommandDeck darkMode={darkMode} setDarkMode={setDarkMode} onSurprise={triggerPartyMode} />
      <DevMascot darkMode={darkMode} reducedEffects={reducedEffects} />

      {partyMode && (
        <div className="fixed inset-0 pointer-events-none z-[65]">
           <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.45, 0] }}
            transition={{ duration: 0.8 }}
            style={{
              background: "radial-gradient(circle at 50% 40%, rgba(236,72,153,0.35), rgba(59,130,246,0.2) 40%, transparent 68%)",
            }}
          />
        </div>
      )}

      {children}
      <Toaster position="top-center" />
    </div>
  );
}

import SmoothScroll from "@/components/smooth-scroll";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <LayoutContent>{children}</LayoutContent>
      </SmoothScroll>
    </ThemeProvider>
  );
}
