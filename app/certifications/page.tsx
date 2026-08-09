"use client";

import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  FileText,
  Calendar,
  Building2,
  Sparkles,
  BarChart3,
  Globe,
  Code,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { LinkedinIcon, GithubIcon } from "@/components/ui/BrandIcons";

// 1. FEATURED CERTIFICATIONS (Top Cards Grid)
const featuredCertificates = [
  {
    id: 1,
    title: "C Language Basic to Advanced Level",
    issuer: "Udemy",
    issueDate: "2023",
    credentialId: "UC-CLANG-2023",
    skills: ["C Language", "Data Structures", "Pointers", "Memory Management"],
    credentialUrl:
      "https://drive.google.com/file/d/1gqTWOubZdZiiyrn7MF1-ynwZbx1yY498/view?usp=sharing",
    pdfUrl:
      "https://drive.google.com/file/d/1gqTWOubZdZiiyrn7MF1-ynwZbx1yY498/view?usp=sharing",
    image: "/certificates/C Language basic to Advanced Level.......jpg",
  },
  {
    id: 2,
    title: "Python for Data Science (PY0101EN)",
    issuer: "IBM / Cognitive Class",
    issueDate: "2023",
    credentialId: "IBM-PY0101EN-2023",
    skills: ["Python", "Pandas", "NumPy", "Data Analysis", "API Calls"],
    credentialUrl:
      "https://drive.google.com/file/d/1-5teNy8zYNkT0zrK08enRokkw2OlvWP6/view?usp=drive_link",
    pdfUrl: "/certificates/IBM PY0101EN Certificate _ Cognitive Class.pdf",
    image: "/certificates/IBM PY0101EN Certificate _ Cognitive Class.png",
  },
  {
    id: 3,
    title: "Certificate of Appreciation (5th Position)",
    issuer: "Gulzar Group of Institutions / MoE",
    issueDate: "12th May 2023",
    credentialId: "GGI/MIC/2023/2032",
    skills: ["Public Speaking", "Social Campaign", "MoE Innovation Council"],
    credentialUrl:
      "https://drive.google.com/file/d/129irflLjSS7ZEvpgwqk0COIHVBqiKSCc/view?usp=drive_link",
    pdfUrl: "/certificates/Prem mandal _CERTIFICATE OF APPRECIATION.pdf",
    image: "/certificates/Certificate of Appreciation (5th Position).png",
  },
  {
    id: 4,
    title: "Technohacks Data Analytics Internship",
    issuer: "Technohacks EduTech",
    issueDate: "2023",
    credentialId: "TH-INT-2023-882",
    skills: ["Data Analytics", "Practical Projects", "Visualization"],
    credentialUrl:
      "https://drive.google.com/file/d/1-WHVL1ciHkBdhhMLSUHXyfo6AdcXXkn-/view?usp=drive_link",
    pdfUrl:
      "/certificates/Technohacks Internship Certification Technohacks Internship.pdf",
    image:
      "/certificates/Technohacks Internship Certification Technohacks Internship.png",
  },
  {
    id: 5,
    title: "Data Science Foundation Certificate",
    issuer: "Data Science Institute",
    issueDate: "2023",
    credentialId: "DS-FOUND-2023",
    skills: ["Data Science", "Python", "EDA", "Statistics"],
    credentialUrl:
      "https://drive.google.com/file/d/1CKGwlDffkHoi_X-VF0FHQotB8Ao133AE/view?usp=drive_link",
    pdfUrl:
      "/certificates/Data Science Foundation Certificate Prem Mandal.pdf",
    image:
      "/certificates/Data Science Foundation Certificate Prem Mandal.png",
  },
  {
    id: 6,
    title: "Data Analytics and Visualization Virtual Experience",
    issuer: "Accenture / Forage",
    issueDate: "August 2023",
    credentialId: "DtCAzgbup8QGy2QYc",
    skills: [
      "Data Cleaning",
      "Data Modeling",
      "Data Visualization",
      "Storytelling",
    ],
    credentialUrl:
      "https://docs.google.com/document/d/1SGh_HuOBIj2BqLR9ENum3fmjFEEzQ5G2mWDWIOayZh8/edit?usp=sharing",
    pdfUrl:
      "https://docs.google.com/document/d/1SGh_HuOBIj2BqLR9ENum3fmjFEEzQ5G2mWDWIOayZh8/edit?usp=sharing",
    image: "/certificates/Data Analytics and Visualization certificate.png",
  },
];

// 2. ADDITIONAL CERTIFICATIONS (List View)
const additionalCertifications = [
  {
    title: "Excel for Beginners",
    issuer: "Great Learning",
    url: "/certificates/Excel for Beginners.pdf",
  },
  {
    title: "Probability and Statistics using Python",
    issuer: "Infosys Springboard",
    url: "/certificates/Probability and Statistics using python Infosys.pdf",
  },
  {
    title: "Probability Distribution using Python",
    issuer: "Infosys Springboard",
    url: "/certificates/Probability Distribution using Python Infosys.pdf",
  },
  {
    title: "Programming in C",
    issuer: "Infosys Springboard",
    url: "/certificates/programming in c Infosys.pdf",
  },
  {
    title: "Statistical Inference using Python",
    issuer: "Infosys Springboard",
    url: "/certificates/Statistical Inference using Python infosys.pdf",
  },
  {
    title: "Python Fundamentals for Beginners",
    issuer: "Great Learning",
    url: "/certificates/Python Fundamentals for Beginners greatlearning.pdf",
  },
  {
    title: "Introduction to Data Science",
    issuer: "Infosys Springboard",
    url: "/certificates/Introduction to Data Science Certificate [Prem Mandal].pdf",
  },
];

// 3. DATA COMMUNITY PRESENCE PLATFORMS
const communityPlatforms = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/premmandal/",
    icon: LinkedinIcon,
    borderColor: "hover:border-blue-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(59,130,246,0.35)]",
    badge: "55K+ Network",
    isBrand: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/montiprem",
    icon: GithubIcon,
    borderColor: "hover:border-cyan-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    badge: "Repos & Code",
    isBrand: true,
  },
  {
    name: "Tableau Public",
    href: "https://public.tableau.com/app/profile/premmandal/vizzes",
    icon: BarChart3,
    borderColor: "hover:border-amber-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.35)]",
    badge: "Interactive Vizzes",
    isBrand: false,
  },
  {
    name: "Kaggle",
    href: "https://www.kaggle.com/",
    icon: Globe,
    borderColor: "hover:border-sky-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(14,165,233,0.35)]",
    badge: "Datasets & Notebooks",
    isBrand: false,
  },
  {
    name: "Credly",
    href: "https://www.credly.com/",
    icon: Award,
    borderColor: "hover:border-emerald-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(16,185,129,0.35)]",
    badge: "Badges & Certs",
    isBrand: false,
  },
  {
    name: "HackerRank",
    href: "https://www.hackerrank.com/",
    icon: Code,
    borderColor: "hover:border-teal-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(20,184,166,0.35)]",
    badge: "Problem Solving",
    isBrand: false,
  },
  {
    name: "Medium",
    href: "https://medium.com/",
    icon: BookOpen,
    borderColor: "hover:border-indigo-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(99,102,241,0.35)]",
    badge: "Data Blogs",
    isBrand: false,
  },
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-3.5 py-1.5 rounded-full border border-cyan-500/20 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Verified Credentials
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
              Certifications &amp; Badges
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-4 text-base sm:text-lg">
              Industry certifications in Data Analytics, Python, IBM, Accenture, and Software Engineering.
            </p>
          </motion.div>
        </div>

        {/* SECTION 1: FEATURED CERTIFICATIONS */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
            <Sparkles className="w-5 h-5 text-amber-500 dark:text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Featured Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCertificates.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Top Thumbnail Box */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-slate-900 dark:via-blue-950 dark:to-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-center overflow-hidden">
                    {cert.image ? (
                      <Image
                        src={cert.image}
                        alt={cert.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="p-4 relative z-20 text-center flex flex-col items-center">
                        <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-2">
                          <Award className="w-8 h-8 group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white tracking-wide">
                          {cert.issuer}
                        </span>
                        <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono mt-1">
                          VERIFIED CREDENTIAL
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 dark:from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 mb-3">
                      <span className="flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400">
                        <Building2 className="w-3.5 h-3.5" />
                        {cert.issuer}
                      </span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500" />
                        {cert.issueDate}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                      {cert.title}
                    </h3>

                    <p className="text-[11px] font-mono text-slate-500 dark:text-gray-400 mt-2">
                      Reference No: <span className="text-slate-800 dark:text-gray-200">{cert.credentialId}</span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] text-slate-700 dark:text-gray-300 bg-slate-200/60 dark:bg-white/5 border border-slate-300 dark:border-white/10 px-2 py-0.5 rounded-md font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <a
                    href={cert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>View PDF</span>
                  </a>

                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 2: ADDITIONAL CERTIFICATIONS */}
        <div className="bg-slate-50/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-sm dark:shadow-2xl mb-20">
          <div className="mb-8 pb-3 border-b border-slate-200 dark:border-white/10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Additional Certifications</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
              Foundational courses, specialized learning modules, and online achievements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {additionalCertifications.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-white/5 transition-all text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 group-hover:scale-125 transition-transform shrink-0" />
                <span className="text-xs sm:text-sm font-medium flex-1">
                  {item.title} <span className="text-slate-500 dark:text-gray-400 font-normal">(by {item.issuer})</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 dark:text-gray-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors shrink-0 opacity-0 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        {/* SECTION 3: MY PRESENCE IN THE DATA COMMUNITY */}
        <div className="relative rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-8 sm:p-12 text-center text-foreground shadow-sm dark:shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> DIGITAL FOOTPRINT
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            My Presence in the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Data Community
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Engaging, building dashboards, and sharing analytical solutions across leading global platforms.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {communityPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group relative p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 ${platform.borderColor} ${platform.glowColor} flex flex-col items-center justify-between text-center shadow-sm`}
                >
                  <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-white transition-all duration-300">
                    {platform.isBrand ? (
                      <Icon size={26} />
                    ) : (
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    )}
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {platform.name}
                    </h3>
                    <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-gray-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mt-1 block">
                      {platform.badge}
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </Container>
    </main>
  );
}