import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://your-portfolio-domain.com";

  const routes = [
    "",
    "/projects",
    "/certifications",
    "/store",
    "/contact",
    "/blog",
    "/services",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}