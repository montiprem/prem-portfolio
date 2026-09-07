import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://prem-portfolio-drab.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth/", "/login", "/signup", "/dashboard", "/forgot-password", "/reset-password"], // Private routes exclude
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}