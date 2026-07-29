"use client";

import { Mail, BarChart3, ArrowUp, Sparkles } from "lucide-react";
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
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background border-t border-white/10 pt-20 pb-10 overflow-hidden text-white">
      {/* Ambient Mesh Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Light */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-blue-500/15 blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          
          {/* Brand Info */}
          <div className="max-w-md">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-2xl font-black tracking-tight"
            >
              <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                Prem Mandal
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </a>

            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Senior BI Developer & Data Engineer crafting enterprise dashboards, scalable semantic models, and automated data pipelines that drive strategic decision-making.
            </p>

            <a
              href="mailto:jobs.premmandal@gmail.com"
              className="mt-5 inline-flex items-center gap-2.5 text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors group"
            >
              <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all">
                <Mail size={16} className="text-blue-400" />
              </div>
              <span>jobs.premmandal@gmail.com</span>
            </a>

            {/* Social Buttons */}
            <div className="flex gap-3 mt-6">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 shadow-md"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="flex flex-wrap sm:flex-nowrap gap-16 md:gap-24">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>
                  <a
                    href="#home"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
                Resources
              </h4>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>
                  <a
                    href="/resume/resume.pdf"
                    download
                    className="hover:text-blue-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Download CV</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/premmandal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                </li>
                <li>
                  <a
                    href="https://public.tableau.com/app/profile/premmandal/vizzes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Tableau Work
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 flex items-center gap-1.5">
            © {year} Prem Mandal. Built with Next.js, Tailwind CSS & Framer Motion.
          </p>

          <a
            href="#home"
            aria-label="Back to top"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            <span>Back to top</span>
            <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}