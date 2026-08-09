export interface Project {
  id?: string; // Optional: future routing ke liye (e.g., /projects/employee-attrition)
  title: string;
  description: string;
  tags: string[];
  company?: string;
  demoUrl?: string;
  githubUrl?: string; // Optional: agar open-source repo ho
  image?: string; // Optional: single dashboard screenshot ke liye
  images?: string[]; // Multiple screenshots carousel slider ke liye
  driveUrl?: string; // Google Drive folder/file view link
  pdfUrl?: string; // Local PDF download path
  datasetUrl?: string; // Local CSV / Excel Dataset download path
  category?: "Power BI" | "SQL" | "Data Engineering" | "Python" | "Advance Excel" | "Tableau";
  accent?: "blue" | "cyan" | "indigo";
  featured?: boolean; // Optional: homepage par highlight karne ke liye
}

// Service Type
export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide Icon name
  features: string[];
  price?: string;
}

// Store / Resource Item Type
export interface StoreItem {
  id: string;
  title: string;
  description: string;
  category: "Template" | "Dataset" | "Dashboard" | "Guide";
  price: string; // "Free" ya "$29"
  downloadUrl?: string;
  previewUrl?: string;
}

// Blog Post Type
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
}

export const skillCategories = [
  "Programming & Querying",
  "BI & Analytics",
  "Data Modeling & ETL",
  "Tools & Platforms",
] as const;

export type SkillCategory = (typeof skillCategories)[number];

export interface Skill {
  name: string;
  level: number; // 0-100
  category: SkillCategory;
  iconName?: string; // Optional: Lucide icon ya custom badge ke liye
  description?: string; // Optional: agar hover par extra info dikhani ho
}