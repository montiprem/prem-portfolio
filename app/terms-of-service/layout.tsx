import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Prem Mandal's portfolio.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/terms-of-service",
  },
  openGraph: {
    title: "Terms of Service | Prem Mandal",
    description: "Terms of Service for Prem Mandal's portfolio.",
    url: "https://prem-portfolio-drab.vercel.app/terms-of-service",
  },
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
