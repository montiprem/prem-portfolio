"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  ExternalLink,
  FileText,
  CheckCircle2,
  Calendar,
  Building2,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";

// Certifications Data Array (Aap apni actual info aur images/pdf path update kar sakte ho)
const certificates = [
  {
    id: 1,
    title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300)",
    issuer: "Microsoft",
    issueDate: "2024",
    category: "Microsoft",
    skills: ["Power BI", "DAX", "Data Modeling", "Power Query", "RLS"],
    credentialUrl: "https://learn.microsoft.com/",
    pdfUrl: "/certificates/microsoft-pl300.pdf",
    image: "/certificates/pl300.png", // Image path in public/certificates/
  },
  {
    id: 2,
    title: "Microsoft Certified: Fabric Analytics Engineer Associate (DP-600)",
    issuer: "Microsoft",
    issueDate: "2025",
    category: "Microsoft",
    skills: ["Microsoft Fabric", "Delta Lake", "PySpark", "Direct Lake", "OneLake"],
    credentialUrl: "https://learn.microsoft.com/",
    pdfUrl: "/certificates/microsoft-dp600.pdf",
    image: "/certificates/dp600.png",
  },
  {
    id: 3,
    title: "Advanced SQL for Data Engineering & Analytics",
    issuer: "HackerRank / Coursera",
    issueDate: "2023",
    category: "SQL",
    skills: ["Complex Queries", "Window Functions", "Query Optimization", "Stored Procedures"],
    credentialUrl: "https://www.hackerrank.com/",
    pdfUrl: "/certificates/sql-advanced.pdf",
    image: "/certificates/sql.png",
  },
];

const categories = ["All", "Microsoft", "SQL"];

export default function CertificationsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCertificates =
    selectedCategory === "All"
      ? certificates
      : certificates.filter((cert) => cert.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Verified Credentials
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Certifications & Badges
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Industry-recognized certifications in Microsoft Power BI, Microsoft Fabric, SQL, and Data Engineering.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat === "All" && <Filter className="w-3.5 h-3.5" />}
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Certifications Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredCertificates.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-card border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative w-full h-48 bg-slate-900 border-b border-white/5 flex items-center justify-center overflow-hidden">
                    {/* Placeholder fallback or Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="p-4 relative z-20 text-center flex flex-col items-center">
                      <Award className="w-12 h-12 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <span className="text-xs text-gray-300 font-medium">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-blue-400" />
                        {cert.issuer}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                        Issued {cert.issueDate}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] text-gray-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions (View PDF / Verify Link) */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>View PDF</span>
                  </a>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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