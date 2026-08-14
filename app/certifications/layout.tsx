import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Professional certifications in Data Science, C Language, and other skills earned by Prem Mandal.",
};

export default function CertificationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
