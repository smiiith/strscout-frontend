"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  TrendingUp,
  Star,
  Users,
  Brain,
  Target,
  Lightbulb,
  FileText,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Keypoint {
  title: string;
  description: string;
}

interface ActionItem {
  title: string;
  description: string;
}

interface MarketAnalysis {
  top_performers_intro: string;
  keypoints: Keypoint[];
  bottom_line: string;
}

interface CompetitiveAdvice {
  comparison_intro: string;
  action_items: ActionItem[];
  bottom_line: string;
}

interface CompAnalysisData {
  id: string;
  created_at: string;
  profile_id: string;
  property_id: string;
  summary: {
    market_analysis: MarketAnalysis;
    competitive_advice: CompetitiveAdvice;
  };
}

export default function CompAnalysisPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [analysisData, setAnalysisData] = useState<CompAnalysisData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const analysisId = searchParams.get("id");

      if (!analysisId) {
        setError("No analysis ID provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/comp-analysis/${analysisId}`
        );

        if (response.data.success) {
          setAnalysisData(response.data.data);
          setError(null);
        } else {
          setError(response.data.error || "Failed to fetch analysis");
        }
      } catch (err: any) {
        console.error("Error fetching comp analysis:", err);
        setError("Failed to fetch comp analysis data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [searchParams]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[700px] py-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading analysis...</p>
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

  if (!analysisData) {
    return (
      <div className="min-h-[700px] py-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Analysis not found</p>
        </div>
      </div>
    );
  }

  const { market_analysis, competitive_advice } = analysisData.summary;

  return (
    <div className="min-h-[700px] py-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        <div className="space-y-6">
          {/* Header Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                Market Spy Analysis Results
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Generated on {formatDate(analysisData.created_at)}
              </div>
            </CardHeader>
          </Card>

          {/* Market Analysis Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Top Listings Market Analysis
              </CardTitle>
              <p className="text-muted-foreground">
                What makes the top performing listings successful
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Top Performers Introduction */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  The Top Performers in Your Area
                </h4>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    {market_analysis.top_performers_intro ||
                      "No introduction available"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Keypoints */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Key Insights
                </h4>
                <div className="grid gap-4">
                  {(market_analysis.keypoints || []).map((keypoint, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-md border border-border"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h5 className="font-semibold text-foreground mb-2">
                            {keypoint.title}
                          </h5>
                          <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                            {keypoint.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {(!market_analysis.keypoints ||
                    market_analysis.keypoints.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No keypoints available
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Bottom Line */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  The Bottom Line
                </h4>
                <div className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-md border border-border">
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {market_analysis.bottom_line ||
                      "No bottom line summary available"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Competitive Advice Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Your Competitive Position & Recommendations
              </CardTitle>
              <p className="text-muted-foreground">
                How your listing compares and what you can do to compete
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Comparison Introduction */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Your Listing Compared to the Top Performers
                </h4>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">
                    {competitive_advice.comparison_intro ||
                      "No comparison summary available"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Action Items */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Action Items
                </h4>
                <div className="grid gap-4">
                  {(competitive_advice.action_items || []).map(
                    (actionItem, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg border-l-4 border-secondary shadow-md border border-border"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-7 h-7 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-semibold text-foreground mb-2">
                              {actionItem.title}
                            </h5>
                            <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                              {actionItem.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  {(!competitive_advice.action_items ||
                    competitive_advice.action_items.length === 0) && (
                    <p className="text-sm text-muted-foreground">
                      No action items available
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Bottom Line */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  The Bottom Line
                </h4>
                <div className="bg-white p-4 rounded-lg border-l-4 border-primary shadow-md border border-border">
                  <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                    {competitive_advice.bottom_line ||
                      "No bottom line summary available"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  );
}
