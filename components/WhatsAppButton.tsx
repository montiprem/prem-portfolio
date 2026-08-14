"use client";

import { motion } from "framer-motion";
import { WhatsAppIcon } from "./ui/BrandIcons";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-24 right-6 md:bottom-28 md:right-8 z-50 flex items-center gap-3">
      <motion.a
        href="https://wa.me/917281055278"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-3.5 bg-gradient-to-tr from-green-500 to-emerald-400 hover:from-green-400 hover:to-emerald-300 text-white rounded-full shadow-[0_0_25px_rgba(34,197,94,0.6)] flex items-center justify-center border border-white/20 transition-all group cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute right-full mr-3 whitespace-nowrap bg-[#0b1220]/90 border border-green-500/30 text-white px-2.5 py-1.5 rounded-lg shadow-xl backdrop-blur-md text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hidden md:block">
          Chat with me
        </span>

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          <WhatsAppIcon size={24} className="text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-300" />
          </span>
        </motion.div>
      </motion.a>
    </div>
  );
}
