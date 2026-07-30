"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  Clock,
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
    value: "Direct Chat",
    href: "https://wa.me/919999999999", // Replace with your WhatsApp Number (e.g. 91XXXXXXXXXX)
    description: "Quick queries & instant consultation booking.",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "India (Remote Worldwide)",
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

    // Simulate Form Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Let&apos;s Build Together
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Have a Power BI project, data engineering query, or consulting opportunity? Drop a message below or connect directly.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Status Card */}
            <div className="p-6 bg-card border border-white/10 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  Open for Freelance & Remote Contracts
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Typically responds within <strong className="text-white">2 to 4 hours</strong> on business days.
              </p>
            </div>

            {/* Info Cards */}
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="p-6 bg-card border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all duration-300 flex items-start gap-4 group"
                >
                  <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl group-hover:scale-110 transition-transform shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400">{method.title}</h3>
                    {method.href !== "#" ? (
                      <a
                        href={method.href}
                        target={method.href.startsWith("http") ? "_blank" : undefined}
                        rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-base font-bold text-white hover:text-blue-400 transition-colors inline-flex items-center gap-1.5 mt-0.5"
                      >
                        {method.value} <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <p className="text-base font-bold text-white mt-0.5">{method.value}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{method.description}</p>
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
            className="lg:col-span-7 bg-card border border-white/10 rounded-2xl p-8 shadow-2xl relative"
          >
            <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-blue-400" /> Send a Message
            </h2>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto">
                  Thank you for reaching out. I&apos;ll review your message and reply back shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold rounded-xl transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Subject / Project Category
                  </label>
                  <input
                    type="text"
                    placeholder="Power BI Dashboard / SQL Pipeline / Consulting"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your requirements or project details..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/60 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" />
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