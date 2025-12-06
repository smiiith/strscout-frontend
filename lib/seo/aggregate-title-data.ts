import { createClient } from "@/utils/supabase/server";

export interface TitleFeedbackStats {
  totalProperties: number;
  averageRating: number;
  ratingDistribution: {
    excellent: number; // 90-100
    good: number; // 80-89
    satisfactory: number; // 70-79
    needsImprovement: number; // <70
  };
  commonFeedbackThemes: Array<{
    theme: string;
    count: number;
    percentage: number;
  }>;
  topSuggestions: Array<{
    suggestion: string;
    count: number;
  }>;
  sampleTitleRewrites: Array<{
    original: string;
    rewrites: string[];
    rating: number;
  }>;
}

export async function aggregateTitleFeedbackData(): Promise<TitleFeedbackStats> {
  const supabase = await createClient();

  // Fetch all property ratings
  const { data: ratings, error } = await supabase
    .from("property_ratings")
    .select(
      `
      id,
      ratings,
      str_properties!property_ratings_property_id_fkey (
        title
      )
    `
    )
    .limit(1000); // Adjust based on your data size

  if (error) {
    console.error("Error fetching ratings:", error);
    return getDefaultStats();
  }

  if (!ratings || ratings.length === 0) {
    return getDefaultStats();
  }

  // Process the data
  let totalRating = 0;
  let ratingCount = 0;
  const ratingDistribution = {
    excellent: 0,
    good: 0,
    satisfactory: 0,
    needsImprovement: 0,
  };
  const feedbackThemes = new Map<string, number>();
  const suggestions = new Map<string, number>();
  const sampleRewrites: Array<{
    original: string;
    rewrites: string[];
    rating: number;
  }> = [];

  for (const record of ratings) {
    const ratingsData = record.ratings as any;
    const titleData = ratingsData?.title;

    if (!titleData) continue;

    // Calculate average rating
    const rating = titleData.rating_number;
    if (rating) {
      totalRating += rating;
      ratingCount++;

      // Distribution
      if (rating >= 90) ratingDistribution.excellent++;
      else if (rating >= 80) ratingDistribution.good++;
      else if (rating >= 70) ratingDistribution.satisfactory++;
      else ratingDistribution.needsImprovement++;
    }

    // Collect feedback themes
    if (titleData.feedback?.items) {
      for (const item of titleData.feedback.items) {
        const theme = item.title;
        feedbackThemes.set(theme, (feedbackThemes.get(theme) || 0) + 1);
      }
    }

    // Collect suggestions
    if (titleData.suggestions) {
      for (const suggestion of titleData.suggestions) {
        suggestions.set(suggestion, (suggestions.get(suggestion) || 0) + 1);
      }
    }

    // Collect sample rewrites (take first 5 with good variety)
    if (
      titleData.title_rewrites &&
      titleData.property_name &&
      sampleRewrites.length < 5
    ) {
      sampleRewrites.push({
        original: titleData.property_name,
        rewrites: titleData.title_rewrites.slice(0, 3),
        rating: rating || 0,
      });
    }
  }

  // Sort and format feedback themes
  const commonFeedbackThemes = Array.from(feedbackThemes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([theme, count]) => ({
      theme,
      count,
      percentage: Math.round((count / ratingCount) * 100),
    }));

  // Sort and format suggestions
  const topSuggestions = Array.from(suggestions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([suggestion, count]) => ({
      suggestion,
      count,
    }));

  return {
    totalProperties: ratingCount,
    averageRating: Math.round(totalRating / ratingCount),
    ratingDistribution,
    commonFeedbackThemes,
    topSuggestions,
    sampleTitleRewrites: sampleRewrites,
  };
}

function getDefaultStats(): TitleFeedbackStats {
  return {
    totalProperties: 0,
    averageRating: 0,
    ratingDistribution: {
      excellent: 0,
      good: 0,
      satisfactory: 0,
      needsImprovement: 0,
    },
    commonFeedbackThemes: [],
    topSuggestions: [],
    sampleTitleRewrites: [],
  };
}
