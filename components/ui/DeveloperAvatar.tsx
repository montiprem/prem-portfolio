"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, BrainCircuit, Bug } from "lucide-react";

type Mood = "sleeping" | "thinking" | "debugging" | "active";

export default function DeveloperAvatar() {
  const [mood, setMood] = useState<Mood>("sleeping");

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    // 1. Hover Detection for Interactive Elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Inputs / Textareas / Forms triggers Debug Mode
      if (target.closest("input, textarea, select, form")) {
        setMood("debugging");
        return;
      }

      // Buttons / Links / Cards triggers Active Dev Mode
      if (target.closest("a, button, [role='button'], .group")) {
        setMood("active");
        return;
      }

      // Default back to Sleeping if normal area
      setMood("sleeping");
    };

    // 2. Fast Scroll Detection triggers Thinking Mode
    const handleScroll = () => {
      setMood("thinking");

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setMood("sleeping");
      }, 1200); // 1.2 sec baad back to sleep
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="inline-flex items-center gap-2 ml-2 pointer-events-none select-none">
      {/* AVATAR GLOW & CONTAINER */}
      <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
        <div
          className={`absolute inset-0 rounded-full blur-xs transition-all duration-500 ${
            mood === "active"
              ? "bg-cyan-500/50 scale-125"
              : mood === "debugging"
              ? "bg-amber-500/50 scale-125"
              : mood === "thinking"
              ? "bg-purple-500/50 scale-110"
              : "bg-blue-600/20 scale-90"
          }`}
        />

        {/* SVG AVATAR CHARACTER */}
        <motion.svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-md relative z-10"
          animate={
            mood === "thinking"
              ? { rotate: [-2, 2, -2], y: [0, -2, 0] }
              : mood === "debugging"
              ? { x: [-1, 1, -1] }
              : mood === "active"
              ? { y: [0, -2, 0] }
              : { y: [0, 1.5, 0] }
          }
          transition={{
            duration: mood === "debugging" ? 0.2 : 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Hoodie Body */}
          <path
            d="M30 100 C 30 75, 45 70, 60 70 C 75 70, 90 75, 90 100 Z"
            fill={
              mood === "debugging"
                ? "#2d1a0e"
                : mood === "thinking"
                ? "#221c35"
                : mood === "active"
                ? "#1e293b"
                : "#0f172a"
            }
            stroke={
              mood === "debugging"
                ? "#f59e0b"
                : mood === "thinking"
                ? "#a855f7"
                : mood === "active"
                ? "#38bdf8"
                : "#334155"
            }
            strokeWidth="3"
          />

          {/* Laptop Screen */}
          {mood !== "sleeping" && (
            <g>
              <rect
                x="40"
                y="82"
                width="40"
                height="22"
                rx="3"
                fill="#0f172a"
                stroke={
                  mood === "debugging"
                    ? "#f59e0b"
                    : mood === "thinking"
                    ? "#c084fc"
                    : "#38bdf8"
                }
                strokeWidth="2"
              />
              <path
                d="M 35 104 L 85 104"
                stroke={
                  mood === "debugging"
                    ? "#d97706"
                    : mood === "thinking"
                    ? "#9333ea"
                    : "#0ea5e9"
                }
                strokeWidth="4"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Head */}
          <circle
            cx="60"
            cy="48"
            r="22"
            fill="#f8fafc"
            stroke={
              mood === "debugging"
                ? "#f59e0b"
                : mood === "thinking"
                ? "#c084fc"
                : mood === "active"
                ? "#38bdf8"
                : "#475569"
            }
            strokeWidth="3"
          />

          {/* Tech Visor / Glasses */}
          <rect
            x="46"
            y="40"
            width="28"
            height="10"
            rx="3"
            fill="#0f172a"
            stroke={
              mood === "debugging"
                ? "#fbbf24"
                : mood === "thinking"
                ? "#e879f9"
                : mood === "active"
                ? "#22d3ee"
                : "#64748b"
            }
            strokeWidth="2"
          />

          {/* Eyes State Engine */}
          {mood === "sleeping" ? (
            /* Sleeping Zzz Eyes */
            <g stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round">
              <path d="M 50 45 Q 54 48 56 45" />
              <path d="M 64 45 Q 68 48 70 45" />
            </g>
          ) : mood === "thinking" ? (
            /* Thinking Upward Eyes */
            <g fill="#c084fc">
              <circle cx="53" cy="43" r="3" />
              <circle cx="67" cy="43" r="3" />
            </g>
          ) : mood === "debugging" ? (
            /* Alert Debugging Orange Eyes */
            <g fill="#fbbf24">
              <circle cx="53" cy="45" r="3.5" className="animate-ping" />
              <circle cx="67" cy="45" r="3.5" className="animate-ping" />
            </g>
          ) : (
            /* Active Focused Cyan Eyes */
            <g fill="#22d3ee">
              <circle cx="53" cy="45" r="3" />
              <circle cx="67" cy="45" r="3" />
            </g>
          )}
        </motion.svg>
      </div>

      {/* DYNAMIC MOOD BADGE */}
      <AnimatePresence mode="wait">
        {mood === "sleeping" && (
          <motion.span
            key="sleeping"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[9px] text-gray-400 font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full"
          >
            Zzz...
          </motion.span>
        )}

        {mood === "thinking" && (
          <motion.span
            key="thinking"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[8px] text-purple-300 font-mono font-bold uppercase bg-purple-500/20 border border-purple-400/30 px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            <BrainCircuit className="w-2.5 h-2.5 text-purple-400 animate-spin" />
            Analyzing
          </motion.span>
        )}

        {mood === "debugging" && (
          <motion.span
            key="debugging"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[8px] text-amber-300 font-mono font-bold uppercase bg-amber-500/20 border border-amber-400/30 px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            <Bug className="w-2.5 h-2.5 text-amber-400 animate-bounce" />
            Debugging
          </motion.span>
        )}

        {mood === "active" && (
          <motion.span
            key="active"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[8px] text-cyan-300 font-mono font-bold uppercase bg-cyan-500/20 border border-cyan-400/30 px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            <Terminal className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
            Dev Mode
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}