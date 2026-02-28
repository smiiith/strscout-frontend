export interface Locality {
  slug: string;
  name: string;
  state: string;      // abbreviation
  stateName: string;  // full name
  strInsight: string; // used in location-specific FAQ answer
}

export const LOCALITIES: Locality[] = [
  {
    slug: "kissimmee",
    name: "Kissimmee",
    state: "FL",
    stateName: "Florida",
    strInsight:
      "Kissimmee is one of the top short-term rental markets in the US, driven by its proximity to Walt Disney World and Universal Studios. Year-round tourism keeps demand consistently high, making it one of the most competitive — and rewarding — STR markets in the country.",
  },
  {
    slug: "orlando",
    name: "Orlando",
    state: "FL",
    stateName: "Florida",
    strInsight:
      "Orlando's world-class theme parks and convention center drive year-round demand for short-term rentals. The market is competitive, with strong occupancy rates and a wide range of property types catering to families, couples, and business travelers alike.",
  },
  {
    slug: "miami",
    name: "Miami",
    state: "FL",
    stateName: "Florida",
    strInsight:
      "Miami is a premium STR market fueled by beach access, nightlife, art events, and year-round sunshine. Strong demand from both leisure and business travelers supports above-average nightly rates, though competition among well-optimized listings is fierce.",
  },
  {
    slug: "austin",
    name: "Austin",
    state: "TX",
    stateName: "Texas",
    strInsight:
      "Austin's booming tech scene and landmark events like SXSW and Austin City Limits push occupancy and rates sky-high during peak periods. Even outside major events, steady demand from university visitors, business travelers, and tourists makes it a strong year-round STR market.",
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "NV",
    stateName: "Nevada",
    strInsight:
      "Las Vegas is one of the world's top entertainment destinations, with massive event-driven demand from conventions, concerts, and sporting events. Short-term rentals that stand out in a crowded field can capture premium rates, especially around F1, NFL games, and major fights.",
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "AZ",
    stateName: "Arizona",
    strInsight:
      "Phoenix attracts snowbirds from November through April, creating a strong seasonal demand spike. Major sporting events, a growing tech and corporate relocation scene, and affordable entry prices make it an attractive STR investment market.",
  },
  {
    slug: "nashville",
    name: "Nashville",
    state: "TN",
    stateName: "Tennessee",
    strInsight:
      "Nashville's reputation as a bachelor and bachelorette party destination, combined with its live music scene and growing culinary culture, drives exceptional weekend demand. Short-term rentals with the right amenities and a polished listing consistently outperform the market average.",
  },
  {
    slug: "san-diego",
    name: "San Diego",
    state: "CA",
    stateName: "California",
    strInsight:
      "San Diego's year-round mild climate, beaches, and proximity to major military installations create consistent STR demand. The market attracts beach tourists, biotech conference-goers, and family vacationers, supporting strong occupancy across multiple seasons.",
  },
  {
    slug: "new-orleans",
    name: "New Orleans",
    state: "LA",
    stateName: "Louisiana",
    strInsight:
      "New Orleans is an event-driven STR market powered by Mardi Gras, Jazz Fest, Essence Festival, and Saints games. Its unique culture and food scene attract visitors year-round, but listings that nail their presentation capture the lion's share of premium bookings.",
  },
  {
    slug: "charleston",
    name: "Charleston",
    state: "SC",
    stateName: "South Carolina",
    strInsight:
      "Charleston's historic charm, award-winning food scene, and status as a top wedding destination drive a boutique STR market with above-average nightly rates. Guests expect quality and character, making listing presentation and amenities especially important here.",
  },
  {
    slug: "honolulu",
    name: "Honolulu",
    state: "HI",
    stateName: "Hawaii",
    strInsight:
      "Honolulu commands some of the highest nightly rates in the US thanks to its world-class beaches and status as a bucket-list destination. The market also has strict short-term rental regulations, so well-positioned compliant properties benefit from limited supply and premium demand.",
  },
  {
    slug: "fort-lauderdale",
    name: "Fort Lauderdale",
    state: "FL",
    stateName: "Florida",
    strInsight:
      "Fort Lauderdale's combination of pristine beaches, a world-class boating scene, and Spring Break traffic creates strong seasonal and year-round STR demand. Its growing appeal as an alternative to Miami attracts savvy travelers looking for beach access at better value.",
  },
  {
    slug: "daytona-beach",
    name: "Daytona Beach",
    state: "FL",
    stateName: "Florida",
    strInsight:
      "Daytona Beach sees major demand spikes around NASCAR's Daytona 500, Spring Break, and Bike Week, making it a high-occupancy seasonal market. Properties that stand out with great photos and strong amenities consistently capture bookings during these critical windows.",
  },
  {
    slug: "bend",
    name: "Bend",
    state: "OR",
    stateName: "Oregon",
    strInsight:
      "Bend is an outdoor recreation hub with strong year-round demand driven by skiing at Mt. Bachelor, world-class mountain biking, hiking, and the Deschutes River. Its craft beer scene and remote-work appeal attract a growing base of longer-stay guests.",
  },
  {
    slug: "chicago",
    name: "Chicago",
    state: "IL",
    stateName: "Illinois",
    strInsight:
      "Chicago is one of the largest urban STR markets in the US, with demand driven by major conventions at McCormick Place, Bears and Cubs games, the Lollapalooza music festival, and a renowned restaurant and theater scene. Occupancy is highest May through October but remains solid year-round.",
  },
];

export function getLocality(slug: string): Locality | undefined {
  return LOCALITIES.find((l) => l.slug === slug);
}
