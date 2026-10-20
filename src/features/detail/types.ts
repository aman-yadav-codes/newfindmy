export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ListingAmenity {
  name: string;
  icon: string; // Lucide icon identifier
}

export interface ListingPackage {
  id: string;
  name: string;
  badge: string;
  location: string;
  pricePerNight: number;
  currency: string;
  image: string;
}

export interface ListingReview {
  id: string;
  author: string;
  avatarLetter: string;
  rating: number;
  date: string;
  content: string;
}

export interface RelatedListing {
  id: string;
  name: string;
  pricePerNight: number;
  currency: string;
  image: string;
  location: string;
  rating: number;
  reviewsCount?: number;
}

export interface ListingDetailData {
  id: string;
  slug: string;
  name: string;
  logo?: {
    src: string;
    alt: string;
  };
  category: string;
  categorySlug: string;
  locationName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  rating: number;
  reviewsCount: number;
  pricePerNight: number;
  currency: string;
  priceNote: string;
  phone: string;
  email: string;
  website: string;
  description: string;
  findMyNote: string;
  whyGuestsLove: string;
  photos: GalleryPhoto[];
  features: ListingAmenity[];
  quickAmenities: ListingAmenity[];
  packages: ListingPackage[];
  operatingHours: {
    day: string;
    hours: string;
    isToday?: boolean;
  }[];
  reviews: ListingReview[];
  relatedListings: RelatedListing[];
}
