import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Prem Mandal's portfolio. Learn how your data is collected, used, and protected.",
  alternates: {
    canonical: "https://prem-portfolio-drab.vercel.app/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Prem Mandal",
    description: "Privacy Policy for Prem Mandal's portfolio. Learn how your data is collected, used, and protected.",
    url: "https://prem-portfolio-drab.vercel.app/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
