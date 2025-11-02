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
      title="Competitive Insights for Your Listing"
      description="Enter your listing info below. STR Market Scout will analyze local bookings, policies, amenities, and more — then show you exactly how you compare."
    />
  );
}
