"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
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
  Award,
  BookOpen,
} from "lucide-react";
import Container from "../ui/Container";
import DeveloperAvatar from "../ui/DeveloperAvatar";

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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < 300 && pathname === "/") {
        setActiveSection("");
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center gap-1.5 text-xl font-black tracking-tight text-white group cursor-pointer shrink-0"
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                Prem Mandal
              </span>
              <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
            </Link>
            <DeveloperAvatar />
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.isHash) {
                      handleHashClick(e, link.href);
                    } else {
                      setActiveSection("");
                    }
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="relative ml-1" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold transition-all duration-300 cursor-pointer ${
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
                <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-background/95 border border-white/15 shadow-2xl backdrop-blur-2xl py-2 z-50">
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
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-gray-200 hover:text-white hover:bg-white/10 transition-colors tracking-wider"
                      >
                        <Icon size={16} className="text-gray-400" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0">
            <a
              href="/resume/resume.pdf"
              download
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all shadow-sm"
            >
              Resume
            </a>
            <Link
              href="/contact"
              onClick={() => setActiveSection("")}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-600/30"
            >
              Get in Touch
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-background/95 border border-white/10 rounded-2xl p-4 backdrop-blur-2xl shadow-2xl space-y-2">
            {[...navLinks, ...dropdownLinks].map((link) => {
              const isActive = checkIsActive(link);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (link.isHash) {
                      handleHashClick(e, link.href);
                    } else {
                      setActiveSection("");
                      setMobileMenuOpen(false);
                    }
                  }}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </header>
  );
}