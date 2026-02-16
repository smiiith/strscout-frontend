import { Button } from "@/components/ui/button";
import { ArrowRight01Icon } from "@/components/Icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EarlyAccessDialog } from "@/components/host-assist/early-access-dialog";
import posthog from "posthog-js";

export function HostAssistHero() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCtaClick = () => {
    posthog.capture("clicked_host_assist_cta");
    setDialogOpen(true);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 pt-10 pb-20 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Left Side Panel */}
          <div className="relative lg:w-2/5">
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 md:p-8 shadow-2xl sticky top-10">
              <div className="flex flex-col items-center justify-center text-center">
                <Image
                  src="/host-assist/host-assist-hero-graphic-min.jpg"
                  alt="Host Assist Task Manager"
                  width={500}
                  height={500}
                  className="rounded-xl mb-6 shadow-lg w-full"
                  priority
                />
                <h3 className="text-xl md:text-2xl font-bold mb-1">
                  NEW! Task Manager app
                </h3>
                <h3 className="text-xl md:text-2xl font-bold mb-3">
                  for hosts like you
                </h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Avoid the extra fees on Airbnb.
                </p>
                <Button
                  size="lg"
                  className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-lg hover:shadow-xl transition-shadow w-full"
                  onClick={handleCtaClick}
                >
                  Sign Up for FREE early Access
                </Button>
                <p className="text-xs md:text-sm text-muted-foreground mt-4">
                  We are pre-selecting hosts for FREE early access.
                </p>
              </div>
            </div>
          </div>

          {/* Right Main Content */}
          <div className="lg:w-3/5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Hosts...
              <br />
              Stay on top of every task, and off Airbnb's fee list.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              We get it. Being a short term rental host means managing a lot of
              tasks. If anything falls through the cracks then it's disaster.
              PMS systems promise help, but are expensive, have a steep learning
              curve and worst of all force you to pay 15% or more in fees to
              Airbnb.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Host Assist is your solution.
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed text-pretty">
              Host Assist works from your browser or phone. It tracks all of
              your tasks: from messaging guests, scheduling cleaners, adjusting
              thermostats, creating lock codes -- you name it. No more sticky
              notes and no more spreadsheets. Host Assist alerts you each time a
              task needs done so you stay on top of it. It's that easy, and easy
              to use.
            </p>

            <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Increase profits.
              </h3>
              <p className="text-base leading-relaxed mb-4">
                Host Assist is not a PMS that forces the 15% or more fee for
                Airbnb. You can keep your listing(s) at the 3% split fee.
              </p>
              <p className="text-base leading-relaxed">
                Nothing should ever fall through the cracks and you shouldn't
                have to pay crazy fees. Keep those 5 star reviews rolling in and
                get control over your business. Sign up today.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-shadow"
                onClick={handleCtaClick}
              >
                Sign Up for FREE early Access
                <ArrowRight01Icon className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <EarlyAccessDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
