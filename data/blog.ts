export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: "Power BI" | "DAX" | "SQL" | "Data Engineering";
  tags: string[];
  coverImage?: string;
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: "dax-optimization-guide",
    slug: "mastering-dax-optimization-power-bi",
    title: "How to Optimize Heavy DAX Measures in Power BI for Fast Loading",
    excerpt:
      "A step-by-step guide on reducing visual render time by optimizing CALCULATE filters, variables, and context transition.",
    date: "July 2026",
    readTime: "5 min read",
    category: "DAX",
    tags: ["Power BI", "DAX", "Performance Tuning"],
    author: {
      name: "Prem Mandal",
      avatar: "/images/prem.jpeg",
    },
  },
  {
    id: "star-schema-vs-flat-table",
    slug: "why-star-schema-matters-in-power-bi",
    title: "Why Star Schema is Non-Negotiable for Enterprise Analytics",
    excerpt:
      "Comparing flat Excel datasets with Star Schema models—how dimensional modeling speeds up query execution and simplifies DAX.",
    date: "June 2026",
    readTime: "7 min read",
    category: "Data Engineering",
    tags: ["Data Modeling", "Star Schema", "Best Practices"],
    author: {
      name: "Prem Mandal",
      avatar: "/images/prem.jpeg",
    },
  },
];