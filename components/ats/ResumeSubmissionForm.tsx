"use client";

import { useState } from "react";
import { ATS_CONFIG } from "@/lib/config/ats";

export default function ResumeSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit logic here
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Submission logic is a placeholder.");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Target Job Role
        </label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Resume (PDF or DOCX)
        </label>
        <input
          type="file"
          accept=".pdf,.docx"
          required
          className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900/50 dark:file:text-blue-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Submitting..." : "Submit & Pay Later"}
      </button>
    </form>
  );
}
