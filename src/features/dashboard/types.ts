export type CategoryIconType = "tent" | "paw" | "home" | "hotel" | "gem";

export interface TaxonomySubtype {
  id: string;
  name: string;
  slug: string;
  image: string;
  icon: CategoryIconType;
  status: "active" | "inactive";
}

export interface TaxonomyCategory {
  id: string;
  name: string;
  slug: string;
  icon: CategoryIconType;
  image: string;
  subtypesCount: number;
  status: "active" | "inactive";
  subtypes: TaxonomySubtype[];
}

export interface TaxonomyFeatureItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  count: number;
  status: "active" | "inactive";
}

export interface TaxonomyRoomTypeItem {
  id: string;
  name: string;
  slug: string;
  capacity: string;
  status: "active" | "inactive";
}

export interface TaxonomyRoomCategoryItem {
  id: string;
  name: string;
  slug: string;
  tier: string;
  status: "active" | "inactive";
}

export interface TaxonomyAmenityItem {
  id: string;
  name: string;
  slug: string;
  group: string;
  status: "active" | "inactive";
}

export interface DashboardStats {
  categories: number;
  subtypes: number;
  businessFeatures: number;
  roomAttributes: number;
}
