import type {
  BenefitItem,
  DiscoveryCategory,
  GuideArticle,
  BusinessOwnerCTA,
  FaqItem,
  QuickFilterChip,
} from "../types";

export const SERVICES_HERO = {
  h1Prefix: "Stop searching.",
  h1Suffix: "Start solving",
  subhead:
    "South Africa’s intelligent network of local professionals. From emergency fixes to long-term projects.",
  heroImage: "/service-home/hero-signpost.png",
  searchPlaceholder: "What service do you need today?",
  searchRoute: "/services/all",
  chips: [
    { label: "Near me", href: "/services/all?filter=near-me", icon: "map-pin" as const },
    { label: "Plumbers", href: "/services/all?category=plumber", icon: "wrench" as const },
    { label: "Electricians", href: "/services/all?category=electrician", icon: "wrench" as const },
    { label: "Cleaning", href: "/services/all?category=cleaning", icon: "sparkles" as const },
    { label: "Home Repairs", href: "/services/all?category=home-repairs", icon: "wrench" as const },
  ] as QuickFilterChip[],
};

export const SERVICES_BENEFITS: BenefitItem[] = [
  {
    title: "Can’t find it? Match it",
    description: "Tell us what you need and let qualified local professionals come to you.",
    image: "/service-home/how-match.png",
  },
  {
    title: "Help around the corner",
    description: "Filter by location, verify credentials, and find the right expert in your neighbourhood.",
    image: "/service-home/booking.png",
  },
  {
    title: "Verified. Rated. Real.",
    description: "Read genuine reviews from real clients before you make your hiring decision.",
    image: "/service-home/connect.png",
  },
];

export const SERVICES_LOCATIONS: DiscoveryCategory[] = [
  {
    id: "cpt",
    name: "Service Experts in Cape Town",
    href: "/services/cape-town",
    image: "/service-home/cape-town.png",
    description: "Find top-rated local pros across the Mother City.",
  },
  {
    id: "jhb",
    name: "Service Experts in Johannesburg",
    href: "/services/johannesburg",
    image: "/service-home/johannesburg.png",
    description: "Connect with verified tradespeople and specialists across Joburg.",
  },
  {
    id: "dbn",
    name: "Service Experts in Durban",
    href: "/services/durban",
    image: "/service-home/durban.png",
    description: "Discover reliable service providers across eThekwini.",
  },
];

export const SERVICES_MATCH_BANNER = {
  title: "Can’t find the perfect fit?",
  subtitle: "Tell us what you need and let verified professionals send quotes directly to you.",
  ctaText: "Activate Now",
  href: "https://www.findmy.co.za/services/match#adscr",
};

export const SERVICES_ARTICLES: GuideArticle[] = [
  {
    id: "pet-grooming",
    title: "SA’s Best Pet Grooming Services According to Real Pet Parents",
    href: "https://blog.findmy.co.za/south-africas-best-pet-grooming-services-according-to-real-pet-parents/",
    image: "/service-home/pet-grooming.png",
  },
  {
    id: "budgeting-event",
    title: "Budgeting for Event Services Without Compromising Quality",
    href: "https://blog.findmy.co.za/budgeting-for-event-services-without-compromising-quality/",
    image: "/service-home/budgeting.png",
  },
  {
    id: "beauty-trends",
    title: "Top Beauty and Hair Trends to Try in 2025",
    href: "https://blog.findmy.co.za/top-beauty-and-hair-trends-to-try-in-2025/",
    image: "/service-home/trends.png",
  },
];

export const SERVICES_OWNER_CTA: BusinessOwnerCTA = {
  title: "Grow Your Local Client Base",
  subtitle:
    "Connect your service business with customers actively searching in your area. Free to get started.",
  buttonText: "List Your Service",
  href: "https://growth.findmy.co.za?package=services#pricing",
};

export const SERVICES_CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What is FindMy Service?",
    answer:
      "FindMy Service is a smart directory that helps you find, compare and contact trusted local service providers across South Africa. Whether you need a plumber, an electrician, a web designer, an accountant or a personal trainer, we bring the best local talent to you.",
  },
  {
    question: "What types of services can I find?",
    answer:
      "From emergency home maintenance (plumbing, electrical, roofing) to business services (legal, marketing, accounting), wellness, beauty, pet care and more, we cover dozens of categories with qualified professionals across major cities and regional towns.",
  },
  {
    question: "Is FindMy Service free to use?",
    answer:
      "Yes. Browsing listings, reading reviews and contacting service providers through FindMy is completely free for consumers.",
  },
  {
    question: "How do I choose the right service provider?",
    answer:
      "Check their verified credentials, read genuine customer reviews, view past work portfolios and compare pricing estimates directly on their profile before reaching out.",
  },
];

export const SERVICES_BUSINESS_FAQS: FaqItem[] = [
  {
    question: "Who can list on FindMy Service?",
    answer:
      "Any legitimate service provider. Whether you're a handyman, garden service, solar installer, hair salon, GP, attorney, accountant, tutor, vet or web developer, FindMy Service has a category for you. Sole traders and established firms alike use the platform to reach local customers.",
  },
  {
    question: "How do I list my service business on FindMy?",
    answer:
      "Register your business on FindMy, choose your category and create your profile with your services, location, photos and contact details. Once verified, your listing goes live and becomes searchable by customers looking for exactly what you offer in your area.",
  },
  {
    question: "How does FindMy Service help me win more customers?",
    answer:
      "Your business appears in front of people actively searching for your service in your area, not cold audiences. Combined with FindMy's growth tools for local search visibility, review automation and lead generation, your profile works around the clock to turn searches into enquiries.",
  },
  {
    question: "Can I list under more than one category?",
    answer:
      "Yes, if your business genuinely offers multiple services. A maintenance company covering cleaning, garden services and handyman work, for example, can be found under each relevant category, which multiplies the ways local customers discover you.",
  },
];
