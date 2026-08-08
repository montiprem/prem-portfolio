"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Sparkles, MapPin, ExternalLink } from "lucide-react";
import Container from "../ui/Container";

const experienceData = [
  {
    year: "2026 - Present",
    company: "Utkarsh India Ltd",
    companyUrl: "https://utkarshindia.in/",
    role: "Senior BI Developer",
    location: "Kolkata, India",
    status: "Current",
    description:
      "Leading enterprise Power BI & Microsoft Fabric architecture, building scalable semantic models, and driving data-driven decisions across departments.",
  },
  {
    year: "2025 - 2026",
    company: "Bhauram Jodhraj Pvt Ltd",
    companyUrl: "https://www.bhauramjodhraj.com/",
    role: "Senior BI Developer",
    location: "Kolkata, India",
    status: null,
    description:
      "Designed and deployed executive dashboards, optimized DAX queries for performance, and built automated data pipelines using Power Query and SQL.",
  },
  {
    year: "2024 - 2025",
    company: "Super Smelters Ltd",
    companyUrl: "https://supershakti.in/",
    role: "Power BI Developer",
    location: "Kolkata, India",
    status: null,
    description:
      "Created operational BI solutions, star schema data modeling, and automated KPI reporting for manufacturing and steel analytics.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 bg-background overflow-hidden text-white border-t border-white/5"
    >
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> CAREER PATH
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Work{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        {/* Timeline Wrapper */}
        <div className="relative max-w-5xl mx-auto">
          {/* Center Vertical Spine Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-indigo-500 -translate-x-1/2 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

          {/* Experience Cards */}
          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.company}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Center Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-20 flex items-center justify-center">
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                      <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-blue-400 bg-background shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                    </span>
                  </div>

                  {/* Alternating Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven
                        ? "md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12"
                    } ${!isEven && "md:ml-auto"}`}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -60 : 60,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.7,
                        delay: index * 0.15,
                        ease: "easeOut",
                      }}
                      className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:border-blue-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] text-left"
                    >
                      {/* Top Info Header */}
                      <div
                        className={`flex flex-wrap items-center gap-2 pb-3 mb-3 border-b border-white/10 ${
                          isEven ? "md:justify-between" : "justify-between"
                        }`}
                      >
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                            {item.role}
                            {item.status && (
                              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                {item.status}
                              </span>
                            )}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            {/* Interactive Company Link */}
                            <a
                              href={item.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 hover:underline"
                            >
                              <Briefcase className="w-3.5 h-3.5" />
                              <span>{item.company}</span>
                              <ExternalLink className="w-3 h-3 text-cyan-400" />
                            </a>

                            {/* Location Tag */}
                            <span className="text-xs text-gray-400 flex items-center gap-1 bg-white/5 px-2.5 py-0.5 rounded-md border border-white/5">
                              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                              <span>{item.location}</span>
                              <span className="text-xs">🇮🇳</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-300 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20 shrink-0">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{item.year}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}