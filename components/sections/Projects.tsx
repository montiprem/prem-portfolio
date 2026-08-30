"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Sparkles,
  Download,
  ArrowRight,
  Database,
  Play,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Container from "../ui/Container";
import { projects } from "@/data/projects";
import { Project } from "@/types";

// Helper component for tech stack fallback previews
function ProjectPreviewHeader({
  images,
  title,
  category,
}: {
  images?: string[];
  title: string;
  category?: string;
}) {
  if (images && images.length > 0) {
    const encodedImagePath = encodeURI(images[0]);
    return (
      <Image
        src={encodedImagePath}
        alt={title}
        fill
        unoptimized
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 dark:from-[#0b1329] dark:via-[#090d16] dark:to-[#04070d] flex flex-col items-center justify-center p-4 text-center overflow-hidden transition-colors duration-300">
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />

      {category === "Python" && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            🐍
          </div>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-yellow-700 dark:text-yellow-300 uppercase">
            Python Script &amp; Model
          </span>
        </div>
      )}

      {category === "SQL" && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            🗄️
          </div>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-cyan-700 dark:text-cyan-300 uppercase">
            SQL Database &amp; Queries
          </span>
        </div>
      )}

      {category === "Advance Excel" && (
        <div className="flex flex-col items-center gap-1.5">
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
            📊
          </div>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-emerald-700 dark:text-emerald-300 uppercase">
            Excel Model &amp; Analytics
          </span>
        </div>
      )}

      {category !== "Python" &&
        category !== "SQL" &&
        category !== "Advance Excel" && (
          <div className="flex flex-col items-center gap-1.5">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-3xl group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>
            <span className="text-[11px] font-mono font-semibold tracking-wider text-blue-700 dark:text-blue-300 uppercase">
              {category || "Analytics"} Project
            </span>
          </div>
        )}
    </div>
  );
}

export default function Projects() {
  const [activeEmbed, setActiveEmbed] = useState<{ title: string; embedName: string } | null>(null);

  // Homepage par scrolling balance rakhne ke liye top 3 projects show honge
  const featuredProjects = projects.slice(0, 3);

  return (
    <section
      id="projects"
      className="relative py-20 bg-transparent overflow-hidden text-foreground transition-colors duration-300"
    >
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />


      <Container className="relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> MY WORK
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-slate-600 dark:text-gray-400 mt-3 text-sm sm:text-base">
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
              className="group relative rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-blue-500/40 hover:bg-white dark:hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-xl dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
            >
              <div>
                {/* Thumbnail Header with Dynamic Tech Badges */}
                <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-white/5 overflow-hidden">
                  <ProjectPreviewHeader
                    images={project.images}
                    title={project.title}
                    category={project.category}
                  />
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                      {project.category || "Power BI"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 backdrop-blur-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="p-6 pt-0 flex flex-wrap items-center gap-2.5">
                {project.pdfUrl && (
                  <a
                    href={project.pdfUrl}
                    download
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>PDF</span>
                  </a>
                )}

                {project.datasetUrl && (
                  <a
                    href={project.datasetUrl}
                    download
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Database className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Dataset</span>
                  </a>
                )}

                {project.tableauEmbedName ? (
                  <button
                    onClick={() =>
                      setActiveEmbed({
                        title: project.title,
                        embedName: project.tableauEmbedName!,
                      })
                    }
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>View Live</span>
                  </button>
                ) : project.driveUrl ? (
                  <a
                    href={project.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[90px] py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : null}
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

      {/* LIVE TABLEAU EMBED MODAL */}
      {activeEmbed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-6xl h-[85vh] rounded-3xl border border-slate-300 dark:border-white/15 bg-transparent p-4 shadow-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/10 px-2">
              <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> {activeEmbed.title}
              </h3>
              <button
                onClick={() => setActiveEmbed(null)}
                className="p-1.5 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-slate-300 dark:hover:bg-white/20 transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full grow mt-3 rounded-2xl overflow-hidden bg-slate-100 dark:bg-white/5">
              <iframe
                src={`https://public.tableau.com/views/${activeEmbed.embedName}?:showVizHome=no&:embed=true`}
                className="w-full h-full border-0"
                title={activeEmbed.title}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}