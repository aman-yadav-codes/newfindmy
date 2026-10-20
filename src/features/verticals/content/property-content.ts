import type {
  BenefitItem,
  DiscoveryCategory,
  GuideArticle,
  CrossServiceLink,
  BusinessOwnerCTA,
  FaqItem,
  QuickFilterChip,
} from "../types";

export const PROPERTY_HERO = {
  h1Prefix: "Stop hunting.",
  h1Suffix: "Start finding",
  subhead: "South Africa's intelligent property guide. Your next move, made simple.",
  heroImage: "/property-home/hero-property.png",
  searchPlaceholder: "What property are you looking for?",
  searchRoute: "/property/property-for-sale",
  chips: [
    { label: "For Sale", href: "/property/property-for-sale", icon: "building" as const },
    { label: "For Rent", href: "/property/property-to-rent", icon: "building" as const },
    { label: "Commercial", href: "/property/property-for-sale/commercial", icon: "building" as const },
    { label: "Residential", href: "/property/property-for-sale/residential", icon: "building" as const },
    { label: "On Show", href: "/property/on-show", icon: "calendar" as const },
  ] as QuickFilterChip[],
};

export const PROPERTY_BENEFITS: BenefitItem[] = [
  {
    title: "Get Pre-approved",
    description:
      "Know your budget before you start the hunt. Secure your pre-approval, so you can search with confidence and make your move the moment you find the one.",
    image: "/property-home/pre-approved.png",
  },
  {
    title: "Never Miss a Viewing",
    description:
      "Browse all upcoming show houses in your area. Set up instant alerts, so you're always the first to know and the first to walk through the door.",
    image: "/property-home/viewing.png",
  },
  {
    title: "See The Neighbourhood",
    description:
      "A listing is just a start. We show you the real neighbourhood: nearby schools, clinics, restaurants, and other local services.",
    image: "/property-home/neighbourhood.png",
  },
];

export const PROPERTY_LOCATIONS: DiscoveryCategory[] = [
  {
    id: "atlantic-seaboard",
    name: "Atlantic Seaboard",
    href: "/property/all-in-atlantic-seaboard-community-beach-road-sea-point-cape-town-wc",
    image: "/property-home/atlantic-seaboard.png",
    description: "Premier coastal living in Cape Town",
  },
  {
    id: "sandton",
    name: "Sandton",
    href: "/property/all-in-sandton-gp",
    image: "/property-home/sandton.png",
    description: "The corporate & luxury capital of Gauteng",
  },
  {
    id: "dolphin-coast",
    name: "Dolphin Coast",
    href: "/property/all-in-dolphin-coast",
    image: "/property-home/dolphin-coast.png",
    description: "Subtropical paradise & luxury estates in KZN",
  },
];

export const PROPERTY_CATEGORIES = [
  {
    id: "for-sale",
    name: "Property For Sale",
    href: "/property/property-for-sale",
    items: [
      { name: "Commercial", href: "/property/property-for-sale/commercial" },
      { name: "Residential", href: "/property/property-for-sale/residential" },
    ],
  },
  {
    id: "to-rent",
    name: "Property To Rent",
    href: "/property/property-to-rent",
    items: [
      { name: "Commercial", href: "/property/property-to-rent/commercial" },
      { name: "Residential", href: "/property/property-to-rent/residential" },
    ],
  },
  {
    id: "on-show",
    name: "On Show",
    href: "/property/on-show",
    items: [
      { name: "Weekend Showhouses", href: "/property/on-show" },
      { name: "Virtual Tours", href: "/property/property-for-sale" },
    ],
  },
];

export const PROPERTY_MATCH_BANNER = {
  title: "Can't find your perfect match?",
  subtitle:
    "If your ideal home isn't listed, don't give up. Tell us exactly what you're looking for, and we'll send your request to our network of top agencies. Let them do the work.",
  ctaText: "Activate Now",
  href: "https://www.findmy.co.za/property/match#adscr",
};

export const PROPERTY_ARTICLES: GuideArticle[] = [
  {
    id: "prop-trends",
    title: "South Africa Property Market 2025: Key Trends",
    href: "https://blog.findmy.co.za/south-africa-property-market-2025-key-trends/",
    image: "/property-home/trends.png",
  },
  {
    id: "hidden-gems",
    title: "Buying Property: Hidden-Gem Neighbourhoods in CPT & Joburg",
    href: "https://blog.findmy.co.za/buying-property-hidden-gem-neighbourhoods-in-cpt-joburg/",
    image: "/property-home/gem.png",
  },
  {
    id: "boost-value",
    title: "How Home and Property Services Can Boost Your Property Value",
    href: "https://blog.findmy.co.za/how-home-and-property-services-can-boost-your-property-value/",
    image: "/property-home/value.png",
  },
];

export const PROPERTY_SERVICES: CrossServiceLink[] = [
  {
    id: "movers",
    title: "Find Movers",
    href: "/services",
    image: "/property-home/movers.png",
  },
  {
    id: "security",
    title: "Find Home Security",
    href: "/services",
    image: "/property-home/security.png",
  },
  {
    id: "contractors",
    title: "Find Building Contractors",
    href: "/services",
    image: "/property-home/contracters.png",
  },
  {
    id: "painters",
    title: "Find Home Painters",
    href: "/services",
    image: "/property-home/painters.png",
  },
  {
    id: "cleaning",
    title: "Find Cleaning Services",
    href: "/services",
    image: "/property-home/cleaning.png",
  },
];

export const PROPERTY_OWNER_CTA: BusinessOwnerCTA = {
  title: "Are You an Agent? Grow Your Business with Us",
  subtitle:
    "Put your properties in front of serious buyers and qualified tenants across South Africa with FindMy's agent tools.",
  buttonText: "Get Started",
  href: "https://growth.findmy.co.za?package=property#pricing",
};

export const PROPERTY_CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What can I find on FindMy Property?",
    answer:
      "FindMy Property connects you with thousands of residential and commercial properties for sale and to rent across South Africa, as well as on-show listings and verified local estate agencies.",
  },
  {
    question: "How do I search for properties in a specific suburb?",
    answer:
      "Type any city, suburb, or landmark into the search bar, or use our interactive location discovery chips to browse listings filtered by price, property type, and bedrooms.",
  },
  {
    question: "Can I contact estate agents directly through the listing?",
    answer:
      "Yes. Every verified listing includes direct contact options, agent profiles, agency details, and viewing request forms to connect you immediately without delays.",
  },
  {
    question: "What is FindMy Match for Property?",
    answer:
      "If you cannot find your exact dream home, our FindMy Match tool lets you specify your budget, must-haves, and preferred areas. We share your brief with our partner agency network to find off-market or upcoming listings.",
  },
];

export const PROPERTY_BUSINESS_FAQS: FaqItem[] = [
  {
    question: "How do estate agencies list on FindMy Property?",
    answer:
      "Agencies can register via our growth platform, sync listings through automated CRM feeds or manual uploads, and showcase properties directly to active property seekers.",
  },
  {
    question: "What tools are included for real estate agents?",
    answer:
      "FindMy provides automated enquiry tracking, local area visibility boosts, featured showcase listings, agency branding profiles, and direct lead management tools.",
  },
  {
    question: "Can commercial brokerages list properties?",
    answer:
      "Yes. FindMy Property features dedicated commercial categories for offices, retail spaces, industrial warehouses, and development land across South Africa.",
  },
  {
    question: "How does FindMy verify listings and protect consumers?",
    answer:
      "We verify registered estate agencies with their professional bodies (PPRA), validate listing integrity, and enforce strict content guidelines to eliminate fraud and duplicates.",
  },
];
