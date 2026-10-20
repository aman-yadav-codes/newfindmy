import type {
  BenefitItem,
  DiscoveryCategory,
  GuideArticle,
  CrossServiceLink,
  BusinessOwnerCTA,
  FaqItem,
  QuickFilterChip,
} from "../types";

export const TRAVEL_HERO = {
  h1Prefix: "Stop searching.",
  h1Suffix: "Start departing.",
  subhead:
    "Your next trip, found smarter. A direct line to unique holiday packages and private rentals.",
  heroImage: "/travel-home/hero-suitcase.png",
  searchPlaceholder: "Where would you like to stay?",
  searchRoute: "/travel/all",
  chips: [
    { label: "Game Lodges", href: "/travel/game-lodges-and-safari", icon: "compass" as const },
    { label: "Guest Houses", href: "/travel/guest-houses-and-bandbs", icon: "building" as const },
    { label: "Unique Stays", href: "/travel/hidden-gems-and-unique-stays", icon: "sparkles" as const },
    { label: "Hotels & Resorts", href: "/travel/hotels-and-resorts", icon: "building" as const },
    { label: "Bush Camps", href: "/travel/bush-camps-and-tented-stays", icon: "compass" as const },
    { label: "Glamping", href: "/travel/all?type=glamping", icon: "sparkles" as const },
  ] as QuickFilterChip[],
};

export const TRAVEL_BENEFITS: BenefitItem[] = [
  {
    title: "The Specifics",
    description:
      "Rich venue details including amenities, features, and policies. Clearly presented before you book.",
    image: "/travel-home/specifics.png",
  },
  {
    title: "Discover South African Stays",
    description:
      "Quality accommodations across South Africa, from bush lodges to hotels and boutique retreats for every type of getaway.",
    image: "/travel-home/verified.png",
  },
  {
    title: "Seamless Access",
    description:
      "Skip the middlemen. We connect you directly to the source to secure your trip with zero friction.",
    image: "/travel-home/seamless.png",
  },
];

export const TRAVEL_DISCOVERY: DiscoveryCategory[] = [
  {
    id: "bush-camps",
    name: "Bush Camps & Tented Stays",
    href: "/travel/bush-camps-and-tented-stays",
    image: "/travel-home/bush-breaks.png",
    description: "Immersive wilderness glamping & rustic tented camps",
  },
  {
    id: "game-lodges",
    name: "Game Lodges & Safari",
    href: "/travel/game-lodges-and-safari",
    image: "/travel-home/remote-escapes.png",
    description: "Big Five safari reserves and luxury bushveld retreats",
  },
  {
    id: "guesthouses",
    name: "Guest Houses & B&Bs",
    href: "/travel/guest-houses-and-bandbs",
    image: "/travel-home/bed-and-breakfast.png",
    description: "Charming home-style hospitality and bed & breakfast stays",
  },
  {
    id: "hidden-gems",
    name: "Hidden Gems & Unique Stays",
    href: "/travel/hidden-gems-and-unique-stays",
    image: "/travel-home/glamping.png",
    description: "Floating cabins, cave stays, treehouses and unique hideaways",
  },
  {
    id: "hotels-resorts",
    name: "Hotels & Resorts",
    href: "/travel/hotels-and-resorts",
    image: "/travel-home/coastal-views.png",
    description: "Full-service luxury hotels, beachfront resorts and spas",
  },
  {
    id: "hoedspruit",
    name: "Hoedspruit",
    href: "/travel/all-in-hoedspruit",
    image: "/travel-home/hoedspruit.png",
    description: "The gateway to the Kruger National Park and wildlife reserves",
  },
  {
    id: "clarens",
    name: "Clarens",
    href: "/travel/all-in-clarens",
    image: "/travel-home/clarens.png",
    description: "Art galleries, mountain scenery and Free State charm",
  },
  {
    id: "knysna",
    name: "Knysna",
    href: "/travel/all-in-knysna",
    image: "/travel-home/knysna.png",
    description: "Lagoon views, ancient forests and Garden Route magic",
  },
];

export const TRAVEL_MATCH_BANNER = {
  title: "Can't find the one?",
  subtitle:
    "The exact escape you want is out there. Stop the endless scrolling. Submit your budget and travel requirements, and let Findmy Match query our entire network to find your perfect trip.",
  ctaText: "Activate Now",
  href: "/travel/match_rent",
};

export const TRAVEL_ARTICLES: GuideArticle[] = [
  {
    id: "coastal-retreats",
    title: "Ocean Air and Salt Spray: Top 10 Coastal Retreats in South Africa",
    href: "https://blog.findmy.co.za/",
    image: "/travel-home/coastal.png",
  },
  {
    id: "honeymoon-resorts",
    title: "From Bush to Beach: Top 10 Honeymoon Resorts in South Africa",
    href: "https://blog.findmy.co.za/",
    image: "/travel-home/honeymoon.png",
  },
  {
    id: "spa-resorts",
    title: "Where to Unwind Now: Top 10 Spa Resorts in South Africa",
    href: "https://blog.findmy.co.za/",
    image: "/travel-home/spa.png",
  },
];

export const TRAVEL_SERVICES: CrossServiceLink[] = [
  {
    id: "car-hire",
    title: "Find Car Hire",
    href: "/transport",
    image: "/travel-home/car-hire.png",
  },
  {
    id: "dining",
    title: "Find Local Dining",
    href: "/food",
    image: "/travel-home/local-dining.png",
  },
  {
    id: "insurance",
    title: "Find Travel Insurance",
    href: "https://insure.findmy.co.za/",
    image: "/travel-home/travel-insurance.png",
  },
  {
    id: "shuttles",
    title: "Find Airport Shuttles",
    href: "/transport",
    image: "/travel-home/airport-shuttles.png",
  },
  {
    id: "events",
    title: "Find Local Events",
    href: "/entertainment",
    image: "/travel-home/local-events.png",
  },
];

export const TRAVEL_OWNER_CTA: BusinessOwnerCTA = {
  title: "Scale Your Bookings",
  subtitle:
    "Connect with thousands of travelers looking for exactly what you offer. No noise, just bookings and guests.",
  buttonText: "Get Started",
  href: "/pricing",
};

export const TRAVEL_CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What is FindMy Travel?",
    answer:
      "FindMy Travel is your intelligent guide to South African accommodation, holidays, and unique travel escapes, connecting you directly to safari lodges, boutique guest houses, and coastal resorts.",
  },
  {
    question: "How do I book a stay on FindMy Travel?",
    answer:
      "Browse listings by location or stay category. Each listing includes direct booking options, official contact information, rates, availability inquiry forms, and instant booking links.",
  },
  {
    question: "Are rates on FindMy direct with the properties?",
    answer:
      "Yes. FindMy prioritizes direct connections between travelers and property managers, ensuring transparent pricing with no hidden booking fees.",
  },
  {
    question: "What is FindMy Match for Travel?",
    answer:
      "When looking for a specific group getaway, wedding venue, or custom holiday budget, FindMy Match lets you submit your travel dates and requirements to receive tailored quotes directly from available properties.",
  },
];

export const TRAVEL_BUSINESS_FAQS: FaqItem[] = [
  {
    question: "How do accommodation owners list on FindMy Travel?",
    answer:
      "Property owners, safari lodges, and guest house hosts can register through our hospitality dashboard to create detailed listings with high-resolution photo galleries, room types, and amenities.",
  },
  {
    question: "Does FindMy charge high commission on bookings?",
    answer:
      "Unlike traditional OTAs that take 15-25% commissions, FindMy offers direct booking enquiry models that allow hosts to keep their profits and communicate directly with guests.",
  },
  {
    question: "Can property managers sync availability calendars?",
    answer:
      "Yes. FindMy supports iCal calendar synchronisation and booking engine integrations so your availability is always up to date across all platforms.",
  },
  {
    question: "How do you verify accommodations on FindMy?",
    answer:
      "Every property is reviewed by our editorial team for legitimacy, hospitality compliance, accurate guest imagery, and positive verified reviews.",
  },
];
