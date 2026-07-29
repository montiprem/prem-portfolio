"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Code2,
  Cloud,
  Terminal,
  Cpu,
  Sparkles,
  Layers,
  Wrench,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import Container from "../ui/Container";
import { skills, skillCategories } from "@/data/skills";

// Type-safe Icon Mapper
const iconMap: Record<string, LucideIcon> = {
  "Power BI": BarChart3,
  SQL: Database,
  DAX: LineChart,
  "Power Query": Layers,
  "Microsoft Fabric": Cloud,
  Azure: Cpu,
  Python: Code2,
  Excel: Terminal,
  default: Wrench,
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 bg-background overflow-hidden text-white"
    >
      {/* Background Ambient Glows & Grid Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Lights */}
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-[160px] pointer-events-none" />

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
            <Sparkles className="w-4 h-4" /> WHAT I USE
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Skills &amp;{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
              className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 transition-all duration-500 hover:border-blue-500/40 hover:bg-white/[0.07] hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 pb-4 mb-6 border-b border-white/10">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {category}
                  </h3>
                </div>

                {/* Skills Progress List */}
                <div className="space-y-6">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill, skillIdx) => {
                      const IconComponent =
                        iconMap[skill.name] || iconMap.default;

                      return (
                        <div key={skill.name} className="group/item">
                          <div className="flex justify-between items-center text-sm mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="p-1.5 rounded-lg bg-white/5 text-blue-400 group-hover/item:text-cyan-300 transition-colors">
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className="font-medium text-gray-200 group-hover/item:text-white transition-colors">
                                {skill.name}
                              </span>
                            </div>
                            <span className="text-xs font-semibold text-blue-400/90 font-mono">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Animated Bar Background */}
                          <div className="h-2.5 rounded-full bg-white/10 overflow-hidden p-1px relative">
                            {/* Framer Motion Animated Progress Fill */}
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 1.2,
                                delay: 0.2 + skillIdx * 0.1,
                                ease: "easeOut",
                              }}
                              className="h-full rounded-full bg-linear-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] relative"
                            >
                              {/* Edge Glow effect */}
                              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full blur-[1px]" />
                            </motion.div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}