"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 2.2 seconds par fade-out start hoga
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2200);

    // 2.6 seconds par poori tarah unmount ho jayega
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadeOut ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-99999 flex items-center justify-center bg-[#030712] overflow-hidden select-none px-4"
    >
      {/* Background ambient glowing gradient effects */}
      <div className="absolute w-500px h-500px bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-300px h-300px bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center p-8 sm:p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] max-w-md w-full text-center">
        
        {/* Glowing Animated Ring with Indian Namaste/Greeting Vibe */}
        <div className="relative w-20 h-20 flex items-center justify-center mb-6">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent border-b-indigo-500 border-l-blue-400/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-2xl animate-bounce">🙏</span>
        </div>

        {/* Namaste Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-1.5 mb-6"
        >
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            Namaste Everyone <span className="inline-block animate-pulse">✨</span>
          </h2>
          
          <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5">
            <span>It&apos;s Prem Mandal From India</span> 
            <span className="text-base">🇮🇳</span>
          </p>

          <p className="text-gray-400 text-xs font-medium pt-1">
            Welcome to my Portfolio
          </p>
        </motion.div>

        {/* Loading status text & dots */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-[11px] uppercase tracking-widest text-cyan-300 font-bold">
            Loading Experience
          </span>
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-ping [animation-delay:0.2s]" />
            <span className="w-1 h-1 bg-indigo-400 rounded-full animate-ping [animation-delay:0.4s]" />
          </span>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-1px">
          <motion.div
            className="h-full bg-linear-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_12px_#38bdf8]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </div>

      </div>
    </motion.div>
  );
}