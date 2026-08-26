"use client";

import { motion } from "framer-motion";
import {
  BarChart2,
  Database,
  Cloud,
  Code2,
  FileSpreadsheet,
  PieChart,
  Sparkles,
} from "lucide-react";
import Container from "../ui/Container";

const skillCategories = [
  {
    title: "Power BI",
    icon: BarChart2,
    subtitle: "KEY SKILLS:",
    // Dynamic theme classes
    lightBg: "bg-amber-500/5 dark:bg-amber-500/10",
    border: "border-amber-200/80 dark:border-amber-500/20 hover:border-amber-400",
    shadow: "shadow-lg shadow-amber-500/5 hover:shadow-xl hover:shadow-amber-500/15",
    accentText: "text-amber-600 dark:text-amber-400",
    skills: [
      "Power Query & M-Code Data Transformation",
      "Data Modeling (Star / Snowflake Schema)",
      "Advanced DAX & Complex Calculations",
      "Connecting to Multiple Heterogeneous Data Sources",
      "Creating Interactive Executive Dashboards",
      "Power BI Service, Gateway Setup & RLS",
    ],
  },
  {
    title: "SQL",
    icon: Database,
    subtitle: "KEY EXPERTISE:",
    lightBg: "bg-blue-500/5 dark:bg-blue-500/10",
    border: "border-blue-200/80 dark:border-blue-500/20 hover:border-blue-400",
    shadow: "shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/15",
    accentText: "text-blue-600 dark:text-blue-400",
    skills: [
      "DML (Data Manipulation Language)",
      "DDL (Data Definition Language)",
      "Window Functions & Advanced CTEs",
      "Date & Time Functions & Aggregations",
      "Complex Joins & Subqueries",
      "Writing Queries for ETL, Cleaning & Transformation",
    ],
  },
  {
    title: "Microsoft Fabric & Azure",
    icon: Cloud,
    subtitle: "ENTERPRISE CLOUD BI:",
    lightBg: "bg-purple-500/5 dark:bg-purple-500/10",
    border: "border-purple-200/80 dark:border-purple-500/20 hover:border-purple-400",
    shadow: "shadow-lg shadow-purple-500/5 hover:shadow-xl hover:shadow-purple-500/15",
    accentText: "text-purple-600 dark:text-purple-400",
    skills: [
      "OneLake Storage Architecture",
      "Lakehouses & Data Warehouses",
      "Data Factory Pipelines (ETL/ELT)",
      "Direct Lake Semantic Models",
      "Azure Data Lake Storage (ADLS Gen2)",
    ],
  },
  {
    title: "Python",
    icon: Code2,
    subtitle: "CORE LIBRARIES FOR DATA ANALYSIS:",
    lightBg: "bg-emerald-500/5 dark:bg-emerald-500/10",
    border: "border-emerald-200/80 dark:border-emerald-500/20 hover:border-emerald-400",
    shadow: "shadow-lg shadow-emerald-500/5 hover:shadow-xl hover:shadow-emerald-500/15",
    accentText: "text-emerald-600 dark:text-emerald-400",
    skills: [
      "Pandas & NumPy for Data Manipulation",
      "Matplotlib & Seaborn for Visualization",
      "Jupyter Notebooks & Automated Scripts",
      "Data Cleaning & Exploratory Data Analysis (EDA)",
    ],
  },
  {
    title: "Advanced Excel",
    icon: FileSpreadsheet,
    subtitle: "KEY EXPERTISE:",
    lightBg: "bg-teal-500/5 dark:bg-teal-500/10",
    border: "border-teal-200/80 dark:border-teal-500/20 hover:border-teal-400",
    shadow: "shadow-lg shadow-teal-500/5 hover:shadow-xl hover:shadow-teal-500/15",
    accentText: "text-teal-600 dark:text-teal-400",
    skills: [
      "Complex Formulas (XLOOKUP, INDEX/MATCH)",
      "Pivot Tables & Dynamic Dashboards",
      "Power Query in Excel",
      "Data Validation & Conditional Formatting",
    ],
  },
  {
    title: "Statistics & Modeling",
    icon: PieChart,
    subtitle: "KEY EXPERTISE:",
    lightBg: "bg-cyan-500/5 dark:bg-cyan-500/10",
    border: "border-cyan-200/80 dark:border-cyan-500/20 hover:border-cyan-400",
    shadow: "shadow-lg shadow-cyan-500/5 hover:shadow-xl hover:shadow-cyan-500/15",
    accentText: "text-cyan-600 dark:text-cyan-400",
    skills: [
      "Descriptive & Inferential Statistics",
      "Hypothesis Testing & A/B Testing",
      "Regression & Correlation Analysis",
      "KPI & Metrics Definition",
    ],
  },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-transparent relative overflow-hidden transition-colors duration-300">
      <Container>
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500" /> TECHNICAL CAPABILITIES
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Skills &amp;{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {skillCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`p-6 sm:p-7 rounded-3xl border bg-white dark:bg-slate-900/60 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 ${cat.border} ${cat.shadow} ${cat.lightBg} flex flex-col justify-between`}
              >
                <div>
                  {/* Header Row */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <div className={`p-3 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 ${cat.accentText} shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Subtitle */}
                  <p className={`text-[11px] font-mono font-bold uppercase tracking-wider mb-3.5 ${cat.accentText}`}>
                    {cat.subtitle}
                  </p>

                  {/* Bullet List */}
                  <ul className="space-y-2.5">
                    {cat.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="text-xs sm:text-sm text-slate-700 dark:text-gray-300 flex items-start gap-2.5 leading-relaxed font-medium"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${cat.accentText} bg-current`} />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}