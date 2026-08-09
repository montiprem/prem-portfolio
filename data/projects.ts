import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "export-performance-analysis",
    title: "Export Performance Analysis Power BI Dashboard",
    description:
      "Enterprise export analytics dashboard built for Bhauram Jodhraj tracking $1.03B+ FOB trade values, shipment volumes, HS Code breakdowns, supplier & buyer performance metrics, and country-wise trade trends.",
    tags: [
      "Power BI",
      "Export Analytics",
      "DAX",
      "Bhauram Jodhraj",
      "Trade Intelligence",
      "Power Query",
    ],
    company: "Bhauram Jodhraj Pvt Ltd",
    category: "Power BI",
    accent: "indigo",
    featured: true,
    images: [
      "/projects/Power BI/Export/Export.png",
    ],
    driveUrl:
      "https://app.powerbi.com/view?r=eyJrIjoiMWNkNDgyZjAtMjUxMC00NjdlLWFhYmEtY2I3MjFkZjNiNjgxIiwidCI6IjRmMjJjNjNiLTlkZjQtNGM4Zi1hYjQ5LTJlMTlkNjMyZmFkNiJ9",
  },
  {
    id: "ibm-hr-data-analytics",
    title: "IBM HR Data Analytics Tableau Dashboard",
    description:
      "Comprehensive HR analytics dashboard analyzing employee demographics, department-wise average age, gender distribution, monthly income, and job roles across the organization.",
    tags: ["Tableau", "HR Analytics", "Data Visualization", "Workforce Insights"],
    category: "Tableau",
    accent: "blue",
    featured: true,
    images: ["/projects/Tableau/IBM/IBM.png"],
    driveUrl:
      "https://public.tableau.com/views/IBMHRDATAANALYSISBYMONTIPREM/IBMHRDATAANALYSISBYMONTIPREM",
    tableauEmbedName: "IBMHRDATAANALYSISBYMONTIPREM/IBMHRDATAANALYSISBYMONTIPREM",
  },
  {
    id: "tableau-covid-19-dashboard",
    title: "Covid 19 Tableau Interactive Dashboard",
    description:
      "Interactive Tableau Public dashboard tracking global & nationwide Covid-19 infection trends, recovery rates, testing metrics, and regional impact analysis.",
    tags: ["Tableau", "Healthcare Analytics", "Global Trends", "Interactive Dashboards"],
    category: "Tableau",
    accent: "indigo",
    featured: true,
    images: ["/projects/Tableau/Covid/Covid.png"],
    driveUrl:
      "https://public.tableau.com/views/covid19analysis_16891322177170/Covid19Dashboard",
    tableauEmbedName: "covid19analysis_16891322177170/Covid19Dashboard",
  },
  {
    id: "covid-19-analysis",
    title: "Covid 19 Analysis & Dashboard (Power BI)",
    description:
      "Comprehensive Covid-19 data analysis dashboard tracking nationwide infection rates, recovery metrics, testing trends, and regional impact analysis.",
    tags: ["Power BI", "Healthcare Analytics", "DAX", "Data Modeling"],
    category: "Power BI",
    accent: "indigo",
    featured: true,
    images: [
      "/projects/Power BI/Covid 19/covid 1.png",
      "/projects/Power BI/Covid 19/covid 2.png",
      "/projects/Power BI/Covid 19/covid 3.png",
      "/projects/Power BI/Covid 19/covid 4.png",
      "/projects/Power BI/Covid 19/covid 5.png",
    ],
    driveUrl:
      "https://drive.google.com/file/d/1UMaZgskF3Si-EOHRXzdGNpvk55B0WYy9/view?usp=drive_link",
    pdfUrl: "/projects/Power BI/Covid 19/Covid 19 Analysis & Dashboard Power Bi.pdf",
    datasetUrl: "/projects/Power BI/Covid 19/covid_19_india.csv",
  },
  {
    id: "diabetic-patient-analysis",
    title: "Diabetic Patient Analysis Power BI Dashboard",
    description:
      "Comprehensive healthcare analytics dashboard analyzing diabetic patient demographics, glucose levels, insulin dosages, risk factors, and treatment outcomes.",
    tags: ["Power BI", "Healthcare Analytics", "DAX", "Patient Insights"],
    category: "Power BI",
    accent: "blue",
    featured: true,
    images: [
      "/projects/Power BI/diabetes/diabetes 1.png",
      "/projects/Power BI/diabetes/diabetes 2.png",
      "/projects/Power BI/diabetes/diabetes 3.png",
    ],
    driveUrl:
      "https://drive.google.com/file/d/10XrzYSMNzoXz8HVP3mlzIry8WYmCwj_x/view?usp=drive_link",
    pdfUrl: "/projects/Power BI/diabetes/Diabetic Patient Analysis -.pdf",
  },
  {
    id: "netflix-data-power-bi-dashboard",
    title: "Netflix Data Power BI Dashboard",
    description:
      "Interactive data visualization dashboard tracking Netflix movies and TV shows distribution, content genres, ratings analysis, and release year trends.",
    tags: ["Power BI", "Data Visualization", "DAX", "Content Analytics"],
    category: "Power BI",
    accent: "cyan",
    featured: true,
    images: ["/projects/Power BI/Netflix/Netflix 1.png"],
    driveUrl:
      "https://drive.google.com/file/d/1SKNRSB-ALjUBXUhJRrMH3GI-uSpf9VaL/view?usp=drive_link",
    pdfUrl: "/projects/Power BI/Netflix/Netflix data Power bi dashboard.pdf",
    datasetUrl: "/projects/Power BI/Netflix/netflix_csv.csv",
  },
];