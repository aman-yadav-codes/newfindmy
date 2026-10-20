"use client";

import { useState, useMemo, useEffect, useRef, useTransition } from "react";
import type {
  ClassificationFilterResult,
  PaginationInfo,
  ItemStatus,
  HierarchicalClassificationItem,
} from "./types";

export interface UseClassificationFilterOptions<T> {
  items: T[];
  searchFields?: (keyof T)[];
  initialSearch?: string;
  initialStatus?: "all" | "active" | "inactive";
  initialPage?: number;
  initialPageSize?: number;
  initialSortBy?: string;
  initialSortOrder?: "asc" | "desc";
  debounceMs?: number;
  isHierarchical?: boolean;
}

export function useClassificationFilter<T extends { id: string; name: string; status: ItemStatus; slug?: string }>({
  items,
  searchFields = ["name", "slug" as keyof T],
  initialSearch = "",
  initialStatus = "all",
  initialPage = 1,
  initialPageSize = 10,
  initialSortBy = "name",
  initialSortOrder = "asc",
  debounceMs = 250,
  isHierarchical = false,
}: UseClassificationFilterOptions<T>): ClassificationFilterResult<T> {
  const [, startTransition] = useTransition();

  // Raw user input
  const [search, setSearchRaw] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [status, setStatus] = useState<"all" | "active" | "inactive">(initialStatus);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const sortOrder = initialSortOrder;
  const [customFilter, setCustomFilter] = useState<string | undefined>(undefined);

  // Derive isSearching directly from raw input vs debounced state (Zero cascading renders)
  const isSearching = search !== debouncedSearch;

  // Stale request cancellation counter
  const latestRequestId = useRef(0);

  // Debounce search input and handle stale query cancellation
  useEffect(() => {
    const requestId = ++latestRequestId.current;

    const timer = setTimeout(() => {
      // Ignore if a newer search keystroke has happened
      if (requestId === latestRequestId.current) {
        startTransition(() => {
          setDebouncedSearch(search);
          // Automatically reset to page 1 on search change
          setPage(1);
        });
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [search, debounceMs]);

  // Reset page when status or custom filter changes
  const handleStatusChange = (newStatus: "all" | "active" | "inactive") => {
    setStatus(newStatus);
    setPage(1);
  };

  const handleCustomFilterChange = (val: string | undefined) => {
    setCustomFilter(val);
    setPage(1);
  };

  const handleSetSearch = (query: string) => {
    setSearchRaw(query);
  };

  // ─────────────────────────────────────────────────────────────
  // Filter & Sort Logic (supports flat and hierarchical taxonomies)
  // ─────────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    // 1. Hierarchical parent-child filtering
    if (isHierarchical) {
      return (items as unknown as HierarchicalClassificationItem[])
        .map((parent): HierarchicalClassificationItem | null => {
          const parentMatchesSearch =
            !query ||
            parent.name.toLowerCase().includes(query) ||
            (parent.slug && parent.slug.toLowerCase().includes(query)) ||
            (parent.categoryTag && parent.categoryTag.toLowerCase().includes(query));

          const parentMatchesStatus =
            status === "all" || parent.status === status;

          // Check children matches
          const matchingChildren = (parent.children || []).filter((child) => {
            const childMatchesSearch =
              !query ||
              child.name.toLowerCase().includes(query) ||
              (child.slug && child.slug.toLowerCase().includes(query)) ||
              (child.categoryTag && child.categoryTag.toLowerCase().includes(query));

            const childMatchesStatus =
              status === "all" || child.status === status;

            return childMatchesSearch && childMatchesStatus;
          });

          // If parent matches or any child matches, keep in results
          if (parentMatchesSearch && parentMatchesStatus) {
            // Parent matches: show parent and all matching status children
            const statusFilteredChildren = (parent.children || []).filter(
              (c) => status === "all" || c.status === status
            );
            return {
              ...parent,
              children: statusFilteredChildren,
            };
          }

          if (matchingChildren.length > 0) {
            // Child matches: show parent with only matching children
            return {
              ...parent,
              children: matchingChildren,
            };
          }

          return null;
        })
        .filter((item): item is HierarchicalClassificationItem => item !== null) as unknown as T[];
    }

    // 2. Flat taxonomy filtering
    return items
      .filter((item) => {
        // Status filter
        if (status !== "all" && item.status !== status) {
          return false;
        }

        // Search filter across configured search fields
        if (query) {
          const matches = searchFields.some((field) => {
            const val = item[field];
            if (typeof val === "string") {
              return val.toLowerCase().includes(query);
            }
            return false;
          });
          if (!matches) return false;
        }

        // Custom filter (e.g. categoryTag or group)
        if (customFilter) {
          const rawItem = item as Record<string, unknown>;
          const matchesTag =
            rawItem.categoryTag === customFilter ||
            rawItem.group === customFilter ||
            rawItem.category === customFilter;
          if (!matchesTag) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        if (sortBy === "name") {
          const comp = a.name.localeCompare(b.name);
          return sortOrder === "asc" ? comp : -comp;
        }
        if (sortBy === "status") {
          const comp = a.status.localeCompare(b.status);
          return sortOrder === "asc" ? comp : -comp;
        }
        return 0;
      });
  }, [items, debouncedSearch, status, customFilter, sortBy, sortOrder, isHierarchical, searchFields]);

  // ─────────────────────────────────────────────────────────────
  // Pagination Calculations
  // ─────────────────────────────────────────────────────────────
  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedItems = useMemo(() => {
    return filteredItems.slice(startIndex, endIndex);
  }, [filteredItems, startIndex, endIndex]);

  const pagination: PaginationInfo = {
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    hasPrevPage: safePage > 1,
    hasNextPage: safePage < totalPages,
    startIndex,
    endIndex,
  };

  const hasActiveFilters =
    debouncedSearch.trim().length > 0 || status !== "all" || customFilter !== undefined;

  const activeFiltersCount =
    (debouncedSearch.trim().length > 0 ? 1 : 0) +
    (status !== "all" ? 1 : 0) +
    (customFilter !== undefined ? 1 : 0);

  const resetFilters = () => {
    setSearchRaw("");
    setDebouncedSearch("");
    setStatus("all");
    setCustomFilter(undefined);
    setPage(1);
  };

  return {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch: handleSetSearch,
    status,
    setStatus: handleStatusChange,
    page: safePage,
    setPage,
    pageSize,
    setPageSize,
    sortBy,
    setSortBy,
    customFilter,
    setCustomFilter: handleCustomFilterChange,
    resetFilters,
    hasActiveFilters,
    activeFiltersCount,
    isSearching,
  };
}
