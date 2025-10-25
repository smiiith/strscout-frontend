import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function MarketSpyHero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-10 pb-20 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 ">
          <div className="relative lg:flex-1">
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <Image
                src="/home/magnifying-glass-examining-miniature-house-model-o.jpg"
                alt="Market analysis concept"
                width={600}
                height={600}
                className="rounded-2xl shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 left-4 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                        fill="currentColor"
                      />
                      <path
                        d="M12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">STR</div>
                    <div className="text-sm font-medium">Market Spy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex-1">
            <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Several pricing options to choose from
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
              See the Winners. See Why.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              See live occupancy near you and what top competitors do
              differently — amenities, photos, headlines, descriptions, interior
              design, policies, and more.
            </p>

            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <p className="text-base leading-relaxed mb-4">
                <span className="font-semibold text-foreground">
                  STR Market Spy
                </span>{" "}
                shows who's getting booked now and how you stack up.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Takes minutes
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-success"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  No setup &mdash; just insights.
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => {
                  router.push("/pricing");
                }}
              >
                Get My Report Now
                <svg
                  className="ml-2 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-4">
              <span className="font-semibold text-success">
                ⚡ Results in a few minutes
              </span>{" "}
              • Costs a fraction of one empty night
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
