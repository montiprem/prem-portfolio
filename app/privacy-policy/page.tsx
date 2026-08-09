"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative text-slate-700 dark:text-gray-300 transition-colors duration-300">
      <Container className="max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-slate-50/80 dark:bg-card border border-slate-200 dark:border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl dark:shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
          </div>

          <p className="text-xs text-slate-500 dark:text-gray-400 mb-8 font-mono">
            Last Updated: August 2026
          </p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                1. Overview
              </h2>
              <p>
                Welcome to Prem Mandal&apos;s Portfolio. Your privacy is important.
                This Privacy Policy outlines how your personal information is
                collected, used, and protected when you visit this website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                2. Information Collected
              </h2>
              <p>
                When you interact with the contact forms, newsletter signups, or
                the AI Assistant widget, basic contact details such as your
                name, email address, and message content may be collected solely for
                communication purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                3. How Information is Used
              </h2>
              <p>
                Collected data is used strictly to respond to business inquiries,
                provide requested analytics consulting services, and improve
                user experience on this platform. Data is never sold or shared
                with third parties for marketing.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                4. Contact
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, feel free
                to reach out via email at{" "}
                <a
                  href="mailto:jobs.premmandal@gmail.com"
                  className="text-cyan-600 dark:text-cyan-400 underline font-medium"
                >
                  jobs.premmandal@gmail.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}