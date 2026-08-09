"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name} (${form.email})`
    );
    window.location.href = `mailto:jobs.premmandal@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="relative py-16 sm:py-28 bg-background overflow-hidden text-foreground transition-colors duration-300"
    >
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-blue-500/20 blur-[120px] sm:blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 h-60 sm:h-80 w-60 sm:w-80 rounded-full bg-purple-500/15 blur-[120px] sm:blur-[150px] pointer-events-none" />

      <Container className="relative z-10 px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <p className="text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-widest text-[10px] sm:text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 dark:text-cyan-400" /> GET IN TOUCH
          </p>
          <h2 className="mt-2 sm:mt-3 text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Let&apos;s build something{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              great together
            </span>
          </h2>
        </motion.div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
          
          {/* ================= LEFT COLUMN: CONTACT INFO (5 Cols) ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-8 flex flex-col justify-between shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-blue-500/30"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-[10px] sm:text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 sm:mb-4">
                <MessageSquare className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Direct Contact
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Let&apos;s talk about your next project
              </h3>
              <p className="mt-2 sm:mt-3 text-slate-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                Have an analytics initiative in mind, need a Power BI dashboard, or just want to connect? My inbox is always open — I usually reply within a few hours.
              </p>

              {/* Contact Info Cards */}
              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                <a
                  href="mailto:jobs.premmandal@gmail.com"
                  className="group flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <div className="p-2 sm:p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[11px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                      Email
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-white transition-colors truncate">
                      jobs.premmandal@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918797948187"
                  className="group flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[11px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                      Phone / WhatsApp
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-gray-200 group-hover:text-emerald-600 dark:group-hover:text-white transition-colors truncate">
                      +91-8797948187
                    </p>
                  </div>
                </a>

                <div className="group flex items-center gap-3.5 p-3 sm:p-3.5 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] sm:text-[11px] text-slate-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
                      Location
                    </p>
                    <p className="text-xs sm:text-sm font-medium text-slate-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-white transition-colors truncate">
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200 dark:border-white/10 flex items-center gap-2 text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Freelance &amp; Full-time opportunities</span>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: MODERN FORM (7 Cols) ================= */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-xl p-5 sm:p-8 space-y-4 sm:space-y-5 shadow-xl dark:shadow-2xl transition-all duration-300 hover:border-blue-500/30 flex flex-col justify-between"
          >
            <div className="space-y-4 sm:space-y-5">
              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  Your Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1220]/90 px-3.5 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1220]/90 px-3.5 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
                  placeholder="e.g. rahul@company.com"
                />
              </div>

              <div>
                <label className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-1.5 sm:mt-2 w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0b1220]/90 px-3.5 py-3 sm:px-4 sm:py-3.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none shadow-sm"
                  placeholder="Tell me about your project, timeline, or requirements..."
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 py-3 sm:py-3.5 font-semibold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.98] text-xs sm:text-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Send Message</span>
              </button>

              {sent && (
                <div className="flex items-center justify-center gap-2 p-2.5 sm:p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Redirecting to your mail client...</span>
                </div>
              )}
            </div>
          </motion.form>

        </div>
      </Container>
    </section>
  );
}