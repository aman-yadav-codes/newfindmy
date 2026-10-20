export interface ListingItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: "Bush Camp" | "Tented Stay" | "Luxury Tented Camp" | "Safari Camp" | "Bush Lodge";
  badges: string[];
  location: string;
  region: "Limpopo" | "Mpumalanga" | "Western Cape" | "KwaZulu-Natal" | "North West";
  description: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  currency: string;
  image: string;
  amenities: string[];
  features: string[];
  featured?: boolean;
}

export interface ListingFilterState {
  searchQuery: string;
  location: string;
  radius: string;
  category: string;
  types: string[];
  amenity: string;
  feature: string;
  minPrice: string;
  maxPrice: string;
  minRating: number | null; // null for All, 4, 4.5, 5
}
