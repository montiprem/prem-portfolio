"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import Container from "../ui/Container";

const philosophies = [
  {
    quote: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    author: "Thomas Edison",
  },
  {
    quote: "Hard work becomes a habit, a serious kind of fun. You find satisfaction in pushing your limits, knowing all the effort will pay off.",
    author: "Prem Mandal",
    highlight: true, // Center card ke liye special styling
  },
  {
    quote: "I believe it's possible for ordinary people to choose to be extraordinary.",
    author: "Elon Musk",
  },
];

export default function LifePhilosophy() {
  return (
    <section className="relative py-20 bg-background overflow-hidden text-foreground transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Mindset & Drive</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Life Philosophy
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-3 rounded-full" />
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {philosophies.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative p-6 sm:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-2 ${
                item.highlight
                  ? "bg-gradient-to-b from-blue-500/10 via-slate-100/90 to-slate-50 dark:from-blue-600/15 dark:via-white/[0.03] dark:to-white/[0.02] border-blue-500/40 shadow-xl dark:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  : "bg-slate-50/80 dark:bg-white/[0.03] border-slate-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-xl dark:hover:shadow-2xl"
              }`}
            >
              <div>
                {/* Quote Icon */}
                <div className="text-blue-600 dark:text-blue-400/80 mb-4 group-hover:scale-110 transition-transform">
                  <Quote className="w-8 h-8 fill-blue-500/10" />
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 dark:text-gray-200 text-sm sm:text-base leading-relaxed font-medium italic">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300 tracking-wider uppercase">
                  - {item.author}
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-cyan-500 dark:group-hover:bg-cyan-400 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </section>
  );
}