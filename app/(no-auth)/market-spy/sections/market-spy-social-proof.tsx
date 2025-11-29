import {
  UserMultipleIcon,
  TrendingUp01Icon,
  Award02Icon,
  Target02Icon,
  Comment01Icon,
} from "@/components/Icons";

// In saturated markets, real advantage comes from insight—see what works nearby and outperform it

export function MarketSpySocialProof() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center max-w-6xl mx-auto">
          <div className="rounded-full flex items-center justify-center flex-shrink-0 hidden md:flex">
            <Comment01Icon className="w-20 h-20 lg:w-24 lg:h-24 text-primary/50" />
          </div>
          <div className="flex-1 w-full">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="border-t-2 border-primary p-4 md:p-6 bg-background">
                <p className="text-lg md:text-2xl italic mb-3">
                  &quot;I found the Feedback Genius was really really good!
                  I used the recommendation to update my listing
                  description.&quot;
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  — Michelle, Superhost from Washington
                </p>
              </div>
              <div className="border-t-2 border-primary p-4 md:p-6 bg-background">
                <p className="text-lg md:text-2xl italic mb-3">
                  &quot;I found it easy! 15 minutes.&quot;
                </p>
                <p className="text-sm font-medium text-muted-foreground">
                  — Brian, Superhost from Texas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
