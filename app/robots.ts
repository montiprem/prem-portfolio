import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://premmandal.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/signup", "/dashboard", "/forgot-password", "/reset-password"], // Private routes exclude karein
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}