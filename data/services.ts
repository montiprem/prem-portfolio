export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
  deliverables: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    id: "bi-dashboard-development",
    title: "Enterprise Power BI Dashboards",
    description:
      "Transforming raw corporate data into highly visual, executive-ready Power BI reports with custom DAX calculations.",
    iconName: "BarChart3",
    features: [
      "Custom DAX Measures & Time Intelligence",
      "Interactive Drill-through & Dynamic Tooltips",
      "Row-Level Security (RLS) Implementation",
      "Optimized Data Refresh Schedules",
    ],
    deliverables: ["PBIX Source File", "Power BI Service Publishing", "User Training Documentation"],
    popular: true,
  },
  {
    id: "data-modeling-etl",
    title: "Data Modeling & ETL Pipelines",
    description:
      "Building scalable Star and Snowflake schema data models with automated Power Query and SQL ETL transformations.",
    iconName: "Layers",
    features: [
      "Star Schema & Snowflake Architecture",
      "Data Cleaning & Unpivoting via Power Query",
      "SQL Stored Procedures & Views Optimization",
      "Automated Data Pipelines",
    ],
    deliverables: ["Semantic Model Design", "Documented ER Diagram", "SQL Scripts"],
  },
  {
    id: "microsoft-fabric-migration",
    title: "Microsoft Fabric & Cloud Analytics",
    description:
      "Modernizing data architecture using Microsoft Fabric, Lakehouse, and OneLake for centralized analytics.",
    iconName: "Cloud",
    features: [
      "Lakehouse & Warehouse Setup",
      "Direct Lake Mode Optimization",
      "Data Integration via Fabric Pipelines",
      "Centralized Workspace Governance",
    ],
    deliverables: ["Fabric Environment Setup", "Pipeline Documentation", "Performance Tuning Report"],
  },
];