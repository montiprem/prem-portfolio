"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles, Building2, User } from "lucide-react";
import Image from "next/image";
import Container from "../ui/Container";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 bg-transparent overflow-hidden text-foreground transition-colors duration-300"
    >
      {/* Background Ambient Glows & Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />


      {/* Decorative Blur Ambient */}

      <Container className="relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> TESTIMONIALS
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            What People Say About{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              My Work
            </span>
          </h2>
          <p className="mt-4 text-slate-600 dark:text-gray-400 text-sm sm:text-base">
            Feedback from stakeholders, department heads, and teams I’ve collaborated with.
          </p>
        </motion.div>

        {/* Testimonials Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-blue-500/40 hover:bg-white dark:hover:bg-white/[0.07] shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.12)] flex flex-col justify-between"
            >
              {/* Quote Icon Background Decorative */}
              <div className="absolute top-6 right-6 text-slate-300 dark:text-white/5 group-hover:text-blue-500/20 dark:group-hover:text-blue-500/10 transition-colors pointer-events-none">
                <Quote size={64} />
              </div>

              <div className="relative z-10">
                {/* Quote Text */}
                <p className="text-slate-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed italic mb-8">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="relative z-10 pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-4">
                {/* Avatar / Placeholder */}
                <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all overflow-hidden shrink-0">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-wide">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                    <span>{item.role}</span>
                    <span className="text-blue-500/60 dark:text-blue-400/60">•</span>
                    <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400/90 font-medium">
                      <Building2 size={12} />
                      {item.company}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}