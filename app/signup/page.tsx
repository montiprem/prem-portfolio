"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";

export default function Signup() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match");
      return;
    }

    if (!formData.agree) {
      setErrorMsg("You must agree to the Terms of Service & Privacy Policy");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          }
        }
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

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-16 px-4 transition-colors duration-300">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 max-w-lg w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Check Your Email</h2>
              <p className="text-xs text-slate-600 dark:text-gray-300 max-w-xs mx-auto">
                We've sent a confirmation link to your email address. Please verify to continue.
              </p>
              <Link
                href="/login"
                className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/30"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Create an Account
                </h1>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                  Join the platform to access premium resources and templates.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      First Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Last Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                    Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Password <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                      Confirm Password <span className="text-cyan-600 dark:text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-400 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="agree"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="rounded border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 text-blue-600 focus:ring-0 w-4 h-4 cursor-pointer accent-blue-600"
                  />
                  <label
                    htmlFor="agree"
                    className="text-xs text-slate-700 dark:text-gray-300 cursor-pointer select-none"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms-of-service"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    &amp;{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-cyan-600 dark:text-cyan-400 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <UserPlus size={14} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold text-xs text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z" />
                      <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                    </svg>
                    <span>Google</span>
                  </button>
                </div>
              </form>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10" />
                </div>
                <span className="relative bg-slate-50 dark:bg-background px-3 text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-400 font-bold">
                  OR
                </span>
              </div>

              <p className="text-center text-xs text-slate-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
                >
                  Login
                </Link>
              </p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
