"use client";

import { useState } from "react";
import {
  ArrowUpDown,
  Check,
  Tent,
  PawPrint,
  Home,
  Building2,
  Sparkles,
} from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/glass/drawer";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/glass/select";
import { cn } from "@/lib/utils";
import type { TaxonomyCategory, CategoryIconType } from "../types";

export interface TaxonomyFilterDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: TaxonomyCategory[];
  currentStatus: "all" | "active" | "inactive";
  currentSort: "name" | "subtypes";
  currentCategories: string[];
  onApply: (filters: {
    status: "all" | "active" | "inactive";
    sort: "name" | "subtypes";
    categories: string[];
  }) => void;
  onClear: () => void;
}

export function TaxonomyFilterDrawer({
  open,
  onOpenChange,
  categories,
  currentStatus,
  currentSort,
  currentCategories,
  onApply,
  onClear,
}: TaxonomyFilterDrawerProps) {
  // Temporary unapplied draft state
  const [draftStatus, setDraftStatus] = useState<"all" | "active" | "inactive">(currentStatus);
  const [draftSort, setDraftSort] = useState<"name" | "subtypes">(currentSort);
  const [draftCategories, setDraftCategories] = useState<string[]>(currentCategories);

  const getCategoryIcon = (icon: CategoryIconType, className: string = "size-4") => {
    switch (icon) {
      case "tent":
        return <Tent className={className} />;
      case "paw":
        return <PawPrint className={className} />;
      case "home":
        return <Home className={className} />;
      case "hotel":
        return <Building2 className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const handleApply = () => {
    onApply({
      status: draftStatus,
      sort: draftSort,
      categories: draftCategories,
    });
    onOpenChange(false);
  };

  const handleClearAll = () => {
    setDraftStatus("all");
    setDraftSort("name");
    setDraftCategories([]);
    onClear();
    onOpenChange(false);
  };

  const draftActiveCount =
    (draftStatus !== "all" ? 1 : 0) +
    (draftSort !== "name" ? 1 : 0) +
    draftCategories.length;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[88dvh] overflow-hidden flex flex-col p-4 sm:p-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))] dark:bg-[#071626]/98 bg-slate-50/98 border-t dark:border-white/10 border-slate-200 backdrop-blur-2xl">
        {/* Header */}
        <DrawerHeader className="px-0 pt-0 pb-3 border-b dark:border-white/10 border-slate-200/80">
          <DrawerTitle className="text-xl font-bold dark:text-white text-slate-900 leading-tight">
            Filters
          </DrawerTitle>
          <DrawerDescription className="text-xs dark:text-white/60 text-slate-500 mt-1">
            Refine categories and find exactly what you need
          </DrawerDescription>
        </DrawerHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4 pr-0.5 scrollbar-thin dark:scrollbar-thumb-white/15 scrollbar-thumb-slate-300">
          {/* 1. Status Section with Reset link */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-semibold dark:text-white text-slate-900">
                Status
              </h4>
              <button
                type="button"
                onClick={() => setDraftStatus("all")}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors focus-visible:outline-none"
              >
                Reset
              </button>
            </div>

            <div className="flex items-center gap-2">
              {[
                { id: "all", label: "All status" },
                { id: "active", label: "Active only" },
                { id: "inactive", label: "Inactive only" },
              ].map((item) => {
                const isSelected = draftStatus === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setDraftStatus(item.id as "all" | "active" | "inactive")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-xs font-medium border transition-all touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500",
                      isSelected
                        ? "border-orange-500 bg-[#16273b] dark:bg-[#16273b] text-white shadow-xs"
                        : "dark:border-white/10 border-slate-200 dark:bg-white/5 bg-white text-slate-600 dark:text-white/70 hover:border-white/20"
                    )}
                  >
                    {/* Radio indicator */}
                    <div
                      className={cn(
                        "size-3.5 rounded-full border flex items-center justify-center shrink-0",
                        isSelected
                          ? "border-orange-500"
                          : "dark:border-white/30 border-slate-400"
                      )}
                    >
                      {isSelected && <div className="size-1.5 rounded-full bg-orange-500" />}
                    </div>
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Sort by Section with Dropdown */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold dark:text-white text-slate-900">
              Sort by
            </h4>
            <Select
              value={draftSort}
              onValueChange={(val) => setDraftSort(val as "name" | "subtypes")}
            >
              <SelectTrigger
                aria-label="Sort categories by"
                className="w-full h-11 px-3.5 rounded-xl border dark:border-white/10 border-slate-200 dark:bg-[#081a2c]/80 bg-white text-xs dark:text-white text-slate-800 focus:border-orange-500"
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="size-3.5 text-orange-500/90 dark:text-white/60 shrink-0" />
                  <SelectValue placeholder="Sort order" />
                </div>
              </SelectTrigger>
              <SelectContent className="min-w-[220px]">
                <SelectItem value="name">Name (A → Z)</SelectItem>
                <SelectItem value="subtypes">Subtypes count (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 3. Category Type Section with Checkboxes & Category Icons */}
          <div className="space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold dark:text-white text-slate-900">
              Category type
            </h4>
            <div className="space-y-1.5">
              {categories.map((cat) => {
                const isChecked = draftCategories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setDraftCategories((prev) =>
                        isChecked ? prev.filter((id) => id !== cat.id) : [...prev, cat.id]
                      );
                    }}
                    className="w-full flex items-center gap-3 py-2 px-1 text-left rounded-lg transition-colors hover:dark:bg-white/5 hover:bg-slate-100 group focus-visible:outline-none"
                  >
                    {/* Checkbox square */}
                    <div
                      className={cn(
                        "size-5 rounded-[5px] border flex items-center justify-center transition-all shrink-0",
                        isChecked
                          ? "border-orange-500 bg-orange-500 text-white"
                          : "dark:border-white/30 border-slate-300 dark:bg-transparent bg-transparent group-hover:border-white/50"
                      )}
                    >
                      {isChecked && <Check className="size-3.5 stroke-[3]" />}
                    </div>

                    {/* Category Icon */}
                    <span className="text-orange-500 shrink-0">
                      {getCategoryIcon(cat.icon, "size-4")}
                    </span>

                    {/* Category Name */}
                    <span className="text-xs sm:text-sm font-medium dark:text-white/90 text-slate-800">
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions: Clear all & Apply filters (count) */}
        <div className="pt-3 pb-1 border-t dark:border-white/10 border-slate-200 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex-1 h-12 rounded-full border dark:border-white/10 border-slate-200 dark:bg-[#0c2235]/90 bg-slate-200/90 text-xs sm:text-sm font-semibold dark:text-white text-slate-800 hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/30 hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Apply filters{draftActiveCount > 0 ? ` (${draftActiveCount})` : ""}
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
