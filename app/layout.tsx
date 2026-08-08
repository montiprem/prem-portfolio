import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/loader/Preloader";
import ChatBot from "@/components/ChatBot";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prem Mandal | Senior BI Developer & Data Analyst",
  description:
    "Portfolio of Prem Mandal - Senior BI Developer and Data Analyst specializing in Power BI, SQL, DAX, and Data Analytics.",
  icons: {
    icon: [
      { url: "/icon.png?v=1", type: "image/png" },
    ],
    shortcut: "/icon.png?v=1",
    apple: "/icon.png?v=1",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.className} bg-background text-foreground antialiased min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white`}
      >
        <Providers>
          {/* Startup Preloader */}
          <Preloader />

          {/* Top Navigation */}
          <Navbar />

          {/* Main Route Content */}
          <div className="grow">{children}</div>

          {/* AI Chat Assistant Widget */}
          <ChatBot />

          {/* Common Footer across all pages */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}