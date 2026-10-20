import {
  Utensils,
  Wrench,
  Ticket,
  Car,
  Building2,
  Compass,
  type LucideIcon,
} from "lucide-react"

export interface SubCategory {
  title: string
  subtitle: string
  href: string
}

export interface NavCategory {
  name: string
  subItems: SubCategory[]
}

export interface AddListingOption {
  title: string
  subtitle: string
  icon: LucideIcon
  href: string
}

export const findMyNavCategories: NavCategory[] = [
  {
    name: "Food",
    subItems: [
      { title: "Restaurants & Dining", subtitle: "Fine dining, bistros, casual eateries", href: "/food" },
      { title: "Cafes & Bakeries", subtitle: "Artisan coffee, pastries & brunches", href: "/food" },
      { title: "Bars & Nightlife", subtitle: "Cocktail bars, pubs & rooftop lounges", href: "/food" },
      { title: "Fast Food & Street Eats", subtitle: "Quick bites, food trucks & takeaway", href: "/food" },
    ],
  },
  {
    name: "Travel",
    subItems: [
      { title: "Hotels & Resorts", subtitle: "Luxury suites & boutique stays", href: "/travel" },
      { title: "Vacation Rentals", subtitle: "Beachfront villas, cabins & flats", href: "/travel" },
      { title: "Tour Packages", subtitle: "Curated experiences & guided adventures", href: "/travel" },
      { title: "Flights & Transit", subtitle: "Airport transfers & express shuttles", href: "/travel" },
    ],
  },
  {
    name: "Services",
    subItems: [
      { title: "Home Repairs", subtitle: "Plumbing, electrical & HVAC experts", href: "/services" },
      { title: "Cleaning & Housekeeping", subtitle: "Home, office & deep steam cleaning", href: "/services" },
      { title: "Health & Wellness", subtitle: "Spas, personal fitness & massage", href: "/services" },
      { title: "Professional Services", subtitle: "Legal, tax, design & consulting", href: "/services" },
    ],
  },
  {
    name: "Property",
    subItems: [
      { title: "Apartments for Rent", subtitle: "Modern studios, lofts & penthouses", href: "/property" },
      { title: "Houses for Sale", subtitle: "Family estates, townhomes & villas", href: "/property" },
      { title: "Commercial Spaces", subtitle: "Offices, retail stores & warehouses", href: "/property" },
      { title: "Shared Living & Rooms", subtitle: "Student & co-living flatshares", href: "/property" },
    ],
  },
  {
    name: "Events",
    subItems: [
      { title: "Concerts & Live Music", subtitle: "Festivals, bands & acoustic sets", href: "/entertainment" },
      { title: "Workshops & Classes", subtitle: "Cooking, coding, pottery & art", href: "/entertainment" },
      { title: "Conferences & Summits", subtitle: "Industry keynotes & networking", href: "/entertainment" },
      { title: "Sports & Tournaments", subtitle: "Local marathons, matches & cups", href: "/entertainment" },
    ],
  },
  {
    name: "Cars",
    subItems: [
      { title: "New & Used Cars", subtitle: "Verified dealerships & private sales", href: "/transport" },
      { title: "Vehicle Rentals", subtitle: "Daily car hire & weekend getaways", href: "/transport" },
      { title: "Motorcycles & Scooters", subtitle: "Cruisers, dirt bikes & city mopeds", href: "/transport" },
      { title: "Electric Vehicles (EV)", subtitle: "Charging stations & EV specialists", href: "/transport" },
    ],
  },
]

export const addListingOptions: AddListingOption[] = [
  {
    title: "Add a restaurant",
    subtitle: "Food, cafes, bakeries",
    icon: Utensils,
    href: "#add-restaurant",
  },
  {
    title: "Add a service",
    subtitle: "Repairs, trades, local help",
    icon: Wrench,
    href: "#add-service",
  },
  {
    title: "Add an event",
    subtitle: "Tickets, meetups, experiences",
    icon: Ticket,
    href: "#add-event",
  },
  {
    title: "Add vehicles",
    subtitle: "Cars, bikes, transport",
    icon: Car,
    href: "#add-vehicle",
  },
  {
    title: "Add an agency",
    subtitle: "Property agencies and listings",
    icon: Building2,
    href: "#add-agency",
  },
  {
    title: "Add tour and packages",
    subtitle: "Destinations, itineraries, guides",
    icon: Compass,
    href: "#add-tour",
  },
]
