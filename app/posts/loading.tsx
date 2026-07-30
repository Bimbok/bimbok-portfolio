"use client";

import { motion } from "framer-motion";
import { Sparkles, Aperture, Camera, Film, Layers } from "lucide-react";

export default function PostsLoading() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col items-center justify-center relative px-4 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-blue-500/15 blur-[90px] rounded-full pointer-events-none" />

      {/* Central Unique Animated Loader */}
      <div className="relative z-10 flex flex-col items-center text-center">
        
        {/* Futuristic Multi-Ring Aperture Spinner */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-8">
          
          {/* Outer Pulsing Glow Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-500/30 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.25)]"
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Outer Spinning Ring with Dashed Accent */}
          <motion.div
            className="absolute inset-2 sm:inset-3 rounded-full border-2 border-dashed border-gradient-to-r border-pink-500/50"
            animate={{ rotate: 360 }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Counter-rotating Cyan Tech Ring */}
          <motion.div
            className="absolute inset-5 sm:inset-6 rounded-full border-2 border-cyan-400/40 border-t-cyan-400 border-r-transparent"
            animate={{ rotate: -360 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner Fast Spinning Gradient Ring */}
          <motion.div
            className="absolute inset-8 sm:inset-10 rounded-full border-2 border-transparent border-t-pink-400 border-l-purple-400"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating Orbiting Nodes */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_12px_#ec4899]" />
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee]" />
          </motion.div>

          {/* Center Glowing Icon Matrix */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-background/80 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden group">
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-pink-500 dark:text-pink-400 flex items-center justify-center"
            >
              <Aperture className="w-8 h-8 sm:w-10 sm:h-10 text-primary drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
            </motion.div>
          </div>
        </div>

        {/* Loading Text & Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-3 max-w-sm"
        >
          {/* Futuristic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-white/5 border border-white/15 backdrop-blur-md shadow-lg text-xs font-mono tracking-widest uppercase text-muted-foreground">
            <motion.span
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"
            />
            <span>INITIALIZING CHRONICLES</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 animate-gradient-x">
            Decoding Visual Memories
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground font-light tracking-wide flex items-center justify-center gap-1.5">
            <span>Retrieving high-res snapshots & posts</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="font-bold text-pink-500"
            >
              ...
            </motion.span>
          </p>
        </motion.div>

        {/* Shimmering Progress Bar */}
        <div className="w-56 sm:w-72 h-1.5 bg-muted/40 rounded-full overflow-hidden mt-6 relative border border-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Bottom Feature Badges */}
        <div className="flex items-center justify-center gap-4 mt-8 opacity-60 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <Camera className="w-3.5 h-3.5 text-pink-400" /> GALLERY
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-purple-400" /> STORIES
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> RESUMES
          </span>
        </div>
      </div>
    </div>
  );
}
