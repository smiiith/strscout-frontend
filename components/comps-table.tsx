"use client";

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
  TrendingUp,
  Star,
  Users,
  Home,
  Shield,
  FileText,
} from "lucide-react";
import { useRouter } from "next/navigation";

export interface CompAnalysisData {
  comp_id: string;
  property_id: string;
  listing_id: string;
  overall_occupancy: number;
  overall_genius_score: any;
  bedrooms: string | number;
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

interface CompsTableProps {
  comps: CompAnalysisData[];
  filterOut100Percent?: boolean;
  mock?: boolean;
}

export default function CompsTable({ comps, filterOut100Percent = true, mock = false }: CompsTableProps) {
  const router = useRouter();

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

  // Filter out 100% occupancy if requested
  const filteredComps = filterOut100Percent 
    ? comps.filter((comp) => comp.overall_occupancy !== 100)
    : comps;

  if (!filteredComps || filteredComps.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-muted-foreground">
          No comp analysis data available
        </p>
      </div>
    );
  }

  return (
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
          {filteredComps.map((comp, index) => (
            <TableRow
              key={comp.comp_id}
              className="hover:bg-muted/50"
            >
              <TableCell>
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
                {comp.overall_genius_score?.title?.rating_number ? (
                  <Badge
                    variant="secondary"
                    className={mock ? "cursor-default" : "cursor-pointer"}
                    onClick={mock ? undefined : () => {
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
  );
}