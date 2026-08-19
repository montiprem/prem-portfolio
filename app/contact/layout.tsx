import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Prem Mandal for Power BI consulting, freelance data analytics projects, and BI developer roles.",
  alternates: {
    canonical: "https://premmandal.in/contact",
  },
  openGraph: {
    title: "Contact | Prem Mandal",
    description: "Get in touch with Prem Mandal for Power BI consulting, freelance data analytics projects, and BI developer roles.",
    url: "https://premmandal.in/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
