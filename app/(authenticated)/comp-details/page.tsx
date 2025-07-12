"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowLeft, TrendingUp, Star, Users, Home, Shield, Calendar, FileText } from "lucide-react";
import { MapPinIcon } from "@/components/Icons";
import { useRouter } from "next/navigation";
import ProtectedPage from "@/components/ProtectedPage";
import { PLANS } from "@/app/types/plans";
import axios from "axios";

interface CompAnalysisData {
  comp_id: string;
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
}

interface CompBasisData {
  id: string;
  profile_id: string;
  scan_id: string;
  address: string;
  latitude: string;
  longitude: string;
  status: string;
}

interface CompAnalysisResponse {
  comp_basis: CompBasisData;
  comps: CompAnalysisData[];
}

export default function CompDetailsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysisResponse, setAnalysisResponse] = useState<CompAnalysisResponse | null>(null);
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
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/marketspy/comp-analysis/${compBasisId}`
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

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 70) return "text-yellow-600";
    if (percentage >= 50) return "text-orange-600";
    return "text-red-600";
  };

  const formatRating = (rating: number) => {
    return rating?.toFixed(1) || "N/A";
  };

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-3 w-3 fill-yellow-400/50 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-3 w-3 text-gray-300" />);
      }
    }
    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const renderPolicies = (policies: any) => {
    if (!policies) return <span className="text-muted-foreground">N/A</span>;
    
    const policyList = [];
    if (policies.instant_book) policyList.push("Instant Book");
    if (policies.pets_allowed) policyList.push("Pets");
    if (policies.cancellation_policy) policyList.push(policies.cancellation_policy);
    if (policies.self_checkin) policyList.push("Self Check-in");
    
    return (
      <div className="flex flex-wrap gap-1">
        {policyList.map((policy, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {policy}
          </Badge>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <ProtectedPage requiredPlan={PLANS.STANDARD}>
        <div className="min-h-[700px] py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading comp analysis...</p>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  if (error) {
    return (
      <ProtectedPage requiredPlan={PLANS.STANDARD}>
        <div className="min-h-[700px] py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  return (
    <ProtectedPage requiredPlan={PLANS.STANDARD}>
      <div className="min-h-[700px] py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Comps
          </Button>
        </div>

        <div className="space-y-6">
          {analysisResponse?.comp_basis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-primary" color="red" />
                  Comp Basis Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Address</p>
                  <p className="text-lg">{analysisResponse.comp_basis.address}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Latitude</p>
                    <p className="text-sm font-mono">{analysisResponse.comp_basis.latitude}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Longitude</p>
                    <p className="text-sm font-mono">{analysisResponse.comp_basis.longitude}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                    <p className="text-sm capitalize">{analysisResponse.comp_basis.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Summary from AI here: What is so good about top listings, why do they perform better?
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                (click here for your strategies to win)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                note here to tell user to click on each point below for more detailed information
              </p>
            </CardHeader>
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
                          <p className="text-xs font-normal text-muted-foreground">(clickable)</p>
                        </TableHead>
                        <TableHead className="w-[140px]">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            Overall Occupancy
                          </div>
                          <p className="text-xs font-normal text-muted-foreground">(drill down for 30+)</p>
                        </TableHead>
                        <TableHead className="w-[150px]">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Overall Genius Score
                          </div>
                          <p className="text-xs font-normal text-muted-foreground">(drill down for full report)</p>
                        </TableHead>
                        <TableHead className="w-[120px]">
                          <div className="flex items-center gap-1">
                            <Home className="h-4 w-4" />
                            Bedrooms
                          </div>
                          <p className="text-xs font-normal text-muted-foreground">(drill down for instant, pets, cancellation)</p>
                        </TableHead>
                        <TableHead className="w-[140px]">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            Average Review
                          </div>
                          <p className="text-xs font-normal text-muted-foreground">(how many stars)</p>
                        </TableHead>
                        <TableHead className="w-[140px]">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Number of Reviews
                          </div>
                        </TableHead>
                        <TableHead className="w-[180px]">
                          <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4" />
                            Policies
                          </div>
                          <p className="text-xs font-normal text-muted-foreground">(drill down for instant book, pets, cancellation, self check-in)</p>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analysisResponse.comps.map((comp, index) => (
                        <TableRow key={comp.comp_id} className="hover:bg-muted/50">
                          <TableCell>
                            <Button 
                              variant="link" 
                              className="h-auto p-0 font-mono text-sm text-blue-600 hover:text-blue-800"
                              onClick={() => {
                                // You can implement the listing navigation here
                                console.log("Navigate to listing:", comp.listing_id);
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
                                      <h4 className="font-medium text-sm">Occupancy Breakdown</h4>
                                      <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">30 days:</span>
                                          <span className={`font-medium ${getOccupancyColor(comp.thirty_day)}`}>
                                            {comp.thirty_day?.toFixed(1)}%
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">60 days:</span>
                                          <span className={`font-medium ${getOccupancyColor(comp.sixty_day)}`}>
                                            {comp.sixty_day?.toFixed(1)}%
                                          </span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">90 days:</span>
                                          <span className={`font-medium ${getOccupancyColor(comp.ninety_day)}`}>
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
                            <Button 
                              variant="link" 
                              className="h-auto p-0 text-left"
                              onClick={() => {
                                // You can implement the genius score drill-down here
                                console.log("Show genius score details:", comp.overall_genius_score);
                              }}
                            >
                              {comp.overall_genius_score ? (
                                <Badge variant="secondary">View Report</Badge>
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{comp.bedrooms || "N/A"}</span>
                              {comp.bedrooms && (
                                <Home className="h-3 w-3 text-muted-foreground" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {comp.average_review ? (
                                <>
                                  {renderStarRating(comp.average_review)}
                                  <span className="text-xs text-muted-foreground">
                                    {formatRating(comp.average_review)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-muted-foreground">N/A</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              <span className="font-medium">{comp.number_of_reviews || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderPolicies(comp.policies)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-muted-foreground">No comp analysis data available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  );
}