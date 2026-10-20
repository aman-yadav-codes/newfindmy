import type { Metadata } from "next";
import { URBAN_GLAMPING_DETAIL } from "@/features/detail/detail-data";
import { DetailClient } from "@/features/detail/DetailClient";

export const metadata: Metadata = {
  title: "Luxury Tents @ Urban Glamping | Best Stays in St Lucia, South Africa - FindMy",
  description:
    "Experience luxury tented stays at Urban Glamping in St Lucia, South Africa. Enjoy private en-suite bathrooms, outdoor pool, bar & lounge, near iSimangaliso Wetland Park.",
  keywords: [
    "Luxury Tents @ Urban Glamping",
    "Urban Glamping St Lucia",
    "Glamping South Africa",
    "Luxury Tented Camp",
    "St Lucia accommodation",
    "iSimangaliso Wetland Park stays",
  ],
  alternates: {
    canonical: "/detail",
  },
  openGraph: {
    title: "Luxury Tents @ Urban Glamping | FindMy Travel",
    description:
      "An unparalleled blend of luxury and adventure in St Lucia, gateway to iSimangaliso Wetland Park. Book direct on FindMy.",
    url: "/detail",
    siteName: "FindMy Travel",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/images/dashboard/subtype-glamping.jpg",
        width: 1200,
        height: 630,
        alt: "Luxury Tents @ Urban Glamping Poolside at Dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Tents @ Urban Glamping - St Lucia",
    description:
      "An unparalleled blend of luxury and adventure in St Lucia, gateway to iSimangaliso Wetland Park.",
    images: ["/images/dashboard/subtype-glamping.jpg"],
  },
};

export default function DetailPage() {
  const listing = URBAN_GLAMPING_DETAIL;

  // Semantic JSON-LD schema for LodgingBusiness and BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://findmy.co.za",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Travel",
            item: "https://findmy.co.za/travel",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: listing.category,
            item: "https://findmy.co.za/listing",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: listing.locationName,
            item: "https://findmy.co.za/travel/st-lucia",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: listing.name,
            item: "https://findmy.co.za/detail",
          },
        ],
      },
      {
        "@type": "LodgingBusiness",
        "@id": "https://findmy.co.za/detail#lodging",
        name: listing.name,
        description: listing.description,
        url: "https://findmy.co.za/detail",
        image: listing.photos.map((p) => `https://findmy.co.za${p.src}`),
        telephone: listing.phone,
        email: listing.email,
        priceRange: "R 1,900 - R 2,800",
        address: {
          "@type": "PostalAddress",
          streetAddress: listing.address,
          addressLocality: listing.city,
          addressRegion: listing.province,
          postalCode: listing.postalCode,
          addressCountry: "ZA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -28.3756,
          longitude: 32.4089,
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: listing.rating,
          reviewCount: listing.reviewsCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-transparent text-white relative">
        <DetailClient data={listing} />
      </div>
    </>
  );
}
