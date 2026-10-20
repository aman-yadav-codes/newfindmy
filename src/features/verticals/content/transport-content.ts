import type {
  BenefitItem,
  GuideArticle,
  CrossServiceLink,
  BusinessOwnerCTA,
  FaqItem,
  QuickFilterChip,
} from "../types";

export const TRANSPORT_HERO = {
  h1Prefix: "Your next ride,",
  h1Suffix: "found smarter",
  subhead: "Search thousands of new & used vehicles from trusted dealers nationwide",
  heroImage: "/transport-home/hero-car.png",
  searchPlaceholder: "What vehicle are you looking for?",
  searchRoute: "/transport/cars",
  chips: [
    { label: "Cars", href: "/transport/cars", icon: "car" as const },
    { label: "Commercial", href: "/transport/commercial", icon: "car" as const },
    { label: "Leisure", href: "/transport/leisure", icon: "compass" as const },
    { label: "Motorcycles", href: "/transport/motorcycles", icon: "car" as const },
    { label: "SUVs", href: "/transport/cars?body=suv", icon: "car" as const },
    { label: "Bakkies", href: "/transport/cars?body=bakkie", icon: "car" as const },
  ] as QuickFilterChip[],
};

export const TRANSPORT_BENEFITS: BenefitItem[] = [
  {
    title: "Shop with a Real Budget",
    description:
      "No more guesswork. When you find a car you like, you can apply for finance pre-approval directly on the listing to know exactly where you stand.",
    image: "/transport-home/budget.png",
  },
  {
    title: "Get Behind the Wheel",
    description:
      "Feel the drive. Found a potential match? You can easily book a test drive with the dealer, right from the vehicle's page.",
    image: "/transport-home/wheel.png",
  },
];

export const TRANSPORT_CATEGORIES = [
  {
    id: "category",
    name: "By Category",
    items: [
      { name: "Passenger Cars", href: "/transport/cars" },
      { name: "Commercial Vehicles", href: "/transport/commercial" },
      { name: "Motorcycles & Scooters", href: "/transport/motorcycles" },
      { name: "Leisure & Caravans", href: "/transport/leisure" },
    ],
  },
  {
    id: "body-type",
    name: "By Body Type",
    items: [
      { name: "SUVs & Crossovers", href: "/transport/cars?body=suv" },
      { name: "Bakkies & Pickups", href: "/transport/cars?body=bakkie" },
      { name: "Hatchbacks", href: "/transport/cars?body=hatchback" },
      { name: "Sedans", href: "/transport/cars?body=sedan" },
    ],
  },
];

export const TRANSPORT_MATCH_BANNER = {
  title: "Can't find the one?",
  subtitle:
    "Stop the endless scrolling. Submit your budget and must-haves, and let FindMyMatch query our entire dealer network to find your perfect car.",
  ctaText: "Activate Now",
  href: "https://www.findmy.co.za/transport/match#adscr",
  image: "/transport-home/match.png",
};

export const TRANSPORT_ARTICLES: GuideArticle[] = [
  {
    id: "fuel-efficient",
    title: "Top 10 Most Fuel-Efficient Cars for South African Drivers in 2024",
    href: "https://blog.findmy.co.za/top-10-most-fuel-efficient-cars-for-south-african-drivers-in-2024/",
    image: "/transport-home/fuel-efficient.png",
  },
  {
    id: "sustainable-transport",
    title: "Sustainable Transport and Logistics: What Companies Need to Know",
    href: "https://blog.findmy.co.za/sustainable-transport-and-logistics-what-companies-need-to-know/",
    image: "/transport-home/sustainable.png",
  },
  {
    id: "family-cars",
    title: "The Best Family Cars for South African Roads",
    href: "https://blog.findmy.co.za/the-best-family-cars-for-south-african-roads/",
    image: "/transport-home/family-cars.png",
  },
];

export const TRANSPORT_SERVICES: CrossServiceLink[] = [
  {
    id: "mechanics",
    title: "Find Mechanics",
    href: "/services",
    image: "/transport-home/mechanics.png",
  },
  {
    id: "battery",
    title: "Find Battery Centres",
    href: "/services",
    image: "/transport-home/battery.png",
  },
  {
    id: "tyre",
    title: "Find Tyre Fitment",
    href: "/services",
    image: "/transport-home/tyre.png",
  },
  {
    id: "glass",
    title: "Find Glass Fitment",
    href: "/services",
    image: "/transport-home/glass-service.png",
  },
  {
    id: "insurance",
    title: "Find Insurance",
    href: "/services/legal-financial-services",
    image: "/transport-home/insurance.png",
  },
];

export const TRANSPORT_OWNER_CTA: BusinessOwnerCTA = {
  title: "Stock Your Virtual Showroom",
  subtitle:
    "Connect your inventory with a massive, engaged audience of active car shoppers. Streamlined dealer tools and qualified buyer leads.",
  buttonText: "Get Started",
  href: "https://growth.findmy.co.za?package=automotive#pricing",
};

export const TRANSPORT_CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What is FindMy Transport?",
    answer:
      "FindMy Transport is South Africa's modern automotive discovery platform, connecting vehicle buyers with verified dealerships, private sellers, and transport service providers nationwide.",
  },
  {
    question: "How do I book a test drive?",
    answer:
      "When viewing any vehicle listing, click 'Book a Test Drive' to select your preferred date, dealership location, and time slot directly through the platform.",
  },
  {
    question: "Can I apply for vehicle finance through FindMy?",
    answer:
      "Yes. Qualified vehicle listings include direct pre-approval finance tools in partnership with leading South African automotive financial providers.",
  },
  {
    question: "Are dealership vehicles verified?",
    answer:
      "All dealership accounts undergo verification, and vehicle listings include mileage disclosures, full specification details, and transparent dealer contact credentials.",
  },
];

export const TRANSPORT_BUSINESS_FAQS: FaqItem[] = [
  {
    question: "How do dealerships list on FindMy Transport?",
    answer:
      "Dealerships can integrate via automated DMS inventory feeds (such as AutoTrader, Cars.co.za feeds, or custom APIs) or manage stock directly through the FindMy Growth dashboard.",
  },
  {
    question: "What benefits does FindMy offer automotive dealers?",
    answer:
      "Dealerships enjoy prominent placement, direct test-drive bookings, automated finance leads, social audience amplification, and performance analytics.",
  },
  {
    question: "Can motorcycle and commercial dealers join?",
    answer:
      "Yes. FindMy Transport features dedicated sections for commercial bakkies, trucks, trailers, motorbikes, quad bikes, and leisure vehicles.",
  },
  {
    question: "How are buyer enquiries delivered to dealers?",
    answer:
      "Enquiries are instantly routed to your designated sales team via email, WhatsApp, and CRM webhook notifications for immediate customer follow-up.",
  },
];
