"use client";

import Image from "next/image";
import {
  Mail,
  ChevronDown,
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

function LinkedinStatsCard() {
  return (
    <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-2xl p-5 md:p-6 shadow-xl backdrop-blur-md relative overflow-hidden mt-8 transition-transform duration-300 hover:-translate-y-1 hover:border-blue-500/40 transform-gpu">
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/90 rounded-xl text-white shadow-md shadow-blue-500/20">
            <LinkedinIcon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Prem Mandal</h3>
              <span className="bg-amber-500/10 text-amber-400 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
                <Award className="w-3 h-3" /> Top Voice
              </span>
            </div>
            <p className="text-xs text-gray-400">Senior Data Analyst & BI Specialist</p>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/in/premmandal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-md active:scale-95"
        >
          Connect <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="relative p-3 bg-white/5 border border-white/5 rounded-xl text-center md:text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-transparent" />
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-gray-400 text-[11px] font-medium mb-1">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Network</span>
          </div>
          <p className="text-xl font-extrabold text-white">55.4K+</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Followers</p>
        </div>

        <div className="relative p-3 bg-white/5 border border-white/5 rounded-xl text-center md:text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-emerald-500 to-transparent" />
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-gray-400 text-[11px] font-medium mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Reach</span>
          </div>
          <p className="text-xl font-extrabold text-white">382K+</p>
          <p className="text-[10px] text-emerald-400/90 font-medium mt-0.5">7-Day Impressions</p>
        </div>

        <div className="relative p-3 bg-white/5 border border-white/5 rounded-xl text-center md:text-left overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-purple-500 to-transparent" />
          <div className="flex items-center justify-center md:justify-start gap-1.5 text-gray-400 text-[11px] font-medium mb-1">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span>Views</span>
          </div>
          <p className="text-xl font-extrabold text-white">3,700+</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Recent Viewers</p>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 italic mt-3 text-center">
        &quot;I&apos;m a data magician. I make boring data disappear and awesomeness appear.&quot;
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-background flex items-start pt-28 pb-16 md:pt-40 text-white transform-gpu"
    >
      {/* Optimized Static Ambient Background Lights */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="hidden md:block absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* Left Column */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs sm:text-sm text-emerald-400 font-medium">
                Available for freelance & full-time work
              </span>
            </div>

            <p className="text-blue-400 font-semibold mt-5 tracking-wide text-xs sm:text-sm uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Prem Mandal
            </p>

            <h1 className="mt-2 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              <span className="bg-linear-to-r from-white via-blue-100 to-cyan-300 bg-clip-text text-transparent">
                Building BI Dashboards
              </span>
              <br />
              <span className="text-gray-400 text-3xl sm:text-5xl lg:text-6xl font-bold">
                that drive decisions.
              </span>
            </h1>

            <h2 className="text-lg sm:text-2xl font-medium text-blue-400/90 mt-4">
              Senior BI Developer • Data Analyst • Microsoft Fabric
            </h2>

            <p className="mt-4 text-gray-300 text-base sm:text-lg max-w-xl leading-relaxed">
              I build enterprise-grade BI solutions using Power BI, SQL, DAX, Power Query, and Microsoft Fabric. From analytical data modeling to executive dashboards, I help businesses turn complex data into actionable insights.
            </p>

            <div className="flex flex-wrap gap-4 mt-7">
              <a
                href="/resume/resume.pdf"
                download
                className="group px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors duration-200 font-semibold text-white flex items-center gap-2 shadow-lg shadow-blue-600/20 text-sm active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <a
                href="#contact"
                className="group px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white hover:text-black transition-colors duration-200 font-semibold flex items-center gap-2 text-sm"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex gap-3 mt-7">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <div className="flex gap-8 sm:gap-12 mt-8 pt-6 border-t border-white/10 w-full">
              <div>
                <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">02+</p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">15+</p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Projects Built</p>
              </div>
              <div>
                <p className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">55K+</p>
                <p className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">Community</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center w-full">
            <div className="relative flex justify-center w-full">
              <div className="relative h-64 w-64 sm:h-80 sm:w-80 lg:h-96 lg:w-96 overflow-hidden rounded-full border-2 border-blue-500/40 bg-blue-950/20 p-2 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src="/images/prem.jpeg"
                    alt="Prem Mandal"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating Skill Badges (CSS-animated for 60fps performance) */}
              <div className="animate-bounce-slow absolute top-2 -left-2 sm:-left-6 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg">
                <span className="text-xs sm:text-sm font-semibold text-blue-300">Power BI 📊</span>
              </div>

              <div className="animate-bounce-slow absolute top-16 -right-2 sm:-right-8 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg [animation-delay:1s]">
                <span className="text-xs sm:text-sm font-semibold text-cyan-300">SQL 🗄️</span>
              </div>

              <div className="animate-bounce-slow absolute top-1/2 -left-4 sm:-left-10 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg [animation-delay:1.5s]">
                <span className="text-xs sm:text-sm font-semibold text-yellow-300">Python 🐍</span>
              </div>

              <div className="animate-bounce-slow absolute bottom-24 -right-4 sm:-right-8 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg [animation-delay:2s]">
                <span className="text-xs sm:text-sm font-semibold text-indigo-300">Fabric ☁️</span>
              </div>

              <div className="animate-bounce-slow absolute bottom-6 -left-2 sm:-left-6 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg [animation-delay:2.5s]">
                <span className="text-xs sm:text-sm font-semibold text-sky-300">Azure ⚡</span>
              </div>

              <div className="animate-bounce-slow absolute -bottom-2 right-4 sm:right-6 rounded-xl border border-white/10 bg-[#0b1220]/90 px-3 py-1.5 shadow-lg [animation-delay:0.5s]">
                <span className="text-xs sm:text-sm font-semibold text-emerald-300">DAX 📈</span>
              </div>
            </div>

            <LinkedinStatsCard />
          </div>

        </div>
      </Container>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-gray-500">
        <span className="text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce text-blue-400" />
      </div>
    </section>
  );
}