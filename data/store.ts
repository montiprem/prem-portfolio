"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Download,
  Sparkles,
  Check,
  Tag,
  ExternalLink,
} from "lucide-react";
import Container from "@/components/ui/Container";

export interface StoreItem {
  id: string;
  title: string;
  description: string;
  category: "PBIT Template" | "DAX Cheat Sheet" | "Excel Workbook" | "Dataset";
  price: string;
  originalPrice?: string;
  downloadUrl?: string;
  previewImage?: string;
  features: string[];
  isFree?: boolean;
}

export const storeItems: StoreItem[] = [
  {
    id: "dark-mode-pbi-template",
    title: "Executive Dark Glassmorphism Power BI Template",
    description:
      "Pre-styled PBIT template featuring custom theme JSON, high-contrast KPI cards, and dynamic navigation buttons.",
    category: "PBIT Template",
    price: "Free",
    downloadUrl: "/downloads/dark-executive-template.pbit",
    features: [
      "Built-in Dark Glassmorphism Theme",
      "Pre-configured Date Table & DAX Measures",
      "Responsive Layouts (Desktop & Mobile View)",
    ],
    isFree: true,
  },
  {
    id: "sql-dax-cheat-sheet",
    title: "Ultimate DAX & Power Query Cheat Sheet (PDF)",
    description:
      "Quick reference guide covering top 50 DAX patterns, Time Intelligence formulas, and M-Query transformations.",
    category: "DAX Cheat Sheet",
    price: "Free",
    downloadUrl: "/downloads/dax-mquery-cheatsheet.pdf",
    features: [
      "Top 50 DAX Measure Formulas",
      "Context Transition Cheat Sheet",
      "M-Query Syntax Quick Reference",
    ],
    isFree: true,
  },
];

export default function StorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "PBIT Template", "DAX Cheat Sheet", "Excel Workbook", "Dataset"];

  const filteredItems =
    selectedCategory === "All"
      ? storeItems
      : storeItems.filter((item) => item.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-blue-600 dark:text-cyan-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Digital Resources
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 sm:mt-4 tracking-tight">
              BI Templates &amp; Resources
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-2 sm:mt-4 text-xs sm:text-lg leading-relaxed">
              Accelerate your analytics workflow with enterprise Power BI templates, DAX cheat sheets, and data tools.
            </p>
          </motion.div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Store Items Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all duration-500 hover:border-blue-500/40"
            >
              <div>
                {/* Badge & Category */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {item.price}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                  {item.description}
                </p>

                {/* Features List */}
                <ul className="mt-5 space-y-2">
                  {item.features.map((feat, fIdx) => (
                    <li
                      key={fIdx}
                      className="text-xs text-slate-700 dark:text-gray-300 flex items-start gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Download / Buy Button */}
              <div className="mt-8 pt-5 border-t border-slate-200 dark:border-white/10">
                {item.downloadUrl ? (
                  <a
                    href={item.downloadUrl}
                    download
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download {item.price === "Free" ? "Free" : "Resource"}</span>
                  </a>
                ) : (
                  <button className="w-full py-3 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-800 dark:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get Access</span>
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}