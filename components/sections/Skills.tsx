"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  BarChart3,
  Database,
  Cloud,
  FileSpreadsheet,
  Code2,
  LineChart,
} from "lucide-react";
import Container from "../ui/Container";

const skillCategories = [
  {
    title: "Power BI",
    icon: BarChart3,
    color: "from-amber-500/20 via-amber-500/10 to-transparent border-amber-500/30 text-amber-400",
    sections: [
      {
        subtitle: "Key Skills:",
        points: [
          "Power Query & M-Code Data Transformation",
          "Data Modeling (Star / Snowflake Schema)",
          "Advanced DAX & Complex Calculations",
          "Connecting to Multiple Heterogeneous Data Sources",
          "Creating Interactive Executive Dashboards",
          "Power BI Service, Gateway Setup & RLS",
        ],
      },
    ],
  },
  {
    title: "SQL",
    icon: Database,
    color: "from-blue-500/20 via-blue-500/10 to-transparent border-blue-500/30 text-blue-400",
    sections: [
      {
        subtitle: "Key Expertise:",
        points: [
          "DML (Data Manipulation Language)",
          "DDL (Data Definition Language)",
          "Window Functions & Advanced CTEs",
          "Date & Time Functions & Aggregations",
          "Complex Joins & Subqueries",
          "Writing Queries for ETL, Cleaning & Transformation",
        ],
      },
    ],
  },
  {
    title: "Microsoft Fabric & Azure",
    icon: Cloud,
    color: "from-purple-500/20 via-purple-500/10 to-transparent border-purple-500/30 text-purple-400",
    sections: [
      {
        subtitle: "Enterprise Cloud BI:",
        points: [
          "OneLake Storage Architecture",
          "Lakehouses & Data Warehouses",
          "Data Factory Pipelines (ETL/ELT)",
          "Direct Lake Semantic Models",
          "Azure Data Lake Storage (ADLS Gen2)",
        ],
      },
    ],
  },
  {
    title: "Python",
    icon: Code2,
    color: "from-emerald-500/20 via-emerald-500/10 to-transparent border-emerald-500/30 text-emerald-400",
    sections: [
      {
        subtitle: "Core Libraries for Data Analysis:",
        points: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
      },
      {
        subtitle: "Automation & Scripting:",
        points: [
          "Automated Data Cleaning",
          "Custom Data Processing Scripts",
        ],
      },
    ],
  },
  {
    title: "Advanced Excel",
    icon: FileSpreadsheet,
    color: "from-green-500/20 via-green-500/10 to-transparent border-green-500/30 text-green-400",
    sections: [
      {
        subtitle: "Key Expertise:",
        points: [
          "Complex Formulas (XLOOKUP, INDEX/MATCH)",
          "Pivot Tables & Dynamic Charts",
          "Power Query & Power Pivot Integration",
          "Data Modeling & Business Analysis",
          "Transforming & Cleaning Messy Datasets",
        ],
      },
    ],
  },
  {
    title: "Statistics & Modeling",
    icon: LineChart,
    color: "from-cyan-500/20 via-cyan-500/10 to-transparent border-cyan-500/30 text-cyan-400",
    sections: [
      {
        subtitle: "Key Expertise:",
        points: [
          "Descriptive Statistics & Trend Analysis",
          "Measures of Central Tendency & Dispersion",
          "KPI Architecture & Business Metrics",
          "Data Warehouse Normalization Strategies",
        ],
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 bg-background overflow-hidden text-white"
    >
      {/* Background Lights & Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Glows */}
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
            <Sparkles className="w-4 h-4" /> TECHNICAL CAPABILITIES
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Skills &amp;{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
        </motion.div>

        {/* 3-Column Detailed Skill Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skillCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group rounded-2xl border bg-gradient-to-b ${category.color} p-6 sm:p-7 backdrop-blur-xl transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] flex flex-col justify-between`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center gap-3 pb-4 mb-5 border-b border-white/10">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      {category.title}
                    </h3>
                  </div>

                  {/* Bullet Sub-sections */}
                  <div className="space-y-4">
                    {category.sections.map((sec, secIdx) => (
                      <div key={secIdx}>
                        <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">
                          {sec.subtitle}
                        </p>
                        <ul className="space-y-1.5">
                          {sec.points.map((pt, ptIdx) => (
                            <li
                              key={ptIdx}
                              className="text-xs sm:text-sm text-gray-300 flex items-start gap-2 leading-relaxed"
                            >
                              <span className="text-blue-400 font-bold shrink-0">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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