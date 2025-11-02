import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    // Only allow crawling on the actual production domain
    const isProduction = process.env.NEXT_PUBLIC_SITE_URL === "https://www.strsage.com"

    return {
        rules: {
            userAgent: "*",
            disallow: isProduction ? [] : ["/"],
        },
        sitemap: isProduction ? "https://www.strsage.com/sitemap.xml" : undefined,
    }
}