"use client";

import Link from "next/link";
import { ChevronRight, MapPin } from "lucide-react";
import type { ListingDetailData } from "./types";

interface DetailHeaderSubProps {
  data: ListingDetailData;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function DetailBreadcrumbs({ data }: DetailHeaderSubProps) {
  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-slate-400">
        <li>
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3 text-slate-500" />
        </li>
        <li>
          <Link href="/travel" className="hover:text-white transition-colors">
            Travel
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3 text-slate-500" />
        </li>
        <li>
          <Link href="/listing" className="hover:text-white transition-colors">
            {data.category}
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3 text-slate-500" />
        </li>
        <li>
          <span className="text-slate-300">{data.locationName}</span>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3 text-slate-500" />
        </li>
        <li>
          <span className="text-slate-300">{data.country}</span>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="h-3 w-3 text-slate-500" />
        </li>
        <li aria-current="page" className="font-semibold text-white truncate max-w-[200px] sm:max-w-none">
          {data.name}
        </li>
      </ol>
    </nav>
  );
}

export function DetailTitleBlock({ data }: DetailHeaderSubProps) {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
          {data.name}
        </h1>
        <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300 shadow-sm backdrop-blur-md">
          {data.category}
        </span>
      </div>

      {/* Address with Pin */}
      <div className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-300">
        <MapPin className="h-4 w-4 text-sky-400 shrink-0" aria-hidden="true" />
        <span className="truncate">{data.address}</span>
      </div>
    </div>
  );
}

export function DetailHeader({ data }: DetailHeaderSubProps) {
  return (
    <div className="w-full space-y-3.5">
      <DetailBreadcrumbs data={data} />
      <DetailTitleBlock data={data} />
    </div>
  );
}
