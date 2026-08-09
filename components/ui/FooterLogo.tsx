"use client";

import Link from "next/link";

export default function FooterLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      {/* Icon Badge */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
        <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-cyan-500/20 transition-colors" />
          
          {/* Custom PM + Analytics Bar Graphic */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-cyan-400 group-hover:scale-110 transition-transform duration-300"
          >
            {/* Analytics Bar Graphic Background */}
            <path
              d="M3 20H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-40"
            />
            <path
              d="M6 16V12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="opacity-60"
            />
            <path
              d="M11 16V8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M16 16V4"
              stroke="#38BDF8"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className="text-base font-extrabold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
          Prem Mandal<span className="text-cyan-400">.</span>
        </span>
        <span className="text-[10px] font-mono font-medium text-gray-400 tracking-wider uppercase">
          Senior BI Developer
        </span>
      </div>
    </Link>
  );
}