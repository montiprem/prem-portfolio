"use client";

import { useState, useEffect } from "react";
import { Menu, X, Download, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4 transition-all duration-300">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border transition-all duration-300 px-6 md:px-8 py-3.5 backdrop-blur-xl ${
          scrolled
            ? "border-white/15 bg-#030712/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)] shadow-blue-500/5"
            : "border-white/10 bg-white/5 shadow-lg"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          className="group flex items-center gap-1.5 text-xl font-extrabold tracking-tight"
        >
          <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent transition-all group-hover:brightness-125">
            Prem Mandal
          </span>
          <Sparkles className="w-4 h-4 text-cyan-400 transition-transform group-hover:rotate-12" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-gray-300 hover:text-white transition-colors group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Resume Button */}
        <a
          href="/resume/resume.pdf"
          download
          className="hidden md:flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Resume</span>
        </a>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white transition-all"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu with Framer Motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-auto mt-3 max-w-7xl rounded-2xl border border-white/10 bg-[#0b1220]/95 backdrop-blur-2xl shadow-2xl p-6 flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-blue-400 font-semibold transition-colors text-sm py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume/resume.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}