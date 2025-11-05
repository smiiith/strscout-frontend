"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Loader2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CompareListingsDialog from "@/components/compare-listings-dialog";
import CompsTable from "@/components/comps-table";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { useUserSession } from "@/lib/context/UserSessionProvider";

interface CompAnalysisData {
  comp_id: string;
  property_id: string;
  listing_id: string;
  overall_occupancy: number;
  overall_genius_score: any;
  bedrooms: number;
  average_review: number;
  number_of_reviews: number;
  policies: any;
  title: string;
  description: string;
  thirty_day: number;
  sixty_day: number;
  ninety_day: number;
  created_at: string;
  hero_image_link: string;
}

interface CompBasisData {
  id: string;
  profile_id: string;
  scan_id: string;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
}

interface MarketSpyRunData {
  id: string;
  scan_id: string;
  address: string;
  form_data: {
    room_type?: string;
    bedrooms?: string;
    length_of_stay?: string;
    zoom_level?: number;
  };
  started_at: string;
  completed_at?: string;
}

interface CompAnalysisResponse {
  comp_basis: CompBasisData;
  comps: CompAnalysisData[];
  market_spy_run: MarketSpyRunData | null;
}

export default function CompDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getAccessToken } = useUserSession();
  const [analysisResponse, setAnalysisResponse] =
    useState<CompAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [existingAnalysis, setExistingAnalysis] = useState<any>(null);
  const [checkingAnalysis, setCheckingAnalysis] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);

  const checkForExistingAnalysis = async (compBasisId: string) => {
    try {
      setCheckingAnalysis(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comp-analysis/check-by-comp-basis/${compBasisId}`
      );
      if (response.data.success && response.data.data.exists) {
        setExistingAnalysis(response.data.data.analysis);
      }
    } catch (err: any) {
      console.error("Error checking existing analysis:", err);
      // Don't set error, just continue without existing analysis
    } finally {
      setCheckingAnalysis(false);
    }
  };

  useEffect(() => {
    const fetchCompAnalysis = async () => {
      const compBasisId = searchParams.get("compBasisId");

      if (!compBasisId) {
        setError("No comp basis ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const token = await getAccessToken();

        if (!token) {
          setError("Authentication failed. Please refresh the page.");
          setLoading(false);
          return;
        }

        const authHeaders = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/comp-analysis/${compBasisId}`,
          { headers: authHeaders }
        );
        setAnalysisResponse(response.data.data);
        setError(null);

        // Check for existing analysis for this comp basis
        if (response.data.data?.comp_basis?.id) {
          await checkForExistingAnalysis(response.data.data.comp_basis.id);
        }
      } catch (err: any) {
        console.error("Error fetching comp analysis:", err);
        setError("Failed to fetch comp analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchCompAnalysis();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-[700px] py-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading comp analysis...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[700px] py-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[700px] py-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Market Spy reports
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          {analysisResponse?.comp_basis && (
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                <div className="flex-1">
                  <CardTitle className="flex flex-col md:flex-row md:items-center gap-2 pb-4">
                    <Image
                      src="/market-spy-logo.png"
                      alt="STR Market Spy"
                      width={150}
                      height={60}
                      className="md:w-[200px] md:h-[80px]"
                    />
                    <span className="text-foreground/50 text-base md:text-lg">
                      {analysisResponse.comp_basis.address}
                    </span>
                  </CardTitle>
                  <div className="text-muted-foreground mt-2">
                    {analysisResponse.comp_basis.created_at && (
                      <div className="">
                        <span className="font-bold">Run date:</span>
                        <span className="mx-2">
                          {formatDate(
                            new Date(analysisResponse.comp_basis.created_at)
                          )}
                        </span>
                      </div>
                    )}
                    {analysisResponse.market_spy_run?.form_data && (
                      <div className="mt-2 space-y-1">
                        {analysisResponse.market_spy_run.form_data
                          .room_type && (
                          <div className="">
                            <span className="font-bold">Room type:</span>
                            <span className="mx-2 capitalize">
                              {
                                // prettier-ignore
                                analysisResponse.market_spy_run.form_data.room_type
                              }
                            </span>
                          </div>
                        )}
                        {
                          // prettier-ignore
                          analysisResponse.market_spy_run.form_data.bedrooms &&
                          (
                            <div className="">
                              <span className="font-bold">Bedrooms:</span>
                              <span className="mx-2">
                                {
                                  // prettier-ignore
                                  analysisResponse.market_spy_run.form_data.bedrooms
                                }
                              </span>
                            </div>
                          )
                        }
                      </div>
                    )}
                  </div>
                </div>

                {/* Analysis Card - full width on mobile, upper right on desktop */}
                <Card className="w-full md:w-96 bg-background border shadow-lg md:flex-shrink-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4" />
                      Next Step: Find Your Edge
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Your report on the top nearby listings is ready, with
                      clear actions to strengthen your own.
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {isGeneratingAnalysis ? (
                      <div className="flex flex-col items-start gap-2">
                        <Button disabled className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating Analysis...
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          This usually takes about 30 seconds
                        </p>
                      </div>
                    ) : existingAnalysis ? (
                      <Button
                        onClick={() =>
                          router.push(
                            `/comp-analysis?id=${existingAnalysis.id}`
                          )
                        }
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Analysis
                      </Button>
                    ) : (
                      <CompareListingsDialog
                        label="Compare"
                        listings={analysisResponse?.comps?.map((comp) => ({
                          id:
                            comp.listing_id || comp.property_id || comp.comp_id,
                          title: comp.title,
                          thumbnail: comp.hero_image_link || "/placeholder.svg",
                          property_id: comp.property_id,
                        }))}
                        compBasisId={analysisResponse?.comp_basis?.id}
                        topListingIds={
                          analysisResponse?.comps
                            ?.map((comp) => comp.property_id)
                            .filter(Boolean) || []
                        }
                        profileId={analysisResponse?.comp_basis?.profile_id}
                        onAnalysisStart={() => setIsGeneratingAnalysis(true)}
                        onAnalysisComplete={(analysisId) => {
                          setIsGeneratingAnalysis(false);
                          // Fetch the newly created analysis
                          const newAnalysis = { id: analysisId };
                          setExistingAnalysis(newAnalysis);
                        }}
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardHeader>
          )}

          <CardContent>
            <CompsTable
              comps={analysisResponse?.comps || []}
              filterOut100Percent={true}
              roomType={analysisResponse?.market_spy_run?.form_data?.room_type}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
