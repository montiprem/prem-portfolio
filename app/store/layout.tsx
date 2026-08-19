import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Download Power BI templates, DAX cheat sheets, Excel workbooks, and datasets by Prem Mandal.",
  alternates: {
    canonical: "https://premmandal.in/store",
  },
  openGraph: {
    title: "Store | Prem Mandal",
    description: "Download Power BI templates, DAX cheat sheets, Excel workbooks, and datasets by Prem Mandal.",
    url: "https://premmandal.in/store",
  },
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
