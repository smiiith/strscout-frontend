"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeft,
  TrendingUp,
  Star,
  Users,
  Home,
  Shield,
  FileText,
  Loader2,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CompareListingsDialog from "@/components/compare-listings-dialog";
import { formatDate } from "@/lib/utils";
import Image from "next/image";

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
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/comp-analysis/${compBasisId}`
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

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const formatRating = (rating: number) => {
    return rating?.toFixed(2) || "N/A";
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="h-3 w-3 fill-amber-500/50 text-amber-500" />
        );
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const renderPolicies = (policies: any) => {
    if (!policies) return <span className="text-muted-foreground">N/A</span>;

    // Parse policies if it's a string
    let parsedPolicies;
    try {
      parsedPolicies =
        typeof policies === "string" ? JSON.parse(policies) : policies;
    } catch (error) {
      console.error("Failed to parse policies:", error);
      return <span className="text-muted-foreground">Invalid policies</span>;
    }

    // Extract cancellation policy if available
    const getCancellationPolicy = () => {
      if (!parsedPolicies.cancellation_policy) return null;

      const policyText = parsedPolicies.cancellation_policy.toLowerCase();
      const validPolicies = ["flexible", "moderate", "firm", "strict"];

      for (const policy of validPolicies) {
        if (policyText.includes(policy)) {
          return policy.charAt(0).toUpperCase() + policy.slice(1);
        }
      }
      return null;
    };

    const cancellationPolicy = getCancellationPolicy();

    return (
      <div className="flex flex-wrap gap-1">
        <Badge variant="secondary" className="text-xs">
          Pets: {parsedPolicies.pets_allowed === true ? "Yes" : "No"}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          Instant Book: {parsedPolicies.instant_book === true ? "Yes" : "No"}
        </Badge>
        <Badge variant="secondary" className="text-xs">
          Self Check-In: {parsedPolicies.self_checkin === true ? "Yes" : "No"}
        </Badge>
        {cancellationPolicy && (
          <Badge variant="secondary" className="text-xs">
            Cancellation: {cancellationPolicy}
          </Badge>
        )}
      </div>
    );
  };

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
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 pb-4">
                    <Image
                      src="/market-spy-logo.png"
                      alt="STR Market Spy"
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
                                analysisResponse.market_spy_run.form_data
                                  .room_type
                              }
                            </span>
                          </div>
                        )}
                        {analysisResponse.market_spy_run.form_data.bedrooms && (
                          <div className="">
                            <span className="font-bold">Bedrooms:</span>
                            <span className="mx-2">
                              {
                                analysisResponse.market_spy_run.form_data
                                  .bedrooms
                              }
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Analysis Card - positioned in upper right */}
                <Card className="w-96 bg-background border shadow-lg flex-shrink-0">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="h-4 w-4" />
                      Why are these listings so successful?
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Find out how the <span className="font-bold">top 3</span>{" "}
                      listings are doing it and how your listing compares to
                      them.
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
            {analysisResponse?.comps && analysisResponse.comps.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[120px]">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          Listing ID
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          Occupancy
                        </div>
                      </TableHead>
                      <TableHead className="w-[150px]">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Feedback Score
                        </div>
                        <p className="text-xs font-normal text-muted-foreground"></p>
                      </TableHead>
                      <TableHead className="w-[120px]">
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4" />
                          Bedrooms
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Average Review
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Total Reviews
                        </div>
                      </TableHead>
                      <TableHead className="w-[180px]">
                        <div className="flex items-center gap-1">
                          <Shield className="h-4 w-4" />
                          Policies
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {analysisResponse.comps.map((comp, index) => (
                      <TableRow
                        key={comp.comp_id}
                        className="hover:bg-muted/50"
                      >
                        <TableCell>
                          {/* <pre>
                              {JSON.stringify(analysisResponse, null, 2)}
                            </pre> */}
                          <Button
                            variant="link"
                            className="h-auto p-0 font-mono text-sm text-blue-600 hover:text-blue-800"
                            onClick={() => {
                              window.open(
                                `https://www.airbnb.com/rooms/${comp.listing_id}`,
                                "_blank"
                              );
                            }}
                          >
                            {comp.listing_id}
                          </Button>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <Popover>
                                <TooltipTrigger asChild>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      className={`h-auto p-1 font-semibold hover:bg-muted ${getOccupancyColor(comp.overall_occupancy)}`}
                                    >
                                      {comp.overall_occupancy?.toFixed(1)}%
                                    </Button>
                                  </PopoverTrigger>
                                </TooltipTrigger>
                                <PopoverContent className="w-48">
                                  <div className="space-y-2">
                                    <h4 className="font-medium text-sm">
                                      Occupancy Breakdown
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          30 days:
                                        </span>
                                        <span
                                          className={`font-medium ${getOccupancyColor(comp.thirty_day)}`}
                                        >
                                          {comp.thirty_day?.toFixed(1)}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          60 days:
                                        </span>
                                        <span
                                          className={`font-medium ${getOccupancyColor(comp.sixty_day)}`}
                                        >
                                          {comp.sixty_day?.toFixed(1)}%
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                          90 days:
                                        </span>
                                        <span
                                          className={`font-medium ${getOccupancyColor(comp.ninety_day)}`}
                                        >
                                          {comp.ninety_day?.toFixed(1)}%
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </PopoverContent>
                              </Popover>
                              <TooltipContent>
                                <p>Click to see 30/60/90 day breakdown</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell>
                          {/* <pre>{JSON.stringify(comp, null, 2)}</pre> */}
                          {comp.overall_genius_score?.title?.rating_number ? (
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                              onClick={() => {
                                router.push(
                                  `/properties/comps/${comp.property_id}`
                                );
                              }}
                            >
                              {comp.overall_genius_score?.title?.rating_number}
                            </Badge>
                          ) : (
                            <div className="text-muted-foreground">
                              N/A
                              {/* <pre>{JSON.stringify(comp, null, 2)}</pre> */}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {comp.bedrooms || "N/A"}
                            </span>
                            {comp.bedrooms && (
                              <Home className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {comp.average_review ? (
                              <div className="flex">
                                {renderStarRating(comp.average_review)}
                                <span className="text-xs text-muted-foreground ml-2">
                                  ({formatRating(comp.average_review)})
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">N/A</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="font-medium">
                              {comp.number_of_reviews || 0}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{renderPolicies(comp.policies)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">
                  No comp analysis data available
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
