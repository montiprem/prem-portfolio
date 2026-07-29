"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  Sparkles,
  BarChart2,
} from "lucide-react";
import Container from "../ui/Container";
import { projects } from "@/data/projects";

type AccentType = "blue" | "cyan" | "indigo" | string;

// Safe Project Type with optional image property
type ProjectWithImage = (typeof projects)[number] & {
  image?: string;
};

const accentMap: Record<AccentType, string> = {
  blue: "from-blue-500 via-cyan-400 to-indigo-500",
  cyan: "from-cyan-400 via-teal-300 to-blue-500",
  indigo: "from-indigo-500 via-purple-400 to-blue-400",
};

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-28 bg-background overflow-hidden text-white"
    >
      {/* Background Mesh Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Lights */}
      <div className="absolute top-0 left-1/3 h-96 w-96 rounded-full bg-indigo-500/15 blur-[160px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 h-96 w-96 rounded-full bg-cyan-500/15 blur-[150px] pointer-events-none" />

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
            <Sparkles className="w-4 h-4" /> MY WORK
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Featured{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {(projects as ProjectWithImage[]).map((project, index) => {
            const gradientAccent =
              accentMap[project.accent] || accentMap.blue;

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-blue-500/40 hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                {/* Glowing Top Line Accent */}
                <div
                  className={`h-1 w-full bg-linear-to-r ${gradientAccent}`}
                />

                <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
                  <div>
                    {/* Image / Mockup Container Placeholder */}
                    <div className="relative w-full h-44 mb-6 rounded-xl border border-white/10 bg-[#0b1220]/80 overflow-hidden flex items-center justify-center group-hover:border-blue-500/30 transition-all">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-gray-500 group-hover:text-blue-400 transition-colors">
                          <BarChart2 className="w-10 h-10 opacity-70 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-mono tracking-wider">
                            PROJECT PREVIEW
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-linear-to-t from-[#0b1220] via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Company Badge */}
                    <div className="flex items-center gap-2 mb-2">
                      <FolderGit2 className="w-3.5 h-3.5 text-blue-400" />
                      <p className="text-xs font-semibold text-blue-400 tracking-wider uppercase">
                        {project.company}
                      </p>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Links */}
                  <div className="mt-6 pt-4 border-t border-white/10 space-y-5">
                    {/* Tech Tag Chips */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-colors hover:border-blue-500/40 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Button / Link */}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-cyan-300 transition-colors group/link"
                      >
                        <span>View Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}