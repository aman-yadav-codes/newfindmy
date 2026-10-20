import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ListingHeroProps {
  categoryName?: string;
  count?: number;
}

export function ListingHero({
  categoryName = "Bush Camps & Tented Stays",
}: ListingHeroProps) {
  return (
    <section
      aria-labelledby="listing-hero-heading"
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#071523]"
    >
      {/* Background Hero Image with Soft Mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 select-none overflow-hidden"
      >
        <Image
          src="/images/dashboard/bush-camps.jpg"
          alt="Bush Camps and Tented Stays in South Africa"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right-top opacity-55 lg:opacity-75"
        />
        {/* Multistage gradient for legibility and visual parity with design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071523] via-[#071523]/85 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071523] via-[#071523]/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* ───────────────── Accessible Breadcrumb ───────────────── */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </li>
            <li>
              <Link
                href="/travel"
                className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded"
              >
                Travel
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            </li>
            <li
              aria-current="page"
              className="font-medium text-white truncate max-w-[220px] sm:max-w-none"
            >
              {categoryName}
            </li>
          </ol>
        </nav>

        {/* ───────────────── Hero Title & Subtitle ───────────────── */}
        <div className="max-w-2xl">
          <h1
            id="listing-hero-heading"
            className="text-2xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Best {categoryName}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-200/90 leading-relaxed font-normal">
            Explore amazing bush camps and tented stays across South Africa
          </p>
        </div>
      </div>
    </section>
  );
}
