"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Filter,
  BarChart2,
  Database,
  FileSpreadsheet,
  Layers,
  Download,
  ChevronLeft,
  ChevronRight,
  Folder,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";
import { Project } from "@/types";

const categories = ["All", "Power BI", "Advance Excel", "Python", "SQL", "Tableau"];

// Image Carousel Component for Multiple Screenshots
function ImageCarousel({ images, title }: { images?: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-52 bg-slate-950 p-4 text-center border-b border-white/5">
        <Folder className="w-10 h-10 text-cyan-400 mb-2" />
        <span className="text-xs font-bold text-gray-400">PROJECT PREVIEW</span>
      </div>
    );
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-52 bg-slate-950 border-b border-white/5 overflow-hidden group/slider">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} screenshot ${currentIndex + 1}`}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous screenshot"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-cyan-500 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next screenshot"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/60 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hover:bg-cyan-500 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Carousel Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to screenshot ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "w-5 bg-cyan-400" : "w-1.5 bg-white/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Portfolio Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Featured Data Projects
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Explore end-to-end Power BI dashboards, SQL architecture, Excel analytics models, and Data Science case studies.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {category === "Power BI" && <BarChart2 className="w-4 h-4" />}
                {category === "SQL" && <Database className="w-4 h-4" />}
                {category === "Advance Excel" && <FileSpreadsheet className="w-4 h-4" />}
                {category === "Python" && <Layers className="w-4 h-4" />}
                {category === "All" && <Filter className="w-4 h-4" />}
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence>
            {filteredProjects.map((project: Project, index: number) => (
              <motion.div
                key={project.id || project.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-blue-500/40 hover:bg-white/10 hover:-translate-y-1.5 hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                <div>
                  {/* Image Carousel */}
                  <ImageCarousel images={project.images} title={project.title} />

                  <div className="p-6 sm:p-7">
                    {/* Category & Company */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                        {project.category || "Power BI"}
                      </span>
                      {project.company && (
                        <span className="text-xs font-semibold text-gray-400">
                          {project.company}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 backdrop-blur-md transition-colors hover:border-blue-500/40 hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  {project.pdfUrl && (
                    <a
                      href={project.pdfUrl}
                      download
                      className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-400" />
                      <span>Download PDF</span>
                    </a>
                  )}

                  {project.driveUrl && (
                    <a
                      href={project.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Visit Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </main>
  );
}