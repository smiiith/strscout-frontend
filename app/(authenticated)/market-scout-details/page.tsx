"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
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

export default function MarketScoutDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { getAccessToken } = useUserSession();
  const [analysisResponse, setAnalysisResponse] =
    useState<CompAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          "Authorization": `Bearer ${token}`,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketscout/comp-analysis/${compBasisId}`,
          { headers: authHeaders }
        );
        setAnalysisResponse(response.data.data);
        setError(null);
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
          Back to Market Scout reports
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          {analysisResponse?.comp_basis && (
            <CardHeader>
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 pb-4">
                    <Image
                      src="/market-scout-logo.png"
                      alt="STR Market Scout"
                      width={200}
                      height={80}
                    />
                    <span className="text-foreground/50">
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
