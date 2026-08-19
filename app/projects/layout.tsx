import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Analytics Projects",
  description: "Explore enterprise Power BI dashboards, SQL databases, and data analysis case studies by Prem Mandal.",
  alternates: {
    canonical: "https://premmandal.in/projects",
  },
  openGraph: {
    title: "Data Analytics Projects | Prem Mandal",
    description: "Explore enterprise Power BI dashboards, SQL databases, and data analysis case studies by Prem Mandal.",
    url: "https://premmandal.in/projects",
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
