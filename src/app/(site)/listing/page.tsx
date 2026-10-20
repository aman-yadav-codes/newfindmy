import type { Metadata } from "next";
import { ListingHero } from "@/features/listing/ListingHero";
import { ListingClient } from "@/features/listing/ListingClient";
import { INITIAL_LISTINGS } from "@/features/listing/listing-data";

export const metadata: Metadata = {
  title: "Best Bush Camps & Tented Stays in South Africa | FindMy Travel",
  description:
    "Explore amazing bush camps, luxury tented stays, safari lodges and wilderness escapes across South Africa with FindMy Travel. Check availability and direct rates.",
  keywords: [
    "bush camps south africa",
    "tented stays",
    "luxury safari tents",
    "glamping south africa",
    "hoedspruit bush camp",
    "kruger tented lodge",
    "sabi sand camps",
    "sanbona tented camp",
  ],
  alternates: {
    canonical: "/listing",
  },
  openGraph: {
    title: "Best Bush Camps & Tented Stays in South Africa | FindMy",
    description:
      "Explore amazing bush camps, luxury tented stays, safari lodges and wilderness escapes across South Africa.",
    url: "/listing",
    siteName: "FindMy Travel",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/dashboard/bush-camps.jpg",
        width: 1200,
        height: 630,
        alt: "Best Bush Camps & Tented Stays in South Africa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Bush Camps & Tented Stays | FindMy Travel",
    description:
      "Explore amazing bush camps and tented stays across South Africa with FindMy Travel.",
    images: ["/images/dashboard/bush-camps.jpg"],
  },
};

export default function ListingPage() {
  // Breadcrumb List Schema
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://newfindmy.local/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Travel",
        item: "https://newfindmy.local/travel",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Bush Camps & Tented Stays",
        item: "https://newfindmy.local/listing",
      },
    ],
  };

  // Accommodation Item List Schema
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Best Bush Camps & Tented Stays in South Africa",
    description: "Curated collection of authentic luxury bush camps and wilderness tented accommodations.",
    numberOfItems: INITIAL_LISTINGS.length,
    itemListElement: INITIAL_LISTINGS.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "LodgingBusiness",
        name: item.name,
        description: item.description,
        image: `https://newfindmy.local${item.image}`,
        url: `https://newfindmy.local/travel/${item.slug}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: item.location,
          addressCountry: "ZA",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: item.rating,
          reviewCount: item.reviewsCount,
          bestRating: 5,
          worstRating: 1,
        },
        priceRange: `R ${item.pricePerNight.toLocaleString()}`,
      },
    })),
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent text-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* ───────────────── 1. Panoramic Hero & Breadcrumbs ───────────────── */}
      <ListingHero categoryName="Bush Camps & Tented Stays" />

      {/* ───────────────── 2. Search Toolbar, Cards Grid & Filter Sidebar ───────────────── */}
      <ListingClient initialListings={INITIAL_LISTINGS} />
    </div>
  );
}
