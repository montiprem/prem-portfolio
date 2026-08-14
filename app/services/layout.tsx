import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional data analytics services including Power BI dashboard development, DAX optimization, and SQL data modeling.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
