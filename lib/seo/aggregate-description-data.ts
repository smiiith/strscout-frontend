import { createClient } from "@/utils/supabase/server";

export interface DescriptionFeedbackStats {
  totalProperties: number;
  averageRating: number;
  ratingDistribution: {
    excellent: number;
    good: number;
    satisfactory: number;
    needsImprovement: number;
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
}

export async function aggregateDescriptionFeedbackData(): Promise<DescriptionFeedbackStats> {
  const supabase = await createClient();

  const { data: ratings, error } = await supabase
    .from("property_ratings")
    .select("id, ratings")
    .limit(1000);

  if (error || !ratings || ratings.length === 0) {
    return getDefaultStats();
  }

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

  for (const record of ratings) {
    const ratingsData = record.ratings as any;
    const descriptionData = ratingsData?.description;

    if (!descriptionData) continue;

    const rating = descriptionData.rating_number;
    if (rating) {
      totalRating += rating;
      ratingCount++;

      if (rating >= 90) ratingDistribution.excellent++;
      else if (rating >= 80) ratingDistribution.good++;
      else if (rating >= 70) ratingDistribution.satisfactory++;
      else ratingDistribution.needsImprovement++;
    }

    if (descriptionData.feedback?.items) {
      for (const item of descriptionData.feedback.items) {
        const theme = item.title;
        feedbackThemes.set(theme, (feedbackThemes.get(theme) || 0) + 1);
      }
    }

    if (descriptionData.suggestions) {
      for (const suggestion of descriptionData.suggestions) {
        suggestions.set(suggestion, (suggestions.get(suggestion) || 0) + 1);
      }
    }
  }

  const commonFeedbackThemes = Array.from(feedbackThemes.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([theme, count]) => ({
      theme,
      count,
      percentage: Math.round((count / ratingCount) * 100),
    }));

  const topSuggestions = Array.from(suggestions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
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
  };
}

function getDefaultStats(): DescriptionFeedbackStats {
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
  };
}
