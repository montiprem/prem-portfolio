"use client";

import { motion } from "framer-motion";
import { Sparkles, Clock, ArrowLeft, Mail, Wrench } from "lucide-react";
import Link from "next/link";
import Container from "@/components/ui/Container";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-20 transition-colors duration-300">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Container className="relative z-10 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-widest mb-8">
              <Clock className="w-3.5 h-3.5 animate-spin" />
              <span>Under Construction</span>
            </div>

            {/* Icon Banner */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]">
              <Wrench className="w-10 h-10 animate-pulse" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Services Page{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Coming Soon
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
              Main enterprise BI solutions, Microsoft Fabric consulting, aur Power BI audit packages ko structure kar raha hu. Ye section jaldi hi live hoga!
            </p>

            {/* Direct Contact Notice */}
            <div className="mt-8 p-4 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Urgent query ya freelance requirement hai?</span>
              </div>
              <Link
                href="/contact"
                className="text-cyan-600 dark:text-cyan-300 font-bold hover:underline shrink-0 flex items-center gap-1"
              >
                Direct Contact <Mail className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 text-slate-900 dark:text-white border border-slate-300 dark:border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
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