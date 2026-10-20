export interface BenefitItem {
  title: string;
  description: string;
  image?: string;
  iconName?: string;
}

export interface DiscoveryCategory {
  id: string;
  name: string;
  href: string;
  image: string;
  count?: string;
  description?: string;
}

export interface GuideArticle {
  id: string;
  title: string;
  href: string;
  image: string;
}

export interface CrossServiceLink {
  id: string;
  title: string;
  href: string;
  image: string;
}

export interface BusinessOwnerCTA {
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface QuickFilterChip {
  label: string;
  href: string;
  icon?: "calendar" | "map-pin" | "sparkles" | "building" | "wrench" | "car" | "compass" | "tag";
}
