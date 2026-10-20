"use client";

import { useState, useMemo, useTransition } from "react";
import { Filter, RotateCcw, Tent } from "lucide-react";
import { ListingSearchToolbar } from "./ListingSearchToolbar";
import { ListingCard } from "./ListingCard";
import { ListingFilterSidebar } from "./ListingFilterSidebar";
import { LazyMobileFilterDrawer } from "./LazyMobileFilterDrawer";
import type { ListingItem, ListingFilterState } from "./types";

interface ListingClientProps {
  initialListings: ListingItem[];
}

const DEFAULT_FILTERS: ListingFilterState = {
  searchQuery: "",
  location: "",
  radius: "Radius 50 km",
  category: "Bush Camps & Tented Stays",
  types: [],
  amenity: "",
  feature: "",
  minPrice: "",
  maxPrice: "",
  minRating: null,
};

export function ListingClient({ initialListings }: ListingClientProps) {
  const [filters, setFilters] = useState<ListingFilterState>(DEFAULT_FILTERS);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [, startTransition] = useTransition();

  const handleFilterChange = (updates: Partial<ListingFilterState>) => {
    startTransition(() => {
      setFilters((prev) => ({ ...prev, ...updates }));
    });
  };

  const handleResetFilters = () => {
    startTransition(() => {
      setFilters(DEFAULT_FILTERS);
    });
  };

  // Filter listings based on current filter state
  const filteredListings = useMemo(() => {
    return initialListings.filter((item) => {
      // 1. Keyword search (name, description, location, badges)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesBadge = item.badges.some((b) => b.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesLoc && !matchesBadge) {
          return false;
        }
      }

      // 2. Location
      if (filters.location && filters.location !== "All locations") {
        const locLower = filters.location.toLowerCase();
        const itemLocLower = item.location.toLowerCase();
        const itemRegionLower = item.region.toLowerCase();
        if (!itemLocLower.includes(locLower) && !locLower.includes(itemRegionLower)) {
          return false;
        }
      }

      // 3. Category (if filtered)
      if (filters.category && filters.category !== "Bush Camps & Tented Stays") {
        if (item.category !== filters.category) {
          return false;
        }
      }

      // 4. Types (multi-select)
      if (filters.types.length > 0) {
        const matchesType = filters.types.includes(item.type);
        const matchesBadge = item.badges.some((b) => filters.types.includes(b));
        if (!matchesType && !matchesBadge) {
          return false;
        }
      }

      // 5. Amenity
      if (filters.amenity && filters.amenity !== "All amenities") {
        if (!item.amenities.includes(filters.amenity)) {
          return false;
        }
      }

      // 6. Feature
      if (filters.feature && filters.feature !== "All features") {
        if (!item.features.includes(filters.feature)) {
          return false;
        }
      }

      // 7. Price per night range
      if (filters.minPrice) {
        const min = parseFloat(filters.minPrice);
        if (!isNaN(min) && item.pricePerNight < min) {
          return false;
        }
      }
      if (filters.maxPrice) {
        const max = parseFloat(filters.maxPrice);
        if (!isNaN(max) && item.pricePerNight > max) {
          return false;
        }
      }

      // 8. Rating
      if (filters.minRating !== null) {
        if (item.rating < filters.minRating) {
          return false;
        }
      }

      return true;
    });
  }, [initialListings, filters]);

  // Compute active filters count for mobile indicator
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.location) count++;
    if (filters.types.length > 0) count += filters.types.length;
    if (filters.amenity) count++;
    if (filters.feature) count++;
    if (filters.minPrice || filters.maxPrice) count++;
    if (filters.minRating !== null) count++;
    return count;
  }, [filters]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ───────────────── 1. Search Toolbar ───────────────── */}
      <ListingSearchToolbar
        filters={filters}
        onFilterChange={handleFilterChange}
        filteredCount={filteredListings.length}
        totalCount={56} // Realistic matching database pool
        onOpenMobileFilters={() => setMobileDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* ───────────────── 2. Main Content Layout ───────────────── */}
      <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* Left Column: 3-Column Responsive Grid */}
        <section
          aria-label="Camp and tent stays listings"
          className="flex-1 w-full min-w-0"
        >
          {filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 lg:gap-6">
              {filteredListings.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  priority={index < 3} // Eager load top 3 above-fold cards
                />
              ))}
            </div>
          ) : (
            /* Accessible Empty State */
            <div
              role="status"
              aria-live="polite"
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#091829]/60 px-6 py-16 text-center backdrop-blur-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-orange-400">
                <Tent className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-white">No matching stays found</h3>
              <p className="mt-2 max-w-md text-xs sm:text-sm text-slate-300 leading-relaxed">
                We couldn&apos;t find any bush camps or tented stays matching your current search criteria. Try adjusting your filters, location, or price range.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}
        </section>

        {/* Right Column: Desktop Filter Sidebar */}
        <div className="hidden lg:block w-72 xl:w-80 shrink-0 sticky top-24 self-start">
          <ListingFilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />
        </div>
      </div>

      {/* ───────────────── 3. Mobile Floating Funnel Button ───────────────── */}
      <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))] right-4 sm:right-6 z-40 lg:hidden">
        <button
          type="button"
          id="btn-filter-funnel"
          onClick={() => setMobileDrawerOpen(true)}
          aria-label="Open filter panel"
          aria-haspopup="dialog"
          aria-expanded={mobileDrawerOpen}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-2xl shadow-orange-600/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <Filter className="h-6 w-6 transition-transform group-hover:rotate-12" aria-hidden="true" />
          {activeFiltersCount > 0 && (
            <span
              aria-label={`${activeFiltersCount} filters active`}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-black text-orange-600 shadow-md"
            >
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* ───────────────── 4. Lazy Mobile Drawer (Zero TBT) ───────────────── */}
      {mobileDrawerOpen && (
        <LazyMobileFilterDrawer
          isOpen={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          filteredCount={filteredListings.length}
        />
      )}
    </div>
  );
}
