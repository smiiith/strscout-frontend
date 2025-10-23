import Image from "next/image";

export function SocialProof() {
  const stats = [
    { icon: "/images/icon-hero-image.png", label: "Hero photos" },
    { icon: "/images/icon-title.png", label: "Title" },
    { icon: "/images/icon-description.png", label: "Description" },
    { icon: "/images/icon-amenities.png", label: "Amenities" },
    { icon: "/images/icon-interior-design.png", label: "Interior design" },
  ];

  return (
    <section className="py-12 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-evenly items-center gap-2 sm:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
                <Image
                  src={stat.icon}
                  alt={stat.label}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
