import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, MapPin } from "lucide-react";
import type { RelatedListing } from "./types";

interface DetailRelatedListingsProps {
  listings: RelatedListing[];
  title?: string;
}

export function DetailRelatedListings({
  listings,
  title = "Related Glamping / Luxury Tented Camps",
}: DetailRelatedListingsProps) {
  if (!listings || listings.length === 0) return null;

  return (
    <section
      aria-label={title}
      className="w-full rounded-2xl border border-white/10 bg-[#081a2c]/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-4 sm:space-y-5"
    >
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-4 w-4 text-orange-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {title}
          </h2>
        </div>
        <Link
          href="/listing"
          className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          <span>View all</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* 4 Cards in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4">
        {listings.map((item) => (
          <Link
            key={item.id}
            href={`/detail?id=${item.id}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 hover:shadow-xl cursor-pointer"
          >
            {/* Card Image with Rating Pill */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Star Rating Badge on Card */}
              {item.rating && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[11px] font-bold text-white backdrop-blur-md shadow-md">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Card Details */}
            <div className="p-3.5 flex flex-col justify-between flex-1 gap-1.5">
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                  {item.name}
                </h3>
                {item.location && (
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400 line-clamp-1">
                    <MapPin className="h-3 w-3 text-slate-500 shrink-0" />
                    <span>{item.location}</span>
                  </p>
                )}
              </div>

              <div className="pt-1 flex items-baseline justify-between border-t border-white/5 mt-1">
                <p className="text-xs font-semibold text-emerald-400">
                  From {item.currency} {item.pricePerNight.toLocaleString()}{" "}
                  <span className="text-[10px] text-slate-400 font-normal">/ Night</span>
                </p>
                {item.reviewsCount && (
                  <span className="text-[10px] text-slate-400">
                    {item.reviewsCount} reviews
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
