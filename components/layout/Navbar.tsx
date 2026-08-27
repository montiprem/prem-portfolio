"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  ChevronDown,
  LogIn,
  UserPlus,
  Mail,
  HelpCircle,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Download,
} from "lucide-react";
import Container from "../ui/Container";
import DeveloperAvatar from "../ui/DeveloperAvatar";
import ThemeToggle from "../ui/ThemeToggle";
import { WhatsAppIcon } from "../ui/BrandIcons";

const navLinks = [
  { name: "Home", href: "/", isHash: false },
  { name: "Projects", href: "/projects", isHash: false },
  { name: "Certifications", href: "/certifications", isHash: false },
  { name: "Skills", href: "/#skills", isHash: true },
  { name: "Experience", href: "/#experience", isHash: true },
];

const dropdownLinks = [
  { name: "BLOG", href: "/blog", icon: BookOpen, isHash: false },
  { name: "SERVICES", href: "/services", icon: Briefcase, isHash: false },
  { name: "STORE", href: "/store", icon: ShoppingBag, isHash: false },
  { name: "LOGIN", href: "/login", icon: LogIn, isHash: false },
  { name: "SIGN UP", href: "/signup", icon: UserPlus, isHash: false },
  { name: "CONTACT", href: "/contact", icon: Mail, isHash: false },
  { name: "FAQ", href: "/#faq", icon: HelpCircle, isHash: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["skills", "experience", "faq"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMoreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          if (window.scrollY < 300 && pathname === "/") {
            setActiveSection("");
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveSection("");
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
    setMobileMenuOpen(false);
  };

  const handleHashClick = (e: React.MouseEvent, href: string) => {
    const hash = href.split("#")[1];
    if (hash) {
      setActiveSection(`#${hash}`);
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
      setMoreDropdownOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const checkIsActive = (link: { href: string; isHash: boolean }) => {
    if (link.isHash) {
      const hashPart = link.href.split("#")[1];
      return pathname === "/" && activeSection === `#${hashPart}`;
    }
    return pathname === link.href && (!activeSection || pathname !== "/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black/10 dark:border-white/10 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl py-3 shadow-lg"
          : "bg-background/40 backdrop-blur-md py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* LOGO & BRAND SECTION */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center gap-2.5 text-xl font-black tracking-tight text-foreground group cursor-pointer shrink-0"
            >
              {/* Image Logo Badge */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-slate-900 dark:bg-[#0a0f1d] p-1 flex items-center justify-center group-hover:border-cyan-500/40 transition-colors">
                <Image
                  src="/logopm.png"
                  alt="Prem Mandal Logo"
                  fill
                  unoptimized
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity font-extrabold">
                Prem Mandal
              </span>
            </Link>
            <DeveloperAvatar />
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.name === "Home") {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push("/");
                      }
                      setActiveSection("");
                    } else if (link.isHash) {
                      handleHashClick(e, link.href);
                    } else {
                      setActiveSection("");
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-amber-600 dark:text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold transition-all duration-300 cursor-pointer ${
                  moreDropdownOpen ? "ring-2 ring-yellow-500/30" : ""
                }`}
              >
                <span>MORE</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${
                    moreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/15 shadow-2xl backdrop-blur-2xl py-2 z-50">
                  {dropdownLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          if (item.isHash) {
                            handleHashClick(e, item.href);
                          } else {
                            setActiveSection("");
                            setMoreDropdownOpen(false);
                          }
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors tracking-wider"
                      >
                        <Icon size={16} className="text-slate-400 dark:text-gray-400" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917281055278"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-500/10 dark:hover:bg-green-500/10 transition-all duration-300 cursor-pointer shadow-sm flex items-center justify-center hover:-translate-y-0.5"
            >
              <WhatsAppIcon size={18} />
            </a>

            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* UPGRADED RESUME BUTTON */}
            <a
              href="/resume/resume.pdf"
              download
              className="group relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 hover:text-cyan-700 dark:hover:text-white transition-all duration-300 shadow-md hover:shadow-cyan-500/20 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
            >
              <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 group-hover:translate-y-0.5 transition-transform duration-300" />
              <span>Resume</span>
            </a>

            <Link
              href="/contact"
              onClick={() => setActiveSection("")}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-md shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-gray-300 hover:text-black dark:hover:text-white cursor-pointer flex items-center gap-2"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE DRAWER (THEME ADAPTIVE) */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-slate-50/95 dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 rounded-2xl p-4 backdrop-blur-2xl shadow-2xl space-y-2 text-slate-800 dark:text-white transition-colors duration-300">
            <div className="flex items-center justify-between pb-3 mb-1 border-b border-slate-200 dark:border-white/10">
              <span className="text-xs font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Theme</span>
              <ThemeToggle />
            </div>

            {[...navLinks, ...dropdownLinks].map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.name === "Home") {
                      if (pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      } else {
                        router.push("/");
                      }
                      setActiveSection("");
                      setMobileMenuOpen(false);
                    } else if (link.isHash) {
                      handleHashClick(e, link.href);
                    } else {
                      setActiveSection("");
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-slate-700 dark:text-gray-300 hover:bg-slate-200/80 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile Resume Download Option */}
            <a
              href="/resume/resume.pdf"
              download
              className="flex items-center justify-center gap-2 w-full mt-3 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-300 text-sm font-bold shadow-xs hover:bg-cyan-500/20 transition-all"
            >
              <Download size={16} />
              <span>Download Resume</span>
            </a>
          </div>
        )}
      </Container>
    </header>
  );
}