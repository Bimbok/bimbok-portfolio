"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Trophy,
  Code,
  Heart,
  Gamepad2,
  FileCode2,
  Sparkles,
  Rocket,
  Brain,
  Award,
} from "lucide-react";
import { IconWrapper } from "./ui/icon-wrapper";

interface AboutProps {
  darkMode: boolean;
}

export default function About({ darkMode }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-24 px-4 relative overflow-hidden"
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-500 text-sm font-semibold mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Curiosity-Driven Developer</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className={`text-5xl md:text-7xl font-bold leading-[1.12] pb-2 mb-6 bg-gradient-to-r ${
              darkMode
                ? "from-white via-pink-400 to-purple-400"
                : "from-gray-900 via-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            The Story Behind
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className={`w-32 h-1.5 mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.5)]`}
          />
        </motion.div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-6 gap-4"
        >
          {/* Main Story Card - Large */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-4 p-10 rounded-[2.5rem] backdrop-blur-xl border relative overflow-hidden group transition-all duration-500 ${
              darkMode
                ? "bg-white/5 border-white/10 hover:bg-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                : "bg-white/70 border-white/20 hover:bg-white/90 shadow-2xl shadow-purple-500/5"
            }`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Rocket className="w-24 h-24" />
            </div>

            <h3
              className={`text-3xl font-bold mb-6 flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Hi, I'm Bimbok! 👋
              <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            </h3>
            <p
              className={`text-xl leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"} font-light`}
            >
              I'm Bratik Mukherjee, currently pursuing my B.Tech in Information
              Technology at Techno Main Saltlake (TMSL). My journey is fueled by
              a passion for creating digital solutions that are not only
              powerful but also **exceptionally accessible** to people who might
              find tech intimidating.
            </p>
            <div className="mt-8 flex gap-3">
              <div className="h-1 w-20 bg-pink-500 rounded-full" />
              <div className="h-1 w-10 bg-purple-500 rounded-full" />
              <div className="h-1 w-5 bg-blue-500 rounded-full" />
            </div>
          </motion.div>

          {/* Icon Card - Full Stack */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-2 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center backdrop-blur-xl border transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-br from-pink-500/20 via-purple-500/10 to-transparent border-pink-500/30"
                : "bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200"
            }`}
          >
            <IconWrapper
              icon={Code}
              gradient="from-pink-500 to-purple-500"
              darkMode={darkMode}
              className="mb-6"
            />
            <h4
              className={`font-bold text-2xl mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
            >
              Full Stack
            </h4>
            <p
              className={`text-base ${darkMode ? "text-gray-300" : "text-gray-600"}`}
            >
              MERN, Python, Flask
            </p>
          </motion.div>

          {/* Small Feature - Dream */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-3 p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${
              darkMode
                ? "bg-white/5 border-white/10 hover:border-purple-500/50"
                : "bg-white/70 border-white/20 hover:border-purple-500/30 shadow-xl"
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              <IconWrapper
                icon={Brain}
                gradient="from-purple-500 to-blue-500"
                darkMode={darkMode}
              />
              <h3
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                My Vision 🌟
              </h3>
            </div>
            <p
              className={`text-lg leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              I believe technology should be a bridge, not a barrier. My goal is
              to build platforms that make complexity feel invisible.
            </p>
          </motion.div>

          {/* Gaming/Hobbies */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-3 grid grid-cols-2 gap-4`}
          >
            <div
              className={`p-6 rounded-[2rem] border backdrop-blur-md flex flex-col items-center justify-center ${
                darkMode
                  ? "bg-blue-500/10 border-blue-500/20"
                  : "bg-blue-50 border-blue-100 shadow-lg shadow-blue-500/5"
              }`}
            >
              <IconWrapper
                icon={Gamepad2}
                gradient="from-blue-500 to-cyan-500"
                darkMode={darkMode}
                className="mb-4"
              />
              <h4
                className={`font-bold text-center ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Gamer
              </h4>
            </div>
            <div
              className={`p-6 rounded-[2rem] border backdrop-blur-md flex flex-col items-center justify-center ${
                darkMode
                  ? "bg-green-500/10 border-green-500/20"
                  : "bg-green-50 border-green-100 shadow-lg shadow-green-500/5"
              }`}
            >
              <IconWrapper
                icon={Heart}
                gradient="from-green-400 to-emerald-600"
                darkMode={darkMode}
                className="mb-4"
              />
              <h4
                className={`font-bold text-center ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Linux Fan
              </h4>
            </div>
          </motion.div>

          {/* Coding Languages - Full Width Bottom */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-6 p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 flex flex-col md:flex-row items-center gap-8 ${
              darkMode
                ? "bg-gradient-to-r from-transparent via-white/5 to-transparent border-white/5"
                : "bg-gradient-to-r from-transparent via-white/50 to-transparent border-white/10"
            }`}
          >
            <div className="flex-shrink-0">
              <IconWrapper
                icon={FileCode2}
                gradient="from-orange-500 to-red-500"
                darkMode={darkMode}
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h4
                className={`font-bold text-xl mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Languages
              </h4>
              <p
                className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                C, C++, Go, JAVA, Javascript, TypeScript, Python, Kotlin
              </p>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${darkMode ? "bg-white/20" : "bg-black/10"}`}
                />
              ))}
            </div>
          </motion.div>
          {/* Competitive Programming Card */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-3 p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-transparent border-yellow-500/20 hover:border-yellow-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.1)]"
                : "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:border-yellow-400 shadow-xl shadow-amber-500/5"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <IconWrapper
                icon={Trophy}
                gradient="from-yellow-400 to-amber-600"
                darkMode={darkMode}
              />
              <h3
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Problem Solver
              </h3>
            </div>

            <div
              className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              <div
                className={`flex justify-between items-center p-4 rounded-2xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-yellow-100"}`}
              >
                <span className="font-semibold flex items-center gap-2">
                  CodeChef
                </span>
                <span className="text-amber-500 font-mono font-bold">
                  Max 1309
                </span>
              </div>

              <div
                className={`flex justify-between items-center p-4 rounded-2xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-yellow-100"}`}
              >
                <span className="font-semibold flex items-center gap-2">
                  Codeforces
                </span>
                <span className="text-blue-500 font-mono font-bold">
                  Max 1067
                </span>
              </div>

              <p className="text-sm pt-2 opacity-80 leading-relaxed pl-1 font-light">
                Actively sharpening my DSA skills. Also competed in global
                contests like{" "}
                <strong className={darkMode ? "text-white" : "text-gray-900"}>
                  TCS CodeVita Season 13
                </strong>
                .
              </p>
            </div>
          </motion.div>
          {/* Hackathons & Events Card */}
          <motion.div
            variants={itemVariants}
            className={`md:col-span-3 p-8 rounded-[2.5rem] backdrop-blur-xl border transition-all duration-500 ${
              darkMode
                ? "bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border-purple-500/20 hover:border-purple-500/40 shadow-[0_10px_30px_rgba(168,85,247,0.1)]"
                : "bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-400 shadow-xl shadow-purple-500/5"
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <IconWrapper
                icon={Award}
                gradient="from-purple-400 to-pink-600"
                darkMode={darkMode}
              />
              <h3
                className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}
              >
                Hackathons & Events
              </h3>
            </div>

            <div
              className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              <div
                className={`flex flex-col p-4 rounded-2xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-purple-100"}`}
              >
                <span className="font-semibold mb-1 text-pink-500">
                  AI for Bharat '26
                </span>
                <span className="text-sm opacity-90 font-light">
                  Shortlisted for the prototype development phase.
                </span>
              </div>

              <div
                className={`flex flex-col p-4 rounded-2xl border ${darkMode ? "bg-white/5 border-white/10" : "bg-white/60 border-purple-100"}`}
              >
                <span className="font-semibold mb-1 text-purple-500">
                  Smart India Hackathon '24
                </span>
                <span className="text-sm opacity-90 font-light">
                  Collaborated on full-stack project repositories.
                </span>
              </div>

              <p className="text-sm pt-2 opacity-80 leading-relaxed pl-1 font-light">
                Active in the local tech scene, including{" "}
                <strong className={darkMode ? "text-white" : "text-gray-900"}>
                  Cloud Community Days Kolkata
                </strong>
                .
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
