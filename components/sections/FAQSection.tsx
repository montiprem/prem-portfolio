"use client";

import { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  MessageSquarePlus,
  Send,
  X,
  CheckCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What are your core areas of expertise in BI and Data Analytics?",
    answer:
      "I specialize in end-to-end Business Intelligence solutions: building scalable Power BI/Tableau dashboards, complex DAX calculations, SQL data modeling, ETL pipelines, and optimizing star-schema databases for enterprise reporting.",
  },
  {
    question: "How do you ensure report performance with large datasets?",
    answer:
      "I use advanced techniques like Incremental Refresh, Query Folding, Aggregation tables, DirectQuery optimization, and DAX query tuning in Tabular Editor. I also optimize SQL queries at the database layer before pulling data into Power BI.",
  },
  {
    question: "Can you help migrate existing reports to Power BI or Tableau?",
    answer:
      "Yes! I have experience migrating legacy reporting setups (like Excel/SSR/SSRS) to modern cloud BI platforms (Power BI Service, Tableau Cloud) while maintaining data accuracy and security controls.",
  },
  {
    question: "How do you handle data security and row-level security (RLS)?",
    answer:
      "I implement dynamic Row-Level Security (RLS) and Object-Level Security (OLS) using DAX and USERPRINCIPALNAME() to ensure users only see data specific to their organizational roles or regions.",
  },
  {
    question: "Are you open to freelance projects, consulting, or full-time roles?",
    answer:
      "Yes, I am open to full-time opportunities, high-impact BI consulting, dashboard design, and end-to-end data analytics freelance projects.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Form state for user questions
  const [userEmail, setUserEmail] = useState("");
  const [userQuestion, setUserQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail || !userQuestion) return;

    setLoading(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "e1125910-94f6-40b5-9375-a504ecd93df4",
          subject: "New Custom Question Asked on Portfolio FAQ",
          from_name: "Portfolio FAQ Inquiry",
          email: userEmail,
          question: userQuestion,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="faq" className="pt-16 pb-20 md:pt-20 md:pb-24 bg-transparent relative overflow-hidden text-foreground transition-colors duration-300">
      {/* Background Ambient Glow */}

      <div className="relative z-10 max-w-[1050px] mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-wider">
            <HelpCircle size={12} />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto">
            Here are some common questions about my BI development background, data analytics expertise, and collaboration workflow.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 md:space-y-4.5 max-w-[950px] mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`relative rounded-xl border backdrop-blur-xl overflow-hidden transition-all duration-300 shadow-sm ${
                  isOpen
                    ? "border-cyan-500/30 bg-slate-50 dark:bg-white/10 shadow-[0_0_15px_rgba(6,182,212,0.05)]"
                    : "border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 hover:border-blue-500/30"
                }`}
              >
                {/* Active left accent line */}
                {isOpen && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-blue-500" />
                )}

                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-5 py-4 md:px-6 md:py-5 flex items-center justify-between gap-4 font-semibold text-[15px] md:text-base text-slate-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-white transition-colors cursor-pointer group"
                >
                  <span className="flex-1 pr-4">{faq.question}</span>
                  <div
                    className={`transition-transform duration-300 shrink-0 flex items-center justify-center ${
                      isOpen ? "rotate-180 text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400"
                    }`}
                  >
                    <ChevronDown size={18} strokeWidth={2.5} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 md:px-6 pb-5 md:pb-6 text-[14px] text-slate-600 dark:text-gray-300 leading-relaxed border-t border-slate-200/50 dark:border-white/5 pt-4 md:pt-5 ml-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FIXED ASK QUESTION BANNER */}
        <div className="mt-10 md:mt-12 max-w-[950px] mx-auto rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/80 backdrop-blur-xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left shadow-lg">
          <div className="space-y-1.5">
            <h3 className="text-[15px] sm:text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Have a specific question?</span>
              <Sparkles size={16} className="text-cyan-600 dark:text-cyan-400" />
            </h3>
            <p className="text-[13px] sm:text-sm text-slate-600 dark:text-gray-300 max-w-lg">
              Can’t find the answer you are looking for? Ask your question directly to Prem!
            </p>
          </div>

          <button
            onClick={() => {
              setModalOpen(true);
              setSubmitted(false);
              setUserEmail("");
              setUserQuestion("");
            }}
            className="w-full sm:w-auto px-5 py-2.5 md:py-3 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 dark:hover:bg-cyan-400 text-[13px] md:text-[14px] font-bold text-white dark:text-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0 cursor-pointer"
          >
            <MessageSquarePlus size={16} />
            <span>Ask Your Question</span>
          </button>
        </div>
      </div>

      {/* ASK QUESTION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 dark:border-white/15 bg-transparent p-6 sm:p-8 shadow-2xl backdrop-blur-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {submitted ? (
              <div className="text-center py-6 space-y-4">
                <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Question Received!</h3>
                <p className="text-xs text-slate-600 dark:text-gray-300">
                  Thanks! Your question has been sent to Prem. You will receive an email response soon on <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{userEmail}</span>.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all mt-2 cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 mb-2">
                    <MessageSquarePlus size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Ask Prem a Question</h3>
                  <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                    Ask anything about BI development, data models, or portfolio projects.
                  </p>
                </div>

                <form onSubmit={handleAskQuestion} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Your Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Your Question <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder="Type your question here..."
                      className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 dark:hover:bg-cyan-400 font-bold text-xs text-white dark:text-black transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <span>Submit Question</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}