import { Button } from "@/components/ui/button";
import { Tick02Icon } from "@/components/Icons";
import { useRouter } from "next/navigation";

export function CompetitorInsights() {
  const router = useRouter();

  const questions = [
    "Do they have better amenities?",
    "Are they using Instant Book?",
    "Do they allow pets?",
    "Is their design more appealing?",
    "Are they writing better descriptions?",
  ];

  return (
    <section className="bg-gradient-to-b from-primary/5 to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            More Bookings. Same Area.{" "}
            <span className="text-primary">What Gives?</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Your competitors are winning reservations — sometimes right next
            door. But why?
          </p>

          <div className="bg-background rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div className="grid gap-4 text-left mb-8">
              {questions.map((question, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Tick02Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-base md:text-lg text-foreground">
                    {question}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-8">
              <p className="text-lg font-medium text-foreground mb-6">
                STR Market Spy digs in — and shows you{" "}
                <span className="text-primary">exactly</span> what you're
                missing.
              </p>
              <Button
                size="lg"
                variant="default"
                className="text-lg px-8 py-6"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Get My Report Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
