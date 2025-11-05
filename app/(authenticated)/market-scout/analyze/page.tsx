import MarketAnalysisPage from "@/components/market-analysis/MarketAnalysisPage";

export default function MarketScoutPage() {
  return (
    <MarketAnalysisPage
      productName="Market Scout"
      productType="market-scout"
      showRoomTypeSelect={false}
      fixedRoomType="entire home"
      reportsPageUrl="/market-scout-reports"
      logoSrc="/market-scout-logo.png"
      title="Competitive Insights for Your Investment Opportunity"
      description="Enter your property info below. STR Market Scout will find the nearby short term rentals, analyze their bookings for demand; then analyze each comp to determine the strength of your competition."
    />
  );
}
