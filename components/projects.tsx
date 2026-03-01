"use client";

import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import {
  ExternalLink,
  Github,
  Zap,
  Brain,
  Code,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { IconWrapper } from "./ui/icon-wrapper";

interface ProjectsProps {
  darkMode: boolean;
}

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  architecture: string;
  challenge: string;
  impact: string;
  tech: string[];
  github: string;
  demo: string | null;
  icon: typeof Brain;
  gradient: string;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    title: "AlgoScope",
    description:
      "Interactive algorithm visualizer for sorting and searching concepts with step-by-step animations for learners and developers.",
    architecture:
      "React state engine coordinated with D3 visual layers for deterministic algorithm playback.",
    challenge:
      "Synchronizing algorithm steps with fluid animations without desync or visual jitter.",
    impact:
      "Made core algorithm concepts easier to understand for students and new developers.",
    tech: ["React", "Tailwind CSS", "D3.js"],
    github: "https://github.com/orion-kernel/AlgoScope.git",
    demo: "https://algo-scope-virid.vercel.app/",
    icon: Brain,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "bimagic",
    description:
      "Bash-based Git workflow automation tool with an interactive menu for commit, branch, remote, and GitHub PAT-driven operations.",
    architecture:
      "Menu-driven Bash command orchestrator wrapping standard Git operations into guided flows.",
    challenge:
      "Designing safe defaults for destructive Git actions while keeping the UX fast.",
    impact:
      "Reduced command overhead for repetitive Git workflows and improved terminal productivity.",
    tech: ["Bash", "Git", "GitHub CLI"],
    github: "https://github.com/orion-kernel/bimagic.git",
    demo: null,
    icon: Zap,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    title: "Ping",
    description:
      "A modern real-time communication platform built with React, Express, MongoDB, and Socket.IO.",
    architecture:
      "Full-stack real-time architecture using React + Vite frontend and Express + Socket.IO backend with JWT auth.",
    challenge:
      "Maintaining reliable room-based live communication with secure authentication and smooth UX.",
    impact:
      "Delivered a polished communication experience with scalable realtime messaging.",
    tech: ["React", "Express", "MongoDB", "Socket.IO", "JWT", "Tailwind CSS"],
    github: "https://github.com/aasaan-hainn/Ping.git",
    demo: "https://ping-murex.vercel.app/",
    icon: Zap,
    gradient: "from-sky-500 to-indigo-500",
  },
  {
    id: 4,
    title: "fyzenor",
    description:
      "Lightweight terminal file manager built in modern C++17 with fast navigation and asynchronous media preview support.",
    architecture:
      "C++17 core loop with efficient file-indexing and async preview rendering pipeline.",
    challenge:
      "Combining terminal speed with responsive media previews and Vim-like controls.",
    impact:
      "Delivered a snappy terminal-first file management experience for power users.",
    tech: ["C++17", "Terminal UI"],
    github: "https://github.com/Bimbok/fyzenor.git",
    demo: null,
    icon: Code,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 5,
    title: "Documentation Hub",
    description:
      "A very vast code storage app, with proper highlighting, brief description.",
    architecture:
      "MERN architecture with modular API routes and structured document models for scalable snippets.",
    challenge:
      "Maintaining readable syntax blocks with metadata while keeping retrieval fast for large collections.",
    impact:
      "Improved code lookup and reuse workflow through centralized snippet organization.",
    tech: ["MongoDB", "Mongoose", "Express.js", "Node.js"],
    github: "https://github.com/Bimbok/documentationHub",
    demo: "https://bimbokdocs.vercel.app/",
    icon: Brain,
    gradient: "from-blue-500 to-purple-500",
  },
  {
    id: 6,
    title: "Weather - Weathea",
    description:
      "A beautiful and feature-rich weather application. Built for simplicity.",
    architecture:
      "API-driven weather client with isolated data adapters and responsive UI components.",
    challenge:
      "Handling location-based fetches and weather-state transitions cleanly across devices.",
    impact:
      "Delivered a quick and intuitive weather experience with polished UI interactions.",
    tech: ["MongoDB", "Express.js", "Node.js", "Stripe"],
    github: "https://github.com/Bimbok/weatherApp",
    demo: "https://weathia.vercel.app/",
    icon: Code,
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: 7,
    title: "Real-time Chat Application",
    description:
      "Multi-room chat application with real-time messaging, file sharing, and user presence.",
    architecture:
      "Socket.IO event pipeline with room segmentation and persistent message storage.",
    challenge:
      "Keeping room state, presence, and delivery consistency stable in multi-user scenarios.",
    impact:
      "Enabled low-latency collaborative chat with practical room-level communication.",
    tech: ["Socket.IO", "Node.js", "Express", "MongoDB", "React"],
    github: "https://github.com/Bimbok/Now-Chat",
    demo: "https://now-chat-4e5c.onrender.com/",
    icon: Code,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description:
      "This anime-inspired portfolio website built with Next.js, featuring smooth animations.",
    architecture:
      "Next.js App Router with modular component sections and animation-driven interaction layers.",
    challenge:
      "Balancing heavy motion aesthetics with responsiveness and low-end device performance.",
    impact:
      "Created a memorable personal brand experience with strong interactivity and polish.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    github: "https://github.com/Bimbok/bimbok-portfolio",
    demo: "https://bimbok-portfolio.vercel.app/",
    icon: Code,
    gradient: "from-purple-500 to-indigo-500",
  },
];

function ProjectCard({
  project,
  darkMode,
  variants,
}: {
  project: ProjectItem;
  darkMode: boolean;
  variants: Variants;
}) {
  const [flipped, setFlipped] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const rotateX = useSpring(useTransform(pointerY, [0, 100], [8, -8]), {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });
  const rotateY = useSpring(useTransform(pointerX, [0, 100], [-8, 8]), {
    stiffness: 180,
    damping: 20,
    mass: 0.6,
  });

  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${pointerX}% ${pointerY}%, ${
    darkMode ? "rgba(236, 72, 153, 0.2)" : "rgba(219, 39, 119, 0.13)"
  }, transparent 70%)`;

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    pointerX.set(x);
    pointerY.set(y);
  };

  const onMouseLeave = () => {
    pointerX.set(50);
    pointerY.set(50);
  };

  return (
    <motion.div
      key={project.id}
      variants={variants}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative rounded-[2.5rem] p-1 overflow-hidden transition-all duration-500 will-change-transform ${
        darkMode
          ? "hover:shadow-[0_0_40px_rgba(236,72,153,0.15)]"
          : "hover:shadow-[0_0_40px_rgba(236,72,153,0.08)]"
      }`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-700`}
      />
      <motion.div
        className="absolute inset-1 rounded-[2.3rem] pointer-events-none"
        style={{ background: spotlight }}
      />

      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full min-h-[29rem] rounded-[2.4rem] [transform-style:preserve-3d]"
      >
        <div
          className={`absolute inset-0 rounded-[2.4rem] p-8 md:p-10 backdrop-blur-2xl border transition-all duration-500 backface-hidden ${
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
              <motion.button
                type="button"
                onClick={() => setFlipped(true)}
                whileHover={{ y: -3, rotate: -4, scale: 1.08 }}
                className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
                aria-label={`${project.title} details`}
              >
                <RefreshCw
                  className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`}
                />
              </motion.button>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, rotate: -6, scale: 1.08 }}
                className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
                aria-label={`${project.title} GitHub repository`}
              >
                <Github
                  className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`}
                />
              </motion.a>
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, rotate: 6, scale: 1.08 }}
                  className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
                  aria-label={`${project.title} live demo`}
                >
                  <ExternalLink
                    className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`}
                  />
                </motion.a>
              )}
            </div>
          </div>

          <h3
            className={`text-3xl font-black mb-4 ${darkMode ? "text-white" : "text-gray-900"} tracking-tight`}
          >
            {project.title}
          </h3>

          <p
            className={`text-lg leading-relaxed mb-8 ${darkMode ? "text-gray-400" : "text-gray-600"} font-light`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ y: -2, scale: 1.04 }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-gray-400"
                    : "bg-black/5 border-black/5 text-gray-500"
                }`}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <motion.div
            whileHover={{ x: 2, y: -2, rotate: -8 }}
            className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-40 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500"
          >
            <ArrowUpRight
              className={`w-10 h-10 ${darkMode ? "text-white" : "text-gray-900"}`}
            />
          </motion.div>
        </div>

        <div
          className={`absolute inset-0 rounded-[2.4rem] p-8 md:p-10 backdrop-blur-2xl border backface-hidden rotate-y-180 ${
            darkMode
              ? "bg-slate-900/90 border-white/10"
              : "bg-white/95 border-black/10 shadow-2xl shadow-black/5"
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <p
              className={`text-xs font-black tracking-[0.2em] uppercase ${darkMode ? "text-pink-300" : "text-pink-600"}`}
            >
              Architecture Notes
            </p>
            <motion.button
              type="button"
              onClick={() => setFlipped(false)}
              whileHover={{ y: -2, rotate: 8, scale: 1.06 }}
              className={`p-3 rounded-full border ${darkMode ? "border-white/10 hover:bg-white/10" : "border-black/5 hover:bg-black/5"} transition-colors`}
              aria-label={`${project.title} front side`}
            >
              <RefreshCw
                className={`w-5 h-5 ${darkMode ? "text-white" : "text-gray-800"}`}
              />
            </motion.button>
          </div>

          <h3
            className={`text-2xl font-black mb-5 ${darkMode ? "text-white" : "text-gray-900"} tracking-tight`}
          >
            {project.title}
          </h3>

          <div className="space-y-5">
            <div>
              <p
                className={`text-[11px] mb-1 uppercase tracking-[0.18em] font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Architecture
              </p>
              <p
                className={`${darkMode ? "text-gray-200" : "text-gray-700"} text-sm leading-relaxed`}
              >
                {project.architecture}
              </p>
            </div>
            <div>
              <p
                className={`text-[11px] mb-1 uppercase tracking-[0.18em] font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Challenge
              </p>
              <p
                className={`${darkMode ? "text-gray-200" : "text-gray-700"} text-sm leading-relaxed`}
              >
                {project.challenge}
              </p>
            </div>
            <div>
              <p
                className={`text-[11px] mb-1 uppercase tracking-[0.18em] font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}
              >
                Impact
              </p>
              <p
                className={`${darkMode ? "text-gray-200" : "text-gray-700"} text-sm leading-relaxed`}
              >
                {project.impact}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={`back-${project.id}-${tech}`}
                className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                  darkMode
                    ? "bg-white/5 border-white/10 text-gray-300"
                    : "bg-black/5 border-black/10 text-gray-600"
                }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects({ darkMode }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

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
              darkMode
                ? "from-pink-400 to-purple-400"
                : "from-pink-600 to-purple-600"
            } bg-clip-text text-transparent`}
          >
            Proof of Concept
          </h2>

          <div
            className={`w-32 h-1.5 mx-auto mb-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full`}
          />

          <p
            className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-700"} max-w-2xl mx-auto font-light leading-relaxed`}
          >
            Selected works that define my technical expertise and creative
            vision.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-10"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              darkMode={darkMode}
              variants={itemVariants}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
