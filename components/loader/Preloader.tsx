"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1.8 seconds par fade-out start hoga
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // 2.2 seconds par poori tarah unmount ho jayega
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 2200);

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
      className="fixed inset-0 z-99999 flex items-center justify-center bg-[#030712] overflow-hidden select-none"
    >
      {/* Background ambient glowing gradient effect */}
      <div className="absolute w-500px h-500px bg-blue-600/15 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-300px h-300px bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center p-8 rounded-3xl bg-white/0.02 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full mx-4">
        
        {/* Glowing Spinner Ring with Logo/Icon inside */}
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
          <span className="text-xl font-black bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            P.
          </span>
        </div>

        {/* Main Loading Text */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-base sm:text-lg font-bold tracking-tight text-center mb-2"
        >
          Prem&apos;s Portfolio
        </motion.h2>

        <p className="text-gray-400 text-xs tracking-widest uppercase font-medium mb-6 flex items-center gap-1.5">
          <span>Loading Experience</span>
          <span className="flex gap-1">
            <span className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
            <span className="w-1 h-1 bg-blue-400 rounded-full animate-ping [animation-delay:0.2s]" />
            <span className="w-1 h-1 bg-indigo-400 rounded-full animate-ping [animation-delay:0.4s]" />
          </span>
        </p>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-1px">
          <motion.div
            className="h-full bg-linear-to-r from-blue-500 via-cyan-400 to-indigo-500 rounded-full shadow-[0_0_12px_#38bdf8]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
        </div>

      </div>
    </motion.div>
  );
}