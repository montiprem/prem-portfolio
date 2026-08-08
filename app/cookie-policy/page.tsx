"use client";

import Container from "@/components/ui/Container";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative text-gray-300">
      <Container className="max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-card border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Cookie className="w-8 h-8 text-amber-400" />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
              Cookie Policy
            </h1>
          </div>

          <p className="text-xs text-gray-400 mb-8 font-mono">
            Last Updated: August 2026
          </p>

          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-white mb-2">
                1. What Are Cookies?
              </h2>
              <p>
                Cookies are small text files stored on your browser to enhance
                site navigation, remember user preferences (such as dark mode),
                and provide anonymous performance analytics.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-white mb-2">
                2. How Cookies Are Used
              </h2>
              <p>
                Essential cookies maintain theme settings and site functionality.
                No intrusive tracking cookies or commercial ad network scripts
                are embedded on this portfolio.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  );
}