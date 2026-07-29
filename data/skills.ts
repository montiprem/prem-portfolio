export interface Skill {
  name: string;
  level: number; // 0-100
  category: (typeof skillCategories)[number];
}

export const skillCategories = [
  "Programming & Querying",
  "BI & Analytics",
  "Data Modeling & ETL",
  "Tools & Platforms",
] as const;

export const skills: Skill[] = [
  { name: "SQL", level: 85, category: "Programming & Querying" },
  { name: "Python", level: 75, category: "Programming & Querying" },

  { name: "Power BI (Desktop & Service)", level: 95, category: "BI & Analytics" },
  { name: "DAX", level: 90, category: "BI & Analytics" },
  { name: "Tableau", level: 70, category: "BI & Analytics" },
  { name: "Advanced Excel", level: 85, category: "BI & Analytics" },

  { name: "Power Query", level: 85, category: "Data Modeling & ETL" },
  { name: "Star / Snowflake Schema", level: 85, category: "Data Modeling & ETL" },
  { name: "Row Level Security (RLS)", level: 80, category: "Data Modeling & ETL" },
  { name: "ETL & Data Cleaning", level: 82, category: "Data Modeling & ETL" },

  { name: "Microsoft Fabric", level: 75, category: "Tools & Platforms" },
  { name: "Power Automate", level: 70, category: "Tools & Platforms" },
  { name: "VBA", level: 70, category: "Tools & Platforms" },
];