"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  CheckCircle2,
  ExternalLink,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import Container from "@/components/ui/Container";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "jobs.premmandal@gmail.com",
    href: "mailto:jobs.premmandal@gmail.com",
    description: "Best for project inquiries and formal discussions.",
  },
  {
    icon: PhoneCall,
    title: "WhatsApp",
    value: "+91-8797948187",
    href: "https://wa.me/918797948187",
    description: "Quick queries & instant consultation booking.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Kolkata, India (Remote Worldwide)",
    href: "#",
    description: "Available for global remote contracts & timezones.",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailSubject = encodeURIComponent(
      formState.subject
        ? `Portfolio Inquiry: ${formState.subject}`
        : `Portfolio Contact from ${formState.name}`
    );
    const emailBody = encodeURIComponent(
      `${formState.message}\n\nFrom: ${formState.name} (${formState.email})`
    );

    setTimeout(() => {
      window.location.href = `mailto:jobs.premmandal@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden transition-colors duration-300">
      {/* Background Ambience */}


      <Container className="relative z-10 px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Let&apos;s Build Together
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mt-3 sm:mt-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-slate-600 dark:text-gray-400 mt-2 sm:mt-4 text-xs sm:text-lg leading-relaxed">
              Have a Power BI project, data analytics query, or consulting opportunity? Drop a message below or connect directly.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-4 sm:space-y-6"
          >
            {/* Status Card */}
            <div className="p-5 sm:p-6 bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-2xl relative overflow-hidden shadow-sm">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Open for Freelance & Remote Contracts
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400 mt-2">
                Typically responds within <strong className="text-slate-900 dark:text-white">2 to 4 hours</strong> on business days.
              </p>
            </div>

            {/* Info Cards */}
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="p-5 sm:p-6 bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-2xl hover:border-blue-500/30 transition-all duration-300 flex items-start gap-3.5 sm:gap-4 group shadow-sm"
                >
                  <div className="p-2.5 sm:p-3 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-gray-400">{method.title}</h3>
                    {method.href !== "#" ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 mt-0.5 truncate max-w-full"
                      >
                        <span className="truncate">{method.value}</span>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                      </a>
                    ) : (
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-0.5 truncate">{method.value}</p>
                    )}
                    <p className="text-[11px] sm:text-xs text-slate-500 dark:text-gray-400 mt-1">{method.description}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl dark:shadow-2xl relative"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4 sm:mb-6">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" /> Send a Message
            </h2>

            {isSubmitted ? (
              <div className="py-8 sm:py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">Redirecting to Mail Client!</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-400 max-w-sm mx-auto">
                  Thank you for reaching out. Your default email app will open to send the message.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Rahul Sharma"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="rahul@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    Subject / Project Category
                  </label>
                  <input
                    type="text"
                    placeholder="Power BI Dashboard / SQL Pipeline / Consulting"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-medium text-slate-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your requirements or project details..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95"
                >
                  {isSubmitting ? (
                    "Preparing Email..."
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </main>
  );
}