import { createClient } from "@/utils/supabase/server";

export interface PhotoFeedbackStats {
  totalProperties: number;
  heroImageStats: {
    averageRating: number;
    ratingDistribution: {
      excellent: number;
      good: number;
      satisfactory: number;
      needsImprovement: number;
    };
  };
  otherImagesStats: {
    averageRating: number;
    ratingDistribution: {
      excellent: number;
      good: number;
      satisfactory: number;
      needsImprovement: number;
    };
  };
  commonFeedbackThemes: Array<{
    theme: string;
    count: number;
    percentage: number;
    category: "hero_image" | "other_images";
  }>;
  topSuggestions: Array<{
    suggestion: string;
    count: number;
    category: "hero_image" | "other_images";
  }>;
}

export async function aggregatePhotoFeedbackData(): Promise<PhotoFeedbackStats> {
  const supabase = await createClient();

  // Fetch all property ratings
  const { data: ratings, error } = await supabase
    .from("property_ratings")
    .select("id, ratings")
    .limit(1000);

  if (error) {
    console.error("Error fetching ratings:", error);
    return getDefaultStats();
  }

  if (!ratings || ratings.length === 0) {
    return getDefaultStats();
  }

  // Process the data
  let heroTotalRating = 0;
  let heroRatingCount = 0;
  let otherTotalRating = 0;
  let otherRatingCount = 0;

  const heroDistribution = {
    excellent: 0,
    good: 0,
    satisfactory: 0,
    needsImprovement: 0,
  };

  const otherDistribution = {
    excellent: 0,
    good: 0,
    satisfactory: 0,
    needsImprovement: 0,
  };

  const feedbackThemes = new Map<
    string,
    { count: number; category: "hero_image" | "other_images" }
  >();
  const suggestions = new Map<
    string,
    { count: number; category: "hero_image" | "other_images" }
  >();

  for (const record of ratings) {
    const ratingsData = record.ratings as any;

    // Process hero image data
    const heroData = ratingsData?.hero_image;
    if (heroData) {
      const rating = heroData.rating_number;
      if (rating) {
        heroTotalRating += rating;
        heroRatingCount++;

        if (rating >= 90) heroDistribution.excellent++;
        else if (rating >= 80) heroDistribution.good++;
        else if (rating >= 70) heroDistribution.satisfactory++;
        else heroDistribution.needsImprovement++;
      }

      // Collect feedback themes
      if (heroData.feedback?.items) {
        for (const item of heroData.feedback.items) {
          const key = item.title;
          const existing = feedbackThemes.get(key);
          feedbackThemes.set(key, {
            count: (existing?.count || 0) + 1,
            category: "hero_image",
          });
        }
      }

      // Collect suggestions
      if (heroData.suggestions) {
        for (const suggestion of heroData.suggestions) {
          const existing = suggestions.get(suggestion);
          suggestions.set(suggestion, {
            count: (existing?.count || 0) + 1,
            category: "hero_image",
          });
        }
      }
    }

    // Process other images data
    const otherData = ratingsData?.other_images;
    if (otherData) {
      const rating = otherData.rating_number;
      if (rating) {
        otherTotalRating += rating;
        otherRatingCount++;

        if (rating >= 90) otherDistribution.excellent++;
        else if (rating >= 80) otherDistribution.good++;
        else if (rating >= 70) otherDistribution.satisfactory++;
        else otherDistribution.needsImprovement++;
      }

      // Collect feedback themes
      if (otherData.feedback?.items) {
        for (const item of otherData.feedback.items) {
          const key = item.title;
          const existing = feedbackThemes.get(key);
          feedbackThemes.set(key, {
            count: (existing?.count || 0) + 1,
            category: "other_images",
          });
        }
      }

      // Collect suggestions
      if (otherData.suggestions) {
        for (const suggestion of otherData.suggestions) {
          const existing = suggestions.get(suggestion);
          suggestions.set(suggestion, {
            count: (existing?.count || 0) + 1,
            category: "other_images",
          });
        }
      }
    }
  }

  // Sort and format feedback themes
  const commonFeedbackThemes = Array.from(feedbackThemes.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([theme, data]) => ({
      theme,
      count: data.count,
      percentage: Math.round((data.count / ratings.length) * 100),
      category: data.category,
    }));

  // Sort and format suggestions
  const topSuggestions = Array.from(suggestions.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10)
    .map(([suggestion, data]) => ({
      suggestion,
      count: data.count,
      category: data.category,
    }));

  return {
    totalProperties: ratings.length,
    heroImageStats: {
      averageRating: heroRatingCount
        ? Math.round(heroTotalRating / heroRatingCount)
        : 0,
      ratingDistribution: heroDistribution,
    },
    otherImagesStats: {
      averageRating: otherRatingCount
        ? Math.round(otherTotalRating / otherRatingCount)
        : 0,
      ratingDistribution: otherDistribution,
    },
    commonFeedbackThemes,
    topSuggestions,
  };
}

function getDefaultStats(): PhotoFeedbackStats {
  return {
    totalProperties: 0,
    heroImageStats: {
      averageRating: 0,
      ratingDistribution: {
        excellent: 0,
        good: 0,
        satisfactory: 0,
        needsImprovement: 0,
      },
    },
    otherImagesStats: {
      averageRating: 0,
      ratingDistribution: {
        excellent: 0,
        good: 0,
        satisfactory: 0,
        needsImprovement: 0,
      },
    },
    commonFeedbackThemes: [],
    topSuggestions: [],
  };
}
