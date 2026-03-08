import type { MetadataRoute } from "next";
import { LOCALITIES } from "@/lib/localities";

export default function sitemap(): MetadataRoute.Sitemap {
  const localityEntries: MetadataRoute.Sitemap = LOCALITIES.flatMap((l) => [
    {
      url: `https://www.strsage.com/market-spy/${l.slug}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `https://www.strsage.com/market-scout/${l.slug}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `https://www.strsage.com/feedback-genius/${l.slug}`,
      lastModified: new Date("2025-06-01"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [
    {
      url: "https://www.strsage.com",
      lastModified: new Date("2026-03-08"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.strsage.com/feedback-genius",
      lastModified: new Date("2026-03-08"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/market-spy",
      lastModified: new Date("2026-02-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/market-scout",
      lastModified: new Date("2026-02-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/bookings-down",
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/host-assist",
      lastModified: new Date("2025-10-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.strsage.com/about-us",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/pricing",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // Updated January 2026 with current fee structure
      url: "https://www.strsage.com/guides/airbnb-fees",
      lastModified: new Date("2026-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-title-optimization",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-photo-tips",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-amenities-checklist",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/airbnb-description-writing",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/str-interior-design-tips",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/guides/improve-airbnb-rating",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://www.strsage.com/faq",
      lastModified: new Date("2026-03-08"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.strsage.com/contact-us",
      lastModified: new Date("2025-01-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://www.strsage.com/privacy-policy",
      lastModified: new Date("2024-01-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://www.strsage.com/terms",
      lastModified: new Date("2024-01-15"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...localityEntries,
  ];
}
