import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Technical Insights",
  description: "Technical articles on Power BI, DAX, Power Query, SQL, Data Analytics, Microsoft Fabric, and Business Intelligence by Prem Mandal.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/blog",
  },
  openGraph: {
    title: "Blog & Technical Insights | Prem Mandal",
    description: "Technical articles on Power BI, DAX, Power Query, SQL, Data Analytics, Microsoft Fabric, and Business Intelligence by Prem Mandal.",
    url: "https://prem-portfolio-drab.vercel.app/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
