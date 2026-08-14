"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background">
      {/*
        Professional minimal data-inspired animated background.
        Uses pure CSS for performance.
        Includes a media query for prefers-reduced-motion in global CSS to disable keyframes if needed.
      */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-20 transition-opacity duration-1000">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-blob" />
        <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-cyan-500/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full bg-indigo-500/10 blur-[150px] animate-blob animation-delay-4000" />
      </div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.05]" />
    </div>
  );
}
