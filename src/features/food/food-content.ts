export interface CravingCategory {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export interface CuisineHighlight {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface FoodieArticle {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const AWARDS_DATA = {
  badgeImage: "/food-home/awards-badge.jpg",
  badgeAlt: "Best 100 Restaurants South Africa 2025",
  tag: "AWARDS",
  title: "The 2025 Winners Revealed",
  description: "Celebrating South Africa's top 100 restaurants, as voted by diners.",
  href: "https://www.findmy.co.za/food/awards",
  ctaText: "View 2025 Winners",
};

export const HOW_IT_WORKS_FOOD = [
  {
    iconName: "Search",
    title: "Smarter search",
    description: "Find exactly what you're in the mood for.",
  },
  {
    iconName: "SlidersHorizontal",
    title: "Better filters",
    description: "Cuisine, vibe, dietary needs and more.",
  },
  {
    iconName: "FileText",
    title: "Deeper details",
    description: "Menus, facilities, FAQs and real reviews.",
  },
  {
    iconName: "Zap",
    title: "Instant access",
    description: "Book, call or get directions in one click.",
  },
];

export const CRAVING_CATEGORIES: CravingCategory[] = [
  { id: "burgers", name: "Burgers", icon: "🍔", href: "/food/all?search=burgers" },
  { id: "pizza", name: "Pizza", icon: "🍕", href: "/food/all?search=pizza" },
  { id: "pasta", name: "Pasta", icon: "🍝", href: "/food/all?search=pasta" },
  { id: "sushi", name: "Sushi", icon: "🍣", href: "/food/all?search=sushi" },
  { id: "breakfast", name: "Breakfast", icon: "☕", href: "/food/all?search=breakfast" },
  { id: "steak", name: "Steak", icon: "🥩", href: "/food/all?search=premium-meat-cuts" },
  { id: "healthy", name: "Healthy", icon: "🥗", href: "/food/all?search=healthy" },
  { id: "bars", name: "Bars", icon: "🍸", href: "/food/all?search=bars" },
  { id: "desserts", name: "Desserts", icon: "🍰", href: "/food/all?search=desserts" },
  { id: "more", name: "More", icon: "•••", href: "/food/all" },
];

export const CUISINE_HIGHLIGHTS: CuisineHighlight[] = [
  {
    id: "italian",
    title: "Italian",
    description: "Pizza, pasta, and Mediterranean favourites",
    image: "/food-home/italian-trending.jpg",
    href: "/food/all?cuisine=italian",
  },
  {
    id: "asian",
    title: "Asian",
    description: "Sushi, Thai, Chinese and more",
    image: "/food-home/asian-trending.jpg",
    href: "/food/all?cuisine=asian",
  },
  {
    id: "seafood",
    title: "Seafood",
    description: "Fresh ocean to plate",
    image: "/food-home/seafood-trending.jpg",
    href: "/food/all?cuisine=seafood",
  },
];

export const FOODIE_ARTICLES: FoodieArticle[] = [
  {
    id: "jozi-steak",
    title: "Jozi's Best Premium Cuts: The Top 5 Steak Spots in Johannesburg",
    image: "/food-home/jozi.png",
    href: "https://blog.findmy.co.za/jozis-best-premium-cuts-the-top-5-steak-spots-in-johannesburg/",
  },
  {
    id: "cape-town-buffets",
    title: "All You Can Eat by the Sea: Cape Town's Must-Visit Buffets",
    image: "/food-home/buffet.png",
    href: "https://blog.findmy.co.za/all-you-can-eat-by-the-sea-cape-towns-must-visit-buffets/",
  },
  {
    id: "gqeberha-story",
    title: "Tables With A Story: Gqeberha's Most Unique Restaurants",
    image: "/food-home/story.png",
    href: "https://blog.findmy.co.za/tables-with-a-story-gqeberhas-most-unique-restaurants/",
  },
];

export const RESTAURANT_OWNER_CTA = {
  title: "Own a Restaurant?",
  subtitle: "Connect with thousands of local diners looking for exactly what you serve. No noise, just bookings.",
  buttonText: "Get Started",
  href: "https://growth.findmy.co.za?package=food#pricing",
};

export const CONSUMER_FAQS: FaqItem[] = [
  {
    question: "What is FindMy Food?",
    answer:
      "FindMy Food is South Africa's destination for discovering and booking the best restaurants in town. Browse eateries by cuisine, location and rating, explore menus and photos, and reserve your table, all in one place. It makes dining out effortless, whether it's a quick coffee or a special occasion.",
  },
  {
    question: "Can I book a table through FindMy Food?",
    answer:
      "Yes. You can request a booking directly from a restaurant's listing, and the restaurant will contact you to confirm your reservation. You can even share the booking confirmation with your guests by email, so everyone knows where and when to meet.",
  },
  {
    question: "How do I find the right restaurant for me?",
    answer:
      "Browse by cuisine type, from South African and Asian to fine dining and casual spots, then filter by location and sort by rating. Each listing includes an overview, menus, photos and contact details, so you can compare options properly before deciding where to eat.",
  },
  {
    question: "Can I see menus and specials before I visit?",
    answer:
      "Yes. Restaurant listings on FindMy Food include full menus, and many feature current specials and deals, from tasting menus to weekday promotions. Checking the menu and offers beforehand means no surprises when you arrive, just a table waiting for you.",
  },
];

export const BUSINESS_FAQS: FaqItem[] = [
  {
    question: "How do I list my restaurant on FindMy Food?",
    answer:
      "Register your restaurant on FindMy and build your profile with an overview, menus, photos and contact details. Once verified, your listing goes live and becomes discoverable by diners searching by cuisine, location and rating in your area.",
  },
  {
    question: "Can customers book tables through my listing?",
    answer:
      "Yes. Diners can request a table directly from your FindMy Food listing, and the booking request comes straight to you to confirm. You stay in control of your reservations while FindMy brings the customers to your door.",
  },
  {
    question: "How does FindMy Food help me fill more tables?",
    answer:
      "Your restaurant appears in front of diners actively deciding where to eat, searchable by cuisine and location. Strong reviews and ratings push you up the results, and FindMy's growth tools for review automation and local search visibility help turn browsers into bookings.",
  },
  {
    question: "Can I promote specials and events on my listing?",
    answer:
      "Yes. Alongside your menu, you can showcase specials, deals and promotions to give diners an extra reason to choose you. Whether it's a tasting menu, a lunch deal or a weekly offer, your listing works as an always-on marketing channel.",
  },
];
