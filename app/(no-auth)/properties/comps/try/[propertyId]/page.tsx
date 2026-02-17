"use client";

import LoadingOverlay from "@/components/LoadingOverlay";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import LimitedPropertyRatings from "@/components/LimitedPropertyRatings";
import { EmailCaptureDialog } from "@/components/EmailCaptureDialog";
import posthog from "posthog-js";

const getColorClass = (rating: string) => {
  switch (rating) {
    case "Excellent":
      return "text-green-600 dark:text-green-400";
    case "Good":
      return "text-blue-600 dark:text-blue-400";
    case "Satisfactory":
      return "text-yellow-600 dark:text-yellow-400";
    case "Needs Work":
      return "text-orange-600 dark:text-orange-400";
    case "Fail":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-gray-600 dark:text-gray-400";
  }
};

// Helper function to fetch property ratings with anonymous token
const fetchPropertyRatings = async (propertyId: any, token: string) => {
  try {
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/feedback-genius/ratings/${propertyId}`,
      { headers: authHeaders }
    );

    return response.data?.ratings
      ? { ...response.data.ratings, visible: true }
      : null;
  } catch (error) {
    console.error("Error loading property ratings:", error);
    return null;
  }
};

const TryPropertyCompsPage = () => {
  const router = useRouter();
  const params = useParams();
  const propertyId = params.propertyId;
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState(null);
  const [formattedRatings, setFormattedRatings] = useState<any>([]);
  const [anonymousToken, setAnonymousToken] = useState<string | null>(null);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const supabase = createClient();

  const getRank = (rating: number) => {
    let overallRating = rating;
    let rank = (overallRating * 2) / 10;
    rank = Math.round(rank);
    rank = 24 - rank;
    return rank;
  };

  // Get anonymous session
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        setAnonymousToken(session.access_token);
      } else {
        // No anonymous session, redirect to try page
        router.push("/feedback-genius/try");
      }
    };

    getSession();
  }, []);

  useEffect(() => {
    if (propertyId && !ratings && anonymousToken) {
      const loadRatings = async () => {
        setLoading(true);
        const propertyRatings = await fetchPropertyRatings(
          propertyId,
          anonymousToken
        );

        if (!propertyRatings) {
          console.error("Failed to load property ratings");
          setLoading(false);
          return;
        }

        const categorized = {
          heroImage: {
            name: "Hero Image",
            score: propertyRatings.ratings?.hero_image?.rating_number,
            category: propertyRatings.ratings?.hero_image?.rating_category,
            feedback: {
              summary: propertyRatings.ratings?.hero_image?.feedback?.summary,
              items: propertyRatings.ratings?.hero_image?.feedback?.items,
            },
            suggestions: propertyRatings.ratings?.hero_image?.suggestions,
            displayOrder: 0,
          },
          title: {
            name: "Title",
            score: propertyRatings.ratings.title.rating_number,
            category: propertyRatings.ratings.title.rating_category,
            feedback: {
              summary: propertyRatings.ratings.title.feedback.summary,
              items: propertyRatings.ratings.title.feedback.items,
            },
            title_rewrites: propertyRatings.ratings.title.title_rewrites,
            suggestions: propertyRatings.ratings.title.suggestions,
            displayOrder: 1,
          },
          description: {
            name: "Description",
            score: propertyRatings.ratings.description.rating_number,
            category: propertyRatings.ratings.description.rating_category,
            feedback: {
              summary: propertyRatings.ratings.description.feedback.summary,
              items: propertyRatings.ratings.description.feedback.items,
            },
            suggestions: propertyRatings.ratings.description.suggestions,
            description_rewrite:
              propertyRatings.ratings.description.description_rewrite,
            displayOrder: 2,
          },
          amenities: {
            name: "Amenities",
            score: propertyRatings.ratings?.amenities?.rating_number,
            category: propertyRatings.ratings?.amenities?.rating_category,
            feedback: {
              summary: propertyRatings.ratings?.amenities?.feedback?.summary,
              items: propertyRatings.ratings?.amenities?.feedback?.items,
            },
            suggestions: propertyRatings.ratings?.amenities?.suggestions,
            displayOrder: 3,
          },
          otherImages: {
            name: "Your photos",
            score: propertyRatings.ratings?.other_images?.rating_number,
            category: propertyRatings.ratings?.other_images?.rating_category,
            feedback: {
              summary:
                propertyRatings.ratings?.other_images?.feedback?.summary,
              items: propertyRatings.ratings?.other_images?.feedback?.items,
            },
            suggestions: propertyRatings.ratings?.other_images?.suggestions,
            displayOrder: 4,
          },
          interiorDesign: {
            name: "Interior Design",
            score: propertyRatings.ratings?.interior_design?.rating_number,
            category: propertyRatings.ratings?.interior_design?.rating_category,
            feedback: {
              summary:
                propertyRatings.ratings?.interior_design?.feedback?.summary,
              items:
                propertyRatings.ratings?.interior_design?.feedback?.items,
            },
            suggestions: propertyRatings.ratings?.interior_design?.suggestions,
            displayOrder: 5,
          },
          feedback: {
            summary: propertyRatings.ratings.overall_ratings.feedback.summary,
            items: propertyRatings.ratings.overall_ratings.feedback.items,
          },
          suggestions: propertyRatings.ratings.overall_ratings.suggestions,
          overall_rating_number:
            propertyRatings.ratings.overall_ratings.rating_number,
          overall_rating_category:
            propertyRatings.ratings.overall_ratings.rating_category,
        };
        setFormattedRatings(categorized);

        setRatings(propertyRatings);
        setLoading(false);
      };
      loadRatings();
    }
  }, [propertyId, anonymousToken]);

  const handleViewFullDetails = () => {
    posthog.capture("try_clicked_view_full_details", {
      page: window.location.pathname,
      propertyId: propertyId,
    });
    setEmailDialogOpen(true);
  };

  function ScoreCard({ score, label, status, icon }: any) {
    return (
      <>
        {/* mobile */}
        <div className="mobile-only w-full my-2">
          <div className="flex items-center gap-4 p-4 rounded-lg border w-full">
            <div className="flex-shrink-0">
              <div className="flex h-[80px] w-[80px] rounded-md object-cover">
                {icon}
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-xl">{label}</h3>
              <p className={`${getColorClass(status)} text-lg`}>
                {score} {status}
              </p>
            </div>
          </div>
        </div>

        {/* desktop */}
        <div className="desktop-only">
          <h3 className="mb-4 text-center text-lg font-semibold w-32 h-12">
            {label}
          </h3>
          <div className="flex flex-col h-24">
            <div className="flex h-48 w-32 items-center justify-center rounded-lg">
              {icon}
            </div>
            <div className={`${getColorClass(status)} text-center`}>
              <p className="text-xl font-bold">{score}/100</p>
              <p className={`font-semibold`}>{status}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const YourRankSection = (props: any) => {
    const ratings = props.ratings;

    const scores = [
      {
        label: "Your Hero Image",
        score: ratings.hero_image.rating_number,
        status: ratings.hero_image.rating_category,
        icon: (
          <Image
            src="/images/icon-hero-image.png"
            width={100}
            height={100}
            alt=""
          />
        ),
      },
      {
        label: (
          <div>
            Your <div>Title</div>
          </div>
        ),
        score: ratings.title.rating_number,
        status: ratings.title.rating_category,
        icon: (
          <Image src="/images/icon-title.png" width={100} height={100} alt="" />
        ),
      },
      {
        label: "Your Description",
        score: ratings.description.rating_number,
        status: ratings.description.rating_category,
        icon: (
          <Image
            src="/images/icon-description.png"
            width={100}
            height={100}
            alt=""
          />
        ),
      },
      {
        label: (
          <div>
            Your <div>Amenities</div>
          </div>
        ),
        score: ratings.amenities.rating_number,
        status: ratings.amenities.rating_category,
        icon: (
          <Image
            src="/images/icon-amenities.png"
            width={100}
            height={100}
            alt=""
          />
        ),
      },
      {
        label: (
          <div>
            Your <div>Photos</div>
          </div>
        ),
        score: ratings.other_images.rating_number,
        status: ratings.other_images.rating_category,
        icon: (
          <Image
            src="/images/icon-photos.png"
            width={100}
            height={100}
            alt=""
          />
        ),
      },
      {
        label: "Your Interior Design",
        score: ratings.interior_design.rating_number,
        status: ratings.interior_design.rating_category,
        icon: (
          <Image
            src="/images/icon-interior-design.png"
            width={100}
            height={100}
            alt=""
          />
        ),
      },
    ];

    return (
      <div className="w-full bg-gray-50 p-6">
        <div className="mobile-only w-full">
          <div className="flex flex-col w-full items-center">
            {scores.map((score, index) => (
              <div key={`score-${index}`} className="w-full">
                <ScoreCard {...score} />
              </div>
            ))}
          </div>
        </div>

        <div className="desktop-only">
          <div className="flex justify-evenly w-full mb-8">
            {scores.map((score, index) => (
              <div key={`score-${index}`}>
                <ScoreCard {...score} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="pb-6 max-w-7xl mx-auto px-4">
      <Image
        src="/STR-Feedback-Genius-Logo-single-line.png"
        alt="STR Feedback Genius"
        width="754"
        height="72"
        className="w-[754] h-auto my-6"
      />

      {loading ? (
        <LoadingOverlay />
      ) : (
        propertyId &&
        ratings && (
          <>
            {/* Preview Banner */}
            <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Here's a Preview of Your Results!
                  </h2>
                  <p className="text-lg">
                    Sign up now to unlock the complete analysis with detailed
                    feedback and suggestions.
                  </p>
                </div>
                <Button
                  onClick={handleViewFullDetails}
                  variant="secondary"
                  size="lg"
                  className="ml-4"
                >
                  View Full Details
                </Button>
              </div>
            </div>

            {ratings && (
              <Table>
                <TableBody>
                  {ratings && (
                    <TableRow key={ratings.id} className="cursor-pointer py-0">
                      <TableCell className="p-0" colSpan={7}>
                        <div className="desktop-only">
                          <div className="flex items-center bg-primary hover:bg-primary">
                            <Image
                              src="/images/arrow-white.png"
                              alt="Your overall score"
                              width="100"
                              height="72"
                              className="w-auto h-28 my-6 mx-4"
                            />

                            <div className="text-5xl text-primary-foreground font-bold">
                              Your Overall Score is{" "}
                              {ratings.ratings.overall_ratings.rating_number}
                              /100 (
                              {ratings.ratings.overall_ratings.rating_category})
                            </div>
                          </div>
                        </div>

                        <div className="mobile-only">
                          <div className="flex items-center bg-primary p-2">
                            <div className="text-3xl text-primary-foreground font-bold">
                              Your Overall Score is{" "}
                              {ratings.ratings.overall_ratings.rating_number}
                              /100 (
                              {ratings.ratings.overall_ratings.rating_category})
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center bg-primary-foreground">
                          <YourRankSection ratings={ratings.ratings} />
                        </div>

                        <div className="flex items-center bg-primary hover:bg-primary py-6 px-4"></div>

                        <LimitedPropertyRatings
                          ratings={formattedRatings}
                          onViewFullDetails={handleViewFullDetails}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}

            {/* Bottom CTA */}
            <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    Want to See the Full Analysis?
                  </h2>
                  <p className="text-lg">
                    Create a free account to unlock all detailed feedback,
                    suggestions, and recommendations.
                  </p>
                </div>
                <Button
                  onClick={handleViewFullDetails}
                  variant="secondary"
                  size="lg"
                  className="ml-4"
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </>
        )
      )}

      <EmailCaptureDialog
        open={emailDialogOpen}
        onOpenChange={setEmailDialogOpen}
        propertyId={propertyId as string}
      />
    </div>
  );
};

export default TryPropertyCompsPage;
