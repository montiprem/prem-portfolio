"use client";

import { useState } from "react";
import {
  Mail,
  BarChart3,
  ArrowUp,
  Sparkles,
  Send,
  UserX,
  X,
  CheckCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
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

// Modern Custom Footer Logo
function FooterLogo() {
  return (
    <Link href="/#home" className="group inline-flex items-center gap-3">
      {/* Icon Badge */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
        <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-cyan-500/20 transition-colors" />
          
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-400 group-hover:scale-110 transition-transform duration-300"
          >
            <path
              d="M3 20H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M6 16V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-60"
            />
            <path
              d="M11 16V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 16V4"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors leading-tight">
          Prem Mandal<span className="text-cyan-400">.</span>
        </span>
        <span className="text-[10px] font-mono font-medium text-gray-400 tracking-wider uppercase">
          Senior BI Developer
        </span>
      </div>
    </Link>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  // Subscription States
  const [subEmail, setSubEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subMessage, setSubMessage] = useState("");

  // Unsubscribe Modal States
  const [unsubOpen, setUnsubOpen] = useState(false);
  const [unsubEmail, setUnsubEmail] = useState("");
  const [unsubLoading, setUnsubLoading] = useState(false);
  const [unsubMessage, setUnsubMessage] = useState("");

  // Handle Subscribe Submission
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;

    setSubLoading(true);
    setSubMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "YOUR_ACCESS_KEY_HERE",
          subject: "New Newsletter Subscriber",
          from_name: "Portfolio Newsletter",
          email: subEmail,
          action: "Subscribe",
        }),
      });

      if (response.ok) {
        setSubMessage("Subscribed successfully!");
        setSubEmail("");
      } else {
        setSubMessage("Something went wrong. Try again!");
      }
    } catch {
      setSubMessage("Error sending request.");
    } finally {
      setSubLoading(false);
    }
  };

  // Handle Unsubscribe Submission
  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!unsubEmail) return;

    setUnsubLoading(true);
    setUnsubMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e1125910-94f6-40b5-9375-a504ecd93df4",
          subject: "Newsletter Unsubscribe Request",
          from_name: "Portfolio Newsletter",
          email: unsubEmail,
          action: "Unsubscribe",
        }),
      });

      if (response.ok) {
        setUnsubMessage("You have been unsubscribed successfully.");
        setUnsubEmail("");
      } else {
        setUnsubMessage("Failed to process. Please try again.");
      }
    } catch {
      setUnsubMessage("Error submitting request.");
    } finally {
      setUnsubLoading(false);
    }
  };

  return (
    <footer className="relative bg-background border-t border-white/10 pt-20 pb-10 overflow-hidden text-white">
      {/* Ambient Mesh Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Light */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-blue-500/15 blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* TOP SECTION: Brand Info & Navigation */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand Info with New Logo */}
          <div className="max-w-md">
            <FooterLogo />

            <p className="mt-4 text-gray-300 text-sm leading-relaxed">
              Senior BI Developer &amp; Data Engineer crafting enterprise
              dashboards, scalable semantic models, and automated data
              pipelines that drive strategic decision-making.
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
                Pages &amp; Navigation
              </h4>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>
                  <Link
                    href="/"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/projects"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/store"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Store
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">
                Quick Sections
              </h4>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li>
                  <Link
                    href="/#about"
                    className="hover:text-blue-400 transition-colors"
                  >
                    About Me
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#skills"
                    className="hover:text-blue-400 transition-colors"
                  >
                    Skills &amp; Tech
                  </Link>
                </li>
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
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: Newsletter Subscription Box */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl text-center lg:text-left">
              <h3 className="text-lg font-black tracking-tight text-white flex items-center justify-center lg:justify-start gap-2">
                <span>Subscribe to Newsletter</span>
                <Sparkles size={16} className="text-cyan-400" />
              </h3>
              <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                Get notified when new Power BI templates, DAX cheat sheets, or
                data engineering blogs are published. Zero spam.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row items-center gap-2 max-w-md w-full"
              >
                <div className="relative w-full">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={subEmail}
                    onChange={(e) => setSubEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-white/5 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={subLoading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  {subLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </form>

              {subMessage && (
                <p className="text-[11px] text-cyan-400 mt-2 font-medium text-center lg:text-left">
                  {subMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR: Legal Links & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          {/* Copyright & Tagline */}
          <div className="space-y-1">
            <p className="text-xs text-gray-300">
              © {year} Prem Mandal. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">Designed with ❤️ by Prem</p>
          </div>

          {/* Policy & Unsubscribe Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-gray-400">
            <Link
              href="/privacy-policy"
              className="hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link
              href="/terms-of-service"
              className="hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-white/20">•</span>
            <Link
              href="/cookie-policy"
              className="hover:text-blue-400 transition-colors"
            >
              Cookie Policy
            </Link>
            <span className="text-white/20">•</span>
            {/* Unsubscribe Button Trigger */}
            <button
              onClick={() => setUnsubOpen(true)}
              className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1 font-semibold cursor-pointer"
            >
              <UserX size={12} />
              <span>Unsubscribe</span>
            </button>
          </div>

          {/* Back to Top */}
          <Link
            href="/#home"
            aria-label="Back to top"
            className="group flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-gray-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            <span>Back to top</span>
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </Container>

      {/* UNSUBSCRIBE MODAL */}
      {unsubOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl border border-white/15 bg-background/95 p-6 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => {
                setUnsubOpen(false);
                setUnsubMessage("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mb-3">
                <UserX size={22} />
              </div>
              <h4 className="text-xl font-bold">Unsubscribe Newsletter</h4>
              <p className="text-xs text-gray-400 mt-1">
                Enter your email to opt-out from future emails &amp; updates.
              </p>
            </div>

            {unsubMessage ? (
              <div className="text-center py-4 space-y-3">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle size={24} />
                </div>
                <p className="text-xs font-semibold text-gray-200">
                  {unsubMessage}
                </p>
                <button
                  onClick={() => {
                    setUnsubOpen(false);
                    setUnsubMessage("");
                  }}
                  className="px-5 py-2 rounded-xl bg-white/10 text-xs font-bold hover:bg-white/20 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleUnsubscribe} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={unsubEmail}
                    onChange={(e) => setUnsubEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-red-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={unsubLoading}
                  className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 font-bold text-xs text-white shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {unsubLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    "Confirm Unsubscribe"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}