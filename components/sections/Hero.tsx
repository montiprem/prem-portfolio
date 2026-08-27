"use client";

import Image from "next/image";
import {
  Mail,
  BarChart3,
  Eye,
  TrendingUp,
  Users,
  Award,
  ExternalLink,
  Download,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "../ui/Container";
import { GithubIcon, LinkedinIcon } from "../ui/BrandIcons";

const socials = [
  {
    href: "https://www.linkedin.com/in/premmandal/",
    label: "LinkedIn",
    icon: LinkedinIcon,
  },
  {
    href: "https://github.com/montiprem",
    label: "GitHub",
    icon: GithubIcon,
  },
  {
    href: "https://public.tableau.com/app/profile/premmandal/vizzes",
    label: "Tableau Public",
    icon: BarChart3,
  },
  {
    href: "mailto:jobs.premmandal@gmail.com",
    label: "Send Email",
    icon: Mail,
  },
];

interface SkillBadgeProps {
  name: string;
  className: string;
  delay: number;
  textColor: string;
  shouldReduceMotion: boolean | null;
  yOffset: number;
  duration: number;
  initialX: number;
  initialY: number;
}

function SkillBadge({ name, className, delay, textColor, shouldReduceMotion, yOffset, duration, initialX, initialY }: SkillBadgeProps) {
  // If user prefers reduced motion, skip the entrance travel animation
  const entranceAnimation = shouldReduceMotion
    ? { opacity: 1, scale: 1, x: 0, y: 0, filter: "blur(0px)" }
    : {
        opacity: [0, 0.8, 1],
        scale: [0.5, 1.05, 1],
        x: [initialX, 0],
        y: [initialY, 0],
        filter: ["blur(4px)", "blur(1px)", "blur(0px)"],
      };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5, x: initialX, y: initialY, filter: "blur(4px)" }}
      animate={entranceAnimation}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.2, 0.8, 0.2, 1],
        times: [0, 0.7, 1],
      }}
      className={`absolute rounded-lg sm:rounded-xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#0b1220]/95 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1 shadow-xl z-20 ${className}`}
    >
      <motion.div
        animate={{ y: [0, yOffset, 0] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 1, // Start float after entrance
        }}
        className="w-full h-full relative"
      >
        {/* Subtle glow pulse on arrival (only if not reduced motion) */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1] }}
            transition={{ duration: 0.6, delay: delay + 0.6 }}
            className={`absolute inset-0 rounded-lg sm:rounded-xl ${textColor.replace('text-', 'bg-').replace('-700', '-400').replace('-300', '-400')} blur-md opacity-20 pointer-events-none`}
          />
        )}
        <span className={`text-[10px] sm:text-xs font-semibold ${textColor}`}>{name}</span>
      </motion.div>
    </motion.div>
  );
}

function LinkedinStatsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="w-full max-w-lg bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl p-3 sm:p-5 shadow-2xl backdrop-blur-xl relative overflow-hidden mt-4 sm:mt-6 transition-all duration-300 hover:border-blue-500/40 hover:shadow-blue-500/10"
    >

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 pb-3.5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="p-2 sm:p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30">
            <LinkedinIcon size={18} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white">Prem Mandal</h3>
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Top Voice
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-gray-400">Senior Data Analyst & BI Specialist</p>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/premmandal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95"
        >
          Connect <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-3.5">
        <div className="relative p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
          <div className="flex items-center justify-start gap-1 text-slate-500 dark:text-gray-400 text-[10px] font-medium mb-1">
            <Users className="w-3 h-3 text-blue-500 dark:text-blue-400" />
            <span>Network</span>
          </div>
          <p className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white">55.4K+</p>
          <p className="text-[9px] text-slate-500 dark:text-gray-400 mt-0.5">Followers</p>
        </div>

        <div className="relative p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-transparent" />
          <div className="flex items-center justify-start gap-1 text-slate-500 dark:text-gray-400 text-[10px] font-medium mb-1">
            <TrendingUp className="w-3 h-3 text-emerald-500 dark:text-emerald-400" />
            <span>Reach</span>
          </div>
          <p className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white">382K+</p>
          <p className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">7-Day Imp</p>
        </div>

        <div className="relative col-span-2 sm:col-span-1 p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-center sm:text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-transparent" />
          <div className="flex items-center justify-center sm:justify-start gap-1 text-slate-500 dark:text-gray-400 text-[10px] font-medium mb-1">
            <Eye className="w-3 h-3 text-purple-500 dark:text-purple-400" />
            <span>Views</span>
          </div>
          <p className="text-sm sm:text-lg font-extrabold text-slate-900 dark:text-white">3,700+</p>
          <p className="text-[9px] text-slate-500 dark:text-gray-400 mt-0.5">Viewers</p>
        </div>
      </div>

      <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-gray-400 italic mt-2.5 text-center px-1">
        &quot;I&apos;m a data magician. I make boring data disappear and awesomeness appear.&quot;
      </p>
    </motion.div>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const skills = [
    { name: "Power BI 📊", className: "-top-1 left-0 sm:top-4 sm:left-4", delay: 0.1, textColor: "text-blue-700 dark:text-blue-300", yOffset: -4, duration: 4, initialX: 80, initialY: 80 },
    { name: "SQL 🗄️", className: "top-4 right-0 sm:top-8 sm:right-2", delay: 0.25, textColor: "text-cyan-700 dark:text-cyan-300", yOffset: -6, duration: 4.5, initialX: -60, initialY: 70 },
    { name: "Python 🐍", className: "top-1/2 -left-2 sm:-left-4", delay: 0.4, textColor: "text-yellow-700 dark:text-yellow-300", yOffset: -3, duration: 5, initialX: 100, initialY: 0 },
    { name: "Fabric ☁️", className: "top-1/2 -right-2 sm:-right-4", delay: 0.55, textColor: "text-indigo-700 dark:text-indigo-300", yOffset: -5, duration: 4.2, initialX: -90, initialY: 0 },
    { name: "Azure ⚡", className: "bottom-3 left-0 sm:bottom-8 sm:left-4", delay: 0.7, textColor: "text-sky-700 dark:text-sky-300", yOffset: -4, duration: 4.8, initialX: 70, initialY: -70 },
    { name: "DAX 📈", className: "bottom-1 right-0 sm:bottom-4 sm:right-4", delay: 0.85, textColor: "text-emerald-700 dark:text-emerald-300", yOffset: -6, duration: 5.2, initialX: -70, initialY: -80 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-transparent flex items-center pt-24 pb-12 sm:pt-32 sm:pb-20 text-foreground transition-colors duration-300"
    >
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 2xl:col-span-8 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] sm:text-xs font-bold text-blue-600 dark:text-blue-400 mb-4 sm:mb-6 w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
              </span>
              Available for work
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black leading-[1.1] tracking-tighter text-slate-900 dark:text-white">
              <span className="sr-only">Prem Mandal - </span>
              <span className="block">Power BI Developer</span>
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent inline-block pb-1 sm:pb-2 drop-shadow-sm">
                &amp; Data Analyst
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-medium">
              I transform complex <span className="relative inline-block text-slate-800 dark:text-slate-100 font-semibold"><motion.span className="absolute bottom-0 left-0 h-[2px] bg-blue-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />enterprise data</span> into <span className="relative inline-block text-blue-600 dark:text-blue-400 font-semibold"><motion.span className="absolute inset-0 bg-blue-500/10 blur-sm rounded" animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }} />actionable executive insights</span>. Specializing in <span className="font-semibold text-slate-800 dark:text-slate-200 relative overflow-hidden inline-block"><motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" animate={{ x: ["-200%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 0.5 }} />Power BI</span>, <span className="font-semibold text-slate-800 dark:text-slate-200 relative overflow-hidden inline-block"><motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" animate={{ x: ["-200%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }} />SQL</span>, <span className="font-semibold text-slate-800 dark:text-slate-200 relative overflow-hidden inline-block"><motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" animate={{ x: ["-200%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }} />DAX</span>, and <span className="font-semibold text-slate-800 dark:text-slate-200 relative overflow-hidden inline-block"><motion.span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12" animate={{ x: ["-200%", "200%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2 }} />Microsoft Fabric</span>.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a
                href="/resume/resume.pdf"
                download
                className="group px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:translate-y-0 font-bold tracking-wide flex items-center gap-2 text-xs sm:text-sm"
              >
                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="group px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-xl hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-white/10 text-slate-900 dark:text-white transition-all duration-300 font-bold tracking-wide flex items-center gap-2 hover:-translate-y-1 text-xs sm:text-sm"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex gap-2 sm:gap-2.5 mt-6 sm:mt-8">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-2.5 sm:p-3 rounded-xl border border-slate-300 dark:border-white/10 bg-white/50 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:border-blue-500/50 hover:bg-blue-50/80 dark:hover:bg-blue-500/20 transition-all duration-300 hover:-translate-y-1 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="flex gap-5 sm:gap-10 mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-slate-200 dark:border-white/10">
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">02+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">15+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">Projects Built</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">55K+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 dark:text-gray-400 font-medium mt-0.5">Community</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="lg:col-span-5 2xl:col-span-4 flex flex-col items-center w-full mt-8 lg:mt-0">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative flex justify-center items-center w-full my-4 sm:my-6"
            >
              {/* Subtle expanding glow behind profile on entrance */}
              {!shouldReduceMotion && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.2, 1.5] }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute inset-0 m-auto h-44 w-44 sm:h-68 sm:w-68 lg:h-76 lg:w-76 rounded-full bg-blue-500/20 blur-2xl z-0"
                />
              )}

              {/* Ambient micro-particles (subtle dots) */}
              {!shouldReduceMotion && (
                <div className="absolute inset-0 z-0 pointer-events-none overflow-visible">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0, 1, 0],
                        x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 5)],
                        y: [0, (i % 3 === 0 ? -1 : 1) * (15 + i * 4)]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: i * 0.4
                      }}
                      className="absolute top-1/2 left-1/2 h-1 w-1 rounded-full bg-blue-400/50"
                      style={{
                        marginLeft: `${(i % 2 === 0 ? 1 : -1) * (40 + i * 10)}px`,
                        marginTop: `${(i % 3 === 0 ? -1 : 1) * (50 + i * 8)}px`,
                      }}
                    />
                  ))}
                </div>
              )}

              <div className="relative h-44 w-44 sm:h-68 sm:w-68 lg:h-76 lg:w-76 overflow-hidden rounded-full border-2 border-blue-500/40 bg-gradient-to-br from-blue-600/30 to-purple-600/20 p-1.5 sm:p-2 shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500 hover:scale-[1.02] z-10">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/prem.jpeg"
                    alt="Prem Mandal - Senior Power BI Developer and Data Analyst India"
                    title="Prem Mandal - Senior Power BI Developer"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Skill Badges */}
              {skills.map((skill) => (
                <SkillBadge
                  key={skill.name}
                  name={skill.name}
                  className={skill.className}
                  delay={skill.delay}
                  textColor={skill.textColor}
                  shouldReduceMotion={shouldReduceMotion}
                  yOffset={skill.yOffset}
                  duration={skill.duration}
                  initialX={skill.initialX}
                  initialY={skill.initialY}
                />
              ))}
            </motion.div>

            <LinkedinStatsCard />
          </div>

        </div>
      </Container>
    </section>
  );
}