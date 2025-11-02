export function SocialProof() {
  const stats = [
    { value: "5,000+", label: "Hosts helped" },
    { value: "47%", label: "Avg. booking increase" },
    { value: "24hrs", label: "Report delivery" },
    { value: "4.9/5", label: "Host satisfaction" },
  ]

  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
