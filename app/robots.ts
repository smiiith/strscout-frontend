import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            disallow: process.env.NODE_ENV != "production" ? ["*"] : [],
        },
        sitemap: "https://strsage.com/sitemap.xml",
    }
}