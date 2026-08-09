import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "covid-19-analysis",
    title: "Covid 19 Analysis & Dashboard",
    description:
      "Comprehensive Covid-19 data analysis dashboard tracking nationwide infection rates, recovery metrics, testing trends, and regional impact analysis.",
    tags: ["Power BI", "Healthcare Analytics", "DAX", "Data Modeling", "Pandemic Insights"],
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
    tags: ["Power BI", "Healthcare Analytics", "DAX", "Patient Insights", "Data Modeling"],
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
    tags: ["Power BI", "Data Visualization", "DAX", "Content Analytics", "Power Query"],
    category: "Power BI",
    accent: "cyan",
    featured: true,
    images: [
      "/projects/Power BI/Netflix/Netflix 1.png",
    ],
    driveUrl:
      "https://drive.google.com/file/d/1SKNRSB-ALjUBXUhJRrMH3GI-uSpf9VaL/view?usp=drive_link",
    pdfUrl: "/projects/Power BI/Netflix/Netflix data Power bi dashboard.pdf",
    datasetUrl: "/projects/Power BI/Netflix/netflix_csv.csv",
  },
];