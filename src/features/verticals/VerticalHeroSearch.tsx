"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Sparkles,
  MapPin,
  Building2,
  Car,
  Calendar,
  Compass,
  Wrench,
  Tag,
} from "lucide-react";

export interface HeroChip {
  label: string;
  href: string;
  icon?: "map-pin" | "sparkles" | "building" | "car" | "calendar" | "compass" | "wrench" | "tag";
}

interface VerticalHeroSearchProps {
  placeholder: string;
  searchRoute: string;
  ariaLabel: string;
  chips?: HeroChip[];
}

export function VerticalHeroSearch({
  placeholder,
  searchRoute,
  ariaLabel,
  chips = [],
}: VerticalHeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    const separator = searchRoute.includes("?") ? "&" : "?";
    if (trimmed) {
      router.push(`${searchRoute}${separator}search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(searchRoute);
    }
  };

  const renderIcon = (iconName?: string) => {
    switch (iconName) {
      case "map-pin":
        return <MapPin className="size-3.5 text-amber-400" />;
      case "building":
        return <Building2 className="size-3.5 text-amber-400" />;
      case "car":
        return <Car className="size-3.5 text-amber-400" />;
      case "calendar":
        return <Calendar className="size-3.5 text-amber-400" />;
      case "compass":
        return <Compass className="size-3.5 text-amber-400" />;
      case "wrench":
        return <Wrench className="size-3.5 text-amber-400" />;
      case "tag":
        return <Tag className="size-3.5 text-amber-400" />;
      default:
        return <Sparkles className="size-3.5 text-amber-400" />;
    }
  };

  return (
    <div className="relative w-full mt-7 sm:mt-8 max-w-3xl">
      {/* ───────────────── Primary Rounded Search Field ───────────────── */}
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="flex w-full items-center gap-2 rounded-full border border-white/30 bg-white/[0.18] shadow-[0_8px_24px_rgba(0,0,0,0.22),inset_0_1px_1px_rgba(255,255,255,0.3)] transition-colors focus-within:border-white/60 focus-within:bg-white/[0.22] p-1.5 sm:p-2.5">
          <div className="grid shrink-0 place-items-center rounded-full text-amber-300 size-8 sm:size-9 pl-1.5 sm:pl-2">
            <Sparkles className="size-4 sm:size-5" />
          </div>

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            aria-label={ariaLabel}
            className="w-full min-w-0 border-0 bg-transparent px-2 text-xs sm:text-base font-medium text-white placeholder:text-white/70 focus:outline-none focus:ring-0"
          />

          <button
            type="submit"
            aria-label={ariaLabel}
            className="grid shrink-0 cursor-pointer place-items-center rounded-full border border-white/25 bg-slate-950/80 text-white shadow-[0_4px_12px_rgba(0,0,0,0.28)] transition-all hover:bg-slate-900 active:scale-95 size-9 sm:size-11"
          >
            <Search className="size-4 sm:size-5" />
          </button>
        </div>
      </form>

      {/* ───────────────── Quick Action Filter Chips ───────────────── */}
      {chips.length > 0 && (
        <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-white/80">
          {chips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 hover:bg-white/15 hover:border-white/25 transition text-white/90 font-medium active:scale-95"
            >
              {renderIcon(chip.icon)}
              <span>{chip.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
