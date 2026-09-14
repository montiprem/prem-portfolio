"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";


const STORAGE_KEY = "ganesh-chaturthi-popup-2026";

export default function GaneshChaturthiPopup() {
  const [show, setShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkDate = () => {
      const now = new Date();
      const indiaDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
      }).format(now);

      return indiaDate === "2026-09-14";
    };

    const isGaneshChaturthi = checkDate();
    const hasSeenPopup = sessionStorage.getItem(STORAGE_KEY) === "true";

    if (isGaneshChaturthi && !hasSeenPopup) {
      setShow(true);
      // Disable body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    sessionStorage.setItem(STORAGE_KEY, "true");

    // Explicitly set the theme to active in storage
    sessionStorage.setItem("ganesh-chaturthi-theme-2026", "true");

    // Dispatch an event so the theme component can update immediately
    window.dispatchEvent(new Event("ganesh-theme-update"));

    document.body.style.overflow = ""; // Restore scrolling
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && show) {
        handleClose();
      }
    };
    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-orange-500/20 bg-[#0a0f1d]/95 p-6 shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] backdrop-blur-xl sm:p-8"
          >
            {/* Subtle festive glowing orb */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-500/20 blur-[60px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-yellow-500/10 blur-[60px]" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Illustration / Icon placeholder */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/10 border border-orange-500/30 shadow-inner">
                 <span className="text-4xl filter drop-shadow-md">🕉️</span>
              </div>

              {/* Title */}
              <h2
                id="popup-title"
                className="mb-4 text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  🙏 गणेश चतुर्थी की हार्दिक शुभकामनाएं 🙏
                </span>
              </h2>

              {/* Message */}
              <div className="mb-6 space-y-2 text-sm text-slate-300">
                <p className="font-medium text-white/90">
                  May Lord Ganesha bless you with
                </p>
                <p className="font-semibold text-orange-200">
                  Wisdom • Success • Happiness • Prosperity
                </p>
              </div>

              {/* Branding line */}
              <div className="mb-6 w-full border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">Prem Mandal</p>
                <p className="text-xs text-slate-400">
                  Power BI Developer | Data Analyst
                </p>
                <p className="mt-3 text-xs italic text-slate-400">
                  Wishing you and your family a very Happy Ganesh Chaturthi!
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={handleClose}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-orange-600 to-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-orange-500/25 active:scale-[0.98]"
              >
                <Sparkles size={18} className="transition-transform group-hover:rotate-12" />
                <span>Enter Portfolio</span>
                {/* Button highlight effect */}
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
