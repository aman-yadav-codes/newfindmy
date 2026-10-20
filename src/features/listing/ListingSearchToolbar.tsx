"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Compass, ChevronDown, Star, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LISTING_LOCATIONS, LISTING_RADIUS_OPTIONS } from "./listing-data";
import type { ListingFilterState } from "./types";

interface ListingSearchToolbarProps {
  filters: ListingFilterState;
  onFilterChange: (updates: Partial<ListingFilterState>) => void;
  filteredCount: number;
  totalCount: number;
  onOpenMobileFilters?: () => void;
  activeFiltersCount?: number;
}

export function ListingSearchToolbar({
  filters,
  onFilterChange,
  filteredCount,
  totalCount,
  onOpenMobileFilters,
  activeFiltersCount = 0,
}: ListingSearchToolbarProps) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [radiusOpen, setRadiusOpen] = useState(false);

  const locationRef = useRef<HTMLDivElement>(null);
  const radiusRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or escape
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationOpen(false);
      }
      if (radiusRef.current && !radiusRef.current.contains(e.target as Node)) {
        setRadiusOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLocationOpen(false);
        setRadiusOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const ratingOptions = [
    { label: "All", value: null },
    { label: "4+", value: 4 },
    { label: "4.5+", value: 4.5 },
    { label: "5.0", value: 5 },
  ];

  return (
    <div
      role="search"
      aria-label="Filter bush camps and tented stays"
      className="w-full rounded-2xl border border-white/10 bg-[#091829]/85 p-2.5 sm:p-3.5 backdrop-blur-md shadow-xl shadow-black/30"
    >
      {/* ─── Desktop Toolbar Layout (lg and up) ─── */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-3">
        {/* Left Toolbar Inputs */}
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          {/* 1. Keyword Search Input */}
          <div className="relative min-w-[240px] flex-1 xl:min-w-[300px]">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            />
            <input
              id="toolbar-search-input"
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="Search for camps, locations, or experiences..."
              aria-label="Search for camps, locations, or experiences"
              className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-400 transition-colors focus:border-orange-500/80 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
            {filters.searchQuery && (
              <button
                type="button"
                onClick={() => onFilterChange({ searchQuery: "" })}
                aria-label="Clear search text"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* 2. Location Dropdown */}
          <div ref={locationRef} className="relative">
            <button
              type="button"
              id="btn-location-selector"
              onClick={() => {
                setLocationOpen((prev) => !prev);
                setRadiusOpen(false);
              }}
              aria-expanded={locationOpen}
              aria-haspopup="listbox"
              aria-label="Filter by location"
              className={cn(
                "flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                locationOpen
                  ? "border-orange-500/70 bg-white/15 text-white"
                  : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <MapPin className="h-4 w-4 text-orange-400 shrink-0" />
              <span className="truncate max-w-[130px] sm:max-w-[160px]">
                {filters.location || "Choose location"}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                  locationOpen && "rotate-180 text-white"
                )}
              />
            </button>

            {locationOpen && (
              <div
                role="listbox"
                aria-label="Select location"
                className="absolute left-0 top-full mt-2 z-50 max-h-60 overflow-y-auto w-64 rounded-xl border border-white/15 bg-[#0a1c2e]/98 p-1.5 pr-2 shadow-2xl backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-150 glass-scrollbar"
              >
                {LISTING_LOCATIONS.map((loc) => {
                  const isSelected =
                    loc === "All locations" ? !filters.location : filters.location === loc;
                  return (
                    <button
                      key={loc}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onFilterChange({ location: loc === "All locations" ? "" : loc });
                        setLocationOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs sm:text-sm transition-colors cursor-pointer",
                        isSelected
                          ? "bg-orange-500/20 text-orange-400 font-semibold"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span className="truncate">{loc}</span>
                      {isSelected && <span className="text-orange-400 text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 3. Radius Dropdown */}
          <div ref={radiusRef} className="relative">
            <button
              type="button"
              id="btn-radius-selector"
              onClick={() => {
                setRadiusOpen((prev) => !prev);
                setLocationOpen(false);
              }}
              aria-expanded={radiusOpen}
              aria-haspopup="listbox"
              aria-label="Filter by radius"
              className={cn(
                "flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer",
                radiusOpen
                  ? "border-orange-500/70 bg-white/15 text-white"
                  : "bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <Compass className="h-4 w-4 text-orange-400 shrink-0" />
              <span>{filters.radius || "Radius 50 km"}</span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-slate-400 transition-transform duration-200",
                  radiusOpen && "rotate-180 text-white"
                )}
              />
            </button>

            {radiusOpen && (
              <div
                role="listbox"
                aria-label="Select radius"
                className="absolute left-0 top-full mt-2 z-50 max-h-60 overflow-y-auto w-48 rounded-xl border border-white/15 bg-[#0a1c2e]/98 p-1.5 pr-2 shadow-2xl backdrop-blur-2xl animate-in fade-in-0 zoom-in-95 duration-150 glass-scrollbar"
              >
                {LISTING_RADIUS_OPTIONS.map((rad) => {
                  const isSelected = filters.radius === rad;
                  return (
                    <button
                      key={rad}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        onFilterChange({ radius: rad });
                        setRadiusOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs sm:text-sm transition-colors cursor-pointer",
                        isSelected
                          ? "bg-orange-500/20 text-orange-400 font-semibold"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <span>{rad}</span>
                      {isSelected && <span className="text-orange-400 text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. Rating Filter Pills */}
          <div className="flex items-center gap-1.5 pl-1">
            <span className="text-xs font-semibold text-slate-300 hidden xl:inline mr-1">
              Rating
            </span>
            <div className="flex items-center gap-1" role="group" aria-label="Filter by minimum rating">
              {ratingOptions.map((opt) => {
                const isActive = filters.minRating === opt.value;
                return (
                  <button
                    key={opt.label}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onFilterChange({ minRating: opt.value })}
                    className={cn(
                      "flex h-8 items-center gap-1 rounded-full px-2.5 sm:px-3 text-xs font-semibold transition-all cursor-pointer",
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
        </div>

        {/* Right Results Count (Desktop) */}
        <div className="flex items-center justify-end shrink-0 pl-3">
          <p className="text-xs font-medium text-slate-300">
            Showing <span className="font-semibold text-white">{filteredCount}</span> of{" "}
            <span className="font-semibold text-white">{totalCount}</span> matching results
          </p>
        </div>
      </div>

      {/* ─── Mobile Toolbar Layout (< lg): Only Search and Below It Count ─── */}
      <div className="flex flex-col gap-2.5 lg:hidden">
        {/* Full-width Search Input */}
        <div className="relative w-full">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
          />
          <input
            id="toolbar-search-input-mobile"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search for camps, locations, or experiences..."
            aria-label="Search for camps, locations, or experiences"
            className="h-10 w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-9 text-xs sm:text-sm text-white placeholder-slate-400 transition-colors focus:border-orange-500/80 focus:bg-white/10 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: "" })}
              aria-label="Clear search text"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Count directly below search */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs font-medium text-slate-300">
            Showing <span className="font-semibold text-white">{filteredCount}</span> of{" "}
            <span className="font-semibold text-white">{totalCount}</span> matching results
          </p>
          {activeFiltersCount > 0 && onOpenMobileFilters && (
            <button
              type="button"
              onClick={onOpenMobileFilters}
              className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer"
            >
              {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} applied
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
