import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/lib/context/UserSessionProvider";

export function FinalCTA() {
  const router = useRouter();
  const { session } = useUserSession();

  return (
    <section className="py-20 md:py-24 bg-gradient-to-b from-primary/5 to-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 text-center shadow-2xl border-2 border-accent bg-background">
          <div className="inline-flex items-center rounded-full bg-success/10 px-4 py-2 text-sm font-medium text-success mb-6">
            <Clock className="mr-2 h-4 w-4" />
            Limited time: Get your report now
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Ready to Transform Your Listing?
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join other Airbnb hosts who've increased their bookings with expert
            feedback. No credit card required, completely free.
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-lg px-12 py-6 shadow-lg shadow-primary/25 w-full"
            onClick={() => {
              // If user is logged in, go directly to assess property
              // Otherwise, redirect to register with return path
              if (session?.id) {
                router.push("/properties/assess-property/single");
              } else {
                router.push("/register?redirect_to=/properties/assess-property/single");
              }
            }}
          >
            Get Your Free Analysis Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* <p className="text-sm text-muted-foreground mt-6">
            Your report will be ready within 24 hours • No spam, ever
          </p> */}
        </Card>
      </div>
    </section>
  );
}
