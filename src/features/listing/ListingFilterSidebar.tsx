"use client";

import { useState } from "react";
import { Search, RotateCcw, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterDropdown } from "./FilterDropdown";
import {
  LISTING_CATEGORIES,
  LISTING_TYPES,
  LISTING_AMENITIES,
  LISTING_FEATURES,
  LISTING_LOCATIONS,
  LISTING_RADIUS_OPTIONS,
} from "./listing-data";
import type { ListingFilterState } from "./types";

interface ListingFilterSidebarProps {
  filters: ListingFilterState;
  onFilterChange: (updates: Partial<ListingFilterState>) => void;
  onResetFilters: () => void;
  className?: string;
  isMobileDrawer?: boolean;
}

const ratingOptions = [
  { label: "All", value: null },
  { label: "4+", value: 4 },
  { label: "4.5+", value: 4.5 },
  { label: "5.0", value: 5 },
];

export function ListingFilterSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  className,
  isMobileDrawer = false,
}: ListingFilterSidebarProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const allTypesOptions = ["All types", ...LISTING_TYPES];

  const content = (
    <div className="flex flex-col gap-6 text-white">
      {/* ───────────────── Filter Header ───────────────── */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <h2 id="sidebar-filters-heading" className="text-base sm:text-lg font-bold tracking-tight text-white">
          Filters
        </h2>
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer"
        >
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          <span>Clear all</span>
        </button>
      </div>

      {/* ───────────────── 1. Search Keywords ───────────────── */}
      <div className="flex flex-col gap-2">
        <label htmlFor="sidebar-keyword-input" className="text-xs font-semibold text-slate-300">
          Search keywords
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" aria-hidden="true" />
          <input
            id="sidebar-keyword-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search camps, locations..."
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-3 text-xs sm:text-sm text-white placeholder-slate-400 transition-colors focus:border-orange-500/80 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* ───────────────── Location (Mobile Drawer) ───────────────── */}
      {isMobileDrawer && (
        <FilterDropdown
          id="filter-drawer-location"
          label="Location"
          value={filters.location || "All locations"}
          options={LISTING_LOCATIONS}
          isOpen={activeDropdown === "location"}
          onToggle={() => toggleDropdown("location")}
          onClose={closeDropdown}
          onChange={(val) =>
            onFilterChange({ location: val === "All locations" ? "" : val })
          }
        />
      )}

      {/* ───────────────── Radius (Mobile Drawer) ───────────────── */}
      {isMobileDrawer && (
        <FilterDropdown
          id="filter-drawer-radius"
          label="Radius distance"
          value={filters.radius || "Radius 50 km"}
          options={LISTING_RADIUS_OPTIONS}
          isOpen={activeDropdown === "radius"}
          onToggle={() => toggleDropdown("radius")}
          onClose={closeDropdown}
          onChange={(val) => onFilterChange({ radius: val })}
        />
      )}

      {/* ───────────────── Rating (Mobile Drawer) ───────────────── */}
      {isMobileDrawer && (
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-300">Minimum Rating</label>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Filter by minimum rating">
            {ratingOptions.map((opt) => {
              const isActive = filters.minRating === opt.value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onFilterChange({ minRating: opt.value })}
                  className={cn(
                    "flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold transition-all cursor-pointer",
                    isActive
                      ? "bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-1 ring-orange-400"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <Star
                    className={cn(
                      "h-3 w-3",
                      isActive ? "fill-white text-white" : "text-amber-400 fill-amber-400"
                    )}
                  />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ───────────────── 2. Main Category ───────────────── */}
      <FilterDropdown
        id="filter-category"
        label="Main category"
        value={filters.category || "Bush Camps & Tented Stays"}
        options={LISTING_CATEGORIES}
        isOpen={activeDropdown === "category"}
        onToggle={() => toggleDropdown("category")}
        onClose={closeDropdown}
        onChange={(val) => onFilterChange({ category: val })}
      />

      {/* ───────────────── 3. Type ───────────────── */}
      <FilterDropdown
        id="filter-type"
        label="Type"
        value={filters.types.length > 0 ? filters.types[0] : "All types"}
        options={allTypesOptions}
        isOpen={activeDropdown === "type"}
        onToggle={() => toggleDropdown("type")}
        onClose={closeDropdown}
        onChange={(val) => {
          if (val === "All types") {
            onFilterChange({ types: [] });
          } else {
            onFilterChange({ types: [val] });
          }
        }}
      />

      {/* ───────────────── 4. Amenities ───────────────── */}
      <FilterDropdown
        id="filter-amenities"
        label="Amenities"
        value={filters.amenity || "All amenities"}
        options={LISTING_AMENITIES}
        isOpen={activeDropdown === "amenities"}
        onToggle={() => toggleDropdown("amenities")}
        onClose={closeDropdown}
        onChange={(val) =>
          onFilterChange({ amenity: val === "All amenities" ? "" : val })
        }
      />

      {/* ───────────────── 5. Price per Night ───────────────── */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-slate-300">Price per night</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              R
            </span>
            <input
              type="number"
              min="0"
              step="500"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ minPrice: e.target.value })}
              placeholder="Min price"
              aria-label="Minimum price in ZAR"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-7 pr-2.5 text-xs text-white placeholder-slate-400 focus:border-orange-500/80 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <span className="text-slate-400 text-xs font-bold" aria-hidden="true">
            -
          </span>
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
              R
            </span>
            <input
              type="number"
              min="0"
              step="500"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
              placeholder="Max price"
              aria-label="Maximum price in ZAR"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-7 pr-2.5 text-xs text-white placeholder-slate-400 focus:border-orange-500/80 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* ───────────────── 6. Features ───────────────── */}
      <FilterDropdown
        id="filter-features"
        label="Features"
        value={filters.feature || "All features"}
        options={LISTING_FEATURES}
        isOpen={activeDropdown === "features"}
        onToggle={() => toggleDropdown("features")}
        onClose={closeDropdown}
        preferredPlacement="top"
        onChange={(val) =>
          onFilterChange({ feature: val === "All features" ? "" : val })
        }
      />
    </div>
  );

  if (isMobileDrawer) {
    return <div className="p-4">{content}</div>;
  }

  return (
    <aside
      aria-labelledby="sidebar-filters-heading"
      className={cn(
        "rounded-2xl border border-white/10 bg-[#091829]/80 p-5 backdrop-blur-md shadow-xl shadow-black/30",
        className
      )}
    >
      {content}
    </aside>
  );
}
