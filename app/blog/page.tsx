"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowLeft, Mail, BookOpen } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden py-20">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-500px h-500px bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-300px h-300px bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-card border border-white/10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Technical Insights & Blog</span>
            </div>

            {/* Icon Banner */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-indigo-500/20 border border-purple-400/30 flex items-center justify-center text-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
              <BookOpen className="w-10 h-10 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Articles & Guides{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              Power BI DAX optimization, Microsoft Fabric Lakehouse architectures, SQL interview cheat sheets, aur Data Analytics career guides abhi write-up stage me hain. Ye section jaldi hi publish hoga!
            </p>

            {/* Direct Contact Notice */}
            <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Kisi specific article ya topic par guide chahiye?</span>
              </div>
              <Link
                href="/contact"
                className="text-purple-300 font-bold hover:underline shrink-0 flex items-center gap-1"
              >
                Suggest Topic <Mail className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Projects</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}