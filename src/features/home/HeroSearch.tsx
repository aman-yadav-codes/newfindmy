"use client";

import { useRef, useState, type FormEvent } from "react";
import { MapPin, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/glass/button";
import { Input } from "@/components/ui/glass/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/glass/select";

const suggestions = [
  { label: "I'm craving Italian", icon: "🍽️" },
  { label: "2 bedroom", icon: "🏨" },
  { label: "Need a plumber", icon: "🔧" },
  { label: "Property for rent", icon: "🏠" },
];

const cities = ["Cape Town", "Johannesburg", "Durban", "Pretoria", "Gqeberha"];

function findCategory(query: string) {
  const value = query.toLowerCase();
  if (/food|eat|restaurant|café|cafe|italian|dining/.test(value)) return "food";
  if (/travel|hotel|stay|trip|holiday/.test(value)) return "travel";
  if (/plumb|repair|service|clean|electric/.test(value)) return "services";
  if (/bedroom|property|rent|house|home|apartment/.test(value)) return "property";
  if (/event|concert|festival|show/.test(value)) return "events";
  if (/car|vehicle|transport|drive/.test(value)) return "cars";
  return "categories";
}

export function HeroSearch() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("Cape Town");
  const [status, setStatus] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const category = findCategory(query.trim());
    const target = document.getElementById(category);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setStatus(category === "categories"
      ? `Explore categories near ${city} below.`
      : `Explore ${category} near ${city} below.`);
  }

  return (
    <div className="mt-7 max-w-[720px]">
      <form role="search" onSubmit={handleSubmit}>
        <div className="relative">
          <Sparkles aria-hidden="true" className="pointer-events-none absolute left-4 sm:left-5 top-1/2 z-10 size-4 sm:size-5 -translate-y-1/2 text-amber-300" />
          <Input
            ref={inputRef}
            id="hero-search"
            name="query"
            type="search"
            variant="glass"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="What are you looking for today?"
            aria-label="Search local categories"
            className="h-14 sm:h-[72px] w-full rounded-full border-white/45 bg-white/20 pl-11 pr-14 sm:pl-14 sm:pr-20 text-xs sm:text-base font-medium text-white shadow-xl placeholder:text-white/80 focus-visible:scale-100 focus-visible:ring-2 focus-visible:ring-amber-300"
          />
          <Button
            type="submit"
            variant="glass"
            effect="none"
            size="icon"
            aria-label="Search"
            className="absolute right-2 sm:right-3 top-1/2 z-10 size-10 sm:size-12 -translate-y-1/2 rounded-full border border-white/20 bg-slate-950/90 text-white shadow-lg hover:bg-slate-900"
          >
            <Search aria-hidden="true" className="size-4 sm:size-5" />
          </Button>
        </div>
      </form>

      <div className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-white">
        <MapPin aria-hidden="true" className="size-3.5 sm:size-4 shrink-0 text-amber-300" />
        <label htmlFor="hero-location" className="shrink-0">Using your location:</label>
        <Select value={city} onValueChange={(val) => setCity(val)}>
          <SelectTrigger
            id="hero-location"
            className="w-auto border border-white/20 bg-white/10 hover:bg-white/15 text-white h-7 px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-bold shadow-none focus:ring-1 focus:ring-amber-300"
          >
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent className="min-w-[150px]">
            {cities.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-white">
        <span className="mr-1 font-semibold text-white/85">Try:</span>
        {suggestions.map((item) => (
          <Button
            key={item.label}
            type="button"
            variant="glass"
            effect="none"
            size="sm"
            onClick={() => {
              setQuery(item.label);
              inputRef.current?.focus();
            }}
            className="h-8 rounded-full border border-white/35 bg-white/15 px-3 text-xs font-medium text-white hover:bg-white/25"
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
      <p aria-live="polite" className="sr-only">{status}</p>
    </div>
  );
}
