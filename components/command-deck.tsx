"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare } from "lucide-react";

interface CommandDeckProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  onSurprise: () => void;
}

const sections = ["home", "about", "skills", "projects", "contact"] as const;
type SectionName = (typeof sections)[number];

type FsNode =
  | { type: "dir"; children: Record<string, FsNode> }
  | { type: "file"; content: string };

const fsRoot: FsNode = {
  type: "dir",
  children: {
    home: {
      type: "dir",
      children: {
        "welcome.txt": {
          type: "file",
          content:
            "Welcome to Bimbok's terminal portfolio.\nTry: ls, cd projects, cat project-algoscope.md, open github",
        },
      },
    },
    about: {
      type: "dir",
      children: {
        "bio.txt": {
          type: "file",
          content:
            "Bratik Mukherjee (Bimbok)\nFull-stack developer focused on expressive UI, MERN, Python and developer-first tooling.",
        },
      },
    },
    skills: {
      type: "dir",
      children: {
        "stack.txt": {
          type: "file",
          content:
            "React, Next.js, TypeScript, Node.js, Python, MongoDB, Tailwind CSS, Framer Motion, etc",
        },
      },
    },
    projects: {
      type: "dir",
      children: {
        "README.md": {
          type: "file",
          content:
            "Projects available:\n- algoscope\n- bimagic\n- fyzenor\n- portfolio\nUse: cat project-<name>.md or open project <name>",
        },
        "project-algoscope.md": {
          type: "file",
          content:
            "AlgoScope\nInteractive algorithm visualizer using React + Tailwind + D3.\nRepo: https://github.com/orion-kernel/AlgoScope.git\nDemo: https://algo-scope-virid.vercel.app/",
        },
        "project-bimagic.md": {
          type: "file",
          content:
            "bimagic\nBash-based Git workflow automation CLI with menu-driven operations.\nRepo: https://github.com/orion-kernel/bimagic.git",
        },
        "project-fyzenor.md": {
          type: "file",
          content:
            "fyzenor\nC++17 terminal file manager with fast navigation and media previews.\nRepo: https://github.com/Bimbok/fyzenor.git",
        },
      },
    },
    contact: {
      type: "dir",
      children: {
        "links.txt": {
          type: "file",
          content:
            "email: bimbokmkj@gmail.com\ngithub: https://github.com/Bimbok\nlinkedin: https://www.linkedin.com/in/bratik-mukherjee-1067462a6/\nyoutube: https://youtube.com/@hellohellothisibimbok",
        },
      },
    },
    "resume.md": {
      type: "file",
      content: "Resume command:\nopen resume",
    },
  },
};

export default function CommandDeck({
  darkMode,
  setDarkMode,
  onSurprise,
}: CommandDeckProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string[]>(["home"]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [log, setLog] = useState<string[]>([
    "BIMBOK COMMAND DECK ONLINE",
    'Type "help" to view commands.',
  ]);

  const panelStyle = useMemo(
    () =>
      darkMode
        ? "bg-slate-950/90 border-white/10 text-emerald-300"
        : "bg-white/90 border-black/10 text-emerald-700",
    [darkMode],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const scrollTo = (section: SectionName) => {
    const id = section === "home" ? "hero" : section;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const addLog = (line: string) => setLog((prev) => [...prev.slice(-30), line]);

  const helpText = [
    "Core: help, clear, history, !!",
    "Linux-like: ls [path], cd <path>, pwd, cat <file>, grep <query> <file|*>",
    "Portfolio: open <github|linkedin|youtube|resume|project <name>|section>",
    "Modes: theme [light|dark|toggle], music [play|pause|toggle], social, surprise",
    "Quick jump: home/about/skills/projects/contact",
  ];

  const prompt = useMemo(() => `bimbok@deck:/${cwd.join("/")}$`, [cwd]);

  const tokenize = (raw: string) => raw.trim().split(/\s+/).filter(Boolean);

  const resolvePath = (rawPath?: string) => {
    if (!rawPath || rawPath === ".") return cwd;
    const base = rawPath.startsWith("/") ? [] : [...cwd];
    const chunks = rawPath.split("/").filter(Boolean);
    for (const chunk of chunks) {
      if (chunk === ".") continue;
      if (chunk === "..") {
        base.pop();
      } else {
        base.push(chunk);
      }
    }
    return base;
  };

  const getNode = (path: string[]): FsNode | null => {
    let node: FsNode = fsRoot;
    for (const segment of path) {
      if (node.type !== "dir") return null;
      node = node.children[segment];
      if (!node) return null;
    }
    return node;
  };

  const openTarget = (args: string[]) => {
    const alias = args.join(" ").toLowerCase();
    const links: Record<string, string> = {
      github: "https://github.com/Bimbok",
      linkedin: "https://www.linkedin.com/in/bratik-mukherjee-1067462a6/",
      youtube: "https://youtube.com/@hellohellothisibimbok",
      resume: "/resume.pdf",
    };

    if (links[alias]) {
      window.open(links[alias], "_blank", "noopener,noreferrer");
      addLog(`opened: ${alias}`);
      return;
    }

    if (alias.startsWith("project ")) {
      const project = alias.replace("project ", "").trim();
      const projectLinks: Record<string, string> = {
        algoscope: "https://algo-scope-virid.vercel.app/",
        bimagic: "https://github.com/orion-kernel/bimagic.git",
        fyzenor: "https://github.com/Bimbok/fyzenor.git",
        portfolio: "https://bimbok-portfolio.vercel.app/",
      };
      if (projectLinks[project]) {
        window.open(projectLinks[project], "_blank", "noopener,noreferrer");
        addLog(`opened project: ${project}`);
      } else {
        addLog(`open: unknown project '${project}'`);
      }
      return;
    }

    if (sections.includes(alias as SectionName)) {
      scrollTo(alias as SectionName);
      addLog(`navigated to #${alias}`);
      return;
    }

    addLog(`open: unknown target '${alias}'`);
  };

  const controlMusic = async (mode: string) => {
    const audio = document.getElementById("brand-song") as HTMLAudioElement | null;
    if (!audio) {
      addLog("music: audio source not found");
      return;
    }

    if (mode === "pause") {
      audio.pause();
      addLog("music paused");
      return;
    }

    if (mode === "play") {
      try {
        await audio.play();
        addLog("music playing");
      } catch {
        addLog("music: autoplay blocked, click BIMBOK once");
      }
      return;
    }

    if (audio.paused) {
      try {
        await audio.play();
        addLog("music playing");
      } catch {
        addLog("music: autoplay blocked, click BIMBOK once");
      }
    } else {
      audio.pause();
      addLog("music paused");
    }
  };

  const runCommand = (raw: string) => {
    const command = raw.trim();
    if (!command) return;

    const resolved = command === "!!" ? history[history.length - 1] : command;
    if (!resolved) {
      addLog("No commands in history.");
      return;
    }

    if (command === "!!") {
      addLog(`> ${prompt} !!`);
      addLog(`replay: ${resolved}`);
    } else {
      setHistory((prev) => [...prev, command]);
      addLog(`> ${prompt} ${command}`);
    }
    setHistoryIndex(null);

    const parts = tokenize(resolved);
    const name = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    if (!name) return;

    if (name === "help") {
      helpText.forEach((line) => addLog(line));
      return;
    }

    if (name === "man") {
      const topic = args[0] ?? "help";
      const pages: Record<string, string> = {
        ls: "ls [path] -> list files/directories",
        cd: "cd <path> -> change current directory",
        pwd: "pwd -> print current working directory",
        cat: "cat <file> -> print file contents",
        grep: "grep <query> <file|*> -> search text in file(s)",
        open: "open <target> -> open link/section/project",
        history: "history -> show command history",
        theme: "theme [light|dark|toggle] -> switch theme",
        music: "music [play|pause|toggle] -> control navbar song",
      };
      addLog(pages[topic] ?? `No manual entry for ${topic}`);
      return;
    }

    if (name === "theme") {
      const mode = args[0] ?? "toggle";
      if (mode === "light") setDarkMode(false);
      else if (mode === "dark") setDarkMode(true);
      else setDarkMode(!darkMode);
      addLog(
        `Theme set: ${mode === "toggle" ? (!darkMode ? "dark" : "light") : mode}`,
      );
      return;
    }

    if (name === "clear") {
      setLog(["Console cleared.", 'Type "help" to continue.']);
      return;
    }

    if (name === "social") {
      addLog("github.com/Bimbok");
      addLog("linkedin.com/in/bratik-mukherjee-1067462a6");
      addLog("youtube.com/@hellohellothisibimbok");
      return;
    }

    if (name === "music") {
      const mode = args[0] ?? "toggle";
      if (!["play", "pause", "toggle"].includes(mode)) {
        addLog("music: usage -> music [play|pause|toggle]");
        return;
      }
      void controlMusic(mode);
      return;
    }

    if (name === "surprise") {
      onSurprise();
      addLog("Party mode activated.");
      return;
    }

    if (name === "history") {
      if (history.length === 0) {
        addLog("history: empty");
      } else {
        history
          .slice(-12)
          .forEach((entry, idx) =>
            addLog(
              `${history.length - Math.min(12, history.length) + idx + 1}  ${entry}`,
            ),
          );
      }
      return;
    }

    if (name === "pwd") {
      addLog(`/${cwd.join("/")}`);
      return;
    }

    if (name === "ls") {
      const path = resolvePath(args[0]);
      const node = getNode(path);
      if (!node) {
        addLog(
          `ls: cannot access '${args[0] ?? "."}': No such file or directory`,
        );
        return;
      }
      if (node.type === "file") {
        addLog(path[path.length - 1] ?? "/");
        return;
      }
      addLog(Object.keys(node.children).join("  ") || "(empty)");
      return;
    }

    if (name === "cd") {
      const target = args[0];
      if (!target) {
        setCwd(["home"]);
        return;
      }
      const path = resolvePath(target);
      const node = getNode(path);
      if (!node || node.type !== "dir") {
        addLog(`cd: ${target}: No such directory`);
        return;
      }
      setCwd(path.length ? path : ["home"]);
      return;
    }

    if (name === "cat") {
      const target = args[0];
      if (!target) {
        addLog("cat: missing file operand");
        return;
      }
      const path = resolvePath(target);
      const node = getNode(path);
      if (!node) {
        addLog(`cat: ${target}: No such file`);
        return;
      }
      if (node.type !== "file") {
        addLog(`cat: ${target}: Is a directory`);
        return;
      }
      node.content.split("\n").forEach((line) => addLog(line));
      return;
    }

    if (name === "grep") {
      const query = args[0]?.toLowerCase();
      const target = args[1];
      if (!query || !target) {
        addLog("grep: usage -> grep <query> <file|*>");
        return;
      }
      const searchNode = (label: string, node: FsNode) => {
        if (node.type !== "file") return;
        node.content.split("\n").forEach((line, idx) => {
          if (line.toLowerCase().includes(query))
            addLog(`${label}:${idx + 1}: ${line}`);
        });
      };
      if (target === "*") {
        const node = getNode(cwd);
        if (!node || node.type !== "dir") return;
        Object.entries(node.children).forEach(([nameKey, nodeValue]) =>
          searchNode(nameKey, nodeValue),
        );
        return;
      }
      const node = getNode(resolvePath(target));
      if (!node) {
        addLog(`grep: ${target}: No such file`);
        return;
      }
      searchNode(target, node);
      return;
    }

    if (name === "open") {
      openTarget(args);
      return;
    }

    if (sections.includes(name as SectionName)) {
      scrollTo(name as SectionName);
      addLog(`Jumping to ${name}.`);
      return;
    }

    addLog(`Unknown command: ${name}`);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      setHistoryIndex((prev) => {
        const next = prev === null ? history.length - 1 : Math.max(0, prev - 1);
        setInput(history[next]);
        return next;
      });
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (history.length === 0) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const next = Math.min(history.length, prev + 1);
        if (next === history.length) {
          setInput("");
          return null;
        }
        setInput(history[next]);
        return next;
      });
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className={`fixed bottom-6 left-6 z-[70] px-4 py-2 rounded-full border backdrop-blur-xl text-xs font-bold tracking-wider ${
          darkMode
            ? "bg-black/50 border-white/20 text-emerald-300"
            : "bg-white/80 border-black/15 text-emerald-700"
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
                onKeyDown={onInputKeyDown}
                autoFocus
                placeholder={`${prompt} type a command...`}
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
  );
}
