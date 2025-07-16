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
import ProtectedPage from "@/components/ProtectedPage";
import { PLANS } from "@/app/types/plans";
import axios from "axios";

interface MarketAnalysis {
  success_factors: string[];
  common_characteristics: string[];
  unique_differentiators: string[];
  summary_report: string;
}

interface CompetitiveAdvice {
  competitive_strengths: string[];
  areas_for_improvement: string[];
  actionable_recommendations: string[];
  differentiation_opportunities: string[];
  summary_report: string;
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
  const [analysisData, setAnalysisData] = useState<CompAnalysisData | null>(null);
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
      <ProtectedPage requiredPlan={PLANS.STANDARD}>
        <div className="min-h-[700px] py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading analysis...</p>
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

  if (!analysisData) {
    return (
      <ProtectedPage requiredPlan={PLANS.STANDARD}>
        <div className="min-h-[700px] py-6">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Analysis not found</p>
          </div>
        </div>
      </ProtectedPage>
    );
  }

  const { market_analysis, competitive_advice } = analysisData.summary;

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
              {/* Summary Report */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Executive Summary
                </h4>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {market_analysis.summary_report || "No summary report available"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Success Factors */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Key Success Factors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(market_analysis.success_factors || []).map((factor, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                  {(!market_analysis.success_factors || market_analysis.success_factors.length === 0) && (
                    <p className="text-sm text-muted-foreground">No success factors available</p>
                  )}
                </div>
              </div>

              {/* Common Characteristics */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Common Characteristics
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(market_analysis.common_characteristics || []).map((characteristic, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {characteristic}
                    </Badge>
                  ))}
                  {(!market_analysis.common_characteristics || market_analysis.common_characteristics.length === 0) && (
                    <p className="text-sm text-muted-foreground">No common characteristics available</p>
                  )}
                </div>
              </div>

              {/* Unique Differentiators */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Unique Differentiators
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(market_analysis.unique_differentiators || []).map((differentiator, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {differentiator}
                    </Badge>
                  ))}
                  {(!market_analysis.unique_differentiators || market_analysis.unique_differentiators.length === 0) && (
                    <p className="text-sm text-muted-foreground">No unique differentiators available</p>
                  )}
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
              {/* Summary Report */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Analysis Summary
                </h4>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {competitive_advice.summary_report || "No analysis summary available"}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Competitive Strengths */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-600">
                  <Star className="h-4 w-4" />
                  Your Competitive Strengths
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(competitive_advice.competitive_strengths || []).map((strength, index) => (
                    <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800 hover:bg-green-200">
                      {strength}
                    </Badge>
                  ))}
                  {(!competitive_advice.competitive_strengths || competitive_advice.competitive_strengths.length === 0) && (
                    <p className="text-sm text-muted-foreground">No competitive strengths identified</p>
                  )}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-amber-600">
                  <Target className="h-4 w-4" />
                  Areas for Improvement
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(competitive_advice.areas_for_improvement || []).map((area, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200">
                      {area}
                    </Badge>
                  ))}
                  {(!competitive_advice.areas_for_improvement || competitive_advice.areas_for_improvement.length === 0) && (
                    <p className="text-sm text-muted-foreground">No improvement areas identified</p>
                  )}
                </div>
              </div>

              {/* Actionable Recommendations */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-blue-600">
                  <Lightbulb className="h-4 w-4" />
                  Actionable Recommendations
                </h4>
                <div className="grid gap-2">
                  {(competitive_advice.actionable_recommendations || []).map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <p className="text-sm text-blue-900">{recommendation}</p>
                    </div>
                  ))}
                  {(!competitive_advice.actionable_recommendations || competitive_advice.actionable_recommendations.length === 0) && (
                    <p className="text-sm text-muted-foreground">No actionable recommendations available</p>
                  )}
                </div>
              </div>

              {/* Differentiation Opportunities */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2 text-purple-600">
                  <TrendingUp className="h-4 w-4" />
                  Differentiation Opportunities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(competitive_advice.differentiation_opportunities || []).map((opportunity, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-700 hover:bg-purple-50">
                      {opportunity}
                    </Badge>
                  ))}
                  {(!competitive_advice.differentiation_opportunities || competitive_advice.differentiation_opportunities.length === 0) && (
                    <p className="text-sm text-muted-foreground">No differentiation opportunities identified</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedPage>
  );
}