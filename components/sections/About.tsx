"use client";

import Image from "next/image";
import {
  MapPin,
  Briefcase,
  Zap,
  Download,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

const techStack = [
  "Power BI",
  "SQL",
  "DAX",
  "Power Query",
  "Microsoft Fabric",
  "Azure",
  "Python",
  "Excel",
];

const timelineData = [
  {
    year: "2024",
    company: "Super Smelters Ltd",
    role: "Power BI Developer",
    status: null,
  },
  {
    year: "2025",
    company: "Utkarsh India Ltd",
    role: "Senior Data Analyst",
    status: null,
  },
];

const educationData = [
  {
    degree: "B.Com. (Bachelor of Commerce)",
    year: "2022 - 2025",
    institution: "Sikkim Professional University, Gangtok",
  },
  {
    degree: "12th Standard (JAC)",
    year: "2019 - 2021",
    institution: "Model School Bengabad, Jharkhand",
  },
  {
    degree: "10th Standard (CBSE)",
    year: "2018 - 2019",
    institution: "Anandalaya Public School Madhupur, Jharkhand",
  },
];

const statsData = [
  { value: "2+", label: "Years Experience" },
  { value: "55K+", label: "LinkedIn Network" },
  { value: "15+", label: "Dashboards Built" },
  { value: "100%", label: "Client Focus" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 bg-transparent overflow-hidden text-foreground transition-colors duration-300"
    >
      {/* Background Lights & Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />



      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> ABOUT ME
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Turning Data Into{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Business Decisions
            </span>
          </h2>
        </motion.div>

        {/* 40% Left | 60% Right Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (40%) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex justify-center w-full"
            >

              {/* Photo Frame with Glowing Ring */}
              <div className="relative group h-72 w-72 sm:h-80 sm:w-80 overflow-hidden rounded-3xl border-2 border-blue-500/50 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-transparent p-2 shadow-[0_0_80px_rgba(59,130,246,0.35)] transition-all duration-500 hover:scale-[1.03] hover:border-cyan-400">
                <div className="relative h-full w-full overflow-hidden rounded-[20px]">
                  <Image
                    src="/images/prem.jpeg"
                    alt="Prem Mandal - Senior Power BI Developer and Data Analyst India"
                    title="Prem Mandal - Data Analyst"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Info Badge Glass Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-sm mt-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-5 backdrop-blur-xl shadow-xl dark:shadow-2xl space-y-3.5 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  <MapPin className="w-4 h-4 shrink-0" />
                </div>
                <span className="font-medium">Kolkata, India</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <Briefcase className="w-4 h-4 shrink-0" />
                </div>
                <span className="flex items-center gap-2 font-medium">
                  Open to Work
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-200">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Zap className="w-4 h-4 shrink-0" />
                </div>
                <span className="font-medium">Immediate Joiner</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-6"
            >
              <a
                href="/resume/resume.pdf"
                download
                className="group flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-300 font-semibold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-105 active:scale-95 text-xs sm:text-sm cursor-pointer"
              >
                <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Resume</span>
              </a>

              <a
                href="#contact"
                className="group flex-1 px-4 py-3 rounded-xl border border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 backdrop-blur-md hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black text-slate-900 dark:text-white transition-all duration-300 font-semibold flex items-center justify-center gap-2 hover:scale-105 text-xs sm:text-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect</span>
              </a>
            </motion.div>

            {/* EDUCATION SECTION (LEFT COLUMN) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full max-w-sm mt-8 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Education
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                {educationData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-blue-500/40 hover:bg-white dark:hover:bg-white/10 shadow-sm"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-snug">
                        {item.degree}
                      </h4>
                      {item.year && (
                        <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0 font-mono">
                          {item.year}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-gray-400 font-medium mt-1">
                      {item.institution}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (60%) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 text-slate-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed"
            >
              <p>
                I&apos;m <strong className="text-slate-900 dark:text-white font-semibold">Prem Mandal</strong>, a Senior BI Developer & Data Analyst with 2+ years of hands-on experience converting raw enterprise data into executive dashboards across manufacturing, steel, and tea sectors.
              </p>
              <p>
                I specialize in end-to-end analytics — from architecting data models (Star/Snowflake) and writing complex DAX queries to orchestrating semantic models in Power BI Service and Microsoft Fabric.
              </p>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
                Core Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/20 hover:text-blue-600 dark:hover:text-white hover:scale-105 hover:-translate-y-0.5 cursor-default shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-3"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-4">
                Career Journey
              </h3>

              <div className="relative pl-2 sm:pl-4 border-l border-slate-200 dark:border-white/10 space-y-4">
                {timelineData.map((item) => (
                  <div key={item.company} className="relative pl-6 group">
                    <div className="absolute -left-[5px] top-4 h-2.5 w-2.5 rounded-full border border-blue-500 bg-transparent group-hover:bg-blue-500 group-hover:scale-150 transition-all duration-300 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />

                    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-white dark:hover:bg-white/10 hover:-translate-y-0.5 flex flex-wrap items-center justify-between gap-2 shadow-sm dark:shadow-lg">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                            {item.year}
                          </span>
                          <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                            {item.company}
                          </h4>
                          {item.status && (
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                              {item.status}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Stats Cards Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {statsData.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 p-4 text-center backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1 shadow-sm"
                >
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
}