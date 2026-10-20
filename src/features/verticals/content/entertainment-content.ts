import type {
  BenefitItem,
  DiscoveryCategory,
  GuideArticle,
  CrossServiceLink,
  BusinessOwnerCTA,
  FaqItem,
  QuickFilterChip,
} from "../types";

export const ENTERTAINMENT_HERO = {
  h1Prefix: "Stop searching.",
  h1Suffix: "Start experiencing",
  subhead: "South Africa's intelligent guide to what's on. Your next great time, found",
  heroImage: "/entertainment-home/hero-dancer.png",
  searchPlaceholder: "What would you like to do?",
  searchRoute: "/entertainment/all",
  chips: [
    { label: "Events", href: "/entertainment/all", icon: "calendar" as const },
    { label: "Cape Town", href: "/entertainment/cape-town", icon: "map-pin" as const },
    { label: "Johannesburg", href: "/entertainment/johannesburg", icon: "map-pin" as const },
    { label: "Durban", href: "/entertainment/durban", icon: "map-pin" as const },
    { label: "Arts & Culture", href: "/entertainment/arts-and-culture", icon: "sparkles" as const },
    { label: "Nightlife", href: "/entertainment/nightlife", icon: "sparkles" as const },
  ] as QuickFilterChip[],
};

export const ENTERTAINMENT_BENEFITS: BenefitItem[] = [
  {
    title: "SA's Full Event Guide",
    description:
      "Stop the browser-tab hunting. We've gathered the country's top events, markets, and gigs right here.",
    image: "/entertainment-home/guide.png",
  },
  {
    title: "See It. Book It. Secure It",
    description:
      "Found the perfect event? Get your tickets or book your spot instantly, right from the listing.",
    image: "/entertainment-home/book.png",
  },
  {
    title: "Find Your Vibe, Your Way",
    description:
      "You're in control. Filter by category, date, or location to find the exact experience you're looking for.",
    image: "/entertainment-home/vibe.png",
  },
];

export const ENTERTAINMENT_LOCATIONS: DiscoveryCategory[] = [
  {
    id: "cpt-events",
    name: "Cape Town Events",
    href: "/entertainment/cape-town",
    image: "/entertainment-home/cape-town.png",
    description: "Live gigs, outdoor markets, festivals and nightlife in the Mother City",
  },
  {
    id: "jhb-events",
    name: "Johannesburg Events",
    href: "/entertainment/johannesburg",
    image: "/entertainment-home/johannesburg.png",
    description: "Concerts, cultural exhibitions, rooftop sessions and food markets",
  },
  {
    id: "dbn-events",
    name: "Durban Events",
    href: "/entertainment/durban",
    image: "/entertainment-home/durban.png",
    description: "Beachside festivals, comedy nights, live music and family events",
  },
];

export const ENTERTAINMENT_CATEGORIES = [
  { name: "Arts & Culture", href: "/entertainment/arts-and-culture" },
  { name: "Music & Festivals", href: "/entertainment/music-and-festivals" },
  { name: "Food & Drink", href: "/entertainment/food-and-drink" },
  { name: "Comedy & Theatre", href: "/entertainment/comedy-and-theatre" },
  { name: "Nightlife & Bars", href: "/entertainment/nightlife" },
  { name: "Outdoor & Adventure", href: "/entertainment/outdoor-and-adventure" },
];

export const ENTERTAINMENT_NEARBY_BANNER = {
  title: "Find What's Happening Nearby",
  subtitle:
    "Use your location to unlock a live map of local events, activities, and must-see spots. Your next adventure is waiting.",
  ctaText: "Activate Now",
  href: "https://www.findmy.co.za/entertainment/nearme#adscr",
};

export const ENTERTAINMENT_ARTICLES: GuideArticle[] = [
  {
    id: "proposal-spots",
    title: "The Best Proposal Spots in Cape Town",
    href: "https://blog.findmy.co.za/",
    image: "/entertainment-home/proposal.png",
  },
  {
    id: "trendy-bars",
    title: "Cape Town’s Trendiest Bars for Nightlife Lovers",
    href: "https://blog.findmy.co.za/",
    image: "/entertainment-home/bars.png",
  },
  {
    id: "wedding-venues",
    title: "Top Wedding Venues in Johannesburg",
    href: "https://blog.findmy.co.za/",
    image: "/entertainment-home/wedding-venues.png",
  },
];

export const ENTERTAINMENT_SERVICES: CrossServiceLink[] = [
  {
    id: "restaurants",
    title: "Find Restaurants",
    href: "/food",
    image: "/entertainment-home/restaurants.png",
  },
  {
    id: "shuttle",
    title: "Find Shuttle Services",
    href: "/transport",
    image: "/entertainment-home/shuttle.png",
  },
  {
    id: "childminders",
    title: "Find Childminders",
    href: "/services",
    image: "/entertainment-home/childminders.png",
  },
  {
    id: "party",
    title: "Find Party Planning",
    href: "/services",
    image: "/entertainment-home/party.png",
  },
  {
    id: "catering",
    title: "Find Catering Services",
    href: "/services",
    image: "/entertainment-home/catering.png",
  },
];

export const ENTERTAINMENT_OWNER_CTA: BusinessOwnerCTA = {
  title: "Are you an event company or ticketing provider?",
  subtitle:
    "Put your event portfolio in front of thousands, ready to book. Reach engaged local audiences and sell tickets directly.",
  buttonText: "Get Started",
  href: "/pricing",
};

export const ENTERTAINMENT_CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What is FindMy Entertainment?",
    answer:
      "FindMy Entertainment is your all-in-one guide to discovering events, festivals, concerts, comedy shows, nightlife, and cultural happenings across South Africa.",
  },
  {
    question: "How do I purchase tickets for an event?",
    answer:
      "When viewing an event on FindMy, click the 'Book Now' or 'Get Tickets' link to be connected directly to the official ticketing partner or organizer.",
  },
  {
    question: "Can I find free events and community markets?",
    answer:
      "Yes. You can filter events by price, including free entry, local weekend craft markets, community exhibitions, and family-friendly park activations.",
  },
  {
    question: "Can I save events to my calendar?",
    answer:
      "Yes. Every event listing allows you to add reminders directly to your Google Calendar, Apple Calendar, or Outlook with one click.",
  },
];

export const ENTERTAINMENT_BUSINESS_FAQS: FaqItem[] = [
  {
    question: "How do event organizers list on FindMy Entertainment?",
    answer:
      "Organizers can submit their events through our dashboard, choose categories, add high-resolution imagery, specify ticket tiers, and publish to our event calendar.",
  },
  {
    question: "Can ticketing providers integrate with FindMy?",
    answer:
      "Yes. FindMy supports affiliate ticket tracking, API event sync, and custom promotional banners for major ticketing platforms and independent venues.",
  },
  {
    question: "How does FindMy promote featured events?",
    answer:
      "Featured events receive top-of-category placement, newsletter inclusion to thousands of subscribers, local search priority, and social media promotion.",
  },
  {
    question: "Is there a cost to submit community events?",
    answer:
      "Basic listings for non-commercial community and charity events are free. Premium promotional packages are available for commercial festivals and concerts.",
  },
];
