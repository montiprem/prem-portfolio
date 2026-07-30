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
      className="relative py-28 bg-background overflow-hidden text-white"
    >
      {/* Background Ambient Glows & Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Ambient */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> TESTIMONIALS
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            What People Say About{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              My Work
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
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
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 transition-all duration-500 hover:border-blue-500/40 hover:bg-white/[0.07] hover:shadow-[0_0_50px_rgba(59,130,246,0.12)] flex flex-col justify-between"
            >
              {/* Quote Icon Background Decorative */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                <Quote size={64} />
              </div>

              <div className="relative z-10">
                {/* Quote Text Fixed for ESLint */}
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic mb-8">
                  {`"${item.quote}"`}
                </p>
              </div>

              {/* Author Info */}
              <div className="relative z-10 pt-6 border-t border-white/10 flex items-center gap-4">
                {/* Avatar / Placeholder */}
                <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 group-hover:scale-105 transition-all overflow-hidden">
                  {item.avatar ? (
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <span>{item.role}</span>
                    <span className="text-blue-400/60">•</span>
                    <span className="flex items-center gap-1 text-blue-400/90 font-medium">
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