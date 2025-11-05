import MarketAnalysisPage from "@/components/market-analysis/MarketAnalysisPage";

export default function MarketSpyPage() {
  return (
    <MarketAnalysisPage
      productName="Market Spy"
      productType="market-spy"
      showRoomTypeSelect={true}
      reportsPageUrl="/my-comps"
      logoSrc="/market-spy-logo.png"
      title="Competitive Insights for Your Listing"
      description="Enter your listing info below. STR Market Spy will analyze local bookings, policies, amenities, and more — then show you exactly how you compare."
    />
  );
}
