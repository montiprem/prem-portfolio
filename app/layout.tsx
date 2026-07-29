import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProviderClient from "@/components/providers/ThemeProviderClient";
import Preloader from "@/components/loader/Preloader";
import CustomCursor from "@/components/cursor/CustomCursor";

// Fonts Setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Viewport Configuration
export const viewport: Viewport = {
  themeColor: "#030712",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// Comprehensive SEO & OpenGraph Metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://premmandal.com"), // Apne domain URL se replace kar sakte hain
  title: {
    default: "Prem Mandal | Senior Power BI Developer & Data Engineer",
    template: "%s | Prem Mandal",
  },
  description:
    "Senior Power BI Developer & Data Engineer specializing in Power BI, DAX, SQL, Power Query, and Microsoft Fabric. Building enterprise-grade dashboards and data analytics solutions.",
  keywords: [
    "Prem Mandal",
    "Power BI Developer",
    "Data Analyst",
    "Data Engineer",
    "Microsoft Fabric",
    "DAX Specialist",
    "SQL Developer",
    "Analytics Portfolio",
    "Business Intelligence",
  ],
  authors: [{ name: "Prem Mandal", url: "https://www.linkedin.com/in/premmandal/" }],
  creator: "Prem Mandal",
  publisher: "Prem Mandal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://premmandal.com",
    title: "Prem Mandal | Senior Power BI Developer & Data Engineer",
    description:
      "Turning complex enterprise data into actionable executive insights. Specialist in Power BI, DAX, SQL, and Microsoft Fabric.",
    siteName: "Prem Mandal Portfolio",
    images: [
      {
        url: "/images/prem.jpeg",
        width: 1200,
        height: 630,
        alt: "Prem Mandal - Power BI Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prem Mandal | Senior Power BI Developer",
    description:
      "Enterprise Power BI Dashboards, Semantic Modeling, and Data Engineering.",
    images: ["/images/prem.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark scroll-smooth selection:bg-blue-500/30 selection:text-cyan-200"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-#030712 text-white min-h-screen overflow-x-hidden`}
      >
        <ThemeProviderClient>
          <Preloader />
          <CustomCursor />
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}