"use client";

import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/glass/button";

export interface ClassificationEmptyStateProps {
  entityNamePlural?: string;
  hasActiveFilters?: boolean;
  onResetFilters?: () => void;
  onAddClick?: () => void;
  addLabel?: string;
}

export function ClassificationEmptyState({
  entityNamePlural = "items",
  hasActiveFilters = false,
  onResetFilters,
  onAddClick,
  addLabel = "Add Item",
}: ClassificationEmptyStateProps) {
  return (
    <div className="p-8 sm:p-12 text-center rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 backdrop-blur-xl shadow-xs space-y-3">
      <div className="flex size-12 items-center justify-center rounded-2xl dark:bg-white/5 bg-slate-100 mx-auto text-orange-500 border dark:border-white/10 border-slate-200">
        <SearchX className="size-6" />
      </div>
      <div>
        <h4 className="text-sm font-semibold dark:text-white text-slate-900">
          No {entityNamePlural} found
        </h4>
        <p className="text-xs dark:text-white/60 text-slate-500 mt-1 max-w-sm mx-auto">
          {hasActiveFilters
            ? "We couldn't find any results matching your search and filter criteria. Try resetting your filters."
            : `No ${entityNamePlural} have been added yet.`}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 pt-2">
        {hasActiveFilters && onResetFilters && (
          <Button
            type="button"
            variant="glass"
            size="sm"
            onClick={onResetFilters}
            className="rounded-xl gap-1.5 text-xs font-semibold dark:border-white/10 border-slate-200 dark:text-white text-slate-700"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset filters</span>
          </Button>
        )}

        {onAddClick && (
          <Button
            type="button"
            variant="orange"
            size="sm"
            onClick={onAddClick}
            className="rounded-xl text-xs font-semibold text-white shadow-md shadow-orange-500/25"
          >
            <span>{addLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
