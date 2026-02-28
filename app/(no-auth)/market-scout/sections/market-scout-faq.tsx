import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Locality } from "@/lib/localities";

export function MarketScoutFAQ({ location }: { location?: Locality }) {
  const baseFaqs = [
    {
      question: "What do you mean by nearby competitors?",
      answer: location
        ? `We find 10-20 STR listings near your ${location.name} investment opportunity that are similar in type of stay and number of bedrooms.`
        : "We find 10-20 STR listings that are close in proximity and similar in type of stay and number of bedrooms to your investment opportunity.",
    },
    {
      question: "What data do you analyze?",
      answer:
        "We analyze calendar availability over 90 days, amenities, policies (pet-friendly, Instant Book, etc.), photos, interior design, headlines, and descriptions to give you a complete competitive picture.",
    },
    {
      question: "How long does it take to get my report?",
      answer:
        "It takes only seconds to get started and most reports are delivered within minutes.",
    },
    {
      question: "What does it cost?",
      answer:
        "Less than a lunch. We have several plan options starting at only $35 with discounts for multiple properties and yearly subscription.",
    },
    {
      question: "Can I get reports for multiple properties?",
      answer:
        "Absolutely. Each property gets its own detailed competitive analysis. Contact us about volume pricing if you manage more than 20 listings.",
    },
  ];

  const locationFaq = location
    ? [
        {
          question: `Is ${location.name} a good place to invest in an STR?`,
          answer: `${location.strInsight} STR Market Scout lets you analyze any ${location.name} address to see exactly how comparable properties are performing before you commit to a purchase.`,
        },
      ]
    : [];

  const faqs = [...locationFaq, ...baseFaqs];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Got Questions? We&apos;ve Got Answers.
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Everything you need to know about STR Market Scout
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
