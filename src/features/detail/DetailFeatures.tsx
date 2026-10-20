import {
  Briefcase,
  Bath,
  ShowerHead,
  Refrigerator,
  Armchair,
  Waves,
  Wine,
  Shirt,
  Wifi,
} from "lucide-react";
import type { ListingAmenity } from "./types";

interface DetailFeaturesProps {
  features: ListingAmenity[];
}

export function DetailFeatures({ features }: DetailFeaturesProps) {
  const getFeatureIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes("en-suite") || lower.includes("bath")) {
      return <Bath className="h-4 w-4 text-sky-400" aria-hidden="true" />;
    }
    if (lower.includes("shower")) {
      return <ShowerHead className="h-4 w-4 text-sky-400" aria-hidden="true" />;
    }
    if (lower.includes("fridge")) {
      return <Refrigerator className="h-4 w-4 text-amber-400" aria-hidden="true" />;
    }
    if (lower.includes("seating") || lower.includes("outdoor")) {
      return <Armchair className="h-4 w-4 text-emerald-400" aria-hidden="true" />;
    }
    if (lower.includes("pool")) {
      return <Waves className="h-4 w-4 text-sky-400" aria-hidden="true" />;
    }
    if (lower.includes("bar") || lower.includes("lounge")) {
      return <Wine className="h-4 w-4 text-purple-400" aria-hidden="true" />;
    }
    if (lower.includes("laundry")) {
      return <Shirt className="h-4 w-4 text-amber-400" aria-hidden="true" />;
    }
    if (lower.includes("wi-fi") || lower.includes("wifi")) {
      return <Wifi className="h-4 w-4 text-emerald-400" aria-hidden="true" />;
    }
    return <Briefcase className="h-4 w-4 text-orange-400" aria-hidden="true" />;
  };

  return (
    <section aria-labelledby="features-heading" className="w-full space-y-4">
      {/* ───────────────── Section Heading with Briefcase Icon ───────────────── */}
      <div className="flex items-center gap-2">
        <div className="grid size-6 place-items-center rounded-lg bg-orange-500/15 text-orange-400">
          <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
        </div>
        <h2 id="features-heading" className="text-base sm:text-lg font-bold text-white tracking-tight">
          Rooms &amp; Features
        </h2>
      </div>

      {/* ───────────────── 4x2 Responsive Glass Grid ───────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {features.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-colors hover:border-white/20 hover:bg-white/[0.08]"
          >
            <span className="shrink-0">{getFeatureIcon(item.name)}</span>
            <span className="text-xs sm:text-sm font-medium text-slate-200 truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
