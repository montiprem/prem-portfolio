"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
    );
  }

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
      className="p-2 rounded-xl border border-white/10 dark:border-white/10 bg-white/10 dark:bg-white/5 text-amber-400 dark:text-cyan-300 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-center"
      aria-label="Toggle Theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun size={16} className="text-amber-400" />
      ) : (
        <Moon size={16} className="text-indigo-600" />
      )}
    </button>
  );
}