import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ologyapp.com", changeFrequency: "weekly", priority: 1 },
    { url: "https://ologyapp.com/privacy-policy", changeFrequency: "monthly", priority: 0.3 },
    { url: "https://ologyapp.com/Terms-of-service", changeFrequency: "monthly", priority: 0.3 },
  ];
}
