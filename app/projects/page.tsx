"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Filter, BarChart2, Database, FileSpreadsheet, Layers, Code } from "lucide-react";
import Container from "@/components/ui/Container";

// Projects Data Structure
const projectsData = [
  {
    id: 1,
    title: "Enterprise Sales Analytics Dashboard",
    category: "Power BI",
    description: "End-to-end sales performance tracking dashboard with complex DAX measures, row-level security, and automated data refresh.",
    tags: ["Power BI", "DAX", "SQL", "Power Query"],
    image: "/images/projects/sales-dashboard.png",
    github: "https://github.com/montiprem",
    liveDemo: "https://public.tableau.com/app/profile/premmandal/vizzes",
    highlights: ["Revenue Growth Insights", "15+ DAX Measures", "RLS Configured"],
  },
  {
    id: 2,
    title: "SQL Data Warehouse & ETL Pipeline",
    category: "SQL",
    description: "Designed a relational database schema and built automated ETL pipelines to process raw data into structured analytics tables.",
    tags: ["SQL", "PostgreSQL", "ETL", "Data Modeling"],
    image: "/images/projects/sql-etl.png",
    github: "https://github.com/montiprem",
    liveDemo: "",
    highlights: ["Query Optimization", "3NF Normalization", "Automated Scripts"],
  },
  {
    id: 3,
    title: "Microsoft Fabric Lakehouse Solution",
    category: "Fabric",
    description: "Unified analytics solution built on Microsoft Fabric, combining Data Factory pipelines, Delta Tables, and Direct Lake Power BI reports.",
    tags: ["Microsoft Fabric", "Pyspark", "Delta Lake", "Power BI"],
    image: "/images/projects/fabric-lakehouse.png",
    github: "https://github.com/montiprem",
    liveDemo: "",
    highlights: ["OneLake Architecture", "Direct Lake Mode", "Real-time Analytics"],
  },
  {
    id: 4,
    title: "Financial Forecasting & Reconciliation",
    category: "Excel",
    description: "Advanced Excel financial model featuring dynamic Power Query transformations, VBA macros, and executive summary pivot reports.",
    tags: ["Excel", "Power Query", "VBA", "Financial Modeling"],
    image: "/images/projects/excel-finance.png",
    github: "https://github.com/montiprem",
    liveDemo: "",
    highlights: ["Automated Reconciliation", "Dynamic Dashboards", "Macro Powered"],
  },
];

const categories = ["All", "Power BI", "SQL", "Fabric", "Excel"];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Grid Background */}
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
            <span className="text-xs uppercase tracking-widest font-semibold text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20">
              Portfolio Showcase
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Featured Data Projects
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Explore end-to-end Power BI dashboards, SQL architecture, Fabric solutions, and advanced analytics case studies.
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
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {category === "Power BI" && <BarChart2 className="w-4 h-4" />}
                {category === "SQL" && <Database className="w-4 h-4" />}
                {category === "Fabric" && <Layers className="w-4 h-4" />}
                {category === "Excel" && <FileSpreadsheet className="w-4 h-4" />}
                {category === "All" && <Filter className="w-4 h-4" />}
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl group flex flex-col justify-between"
              >
                <div>
                  {/* Image Placeholder */}
                  <div className="relative h-48 sm:h-56 bg-slate-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-cyan-500/10 group-hover:scale-105 transition-transform duration-500" />
                    <span className="text-gray-500 text-sm font-mono tracking-wider">
                      [{project.category} Visual Report]
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.highlights.map((item, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] text-gray-300 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Links & Tags */}
                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-gray-400 font-mono">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-white/10 hover:border-gray-500 text-gray-300 hover:text-white transition-colors"
                        title="GitHub Code"
                      >
                        <Code className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all"
                      >
                        Live Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </main>
  );
}