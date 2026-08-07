"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowLeft, Mail, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function StorePage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-20">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-card border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Digital Asset Store</span>
            </div>

            {/* Icon Banner */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-cyan-600/20 to-blue-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <ShoppingBag className="w-10 h-10 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Digital Store{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              Main premium Power BI templates (.pbit), ATS resume formats, SQL cheat sheets, aur Microsoft Fabric blueprints ready kar raha hu. Ye resources jaldi hi yaha available honge!
            </p>

            {/* Direct Contact Notice */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Kisi specific template ya resource ki urgent zaroorat hai?</span>
              </div>
              <Link
                href="/contact"
                className="text-cyan-300 font-bold hover:underline shrink-0 flex items-center gap-1"
              >
                Request Asset <Mail className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-lg shadow-cyan-600/30 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>View My Projects</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}