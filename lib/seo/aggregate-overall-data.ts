import { createClient } from "@/utils/supabase/server";

export interface OverallRatingStats {
  totalProperties: number;
  overallAverageRating: number;
  categoryAverages: {
    title: number;
    description: number;
    amenities: number;
    heroImage: number;
    otherImages: number;
    interiorDesign: number;
  };
  ratingDistribution: {
    excellent: number;
    good: number;
    satisfactory: number;
    needsImprovement: number;
  };
  topSuggestions: Array<{
    suggestion: string;
    count: number;
  }>;
}

export async function aggregateOverallRatingData(): Promise<OverallRatingStats> {
  const supabase = await createClient();

  const { data: ratings, error } = await supabase
    .from("property_ratings")
    .select("id, ratings")
    .limit(1000);

  if (error || !ratings || ratings.length === 0) {
    return getDefaultStats();
  }

  let overallTotal = 0;
  let titleTotal = 0;
  let descTotal = 0;
  let amenitiesTotal = 0;
  let heroTotal = 0;
  let otherTotal = 0;
  let interiorTotal = 0;
  let count = 0;

  const ratingDistribution = {
    excellent: 0,
    good: 0,
    satisfactory: 0,
    needsImprovement: 0,
  };
  const suggestions = new Map<string, number>();

  for (const record of ratings) {
    const ratingsData = record.ratings as any;
    const overall = ratingsData?.overall_ratings;

    if (!overall) continue;

    const rating = overall.rating_number;
    if (rating) {
      overallTotal += rating;
      count++;

      if (rating >= 90) ratingDistribution.excellent++;
      else if (rating >= 80) ratingDistribution.good++;
      else if (rating >= 70) ratingDistribution.satisfactory++;
      else ratingDistribution.needsImprovement++;
    }

    // Aggregate category ratings
    if (ratingsData?.title?.rating_number) titleTotal += ratingsData.title.rating_number;
    if (ratingsData?.description?.rating_number) descTotal += ratingsData.description.rating_number;
    if (ratingsData?.amenities?.rating_number) amenitiesTotal += ratingsData.amenities.rating_number;
    if (ratingsData?.hero_image?.rating_number) heroTotal += ratingsData.hero_image.rating_number;
    if (ratingsData?.other_images?.rating_number) otherTotal += ratingsData.other_images.rating_number;
    if (ratingsData?.interior_design?.rating_number) interiorTotal += ratingsData.interior_design.rating_number;

    // Collect suggestions from overall
    if (overall.suggestions) {
      for (const suggestion of overall.suggestions) {
        suggestions.set(suggestion, (suggestions.get(suggestion) || 0) + 1);
      }
    }
  }

  const topSuggestions = Array.from(suggestions.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([suggestion, count]) => ({
      suggestion,
      count,
    }));

  return {
    totalProperties: count,
    overallAverageRating: Math.round(overallTotal / count),
    categoryAverages: {
      title: Math.round(titleTotal / count),
      description: Math.round(descTotal / count),
      amenities: Math.round(amenitiesTotal / count),
      heroImage: Math.round(heroTotal / count),
      otherImages: Math.round(otherTotal / count),
      interiorDesign: Math.round(interiorTotal / count),
    },
    ratingDistribution,
    topSuggestions,
  };
}

function getDefaultStats(): OverallRatingStats {
  return {
    totalProperties: 0,
    overallAverageRating: 0,
    categoryAverages: {
      title: 0,
      description: 0,
      amenities: 0,
      heroImage: 0,
      otherImages: 0,
      interiorDesign: 0,
    },
    ratingDistribution: {
      excellent: 0,
      good: 0,
      satisfactory: 0,
      needsImprovement: 0,
    },
    topSuggestions: [],
  };
}
