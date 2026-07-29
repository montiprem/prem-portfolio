export interface Project {
  title: string;
  description: string;
  tags: string[];
  company: string;
  demoUrl?: string;
  accent: "blue" | "cyan" | "indigo";
}

export const projects: Project[] = [
  {
    title: "Employee Attrition Dashboard",
    description:
      "Tracks and analyzes workforce attrition trends across departments, supporting data-driven retention and management decisions.",
    tags: ["Power BI", "DAX", "HR Analytics"],
    company: "Utkarsh India Limited",
    accent: "blue",
  },
  {
    title: "Weekly MIS & MOM Dashboard",
    description:
      "Single-page dashboard consolidating weekly reports submitted by all department HODs into one consistent view.",
    tags: ["Power BI", "Power Query"],
    company: "Utkarsh India Limited",
    accent: "cyan",
  },
  {
    title: "Auction Sales Dashboard",
    description:
      "Week-wise dashboard analyzing buyer-wise purchase volumes and tea variety-wise margins to guide pricing decisions for upcoming auctions.",
    tags: ["Power BI", "DAX", "Data Cleaning"],
    company: "Bhauram Jodhraj Pvt Ltd",
    accent: "indigo",
  },
  {
    title: "Import/Export Analysis Dashboard",
    description:
      "Global market insights dashboard built on data sourced and scraped from Volza for import/export trend analysis.",
    tags: ["Power BI", "Data Integration"],
    company: "Bhauram Jodhraj Pvt Ltd",
    accent: "blue",
  },
  {
    title: "Sales Analysis Dashboard",
    description:
      "Week-wise, month-wise and yearly sales insights built from raw Excel data, published to Power BI Service with Row Level Security.",
    tags: ["Power BI", "RLS", "Advanced Excel"],
    company: "Super Smelters Ltd",
    accent: "cyan",
  },
  {
    title: "Vehicle Track & Weigh Dashboard",
    description:
      "Monitors weekly vehicle turnaround time and weight discrepancies for operational tracking.",
    tags: ["Power BI", "Operations"],
    company: "Super Smelters Ltd",
    accent: "indigo",
  },
];