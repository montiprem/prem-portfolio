import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Technical Insights",
  description: "Technical articles on Power BI, DAX, Power Query, SQL, Data Analytics, Microsoft Fabric, and Business Intelligence by Prem Mandal.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
