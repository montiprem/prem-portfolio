"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, User, Mail, LogOut, CheckCircle } from "lucide-react";

export default function DashboardClient({ user, profile }: { user: any, profile: any }) {
  const supabase = createClient();
  const router = useRouter();
  const [fullName, setFullName] = useState(profile?.full_name || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("Profile updated successfully!");
        router.refresh();
      }
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar Profile Card */}
      <div className="col-span-1">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-6 shadow-xl dark:shadow-2xl flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg shadow-blue-500/30">
            {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white text-center">
            {profile?.full_name || "User"}
          </h2>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 mb-6 flex items-center gap-1.5">
            <Mail size={12} /> {user.email}
          </p>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold transition-all cursor-pointer"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-1 md:col-span-2 space-y-6">
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 backdrop-blur-2xl p-6 shadow-xl dark:shadow-2xl">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <User className="text-blue-500" size={18} /> Profile Information
          </h3>

          {message && (
            <div className={`mb-4 p-3 rounded-xl text-xs flex items-center gap-2 ${message.includes('Error') ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'}`}>
               {!message.includes('Error') && <CheckCircle size={14} />} {message}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Update your name"
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-gray-300 mb-1.5">
                Account Email (Cannot be changed here)
              </label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-slate-500 dark:text-gray-500 cursor-not-allowed opacity-70"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
