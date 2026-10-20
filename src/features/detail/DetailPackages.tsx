import Image from "next/image";
import Link from "next/link";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";
import type { ListingPackage } from "./types";

interface DetailPackagesProps {
  packages: ListingPackage[];
  listingName: string;
}

export function DetailPackages({ packages, listingName }: DetailPackagesProps) {
  return (
    <section aria-labelledby="packages-heading" className="w-full space-y-4">
      {/* ───────────────── Heading & View All Link ───────────────── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="h-5 w-1 rounded-full bg-orange-500" aria-hidden="true" />
          <h2
            id="packages-heading"
            className="text-base sm:text-lg font-bold text-white tracking-tight"
          >
            Holiday Rentals &amp; Packages by {listingName}
          </h2>
        </div>

        <Link
          href="#packages"
          className="hidden sm:flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          <span>View all packages</span>
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      {/* ───────────────── 4-Card Responsive Grid (1 in a row on mobile) ───────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {packages.map((pkg) => (
          <article
            key={pkg.id}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#091b2c]/80 backdrop-blur-md transition-all hover:border-white/20 hover:-translate-y-0.5 shadow-lg"
          >
            {/* Package Thumbnail */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Room Badge */}
              <span className="absolute left-2.5 top-2.5 rounded-full border border-amber-400/40 bg-black/60 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 backdrop-blur-md">
                {pkg.badge}
              </span>
            </div>

            {/* Package Body */}
            <div className="flex flex-1 flex-col p-3.5 sm:p-4">
              <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors truncate">
                {pkg.name}
              </h3>

              <div className="mt-1 flex items-center gap-1 text-xs text-slate-300">
                <MapPin className="h-3 w-3 text-sky-400 shrink-0" aria-hidden="true" />
                <span className="truncate">{pkg.location}</span>
              </div>

              {/* Price & View Details Footer */}
              <div className="mt-3 pt-3 flex items-center justify-between border-t border-white/10">
                <div>
                  <span className="text-xs font-bold text-emerald-400">
                    From {pkg.currency}{pkg.pricePerNight.toLocaleString()}
                  </span>
                </div>

                <span className="flex items-center gap-0.5 text-[11px] font-semibold text-slate-300 group-hover:text-orange-400 transition-colors">
                  <span>View Details</span>
                  <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
