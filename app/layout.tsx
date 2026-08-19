import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/loader/Preloader";
import ChatBot from "@/components/ChatBot";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Production URL setup
  metadataBase: new URL("https://premmandal.in"),
  title: {
    default: "Prem Mandal | Senior BI Developer & Data Analyst",
    template: "%s | Prem Mandal",
  },
  description:
    "Portfolio of Prem Mandal - Senior BI Developer and Data Analyst specializing in Power BI, SQL, DAX, Microsoft Fabric, and Data Analytics.",
  keywords: [
    "Prem Mandal",
    "Prem Mandal portfolio",
    "Prem Mandal Power BI Developer",
    "Prem Mandal Data Analyst",
    "Prem Mandal BI Developer",
    "Prem Mandal Senior BI Developer",
    "Prem Mandal Power BI",
    "Prem Mandal Data Analytics",
    "Power BI Developer India",
    "Data Analyst India",
    "Senior BI Developer India",
    "Senior Power BI Developer India",
    "Power BI Developer Kolkata",
    "Power BI Developer Bangalore",
    "Power BI Developer portfolio",
    "Data Analyst portfolio",
    "Power BI portfolio",
    "Microsoft Power BI Developer India",
    "Power BI Consultant",
    "Business Intelligence Developer",
    "SQL Data Analyst",
    "Power BI DAX Developer",
    "Microsoft Fabric Specialist",
  ],
  authors: [{ name: "Prem Mandal" }],
  creator: "Prem Mandal",
  icons: {
    icon: [{ url: "/logopm.png?v=2", type: "image/png" }],
    shortcut: "/logopm.png?v=2",
    apple: "/logopm.png?v=2",
  },
  alternates: {
    canonical: "https://premmandal.in",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premmandal.in",
    title: "Prem Mandal | Senior BI Developer & Data Analyst",
    description:
      "Enterprise Power BI dashboards, SQL data modeling, and Microsoft Fabric solutions by Prem Mandal.",
    siteName: "Prem Mandal Portfolio",
    images: [
      {
        url: "/images/prem.jpeg",
        width: 1200,
        height: 630,
        alt: "Prem Mandal - Senior Power BI Developer and Data Analyst India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Mandal | Senior BI Developer & Data Analyst",
    description:
      "Enterprise Power BI dashboards, SQL data modeling, and Microsoft Fabric solutions.",
    images: ["/images/prem.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "CLo_DXXoMvCVWvBfZyXOzZ9H6yAYYbAahCaNCxIvupU",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white`}
      >
        {/* Structured Data (JSON-LD for Google Rich Snippets) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Prem Mandal",
              url: "https://premmandal.in",
              description: "Senior Power BI Developer and Data Analyst based in India specializing in enterprise dashboards, SQL data modeling, and Microsoft Fabric.",
              jobTitle: "Senior BI Developer / Power BI Developer / Data Analyst",
              image: "https://premmandal.in/images/prem.jpeg",
              worksFor: {
                "@type": "Organization",
                name: "Freelance / Consulting",
              },
              address: {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              sameAs: [
                "https://www.linkedin.com/in/premmandal/",
                "https://github.com/montiprem",
              ],
              knowsAbout: [
                "Power BI",
                "SQL",
                "DAX",
                "Data Analytics",
                "Microsoft Fabric",
                "Business Intelligence",
              ],
            }),
          }}
        />

        <Providers>
          {/* Startup Preloader */}
          <Preloader />

          {/* Top Navigation */}
          <Navbar />

          {/* Main Route Content */}
          <div className="grow">{children}</div>

          {/* AI Chat Assistant Widget */}
          <ChatBot />

          {/* WhatsApp Floating Button */}
          <WhatsAppButton />

          {/* Common Footer across all pages */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}