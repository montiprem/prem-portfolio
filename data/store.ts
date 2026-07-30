export interface StoreItem {
  id: string;
  title: string;
  description: string;
  category: "PBIT Template" | "DAX Cheat Sheet" | "Excel Workbook" | "Dataset";
  price: string; // e.g., "Free" or "₹499"
  originalPrice?: string;
  downloadUrl?: string;
  previewImage?: string;
  features: string[];
  isFree?: boolean;
}

export const storeItems: StoreItem[] = [
  {
    id: "dark-mode-pbi-template",
    title: "Executive Dark Glassmorphism Power BI Template",
    description:
      "Pre-styled PBIT template featuring custom theme JSON, high-contrast KPI cards, and dynamic navigation buttons.",
    category: "PBIT Template",
    price: "Free",
    downloadUrl: "/downloads/dark-executive-template.pbit",
    features: [
      "Built-in Dark Glassmorphism Theme",
      "Pre-configured Date Table & DAX Measures",
      "Responsive Layouts (Desktop & Mobile View)",
    ],
    isFree: true,
  },
  {
    id: "sql-dax-cheat-sheet",
    title: "Ultimate DAX & Power Query Cheat Sheet (PDF)",
    description:
      "Quick reference guide covering top 50 DAX patterns, Time Intelligence formulas, and M-Query transformations.",
    category: "DAX Cheat Sheet",
    price: "Free",
    downloadUrl: "/downloads/dax-mquery-cheatsheet.pdf",
    features: [
      "Top 50 DAX Measure Formulas",
      "Context Transition Cheat Sheet",
      "M-Query Syntax Quick Reference",
    ],
    isFree: true,
  },
];