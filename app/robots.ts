import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://your-portfolio-domain.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/login", "/signup"], // Private routes exclude karein
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}