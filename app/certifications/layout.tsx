import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications in Data Science, C Language, and other skills earned by Prem Mandal.",
  alternates: {
    canonical: "https://premmandal.in/certifications",
  },
  openGraph: {
    title: "Certifications | Prem Mandal",
    description: "Professional certifications in Data Science, C Language, and other skills earned by Prem Mandal.",
    url: "https://premmandal.in/certifications",
  },
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
