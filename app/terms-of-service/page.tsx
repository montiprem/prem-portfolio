"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-transparent pt-32 pb-20 relative text-slate-700 dark:text-gray-300 transition-colors duration-300">
      <Container className="max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Terms of Service
            </h1>
          </div>

          <p className="text-xs text-slate-500 dark:text-gray-400 mb-8 font-mono">
            Last Updated: August 2026
          </p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using this portfolio website, you agree to
                comply with these Terms of Service. If you do not agree with
                any part of these terms, please discontinue site usage.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                2. Intellectual Property
              </h2>
              <p>
                All custom Power BI templates, code snippets, project showcases,
                and technical documentation published on this website are the
                intellectual property of Prem Mandal unless explicitly stated
                otherwise.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                3. Use of Content
              </h2>
              <p>
                You may browse and reference portfolio projects for hiring or
                consulting evaluation. Content may not be copied, modified, or
                re-distributed for commercial sale without express written consent.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}