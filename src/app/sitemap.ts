import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://newfindmy.local";

  return [
    {
      url: baseUrl,
      lastModified: "2026-10-13",
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
