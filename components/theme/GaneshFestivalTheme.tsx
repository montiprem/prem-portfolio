"use client";

import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const STORAGE_KEY = "ganesh-chaturthi-theme-2026";

export default function GaneshFestivalTheme() {
  const [isThemeActive, setIsThemeActive] = useState(false);

  useEffect(() => {
    const checkDateAndTheme = () => {
      const now = new Date();
      const indiaDate = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
      }).format(now);

      const isGaneshChaturthi = indiaDate === "2026-09-14";
      const hasEnabledTheme = sessionStorage.getItem(STORAGE_KEY) === "true";

      if (isGaneshChaturthi && hasEnabledTheme) {
        setIsThemeActive(true);
        document.documentElement.classList.add("ganesh-festival-theme");
        document.body.classList.add("ganesh-festival-theme");
      } else {
        setIsThemeActive(false);
        document.documentElement.classList.remove("ganesh-festival-theme");
        document.body.classList.remove("ganesh-festival-theme");
      }
    };

    checkDateAndTheme();

    // Re-check periodically or listen to changes if needed.
    // Setting up a listener for storage events
    const handleStorageChange = () => {
      checkDateAndTheme();
    };

    window.addEventListener("storage", handleStorageChange);
    // Custom event just in case we trigger it manually
    window.addEventListener("ganesh-theme-update", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("ganesh-theme-update", handleStorageChange);
    };
  }, []);

  if (!isThemeActive) return null;

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-orange-950/40 to-slate-900 border-b border-orange-500/20 py-2 px-4 z-[60] sticky top-0 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center sm:text-left shadow-[0_0_15px_rgba(249,115,22,0.1)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/5 via-transparent to-transparent pointer-events-none" />

      <span className="text-sm sm:text-base font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent flex items-center gap-2">
        <span className="text-orange-400 drop-shadow-sm filter" aria-hidden="true">🕉️</span>
        🙏 गणेश चतुर्थी की हार्दिक शुभकामनाएं 🙏
      </span>

      <span className="hidden sm:block text-orange-500/40" aria-hidden="true">•</span>

      <span className="text-xs sm:text-sm text-slate-300 font-medium">
        Prem Mandal <span className="text-orange-500/50">|</span> Power BI Developer
      </span>

      {/* Decorative spark */}
      <Sparkles aria-hidden="true" className="hidden md:block absolute right-4 text-orange-400/40 w-4 h-4 animate-pulse-glow" />
    </div>
  );
}
