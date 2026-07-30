"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  LogIn,
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
} from "lucide-react";
import Container from "@/components/ui/Container";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          subject: "New Login Request Alert",
          from_name: "Portfolio Login Alert",
          user_identifier: formData.identifier,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center relative overflow-hidden py-16 px-4">
      {/* Background Lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 max-w-md w-full">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Form Card */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black">Login Request Sent!</h2>
              <p className="text-xs text-gray-300 max-w-xs mx-auto">
                Notification sent to Prem. Access status will be updated shortly.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold transition-all shadow-lg shadow-blue-600/30"
              >
                Return to Home
              </Link>
            </div>
          ) : (
            <>
              {/* Header Title */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black tracking-tight bg-linear-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                  Login to Your Account
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Welcome back! Access your dashboard resources &amp; templates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email or Username */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Email or Username <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="identifier"
                      required
                      value={formData.identifier}
                      onChange={handleChange}
                      placeholder="Enter your email or username"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Password <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-gray-300">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="rounded border-white/20 bg-white/5 text-blue-600 focus:ring-0 w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset feature will be enabled soon!");
                    }}
                    className="text-cyan-400 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Login</span>
                        <LogIn size={14} />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Google Sign-In will be configured with Clerk/NextAuth!")
                    }
                    className="w-full py-2.5 px-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 font-semibold text-xs text-white transition-all flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>
              </form>

              {/* OR Divider */}
              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative bg-background px-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  OR
                </span>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-xs text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-400 hover:underline font-bold"
                >
                  Sign up
                </Link>
              </p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}