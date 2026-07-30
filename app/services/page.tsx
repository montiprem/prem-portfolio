"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  Database,
  Layers,
  GraduationCap,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/Container";

// Services Data
const servicesList = [
  {
    icon: BarChart3,
    title: "Power BI Dashboard Development",
    description: "Custom end-to-end Power BI reports, dynamic DAX metrics, automated scheduling, and Row Level Security (RLS).",
    features: ["Custom UI/UX Theme", "Advanced DAX & Calculations", "Power BI Service Setup", "Mobile Responsive Layout"],
  },
  {
    icon: Layers,
    title: "Microsoft Fabric & Lakehouse",
    description: "Modern analytics engineering using Fabric, Data Factory, Delta Lake, and Direct Lake reporting for ultra-fast performance.",
    features: ["OneLake Architecture", "Pipeline Automation", "Direct Lake Power BI", "Data Lakehouse Setup"],
  },
  {
    icon: Database,
    title: "SQL & Data Engineering",
    description: "Database schema modeling, query optimization, ETL data pipelines, and data warehouse structure.",
    features: ["SQL Query Tuning", "3NF / Star Schema Modeling", "Automated ETL Pipelines", "Multi-source Data Integration"],
  },
  {
    icon: GraduationCap,
    title: "Corporate Training & Consulting",
    description: "Hands-on Power BI & SQL training for teams, 1-on-1 mentorship, and technical BI strategy consulting.",
    features: ["Tailored Curriculum", "Real-world Project Practice", "DAX Best Practices", "Team Enablement"],
  },
];

// Pricing Plans
const pricingPlans = [
  {
    name: "Starter BI Audit",
    price: "$299",
    period: "one-time",
    description: "Ideal for businesses wanting to optimize existing Power BI reports or SQL queries.",
    features: [
      "Existing Report Audit & Speed Optimization",
      "DAX & Data Model Refactoring",
      "UI/UX Visual Upgrade",
      "Detailed Performance Report",
    ],
    highlight: false,
    cta: "Request Audit",
  },
  {
    name: "End-to-End BI Project",
    price: "$999",
    period: "per dashboard",
    description: "Complete custom dashboard solution built from scratch using raw data to final report.",
    features: [
      "Custom Power BI Dashboard",
      "SQL / Data Pipeline Setup",
      "Advanced DAX & RLS Implementation",
      "Automated Refresh & Power BI Service",
      "1-Month Post Launch Support",
    ],
    highlight: true,
    cta: "Book Project",
  },
  {
    name: "Enterprise Retainer",
    price: "$1,999",
    period: "per month",
    description: "Dedicated BI & Analytics Engineer support for ongoing data & reporting needs.",
    features: [
      "Unlimited Dashboard Maintenance",
      "Microsoft Fabric Migration / Setup",
      "Weekly Progress Calls",
      "Priority Support & Strategy",
    ],
    highlight: false,
    cta: "Get Started",
  },
];

// FAQs Data
const faqs = [
  {
    q: "How long does a typical Power BI project take?",
    a: "Standard dashboards take around 5 to 10 business days depending on data complexity and source availability.",
  },
  {
    q: "Do you offer post-project maintenance?",
    a: "Yes, every standard project includes 30 days of free post-launch support and bug fixes.",
  },
  {
    q: "Can you work with Microsoft Fabric and Direct Lake?",
    a: "Absolutely! I specialize in modern Microsoft Fabric Lakehouse architectures to maximize performance without import refreshes.",
  },
  {
    q: "How do we get started?",
    a: "Simply click 'Book Consultation' or reach out via email. We'll discuss your data sources, goals, and outline a project plan.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-500px h-500px bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-blue-400 bg-blue-500/10 px-3.5 py-1.5 rounded-full border border-blue-500/20 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> High Impact BI Solutions
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Services & Consulting
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Transforming scattered enterprise data into actionable executive insights with Power BI, SQL, and Microsoft Fabric.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-card border border-white/10 rounded-2xl hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl relative overflow-hidden group"
              >
                <div className="p-3 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-gray-400 mt-3 leading-relaxed text-sm">{service.description}</p>
                <ul className="mt-6 space-y-2.5">
                  {service.features.map((feat) => (
                    <li key={feat} className="text-xs text-gray-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* Pricing Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white">Transparent Pricing</h2>
            <p className="text-gray-400 text-sm mt-2">Clear investment options tailored to your business scale.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between relative ${
                  plan.highlight
                    ? "bg-linear-to-b from-blue-900/30 to-card border-blue-500/50 shadow-2xl shadow-blue-500/10 lg:-translate-y-2"
                    : "bg-card border-white/10 hover:border-white/20"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Zap className="w-3 h-3" /> Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-2">{plan.description}</p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-xs text-gray-400">/{plan.period}</span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="text-xs text-gray-300 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="/contact"
                  className={`mt-8 w-full py-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                    plan.highlight
                      ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30"
                      : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-400" /> Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-xl bg-card overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left flex justify-between items-center text-white font-medium text-sm sm:text-base gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180 text-blue-400" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}