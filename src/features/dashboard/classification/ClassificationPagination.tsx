"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/glass/button";
import type { PaginationInfo } from "./types";

export interface ClassificationPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  entityNamePlural?: string;
}

export function ClassificationPagination({
  pagination,
  onPageChange,
  entityNamePlural = "items",
}: ClassificationPaginationProps) {
  const { page, totalPages, totalItems, startIndex, endIndex, hasPrevPage, hasNextPage } =
    pagination;

  if (totalItems <= pagination.pageSize) {
    return null;
  }

  // Generate page numbers with window
  const pages: number[] = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t dark:border-white/10 border-slate-200/80 text-xs shrink-0">
      {/* Range text */}
      <span className="dark:text-white/60 text-slate-500 font-medium order-2 sm:order-1">
        Showing{" "}
        <span className="font-semibold dark:text-white text-slate-800">
          {totalItems > 0 ? startIndex + 1 : 0}
        </span>{" "}
        to{" "}
        <span className="font-semibold dark:text-white text-slate-800">{endIndex}</span> of{" "}
        <span className="font-semibold dark:text-white text-slate-800">{totalItems}</span>{" "}
        {entityNamePlural}
      </span>

      {/* Page controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2">
        <Button
          type="button"
          variant="glass"
          disabled={!hasPrevPage}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="size-8 p-0 rounded-lg dark:border-white/10 border-slate-200 disabled:opacity-40"
        >
          <ChevronLeft className="size-4" />
        </Button>

        {pages.map((p) => {
          const isActive = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={`size-8 rounded-lg font-semibold text-xs transition-all ${
                isActive
                  ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30"
                  : "dark:hover:bg-white/10 hover:bg-slate-100 dark:text-white/70 text-slate-600"
              }`}
            >
              {p}
            </button>
          );
        })}

        <Button
          type="button"
          variant="glass"
          disabled={!hasNextPage}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="size-8 p-0 rounded-lg dark:border-white/10 border-slate-200 disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
