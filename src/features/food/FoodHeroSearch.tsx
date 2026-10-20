"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Sparkles,
  MapPin,
  UtensilsCrossed,
  Users,
  ChevronDown,
} from "lucide-react";

const GUEST_OPTIONS = [
  { label: "1 person", value: "1" },
  { label: "2 people", value: "2" },
  { label: "3 people", value: "3" },
  { label: "4 people", value: "4" },
  { label: "5+ people", value: "5+" },
];

const DIETARY_OPTIONS = [
  { label: "Halaal", value: "halaal" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-Free", value: "gluten-free" },
];

export function FoodHeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState("2 people");
  const [dietaryOpen, setDietaryOpen] = useState(false);
  const [selectedDietary, setSelectedDietary] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/food/all?search=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/food/all");
    }
  };

  const handleGuestSelect = (label: string) => {
    setSelectedGuests(label);
    setGuestsOpen(false);
    router.push(`/food/all?guests=${encodeURIComponent(label)}`);
  };

  const handleDietarySelect = (diet: string) => {
    setSelectedDietary(diet);
    setDietaryOpen(false);
    router.push(`/food/all?dietary=${encodeURIComponent(diet)}`);
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
            placeholder="What would you like to eat?"
            aria-label="Search food, restaurants, and cuisines"
            className="w-full min-w-0 border-0 bg-transparent px-2 text-xs sm:text-base font-medium text-white placeholder:text-white/70 focus:outline-none focus:ring-0"
          />

          <button
            type="submit"
            aria-label="Search food"
            className="grid shrink-0 cursor-pointer place-items-center rounded-full border border-white/25 bg-slate-950/80 text-white shadow-[0_4px_12px_rgba(0,0,0,0.28)] transition-all hover:bg-slate-900 active:scale-95 size-9 sm:size-11"
          >
            <Search className="size-4 sm:size-5" />
          </button>
        </div>
      </form>

      {/* ───────────────── Quick Action Filter Chips ───────────────── */}
      <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs text-white/80">
        {/* 1. Near Me */}
        <Link
          href="/food/all?filter=near-me"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 hover:bg-white/15 hover:border-white/25 transition text-white/90 font-medium active:scale-95"
        >
          <MapPin className="size-3.5 text-amber-400" />
          <span>Near me</span>
        </Link>

        {/* 2. I'm hungry for... */}
        <Link
          href="/food/all"
          className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 hover:bg-white/15 hover:border-white/25 transition text-white/90 font-medium active:scale-95"
        >
          <UtensilsCrossed className="size-3.5 text-amber-400" />
          <span>I&apos;m hungry for...</span>
        </Link>

        {/* 3. Guests Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setGuestsOpen((prev) => !prev);
              setDietaryOpen(false);
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 hover:bg-white/15 hover:border-white/25 transition text-white/90 font-medium cursor-pointer active:scale-95"
          >
            <Users className="size-3.5 text-amber-400" />
            <span>{selectedGuests}</span>
            <ChevronDown className={`size-3 transition-transform ${guestsOpen ? "rotate-180" : ""}`} />
          </button>

          {guestsOpen && (
            <div className="absolute top-full left-0 mt-2 w-36 rounded-2xl border border-white/15 bg-[#081a2e]/95 backdrop-blur-xl p-1.5 shadow-xl z-30 space-y-0.5 animate-in fade-in-0 zoom-in-95 duration-150">
              {GUEST_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleGuestSelect(opt.label)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedGuests === opt.label
                      ? "bg-orange-500/30 text-orange-400 font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 4. Dietary Options Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setDietaryOpen((prev) => !prev);
              setGuestsOpen(false);
            }}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-3 sm:px-3.5 py-1.5 sm:py-2 hover:bg-white/15 hover:border-white/25 transition text-white/90 font-medium cursor-pointer active:scale-95"
          >
            <Sparkles className="size-3.5 text-amber-400" />
            <span>{selectedDietary ? selectedDietary : "Dietary options"}</span>
            <ChevronDown className={`size-3 transition-transform ${dietaryOpen ? "rotate-180" : ""}`} />
          </button>

          {dietaryOpen && (
            <div className="absolute top-full left-0 mt-2 w-40 rounded-2xl border border-white/15 bg-[#081a2e]/95 backdrop-blur-xl p-1.5 shadow-xl z-30 space-y-0.5 animate-in fade-in-0 zoom-in-95 duration-150">
              {DIETARY_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleDietarySelect(opt.label)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedDietary === opt.label
                      ? "bg-orange-500/30 text-orange-400 font-bold"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
