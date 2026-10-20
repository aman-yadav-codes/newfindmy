"use client";

import { useState, useCallback, useTransition } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import {
  Search,
  ChevronUp,
  ChevronRight,
  Copy,
  Check,
  MoreVertical,
  Plus,
  Tent,
  PawPrint,
  Home,
  Building2,
  Sparkles,
  Edit2,
  Trash2,
  ToggleLeft,
  CopyPlus,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/glass/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/glass/dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/glass/select";
import { TaxonomyOtherTabs } from "./TaxonomyOtherTabs";
import { MODULE_TABS } from "./classification/classification-data";
import type { ClassificationModuleId } from "./classification/types";

const TaxonomyFilterDrawer = dynamic(
  () => import("./dialogs/TaxonomyFilterDrawer").then((m) => m.TaxonomyFilterDrawer),
  { ssr: false }
);
import type {
  TaxonomyCategory,
  TaxonomyFeatureItem,
  TaxonomyRoomTypeItem,
  TaxonomyRoomCategoryItem,
  TaxonomyAmenityItem,
  CategoryIconType,
} from "./types";

interface TaxonomyWorkspaceProps {
  moduleId?: ClassificationModuleId;
  categories: TaxonomyCategory[];
  features: TaxonomyFeatureItem[];
  roomTypes: TaxonomyRoomTypeItem[];
  roomCategories: TaxonomyRoomCategoryItem[];
  amenities: TaxonomyAmenityItem[];
  onOpenAddSubtype: (categoryId?: string) => void;
  onUpdateCategoryStatus: (categoryId: string, status: "active" | "inactive") => void;
  onDeleteCategory: (categoryId: string) => void;
}

export function TaxonomyWorkspace({
  moduleId = "travel",
  categories,
  features,
  roomTypes,
  roomCategories,
  amenities,
  onOpenAddSubtype,
  onUpdateCategoryStatus,
  onDeleteCategory,
}: TaxonomyWorkspaceProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const currentTabs = MODULE_TABS[moduleId] || MODULE_TABS.travel;
  const urlTab = searchParams.get("tab");
  const activeTab = currentTabs.some((t) => t.id === urlTab)
    ? (urlTab as string)
    : currentTabs[0]?.id || "categories";

  // Read URL parameters with safe fallback defaults
  const urlQ = searchParams.get("q") ?? "";
  const rawStatus = searchParams.get("status");
  const urlStatus: "all" | "active" | "inactive" =
    rawStatus === "active" || rawStatus === "inactive" ? rawStatus : "all";
  const rawSort = searchParams.get("sort");
  const urlSort: "name" | "subtypes" = rawSort === "subtypes" ? "subtypes" : "name";
  const urlCategories = searchParams.get("categories")?.split(",").filter(Boolean) ?? [];

  const [searchQuery, setSearchQuery] = useState(urlQ);
  const [prevUrlQ, setPrevUrlQ] = useState(urlQ);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Derive statusFilter, sortBy and selectedCategoryIds directly from URL params as single source of truth
  const statusFilter = urlStatus;
  const sortBy = urlSort;
  const selectedCategoryIds = urlCategories;

  // Adjust local searchQuery when URL q param changes (e.g. Back/Forward navigation)
  if (urlQ !== prevUrlQ) {
    setPrevUrlQ(urlQ);
    setSearchQuery(urlQ);
  }

  // Helper to commit filters to URL while preserving unrelated query params
  const commitFiltersToUrl = useCallback(
    (newFilters: {
      q?: string;
      status?: "all" | "active" | "inactive";
      sort?: "name" | "subtypes";
      categories?: string[];
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.q !== undefined) {
        if (newFilters.q.trim()) {
          params.set("q", newFilters.q.trim());
        } else {
          params.delete("q");
        }
      }

      if (newFilters.status !== undefined) {
        if (newFilters.status !== "all") {
          params.set("status", newFilters.status);
        } else {
          params.delete("status");
        }
      }

      if (newFilters.sort !== undefined) {
        if (newFilters.sort !== "name") {
          params.set("sort", newFilters.sort);
        } else {
          params.delete("sort");
        }
      }

      if (newFilters.categories !== undefined) {
        if (newFilters.categories.length > 0) {
          params.set("categories", newFilters.categories.join(","));
        } else {
          params.delete("categories");
        }
      }

      const qs = params.toString();
      const targetUrl = qs ? `${pathname}?${qs}` : pathname;
      startTransition(() => {
        router.push(targetUrl, { scroll: false });
      });
    },
    [searchParams, pathname, router]
  );

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    commitFiltersToUrl({ q: query });
  };

  const handleStatusChange = (status: "all" | "active" | "inactive") => {
    commitFiltersToUrl({ status });
  };

  const handleSortChange = (sort: "name" | "subtypes") => {
    commitFiltersToUrl({ sort });
  };

  const handleDrawerApply = (filters: {
    status: "all" | "active" | "inactive";
    sort: "name" | "subtypes";
    categories: string[];
  }) => {
    commitFiltersToUrl(filters);
  };

  const handleDrawerClear = () => {
    commitFiltersToUrl({ status: "all", sort: "name", categories: [] });
  };

  const activeFiltersCount =
    (statusFilter !== "all" ? 1 : 0) +
    (sortBy !== "name" ? 1 : 0) +
    selectedCategoryIds.length;

  const handleCopySlug = (slug: string) => {
    navigator.clipboard?.writeText(slug);
    setCopiedSlug(slug);
    setTimeout(() => {
      setCopiedSlug(null);
    }, 1800);
  };

  const toggleCategoryExpand = (id: string) => {
    setExpandedCategoryId((prev) => (prev === id ? null : id));
  };

  const getCategoryIcon = (icon: CategoryIconType, className: string = "size-3.5") => {
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

  // Filter & sort categories
  const filteredCategories = categories
    .filter((category) => {
      const matchesSearch =
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.subtypes.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" || category.status === statusFilter;

      const matchesCategoryType =
        selectedCategoryIds.length === 0 ||
        selectedCategoryIds.includes(category.id) ||
        selectedCategoryIds.includes(category.slug);

      return matchesSearch && matchesStatus && matchesCategoryType;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      return b.subtypesCount - a.subtypesCount;
    });

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    const qs = params.toString();
    startTransition(() => {
      router.push(`${pathname}?${qs}`, { scroll: false });
    });
  };

  return (
    <section aria-label="Taxonomy workspace" className="flex-1 min-h-0 flex flex-col space-y-2">
      {/* ───────────────── Compact Taxonomy Workspace Tabs ───────────────── */}
      <div className="border-b dark:border-white/10 border-slate-200/80 shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        <nav
          aria-label="Taxonomy tabs"
          className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto scrollbar-none flex-nowrap py-0.5 touch-pan-x"
        >
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`pb-2.5 pt-1.5 px-2.5 sm:px-1 text-xs sm:text-sm font-semibold transition-all relative whitespace-nowrap shrink-0 rounded-lg min-h-[40px] flex items-center ${
                  isActive
                    ? "text-orange-500 dark:text-orange-400 font-bold"
                    : "dark:text-white/60 text-slate-500 dark:hover:text-white hover:text-slate-900"
                }`}
              >
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ───────────────── Other Tabs Rendering ───────────────── */}
      {activeTab !== "categories" ? (
        <div className="flex-1 min-h-0 overflow-y-auto pr-1">
          <TaxonomyOtherTabs
            moduleId={moduleId}
            activeTab={activeTab}
            features={features}
            roomTypes={roomTypes}
            roomCategories={roomCategories}
            amenities={amenities}
          />
        </div>
      ) : (
        /* ───────────────── Categories Tab Workspace ───────────────── */
        <div className="flex-1 min-h-0 flex flex-col space-y-2">
          {/* Desktop Filter & Search Bar (Hidden on Mobile) */}
          <div className="hidden sm:flex sm:items-center justify-between gap-2.5 p-2 sm:p-2.5 rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#092238]/60 bg-white/80 backdrop-blur-xl shadow-xs dark:shadow-md shrink-0">
            <div className="flex items-center gap-2 flex-1 max-w-xl">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 dark:text-white/50 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search categories, subtypes..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-lg border dark:border-white/10 border-slate-200 dark:bg-[#071626]/80 bg-slate-100/80 pl-9 pr-3 h-8 text-xs sm:text-sm dark:text-white text-slate-900 placeholder:dark:text-white/40 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Status Filter Dropdown */}
              <Select
                value={statusFilter}
                onValueChange={(val) => handleStatusChange(val as "all" | "active" | "inactive")}
              >
                <SelectTrigger
                  aria-label="Filter by status"
                  className="w-[125px] sm:w-[120px] h-8 text-xs rounded-lg dark:bg-[#071626]/80 bg-slate-100/80 dark:border-white/10 border-slate-200 dark:text-white/80 text-slate-700 focus:border-orange-500"
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="min-w-[130px]">
                  <SelectItem value="all">All status</SelectItem>
                  <SelectItem value="active">Active only</SelectItem>
                  <SelectItem value="inactive">Inactive only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right side: Count + Sort dropdown */}
            <div className="flex items-center justify-end gap-2.5 shrink-0">
              <span className="text-[11px] font-medium dark:text-white/60 text-slate-500">
                {filteredCategories.length} {filteredCategories.length === 1 ? "category" : "categories"}
              </span>

              <Select
                value={sortBy}
                onValueChange={(val) => handleSortChange(val as "name" | "subtypes")}
              >
                <SelectTrigger
                  aria-label="Sort categories"
                  className="w-[155px] sm:w-[150px] h-8 text-xs rounded-lg dark:bg-[#071626]/80 bg-slate-100/80 dark:border-white/10 border-slate-200 dark:text-white/80 text-slate-700 focus:border-orange-500"
                >
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="min-w-[180px]">
                  <SelectItem value="name">Sort by: Name</SelectItem>
                  <SelectItem value="subtypes">Sort by: Subtypes count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile Search Bar (Only Search input on mobile) */}
          <div className="flex sm:hidden relative w-full shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 dark:text-white/50 text-slate-400 z-10 pointer-events-none" />
            <input
              type="text"
              placeholder="Search categories, subtypes..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full rounded-xl border dark:border-white/10 border-slate-200 dark:bg-[#092238]/70 bg-white/80 backdrop-blur-xl pl-10 pr-3.5 h-10 text-xs sm:text-sm dark:text-white text-slate-900 placeholder:dark:text-white/40 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none transition-colors shadow-xs"
            />
          </div>

          {/* Categories List (Expandable Rows with inner vertical scroll) */}
          <div className="flex-1 min-h-0 overflow-y-auto pr-1 sm:pr-1.5 space-y-2 scrollbar-thin dark:scrollbar-thumb-white/15 scrollbar-thumb-slate-300 scrollbar-track-transparent">
            {filteredCategories.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-[#092238]/40 bg-white/60">
                <p className="text-sm font-semibold dark:text-white/70 text-slate-700">No categories found matching your search</p>
                <p className="text-xs dark:text-white/40 text-slate-400 mt-1">Try clearing your filters or adding a new category</p>
              </div>
            ) : (
              filteredCategories.map((category) => {
                const isExpanded = expandedCategoryId === category.id;

                return (
                  <div
                    key={category.id}
                    className="overflow-hidden rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081b2e]/70 bg-white/90 backdrop-blur-xl shadow-xs dark:shadow-md transition-all dark:hover:border-white/20 hover:border-slate-300"
                  >
                    {/* Category Row Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3.5 py-2.5 sm:px-3 sm:py-2 gap-2 sm:gap-2">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {/* Thumbnail Image */}
                        <div className="relative size-10 sm:size-10 shrink-0 rounded-lg overflow-hidden border dark:border-white/10 border-slate-200 shadow-sm">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>

                        {/* Title, Icon and Slug */}
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 min-w-0">
                            <span className="text-orange-500 shrink-0">
                              {getCategoryIcon(category.icon, "size-3.5")}
                            </span>
                            <h3 className="font-semibold text-xs sm:text-sm dark:text-white text-slate-900 leading-tight truncate">
                              {category.name}
                            </h3>
                          </div>

                          <div className="flex items-center gap-1.5 mt-0.5 min-w-0">
                            <span className="text-[11px] font-mono dark:text-white/50 text-slate-500 truncate flex-1 min-w-0">
                              Slug: {category.slug}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCopySlug(category.slug)}
                              title="Copy slug to clipboard"
                              aria-label={`Copy slug ${category.slug}`}
                              className="dark:text-white/40 text-slate-400 dark:hover:text-white hover:text-slate-800 transition-colors p-1 rounded shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 touch-manipulation"
                            >
                              {copiedSlug === category.slug ? (
                                <Check className="size-3 text-emerald-500" />
                              ) : (
                                <Copy className="size-3" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Row Actions: Subtypes count, Status, Chevron, More Actions */}
                      <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 dark:border-white/5 border-slate-100 min-w-0">
                        {/* Badges group */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          {/* Subtypes Counter Pill */}
                          <div className="flex items-center gap-1 rounded-md px-2 py-0.5 dark:bg-white/5 bg-slate-100/90 text-center shrink-0">
                            <span className="text-xs font-bold dark:text-white text-slate-900 leading-tight">{category.subtypesCount}</span>
                            <span className="text-[10px] dark:text-white/50 text-slate-500 leading-tight">subtypes</span>
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-500 dark:text-emerald-400 shrink-0">
                            <span className="size-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                            <span>{category.status === "active" ? "Active" : "Inactive"}</span>
                          </div>
                        </div>

                        {/* Buttons group */}
                        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                          {/* Expand / Collapse Button */}
                          <button
                            type="button"
                            onClick={() => toggleCategoryExpand(category.id)}
                            aria-label={isExpanded ? "Collapse category subtypes" : "Expand category subtypes"}
                            aria-expanded={isExpanded}
                            className="flex size-8 sm:size-7 items-center justify-center rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:text-white/70 text-slate-600 transition-colors cursor-pointer touch-manipulation shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                          >
                            {isExpanded ? (
                              <ChevronUp className="size-4 sm:size-3.5 text-orange-500" />
                            ) : (
                              <ChevronRight className="size-4 sm:size-3.5" />
                            )}
                          </button>

                          {/* More Actions Dropdown */}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                aria-label={`Options for ${category.name}`}
                                className="flex size-8 sm:size-7 items-center justify-center rounded-lg dark:bg-white/5 bg-slate-100 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:text-white/70 text-slate-600 transition-colors touch-manipulation shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                              >
                                <MoreVertical className="size-4 sm:size-3.5" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              sideOffset={6}
                              collisionPadding={12}
                              className="w-48 dark:border-white/10 border-slate-200 dark:bg-[#071a2d]/95 bg-white/95 dark:text-white text-slate-900 backdrop-blur-xl shadow-2xl rounded-xl z-50"
                            >
                            <DropdownMenuItem
                              onClick={() => onOpenAddSubtype(category.id)}
                              className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 text-xs"
                            >
                              <Plus className="size-3.5 text-orange-500" />
                              <span>Add Subtype</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleCopySlug(category.slug)}
                              className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 text-xs"
                            >
                              <CopyPlus className="size-3.5 text-sky-500" />
                              <span>Copy Slug</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                const nextStatus = category.status === "active" ? "inactive" : "active";
                                onUpdateCategoryStatus(category.id, nextStatus);
                              }}
                              className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 text-xs"
                            >
                              <ToggleLeft className="size-3.5 text-amber-500" />
                              <span>Toggle Status</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 text-xs">
                              <Edit2 className="size-3.5 dark:text-white/60 text-slate-400" />
                              <span>Edit Details</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="dark:bg-white/10 bg-slate-200" />
                            <DropdownMenuItem
                              onClick={() => onDeleteCategory(category.id)}
                              className="cursor-pointer gap-2 text-rose-500 dark:text-rose-400 focus:bg-rose-500/10 focus:text-rose-600 dark:focus:text-rose-300 text-xs"
                            >
                              <Trash2 className="size-3.5" />
                              <span>Delete Category</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                    {/* ───────────────── Expanded Subtypes Panel ───────────────── */}
                    {isExpanded && (
                      <div className="border-t dark:border-white/10 border-slate-200/80 dark:bg-[#061423]/70 bg-slate-50/90 p-2.5 sm:p-3">
                        {/* Subtypes Header */}
                        <div className="flex items-center justify-between mb-2.5">
                          <h4 className="text-xs font-semibold dark:text-white/90 text-slate-800">
                            Subtypes ({category.subtypes.length})
                          </h4>
                          <Button
                            size="sm"
                            onClick={() => onOpenAddSubtype(category.id)}
                            variant="glass"
                            className="text-xs dark:text-white/90 text-slate-700 hover:text-slate-900 dark:hover:text-white dark:border-white/15 border-slate-200 dark:bg-white/5 bg-white hover:bg-slate-100 rounded-lg px-2.5 py-1 h-7.5 gap-1 shadow-2xs touch-manipulation"
                          >
                            <Plus className="size-3 text-orange-500" />
                            <span>Add subtype</span>
                          </Button>
                        </div>

                        {/* Subtypes Grid (Compact thumbnails 64-80px) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                          {category.subtypes.map((subtype) => (
                            <div
                              key={subtype.id}
                              className="group relative overflow-hidden rounded-lg border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white p-2 transition-all hover:border-slate-300 dark:hover:border-white/20 dark:hover:bg-[#0b2138]/70 hover:bg-slate-50 shadow-2xs"
                            >
                              {/* Subtype Thumbnail (Target 64-80px height) */}
                              <div className="relative h-18 sm:h-20 w-full overflow-hidden rounded-md border dark:border-white/10 border-slate-200 mb-1.5">
                                <Image
                                  src={subtype.image}
                                  alt={subtype.name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              </div>

                              {/* Title with Category Icon */}
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="text-orange-500 shrink-0">
                                  {getCategoryIcon(subtype.icon, "size-3")}
                                </span>
                                <h5 className="font-medium text-xs dark:text-white text-slate-900 truncate">
                                  {subtype.name}
                                </h5>
                              </div>

                              {/* Subtype Slug */}
                              <div className="flex items-center justify-between mt-1 text-[10px] dark:text-white/50 text-slate-500 font-mono">
                                <span className="truncate">slug: {subtype.slug}</span>
                                <button
                                  type="button"
                                  onClick={() => handleCopySlug(subtype.slug)}
                                  aria-label={`Copy slug ${subtype.slug}`}
                                  className="dark:text-white/40 text-slate-400 dark:hover:text-white hover:text-slate-800 p-0.5 rounded transition-colors"
                                >
                                  {copiedSlug === subtype.slug ? (
                                    <Check className="size-3 text-emerald-500" />
                                  ) : (
                                    <Copy className="size-3" />
                                  )}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Floating Mobile Filter Action Button (Frame 1 of reference screenshot) */}
      {activeTab === "categories" && (
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          aria-label={`Open filters${activeFiltersCount > 0 ? ` (${activeFiltersCount} active)` : ""}`}
          className="fixed bottom-6 right-5 z-40 sm:hidden size-14 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 shadow-xl shadow-orange-500/40 text-white flex items-center justify-center transition-transform active:scale-95 hover:scale-105 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          <Filter className="size-6 text-white" />
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-orange-600 text-white text-[11px] font-bold border-2 border-[#06121e] shadow-sm">
              {activeFiltersCount}
            </span>
          )}
        </button>
      )}

      {/* Mobile-Only Filter Drawer (Frame 2 of reference screenshot) */}
      {mobileDrawerOpen && (
        <TaxonomyFilterDrawer
          open={mobileDrawerOpen}
          onOpenChange={setMobileDrawerOpen}
          categories={categories}
          currentStatus={statusFilter}
          currentSort={sortBy}
          currentCategories={selectedCategoryIds}
          onApply={handleDrawerApply}
          onClear={handleDrawerClear}
        />
      )}
    </section>
  );
}
