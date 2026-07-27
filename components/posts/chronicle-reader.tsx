"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { 
  Copy, 
  Check, 
  ExternalLink, 
  BookOpen, 
  Type, 
  Maximize2, 
  Sparkles, 
  Quote,
  CornerDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface ChronicleReaderProps {
  content: string;
  title?: string;
}

type FontStyle = "serif" | "sans" | "mono" | "editorial";
type FontSize = "sm" | "md" | "lg" | "xl";
type LineHeight = "tight" | "relaxed" | "loose";

export default function ChronicleReader({ content, title }: ChronicleReaderProps) {
  const [fontStyle, setFontStyle] = useState<FontStyle>("serif");
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [lineHeight, setLineHeight] = useState<LineHeight>("relaxed");
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);

  const getFontClass = () => {
    switch (fontStyle) {
      case "serif":
        return "font-serif-reading";
      case "sans":
        return "font-sans-reading";
      case "mono":
        return "font-mono-reading";
      case "editorial":
        return "font-editorial-reading";
      default:
        return "font-serif-reading";
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-base sm:text-lg";
      case "md":
        return "text-lg sm:text-xl";
      case "lg":
        return "text-xl sm:text-2xl";
      case "xl":
        return "text-2xl sm:text-3xl";
      default:
        return "text-lg sm:text-xl";
    }
  };

  const getLineHeightClass = () => {
    switch (lineHeight) {
      case "tight":
        return "leading-normal";
      case "relaxed":
        return "leading-relaxed";
      case "loose":
        return "leading-loose";
      default:
        return "leading-relaxed";
    }
  };

  const handleCopyCode = (codeText: string, index: number) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(index);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Reader Controls Toolbar */}
      <div className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-secondary/40 backdrop-blur-xl border border-border/80 shadow-md">
        {/* Font Family Selector */}
        <div className="flex items-center gap-1 bg-background/60 p-1 rounded-xl border border-border/50">
          <Type className="w-4 h-4 ml-2 text-muted-foreground mr-1 hidden sm:inline-block" />
          <button
            onClick={() => setFontStyle("serif")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-serif-reading rounded-lg transition-all ${
              fontStyle === "serif"
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            Serif
          </button>
          <button
            onClick={() => setFontStyle("sans")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-sans-reading rounded-lg transition-all ${
              fontStyle === "sans"
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            Sans
          </button>
          <button
            onClick={() => setFontStyle("editorial")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-editorial-reading rounded-lg transition-all ${
              fontStyle === "editorial"
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            Editorial
          </button>
          <button
            onClick={() => setFontStyle("mono")}
            className={`px-3 py-1.5 text-xs sm:text-sm font-mono-reading rounded-lg transition-all ${
              fontStyle === "mono"
                ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            Mono
          </button>
        </div>

        {/* Text Size & Spacing Controls */}
        <div className="flex items-center gap-2">
          {/* Size controls */}
          <div className="flex items-center gap-1 bg-background/60 p-1 rounded-xl border border-border/50">
            <button
              onClick={() => setFontSize("sm")}
              title="Small text"
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                fontSize === "sm" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              A-
            </button>
            <button
              onClick={() => setFontSize("md")}
              title="Medium text"
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                fontSize === "md" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize("lg")}
              title="Large text"
              className={`px-2.5 py-1 text-xs rounded-md transition-all font-bold ${
                fontSize === "lg" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              A+
            </button>
          </div>

          {/* Line Height controls */}
          <div className="hidden sm:flex items-center gap-1 bg-background/60 p-1 rounded-xl border border-border/50">
            <button
              onClick={() => setLineHeight("tight")}
              title="Compact line height"
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                lineHeight === "tight" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Tight
            </button>
            <button
              onClick={() => setLineHeight("relaxed")}
              title="Relaxed line height"
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                lineHeight === "relaxed" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Relaxed
            </button>
            <button
              onClick={() => setLineHeight("loose")}
              title="Spacious line height"
              className={`px-2 py-1 text-xs rounded-md transition-all ${
                lineHeight === "loose" ? "bg-primary text-primary-foreground font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Loose
            </button>
          </div>
        </div>
      </div>

      {/* Main Formatted Chronicle Content */}
      <div className={`prose prose-invert max-w-none ${getFontClass()} ${getFontSizeClass()} ${getLineHeightClass()} transition-all duration-300`}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Paragraph renderer
            p({ children }) {
              return (
                <p className="mb-6 text-foreground/90 font-normal leading-relaxed tracking-normal">
                  {children}
                </p>
              );
            },

            // Headings renderers
            h1({ children }) {
              return (
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mt-12 mb-6 text-foreground pb-4 border-b border-border/60">
                  {children}
                </h1>
              );
            },
            h2({ children }) {
              return (
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mt-10 mb-5 text-foreground flex items-center gap-3">
                  <span className="w-2.5 h-8 bg-gradient-to-b from-primary to-purple-500 rounded-full inline-block" />
                  {children}
                </h2>
              );
            },
            h3({ children }) {
              return (
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-8 mb-4 text-primary">
                  {children}
                </h3>
              );
            },
            h4({ children }) {
              return (
                <h4 className="text-lg sm:text-xl font-semibold mt-6 mb-3 text-foreground/90">
                  {children}
                </h4>
              );
            },

            // Lists renderers
            ul({ children }) {
              return (
                <ul className="my-6 space-y-3 pl-2 list-none text-foreground/90">
                  {children}
                </ul>
              );
            },
            ol({ children }) {
              return (
                <ol className="my-6 space-y-3 pl-2 list-none text-foreground/90 counter-reset-item">
                  {children}
                </ol>
              );
            },
            li({ children, node, ...props }) {
              // Determine if parent is ordered or unordered
              const isOrdered = node?.position?.start?.line !== undefined && (node as any).index !== undefined;
              
              return (
                <li className="flex items-start gap-3.5 my-1.5 leading-relaxed group">
                  <span className="inline-flex items-center justify-center w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)] flex-shrink-0 mt-3 group-hover:scale-125 transition-transform" />
                  <div className="flex-1">{children}</div>
                </li>
              );
            },

            // Links renderer (requirement 5)
            a({ href, children }) {
              const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
              return (
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-baseline gap-1 text-primary font-medium underline decoration-primary/40 underline-offset-4 hover:decoration-primary hover:text-primary/80 transition-all group/link"
                >
                  <span>{children}</span>
                  {isExternal && (
                    <ExternalLink className="w-3.5 h-3.5 self-center opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  )}
                </a>
              );
            },

            // Code renderer (Inline & Blocks) (requirement 2)
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || "");
              const codeString = String(children).replace(/\n$/, "");
              const isBlockCode = !inline && (match || codeString.includes("\n") || className);

              if (isBlockCode) {
                const language = match ? match[1] : "code";
                const blockIndex = node?.position?.start?.line || Math.random();

                return (
                  <div className="relative my-8 rounded-2xl overflow-hidden bg-slate-950/90 dark:bg-zinc-950 border border-primary/20 shadow-2xl font-mono-reading text-sm group/code">
                    {/* Glass Bar */}
                    <div className="flex items-center justify-between px-5 py-3 bg-white/5 border-b border-white/10 backdrop-blur-md">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <Badge variant="outline" className="ml-3 text-[11px] uppercase tracking-wider font-mono bg-primary/10 text-primary border-primary/30">
                          {language}
                        </Badge>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyCode(codeString, blockIndex)}
                        className="h-8 px-3 text-xs font-mono text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-1.5"
                      >
                        {copiedCodeIndex === blockIndex ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Code Container */}
                    <div className="p-6 overflow-x-auto text-slate-200 selection:bg-primary/30 selection:text-white">
                      <pre className="font-mono text-xs sm:text-sm leading-relaxed whitespace-pre">
                        <code>{codeString}</code>
                      </pre>
                    </div>
                  </div>
                );
              }

              // Inline Code Renderer
              return (
                <code className="font-mono-reading text-[0.875em] bg-primary/10 text-primary px-2 py-0.5 rounded-md border border-primary/20 font-medium tracking-tight break-all inline-block">
                  {children}
                </code>
              );
            },

            // Blockquote renderer
            blockquote({ children }) {
              return (
                <blockquote className="relative my-8 pl-6 pr-4 py-4 border-l-4 border-primary bg-primary/5 rounded-r-2xl text-foreground/85 italic">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-3 -left-3 -rotate-12 pointer-events-none" />
                  <div className="relative z-10">{children}</div>
                </blockquote>
              );
            },

            // Horizontal Rule
            hr() {
              return (
                <div className="my-10 flex items-center justify-center gap-4">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  <Sparkles className="w-4 h-4 text-primary/60" />
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                </div>
              );
            },

            // Table renderer
            table({ children }) {
              return (
                <div className="my-8 overflow-x-auto rounded-2xl border border-border bg-secondary/10">
                  <table className="w-full text-left text-sm font-sans-reading border-collapse">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-secondary/40 border-b border-border">{children}</thead>;
            },
            th({ children }) {
              return <th className="p-4 font-bold text-foreground uppercase tracking-wider text-xs">{children}</th>;
            },
            td({ children }) {
              return <td className="p-4 border-b border-border/50 text-foreground/80">{children}</td>;
            },

            // Footnotes handling (requirement 4)
            sup({ children }) {
              return (
                <sup className="ml-0.5 text-xs font-bold text-primary hover:underline cursor-pointer">
                  {children}
                </sup>
              );
            },
            section({ node, className, children, ...props }: any) {
              if (props["data-footnotes"] || className?.includes("footnotes")) {
                return (
                  <section className="mt-14 pt-8 border-t-2 border-border/80 text-sm text-muted-foreground font-sans-reading space-y-4">
                    <div className="flex items-center gap-2 font-bold text-foreground text-base tracking-tight mb-4">
                      <CornerDownRight className="w-4 h-4 text-primary" />
                      Footnotes & References
                    </div>
                    <div className="space-y-3 pl-2">
                      {children}
                    </div>
                  </section>
                );
              }
              return <section className={className} {...props}>{children}</section>;
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
