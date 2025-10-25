import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function MarketSpyFAQ() {
  const faqs = [
    {
      question: "What do you mean by nearby competitors?",
      answer:
        "We find 10-20 listings that are both close in proximity and similar to yours (type of stay and number of bedrooms). These are the properties guests are most likely comparing against your listing.",
    },
    {
      question: "What data do you analyze?",
      answer:
        "We analyze calendar availability over 90 days, amenities, policies (pet-friendly, Instant Book, etc.), photos, interior design, headlines, descriptions, and pricing patterns to give you a complete competitive picture.",
    },
    {
      question: "How long does it take to get my report?",
      answer:
        "Most reports are delivered within 24 hours. You'll receive an email notification when your Market Spy report is ready to view and download.",
    },
    {
      question: "Is this really free?",
      answer:
        "Yes! Your first Market Spy report is completely free with no credit card required. We want you to see the value before making any commitment.",
    },
    {
      question: "Can I get reports for multiple properties?",
      answer:
        "Absolutely. Each property gets its own detailed competitive analysis. Contact us about volume pricing if you manage multiple listings.",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Got Questions? We've Got Answers.</h2>
          <p className="text-lg text-muted-foreground text-center mb-12">
            Everything you need to know about STR Market Spy
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
                <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
