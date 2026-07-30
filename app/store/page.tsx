"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Download,
  FileText,
  Layout,
  BookOpen,
  Filter,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";

// Store Items Data
const storeItems = [
  {
    id: 1,
    title: "Executive Power BI Dashboard Template",
    category: "Power BI",
    type: "Template",
    price: "$19",
    isFree: false,
    description: "Plug-and-play dark-themed Power BI template file (.pbit) with pre-formatted KPI cards, smooth navigation buttons, and color themes.",
    tags: ["PBIT File", "DAX Ready", "Dark Theme"],
    downloadUrl: "#",
  },
  {
    id: 2,
    title: "Data Analyst ATS Resume Template",
    category: "Resume",
    type: "PDF / Word",
    price: "Free",
    isFree: true,
    description: "Battle-tested resume template designed specifically for Data Analysts & BI Engineers that cracked 50+ interview calls.",
    tags: ["ATS Friendly", "Editable Docs", "Sample Metrics"],
    downloadUrl: "#",
  },
  {
    id: 3,
    title: "Top 100 SQL Interview Questions & Solutions",
    category: "Interview PDFs",
    type: "eBook",
    price: "$9",
    isFree: false,
    description: "Comprehensive guide covering LeetCode Hard/Medium SQL queries, Window Functions, Query Optimization, and Mock Questions.",
    tags: ["SQL", "PDF Guide", "Cheat Sheets"],
    downloadUrl: "#",
  },
  {
    id: 4,
    title: "Financial Modeling & Pivot Excel Workbook",
    category: "Dashboard Files",
    type: "Excel",
    price: "Free",
    isFree: true,
    description: "Advanced Excel spreadsheet with dynamic Power Query transformations, automated reconciliation formulas, and executive summary pivot reports.",
    tags: ["Excel", "VBA Macro", "Power Query"],
    downloadUrl: "#",
  },
  {
    id: 5,
    title: "Microsoft Fabric Lakehouse Architecture Blueprint",
    category: "Interview PDFs",
    type: "PDF Architecture",
    price: "$15",
    isFree: false,
    description: "Step-by-step visual blueprint for setting up OneLake, Delta Tables, PySpark Pipelines, and Direct Lake Power BI semantic models.",
    tags: ["Fabric", "Data Lake", "Architecture"],
    downloadUrl: "#",
  },
];

const categories = ["All", "Power BI", "Resume", "Interview PDFs", "Dashboard Files"];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? storeItems
      : storeItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Digital Asset Store
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Templates & Resources
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Download battle-tested Power BI templates, ATS resume formats, SQL interview guides, and dashboard source files.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat
                    ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat === "All" && <Filter className="w-4 h-4" />}
                {cat === "Power BI" && <Layout className="w-4 h-4" />}
                {cat === "Resume" && <FileText className="w-4 h-4" />}
                {cat === "Interview PDFs" && <BookOpen className="w-4 h-4" />}
                {cat === "Dashboard Files" && <Sparkles className="w-4 h-4" />}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Store Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-white/10 rounded-2xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-xl relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                      {item.type}
                    </span>
                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        item.isFree
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-white/10 text-white border border-white/10"
                      }`}
                    >
                      {item.price}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Instant Access
                  </span>
                  <a
                    href={item.downloadUrl}
                    className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl transition-all ${
                      item.isFree
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                        : "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-600/20"
                    }`}
                  >
                    {item.isFree ? (
                      <>
                        <Download className="w-3.5 h-3.5" /> Free Download
                      </>
                    ) : (
                      <>
                        Get Asset <ExternalLink className="w-3.5 h-3.5" />
                      </>
                    )}
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </main>
  );
}