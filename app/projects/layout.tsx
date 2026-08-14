import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Analytics Projects",
  description: "Explore enterprise Power BI dashboards, SQL databases, and data analysis case studies by Prem Mandal.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
