"use client";

import { useState, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
  CheckCircle,
  KeyRound,
  RefreshCw
} from "lucide-react";
import Container from "@/components/ui/Container";

export default function Login() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);
  const [formData, setFormData] = useState({ identifier: "", password: "", rememberMe: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // OTP State
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otpCooldown, setOtpCooldown] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.identifier,
        password: formData.password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const startOtpCooldown = () => {
    setOtpCooldown(60);
    const interval = setInterval(() => {
      setOtpCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier) {
      setErrorMsg("Please enter your email address first.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: formData.identifier,
        options: {
          shouldCreateUser: false, // Optional: prevents arbitrary signups via this form if desired, though signup allows it anyway. Leaving default true is also fine.
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        }
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setOtpSent(true);
        startOtpCooldown();
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpToken) {
      setErrorMsg("Please enter the verification code.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: formData.identifier,
        token: otpToken,
        type: 'email'
      });

      if (error) {
        setErrorMsg(error.message);
      } else {
        setSubmitted(true);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setErrorMsg(error.message);
      setLoading(false);
    }
  };

  const renderPasswordForm = () => (
    <form onSubmit={handlePasswordLogin} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
          Email <span className="text-cyan-600 dark:text-cyan-400">*</span>
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
          <input
            type="email"
            name="identifier"
            required
            value={formData.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
      </div>

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
            placeholder="Enter your password"
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

      <div className="flex items-center justify-between gap-2 pt-1 text-xs">
        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="rounded border-slate-300 dark:border-white/20 bg-slate-100 dark:bg-white/5 text-blue-600 focus:ring-0 w-4 h-4 accent-blue-600 cursor-pointer"
          />
          <span>Remember me</span>
        </label>

        <Link
          href="/forgot-password"
          className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
        >
          Forgot Password?
        </Link>
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
              <span>Login</span>
              <LogIn size={14} />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setLoginMethod("otp");
            setErrorMsg("");
          }}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold text-xs text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <KeyRound size={14} className="text-cyan-600 dark:text-cyan-400" />
          <span>Email Code</span>
        </button>
      </div>
    </form>
  );

  const renderOtpForm = () => {
    if (!otpSent) {
      return (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
              Email Address <span className="text-cyan-600 dark:text-cyan-400">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your email to receive a code"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <button
              type="submit"
              disabled={loading || !formData.identifier}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Send OTP Code</span>}
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMethod("password");
                setErrorMsg("");
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold text-xs text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
               <span>Use Password</span>
            </button>
          </div>
        </form>
      );
    }

    return (
      <form onSubmit={handleVerifyOtp} className="space-y-4">
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs rounded-xl text-center mb-4">
          A verification code was sent to <strong>{formData.identifier}</strong>.
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
            Verification Code <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <div className="relative">
            <KeyRound className="w-4 h-4 text-slate-400 dark:text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              required
              value={otpToken}
              onChange={(e) => setOtpToken(e.target.value)}
              placeholder="Enter the 6-digit code"
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors tracking-widest font-mono"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
           <button
            type="submit"
            disabled={loading || !otpToken}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Verify & Login</span>}
          </button>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || otpCooldown > 0}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 font-semibold text-xs text-slate-800 dark:text-white transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {otpCooldown > 0 ? (
               <span className="text-slate-500">Resend in {otpCooldown}s</span>
            ) : (
               <>
                 <RefreshCw size={14} className="text-cyan-600 dark:text-cyan-400" />
                 <span>Resend Code</span>
               </>
            )}
          </button>
        </div>

        <div className="text-center pt-2">
           <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtpToken("");
                setErrorMsg("");
              }}
              className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white underline transition-colors cursor-pointer"
           >
              Change Email Address
           </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative overflow-hidden py-16 px-4 transition-colors duration-300">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <Container className="relative z-10 max-w-md w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex p-4 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Login Successful!</h2>
              <p className="text-xs text-slate-600 dark:text-gray-300 max-w-xs mx-auto">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 dark:from-blue-400 dark:via-cyan-300 dark:to-indigo-400 bg-clip-text text-transparent">
                  Login to Your Account
                </h1>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1">
                  Welcome back! Access your dashboard resources &amp; templates.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center">
                  {errorMsg}
                </div>
              )}

              {loginMethod === "password" ? renderPasswordForm() : renderOtpForm()}

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-white/10" />
                </div>
                <span className="relative bg-slate-50 dark:bg-background px-3 text-[10px] uppercase tracking-widest text-slate-400 dark:text-gray-400 font-bold">
                  OR
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-6">
                 <button
                    type="button"
                    onClick={handleGoogleSignIn}
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

              <p className="text-center text-xs text-slate-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-600 dark:text-cyan-400 hover:underline font-bold"
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
