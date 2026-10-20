"use client";

import { Search, X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/glass/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/glass/select";

export interface ClassificationToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  status: "all" | "active" | "inactive";
  onStatusChange: (status: "all" | "active" | "inactive") => void;
  showStatusFilter?: boolean;
  totalCount: number;
  entityNamePlural: string;
  onAddClick?: () => void;
  addLabel?: string;
  canAdd?: boolean;
  isSearching?: boolean;
  customFilterValue?: string;
  onCustomFilterChange?: (value: string | undefined) => void;
  customFilterOptions?: { label: string; value: string }[];
  customFilterPlaceholder?: string;
}

export function ClassificationToolbar({
  search,
  onSearchChange,
  searchPlaceholder = "Search items...",
  status,
  onStatusChange,
  showStatusFilter = true,
  totalCount,
  entityNamePlural,
  onAddClick,
  addLabel = "Add Item",
  canAdd = true,
  isSearching = false,
  customFilterValue,
  onCustomFilterChange,
  customFilterOptions,
  customFilterPlaceholder = "All categories",
}: ClassificationToolbarProps) {
  return (
    <div className="flex flex-col gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-[#092238]/60 bg-white/80 backdrop-blur-xl shadow-xs shrink-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        {/* Left Area: Search + Filters */}
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
          {/* Debounced Search Field */}
          <div className="relative w-full min-w-0 sm:w-auto sm:flex-1 sm:min-w-[200px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 dark:text-white/40 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border dark:border-white/10 border-slate-200 dark:bg-[#071726]/80 bg-slate-100/90 pl-10 pr-8 h-9 text-xs sm:text-sm dark:text-white text-slate-900 placeholder:dark:text-white/40 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors"
            />
            {isSearching ? (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-orange-500 animate-spin" />
            ) : search.length > 0 ? (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md dark:text-white/40 text-slate-400 dark:hover:text-white hover:text-slate-700 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>

          {/* Status Filter Dropdown */}
          {showStatusFilter && (
            <Select
              value={status}
              onValueChange={(val) => onStatusChange(val as "all" | "active" | "inactive")}
            >
              <SelectTrigger
                aria-label="Filter status"
                className="w-full min-[360px]:w-[125px] h-9 text-xs rounded-xl dark:bg-[#071726]/80 bg-slate-100/90 dark:border-white/10 border-slate-200 dark:text-white/80 text-slate-700 focus:border-orange-500"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="min-w-[130px]">
                <SelectItem value="all">All status</SelectItem>
                <SelectItem value="active">Active only</SelectItem>
                <SelectItem value="inactive">Inactive only</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Optional Custom Tag Filter */}
          {customFilterOptions && onCustomFilterChange && (
            <Select
              value={customFilterValue || "all"}
              onValueChange={(val) => onCustomFilterChange(val === "all" ? undefined : val)}
            >
              <SelectTrigger
                aria-label="Filter by tag"
                className="w-full min-[360px]:w-[145px] h-9 text-xs rounded-xl dark:bg-[#071726]/80 bg-slate-100/90 dark:border-white/10 border-slate-200 dark:text-white/80 text-slate-700 focus:border-orange-500"
              >
                <SelectValue placeholder={customFilterPlaceholder} />
              </SelectTrigger>
              <SelectContent className="min-w-[150px]">
                <SelectItem value="all">All tags</SelectItem>
                {customFilterOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Right Area: Count + Primary Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="text-xs dark:text-white/60 text-slate-500 font-medium whitespace-nowrap">
            {totalCount} {entityNamePlural}
          </span>

          {onAddClick && (
            <Button
              type="button"
              variant="orange"
              disabled={!canAdd}
              onClick={onAddClick}
              className="rounded-xl px-3.5 py-1.5 h-9 gap-1.5 text-xs font-semibold shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 cursor-pointer text-white touch-manipulation"
            >
              <Plus className="size-3.5" />
              <span>{addLabel}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
