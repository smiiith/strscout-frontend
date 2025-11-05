import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CompetitorInsights() {
  const router = useRouter();

  return (
    <section className="bg-gradient-to-b from-primary/5 to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Make Data-Driven Investment Decisions
          </h2>

          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Don't gamble with your investment. Know exactly what you're getting
            into before you buy.
          </p>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Competition Analysis",
                description:
                  "Understand how many similar properties compete for guests in the area.",
              },
              {
                title: "Occupancy Insights",
                description:
                  "Learn expected booking rates for accurate planning.",
              },
              {
                title: "Easy to Use",
                description:
                  "Enter an address and get a full report in minutes.",
              },
            ].map((insight, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="default"
              className="text-lg px-8 py-6"
              onClick={() => {
                router.push("/pricing");
              }}
            >
              Choose a plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
