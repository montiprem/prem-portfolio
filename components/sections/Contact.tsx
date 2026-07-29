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
      className="relative py-28 bg-background overflow-hidden text-white"
    >
      {/* Background Ambient Mesh & Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />

      {/* Decorative Blur Lights */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-blue-500/20 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 h-80 w-80 rounded-full bg-purple-500/15 blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-blue-400 font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> GET IN TOUCH
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Let&apos;s build something{" "}
            <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              great together
            </span>
          </h2>
        </motion.div>

        {/* 2 Column Layout */}
        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          
          {/* ================= LEFT COLUMN: CONTACT INFO (5 Cols) ================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-blue-500/30"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-semibold text-blue-400 mb-4">
                <MessageSquare className="w-3.5 h-3.5" /> Direct Contact
              </div>
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Let&apos;s talk about your next project
              </h3>
              <p className="mt-3 text-gray-300 text-sm leading-relaxed">
                Have a analytics initiative in mind, need a Power BI dashboard, or just want to connect? My inbox is always open — I usually reply within a few hours.
              </p>

              {/* Contact Info Cards */}
              <div className="mt-8 space-y-4">
                <a
                  href="mailto:jobs.premmandal@gmail.com"
                  className="group flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                      Email
                    </p>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      jobs.premmandal@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918797948187"
                  className="group flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                      Phone / WhatsApp
                    </p>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      +91-8797948187
                    </p>
                  </div>
                </a>

                <div className="group flex items-center gap-4 p-3.5 rounded-xl border border-white/5 bg-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300">
                  <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">
                      Location
                    </p>
                    <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                      Kolkata, West Bengal, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Footer */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Available for Freelance & Full-time opportunities</span>
            </div>
          </motion.div>

          {/* ================= RIGHT COLUMN: MODERN FORM (7 Cols) ================= */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-5 shadow-2xl transition-all duration-300 hover:border-blue-500/30 flex flex-col justify-between"
          >
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Your Name
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220]/90 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Your Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220]/90 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-inner"
                  placeholder="e.g. rahul@company.com"
                />
              </div>

              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-300">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1220]/90 px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none shadow-inner"
                  placeholder="Tell me about your project, timeline, or requirements..."
                />
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition-all duration-300 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 hover:scale-[1.01] active:scale-[0.98] text-sm"
              >
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>Send Message</span>
              </button>

              {sent && (
                <div className="flex items-center justify-center gap-2 p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold text-center">
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