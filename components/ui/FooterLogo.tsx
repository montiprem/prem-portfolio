"use client";

import Link from "next/link";
import Image from "next/image";

export default function FooterLogo() {
  return (
    <Link href="/" className="group inline-flex items-center gap-3">
      {/* Icon Badge */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-blue-500/20 group-hover:shadow-cyan-400/40 transition-all duration-300">
        <div className="w-full h-full bg-[#0a0f1d] rounded-[11px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-cyan-500/20 transition-colors" />

          {/* PM Logo Image */}
          <div className="relative w-7 h-7">
            <Image
              src="/logopm.png"
              alt="Prem Mandal Logo"
              fill
              unoptimized
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
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