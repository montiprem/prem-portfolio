"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User } from "lucide-react";

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

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! I encountered an issue while thinking. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Position updated to bottom-8/bottom-10 to prevent footer overlap
    <div className="fixed bottom-8 right-6 md:bottom-10 md:right-8 z-50 flex items-center gap-3">
      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 bg-gradient-to-tr from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-full shadow-[0_0_25px_rgba(59,130,246,0.6)] flex items-center justify-center border border-white/20 transition-all group cursor-pointer"
        aria-label="Open AI Chat"
      >
        {/* Tooltip for desktop hover */}
        {!isOpen && (
          <span className="absolute right-full mr-3 whitespace-nowrap bg-[#0b1220]/90 border border-blue-500/30 text-white px-2.5 py-1.5 rounded-lg shadow-xl backdrop-blur-md text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 hidden md:block">
            Prem&apos;s AI
          </span>
        )}

        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
              </span>
            </div>
          )}
        </motion.div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-[90vw] sm:w-[380px] h-[480px] sm:h-[500px] bg-[#0b1220]/95 border border-white/15 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden text-white"
          >
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    Prem&apos;s AI Assistant <span className="text-sm">🤖</span>
                  </h3>
                  <p className="text-[10px] text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />{" "}
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                aria-label="Close chat"
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
                aria-label="Send message"
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