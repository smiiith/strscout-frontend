import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.strsage.com/guides",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      // Updated January 2026 with current fee structure
      url: "https://www.strsage.com/guides/airbnb-fees",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-title-optimization",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-photo-tips",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-amenities-checklist",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-description-writing",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/str-interior-design-tips",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/improve-airbnb-rating",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-pricing-strategy",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-reviews",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-superhost",
      lastModified: new Date("2026-05-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
