import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Prem Mandal's portfolio. Information about cookies used on this site.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/cookie-policy",
  },
  openGraph: {
    title: "Cookie Policy | Prem Mandal",
    description: "Cookie Policy for Prem Mandal's portfolio. Information about cookies used on this site.",
    url: "https://prem-portfolio-drab.vercel.app/cookie-policy",
  },
};

export default function CookiePolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
