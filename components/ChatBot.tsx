"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi there! 👋 I'm Prem's AI assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: userMessage },
    ];
    setMessages(newMessages);
    setLoading(true);

    // Simulate response delay without making an API request
    setTimeout(() => {
      const maintenanceResponse = `🤖 AI Assistant is currently being upgraded.

I'm improving its knowledge, speed, and overall experience.

🚀 Coming back soon!`;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: maintenanceResponse },
      ]);
      setLoading(false);
    }, 600);
  };

  return (
    // Position updated to bottom-8/bottom-10 to prevent footer overlap
    <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex flex-col items-end gap-3 group">

      {/* Floating Toggle Button (with built-in tooltip) */}
      <div className="relative flex items-center justify-center">

        {/* Elegant Desktop Tooltip */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#0b1220]/95 border border-white/10 text-white px-3 py-1.5 rounded-xl shadow-xl backdrop-blur-md text-[11px] font-semibold whitespace-nowrap">
              Ask Prem&apos;s AI
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-blue-600/90 to-cyan-500/90 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full shadow-lg shadow-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-white/10 transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
          aria-expanded={isOpen}
        >
            {isOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
                {/* Subtle Status Dot */}
                <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-white/20" />
                </span>
              </div>
            )}
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[4.5rem] md:bottom-20 right-0 w-[calc(100vw-3rem)] max-w-[380px] h-[calc(100vh-8rem)] max-h-[550px] bg-[#0b1220]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    Prem&apos;s AI Assistant <span className="text-sm">🤖</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-0.5 max-w-[240px] leading-tight">
                    Ask me about Prem, his skills, projects, experience, Power BI, or SQL.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Close panel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs sm:text-sm">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0 text-blue-300">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white/10 text-gray-200 border border-white/5 rounded-bl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-7 h-7 rounded-full bg-cyan-500/30 border border-cyan-500/40 flex items-center justify-center shrink-0 text-cyan-300">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-gray-400 text-xs italic">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]" />
                  <span>Thinking... 💡</span>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={sendMessage}
              className="p-3 bg-white/5 border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my skills or projects..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50 shrink-0 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}