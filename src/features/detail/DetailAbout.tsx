import { Info } from "lucide-react";
import type { ListingDetailData } from "./types";

interface DetailAboutProps {
  data: ListingDetailData;
}

export function DetailAbout({ data }: DetailAboutProps) {
  return (
    <section aria-labelledby="about-listing-heading" className="w-full space-y-4">
      {/* ───────────────── Section Heading with Orange Accent Bar ───────────────── */}
      <div className="flex items-center gap-2.5">
        <span className="h-5 w-1 rounded-full bg-orange-500" aria-hidden="true" />
        <h2
          id="about-listing-heading"
          className="text-base sm:text-lg font-bold text-white tracking-tight"
        >
          About {data.name}
        </h2>
      </div>

      {/* Description Body */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
        {data.description}
      </p>

      {/* ───────────────── Callout Note Banner ───────────────── */}
      <div
        role="note"
        aria-label="Note from FindMy"
        className="flex items-start gap-3 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3 sm:p-3.5 backdrop-blur-md text-slate-200"
      >
        <div className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-full bg-amber-500/20 text-amber-400 mt-0.5">
          <Info className="size-3.5 sm:size-4" aria-hidden="true" />
        </div>
        <p className="text-[11px] sm:text-xs leading-relaxed text-slate-300">
          <strong className="font-semibold text-amber-300">Note from FindMy: </strong>
          {data.findMyNote}
        </p>
      </div>
    </section>
  );
}
