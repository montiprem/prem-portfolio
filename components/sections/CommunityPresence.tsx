"use client";

import { motion } from "framer-motion";
import {
  LinkedinIcon,
  GithubIcon,
} from "../ui/BrandIcons";
import { BarChart3, Award, Globe, Code, BookOpen, Sparkles } from "lucide-react";
import Container from "../ui/Container";

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
  /* YOUTUBE LINK TEMPORARILY COMMENTED OUT UNTIL READY
  {
    name: "YouTube",
    href: "https://youtube.com/",
    icon: Youtube,
    borderColor: "hover:border-red-500/60",
    glowColor: "group-hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]",
    badge: "Tech Content",
    isBrand: false,
  },
  */
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

export default function CommunityPresence() {
  return (
    <section className="py-24 relative overflow-hidden bg-background text-foreground border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400" /> DIGITAL FOOTPRINT
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            My Presence in the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Data Community
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-base text-slate-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Engaging, building dashboards, and sharing analytical solutions across leading global platforms.
          </p>
        </motion.div>

        {/* Dynamic Glass Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
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
                className={`group relative p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-xl ${platform.borderColor} ${platform.glowColor} flex flex-col items-center justify-between text-center`}
              >
                {/* Platform Icon Container */}
                <div className="p-3 sm:p-4 rounded-xl bg-slate-200/80 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-white transition-all duration-300">
                  {platform.isBrand ? (
                    <Icon size={26} />
                  ) : (
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  )}
                </div>

                {/* Title & Badge */}
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
      </Container>
    </section>
  );
}