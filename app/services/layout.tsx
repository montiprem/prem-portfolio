import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Professional data analytics services including Power BI dashboard development, DAX optimization, and SQL data modeling.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/services",
  },
  openGraph: {
    title: "Services | Prem Mandal",
    description: "Professional data analytics services including Power BI dashboard development, DAX optimization, and SQL data modeling.",
    url: "https://prem-portfolio-drab.vercel.app/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
