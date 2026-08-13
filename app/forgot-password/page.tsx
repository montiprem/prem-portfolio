"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";
import Container from "@/components/ui/Container";

export default function ForgotPassword() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/reset-password`,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-16 px-4 transition-colors duration-300">
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[150px] pointer-events-none" />

      <Container className="relative z-10 max-w-md w-full">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Check Your Email</h2>
              <p className="text-xs text-slate-600 dark:text-gray-300 max-w-xs mx-auto">
                We've sent a password reset link to {email}.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  Reset Password
                </h1>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-2">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                    Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
