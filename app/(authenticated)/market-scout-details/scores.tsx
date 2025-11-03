import { Card, CardContent } from "@/components/ui/card";

interface MarketAnalysisCardProps {
  demandTopListings: number;
  demandOverallMarket: number;
  competitionTopTier: number;
  competitionOverallMarket: number;
}

function getDemandLabel(score: number): string {
  if (score >= 85) return "🔥 Hot";
  if (score >= 70) return "💪 Strong";
  if (score >= 55) return "👌 Good";
  if (score >= 40) return "🌤️ Patchy";
  if (score >= 20) return "🏝️ Thin";
  return "🌵 Desert";
}

function getCompetitionLabel(score: number): string {
  if (score >= 85) return "🥊 Brutal";
  if (score >= 75) return "💪 Strong";
  if (score >= 70) return "⚔️ Contested";
  if (score >= 60) return "🍰 Easy to Beat";
  if (score >= 50) return "🎯 Soft";
  if (score >= 40) return "🎉 Very Soft";
  return "🚀 Wide-Open";
}

function getCompetitionDescription(score: number): string {
  if (score >= 85) return "Elite comps; you must be top-tier to win.";
  if (score >= 75) return "High bar on photos/amenities/policies.";
  if (score >= 70) return "Mixed quality; win with 1–2 strong edges.";
  if (score >= 60) return "Many beatable listings.";
  if (score >= 50) return "Quality gaps are obvious and common.";
  if (score >= 40) return "Few strong players; quick wins likely.";
  return "Dominant opportunity with competent setup.";
}

export function MarketAnalysisCard({
  demandTopListings,
  demandOverallMarket,
  competitionTopTier,
  competitionOverallMarket,
}: MarketAnalysisCardProps) {
  return (
    <Card className="w-full bg-background shadow-lg">
      <CardContent className="pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Demand Column */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-1">
              Demand
            </h3>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Top Listings
                </p>
                <p className="text-lg font-bold text-foreground">
                  {getDemandLabel(demandTopListings)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Overall Market
                </p>
                <p className="text-lg font-bold text-foreground">
                  {getDemandLabel(demandOverallMarket)}
                </p>
              </div>
            </div>
          </div>

          {/* Competition Column */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-foreground border-b border-border pb-1">
              Competition
            </h3>

            <div className="space-y-2">
              <div>
                <p className="text-xs text-muted-foreground mb-0.5">Top Tier</p>
                <p className="text-lg font-bold text-foreground">
                  {getCompetitionLabel(competitionTopTier)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getCompetitionDescription(competitionTopTier)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-0.5">
                  Overall Market
                </p>
                <p className="text-lg font-bold text-foreground">
                  {getCompetitionLabel(competitionOverallMarket)}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {getCompetitionDescription(competitionOverallMarket)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
