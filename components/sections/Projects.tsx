"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Download,
  ArrowRight,
  Database,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import { projects } from "@/data/projects";
import { Project } from "@/types";

export default function Projects() {
  // Homepage par scrolling balance rakhne ke liye top 3 projects show honge
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative py-20 bg-background overflow-hidden text-white"
    >
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" /> MY WORK
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base">
              A quick glimpse at my recent BI &amp; Analytics implementations.
            </p>
          </motion.div>
        </div>

        {/* 3 Featured Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {featuredProjects.map((project: Project, index: number) => (
            <motion.div
              key={project.id || project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-blue-500/40 hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            >
              <div>
                {/* Thumbnail Image Header */}
                <div className="relative w-full h-48 bg-slate-950 border-b border-white/5 overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-500 font-mono">
                      PREVIEW AVAILABLE
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {project.category || "Power BI"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons (PDF, Dataset, Visit Link) */}
              <div className="p-6 pt-0 flex flex-wrap items-center gap-2.5">
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    download
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>PDF</span>
                  </a>
                )}

                {project.datasetUrl && (
                  <a
                    href={project.datasetUrl}
                    download
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Dataset</span>
                  </a>
                )}

                {project.driveUrl && (
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Redirect Button */}
        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <span>Explore All Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}