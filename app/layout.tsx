import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/cursor/CustomCursor";
import Preloader from "@/components/loader/Preloader";
import ChatBot from "@/components/ChatBot";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prem Mandal | Senior BI Developer & Data Analyst",
  description:
    "Portfolio of Prem Mandal, BI Developer specialized in Power BI, SQL, and Data Analytics.",
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

          {/* Custom Mouse Cursor (Hidden on Touch/Mobile devices) */}
          <CustomCursor />

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