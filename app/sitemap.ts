import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://prem-portfolio-drab.vercel.app";

  const routes = [
    "",
    "/projects",
    "/certifications",
    "/store",
    "/contact",
    "/blog",
    "/services",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}