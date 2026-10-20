"use client";

import { useEffect } from "react";
import { X, Filter, Check } from "lucide-react";
import { ListingFilterSidebar } from "./ListingFilterSidebar";
import type { ListingFilterState } from "./types";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ListingFilterState;
  onFilterChange: (updates: Partial<ListingFilterState>) => void;
  onResetFilters: () => void;
  filteredCount: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  filteredCount,
}: MobileFilterDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filter-title"
      className="fixed inset-0 z-50 flex flex-col justify-end lg:hidden animate-in fade-in-0 duration-200"
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      {/* Sheet Content Panel */}
      <div className="relative z-10 flex max-h-[85vh] w-full flex-col rounded-t-3xl border-t border-white/15 bg-[#071625] shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drawer Drag Handle */}
        <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-white/20" aria-hidden="true" />

        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-orange-400" aria-hidden="true" />
            <h2 id="mobile-filter-title" className="text-base font-bold text-white">
              Filter Camps & Stays
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Filters */}
        <div className="flex-1 overflow-y-auto px-2 py-2">
          <ListingFilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            isMobileDrawer={true}
          />
        </div>

        {/* Drawer Footer Actions */}
        <div className="border-t border-white/10 bg-[#06121e]/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md">
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <Check className="h-4 w-4" />
            <span>Show {filteredCount} Results</span>
          </button>
        </div>
      </div>
    </div>
  );
}
