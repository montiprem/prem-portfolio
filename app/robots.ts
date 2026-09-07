import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://prem-portfolio-drab.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/signup", "/dashboard", "/forgot-password", "/reset-password"], // Private routes exclude karein
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}