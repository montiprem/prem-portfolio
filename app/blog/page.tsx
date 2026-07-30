"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowUpRight, BookOpen, Tag } from "lucide-react";
import Container from "@/components/ui/Container";

// Blog Data
const blogPosts = [
  {
    id: 1,
    title: "Mastering DAX: Top 5 Performance Optimization Tricks in Power BI",
    excerpt: "Learn how to optimize slow measures, avoid calculated columns, and use CALCULATE efficiently to speed up report loading times.",
    category: "Power BI",
    date: "Jul 24, 2026",
    readTime: "6 min read",
    slug: "mastering-dax-performance-optimization",
    tags: ["DAX", "Power BI", "Performance"],
  },
  {
    id: 2,
    title: "Why Microsoft Fabric Direct Lake Mode is Replacing Import Mode",
    excerpt: "A deep dive into OneLake, Delta Parquet tables, and how Direct Lake mode achieves import-like speed without data refreshes.",
    category: "Fabric",
    date: "Jul 15, 2026",
    readTime: "8 min read",
    slug: "microsoft-fabric-direct-lake-vs-import",
    tags: ["Fabric", "OneLake", "Data Lakehouse"],
  },
  {
    id: 3,
    title: "10 SQL Window Functions Every Data Analyst Must Master",
    excerpt: "From ROW_NUMBER() and RANK() to LEAD() and LAG(), learn practical query examples used in top tech interview rounds.",
    category: "SQL",
    date: "Jun 28, 2026",
    readTime: "5 min read",
    slug: "top-sql-window-functions-interview-guide",
    tags: ["SQL", "Analytics", "Interviews"],
  },
  {
    id: 4,
    title: "How to Build an ATS-Friendly Data Analyst Resume in 2026",
    excerpt: "Break down the exact structure, metric-driven bullet points, and project presentation that recruiters look for in BI roles.",
    category: "Career",
    date: "Jun 10, 2026",
    readTime: "7 min read",
    slug: "ats-data-analyst-resume-guide",
    tags: ["Resume", "Career", "Job Search"],
  },
];

const categories = ["All", "Power BI", "Fabric", "SQL", "Career"];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-background pt-32 pb-20 relative overflow-hidden">
      {/* Background FX */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/grid.svg')] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20 inline-flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Technical Insights
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Articles & Tutorials
            </h1>
            <p className="text-gray-400 mt-4 text-base sm:text-lg">
              Guides on Power BI DAX, Microsoft Fabric, SQL optimization, and analytics career growth.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 max-w-xl mx-auto relative"
          >
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, DAX, SQL, Fabric..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors shadow-lg"
            />
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-6"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105"
                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-card/50 border border-white/5 rounded-2xl max-w-lg mx-auto">
            <p className="text-gray-400 text-sm">No articles found matching your search.</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 gap-8">
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-white/10 rounded-2xl p-7 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span className="font-semibold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3 h-3 text-purple-400" />
                      <span className="text-[11px] font-mono text-gray-400">
                        {post.tags.join(" • ")}
                      </span>
                    </div>

                    <a
                      href={`/blog/${post.slug}`}
                      className="text-xs font-semibold text-purple-400 group-hover:text-purple-300 flex items-center gap-1 transition-colors"
                    >
                      Read Article <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </Container>
    </main>
  );
}