"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin, Star, Heart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ListingItem } from "./types";

interface ListingCardProps {
  listing: ListingItem;
  priority?: boolean;
}

export function ListingCard({ listing, priority = false }: ListingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <article
      aria-labelledby={`listing-title-${listing.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1c2e]/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/60"
    >
      {/* ───────────────── Image Header ───────────────── */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <Image
          src={listing.image}
          alt={listing.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Subtle vignette gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1c2e] via-transparent to-black/30" />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorited((prev) => !prev);
          }}
          aria-label={
            isFavorited
              ? `Remove ${listing.name} from favorites`
              : `Save ${listing.name} to favorites`
          }
          aria-pressed={isFavorited}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              isFavorited
                ? "fill-red-500 text-red-500"
                : "text-white/90 group-hover:text-white"
            )}
          />
        </button>
      </div>

      {/* ───────────────── Card Content Body ───────────────── */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Category Badges */}
        <div className="mb-2.5 flex flex-wrap items-center gap-1.5" aria-label="Tags">
          {listing.badges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Listing Title */}
        <h3
          id={`listing-title-${listing.id}`}
          className="text-base sm:text-lg font-bold text-white transition-colors group-hover:text-orange-400"
        >
          <Link
            href="/detail"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
          >
            {listing.name}
          </Link>
        </h3>

        {/* Location with Pin */}
        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-300">
          <MapPin className="h-3.5 w-3.5 text-orange-400 shrink-0" aria-hidden="true" />
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Short Description */}
        <p className="mt-2 text-xs leading-relaxed text-slate-300 line-clamp-2">
          {listing.description}
        </p>

        {/* ───────────────── Card Footer ───────────────── */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1 text-xs shrink-0">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 shrink-0" aria-hidden="true" />
            <span className="font-bold text-white">{listing.rating.toFixed(1)}</span>
            <span className="text-slate-400">({listing.reviewsCount} reviews)</span>
          </div>

          {/* Pricing with Emerald Accent */}
          <Link
            href="/detail"
            className="flex items-center gap-1 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors shrink-0"
          >
            <span>
              From {listing.currency} {listing.pricePerNight.toLocaleString()}
            </span>
            <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
