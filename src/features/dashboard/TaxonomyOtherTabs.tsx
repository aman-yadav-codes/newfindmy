"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Bed, Tag, Sparkles, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/glass/card";
import { ClassificationToolbar } from "./classification/ClassificationToolbar";
import { ClassificationPagination } from "./classification/ClassificationPagination";
import { ClassificationEmptyState } from "./classification/ClassificationEmptyState";
import { ClassificationHierarchyList } from "./classification/ClassificationHierarchyList";
import { useClassificationFilter } from "./classification/useClassificationFilter";
import {
  TRAVEL_BUSINESS_FEATURES_HIERARCHICAL,
  PROPERTY_FEATURES_HIERARCHICAL,
  FOOD_FEATURES_HIERARCHICAL,
  FOOD_DIETARY_OPTIONS,
} from "./classification/classification-data";
import type {
  TaxonomyFeatureItem,
  TaxonomyRoomTypeItem,
  TaxonomyRoomCategoryItem,
  TaxonomyAmenityItem,
} from "./types";
import type { ClassificationModuleId } from "./classification/types";

// Lazy-load AddFeatureDialog with ssr: false (Zero TBT rule)
const AddFeatureDialog = dynamic(
  () => import("./dialogs/AddFeatureDialog").then((m) => m.AddFeatureDialog),
  { ssr: false }
);

interface OtherTabsProps {
  moduleId?: ClassificationModuleId;
  activeTab: string;
  features: TaxonomyFeatureItem[];
  roomTypes: TaxonomyRoomTypeItem[];
  roomCategories: TaxonomyRoomCategoryItem[];
  amenities: TaxonomyAmenityItem[];
  onAddFeature?: (feature: Omit<TaxonomyFeatureItem, "id">) => void;
  canAddFeature?: boolean;
}

export function TaxonomyOtherTabs({
  moduleId = "travel",
  activeTab,
  features,
  roomTypes,
  roomCategories,
  amenities,
  onAddFeature: propOnAddFeature,
  canAddFeature = true,
}: OtherTabsProps) {
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [, setLocalFeatures] = useState<TaxonomyFeatureItem[]>(features);

  const handleAddFeature = (newFeature: Omit<TaxonomyFeatureItem, "id">) => {
    if (propOnAddFeature) {
      propOnAddFeature(newFeature);
    } else {
      const created: TaxonomyFeatureItem = {
        id: `feat-${Date.now()}`,
        ...newFeature,
      };
      setLocalFeatures((prev) => [created, ...prev]);
    }
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-3">
      {/* ───────────────── Travel: Business Features (Hierarchical Parent-Child) ───────────────── */}
      {activeTab === "business-features" && (
        <BusinessFeaturesTab
          features={TRAVEL_BUSINESS_FEATURES_HIERARCHICAL}
          onOpenAdd={() => setAddFeatureOpen(true)}
          canAdd={canAddFeature}
        />
      )}

      {/* ───────────────── Property: Property Features (Hierarchical Parent-Child) ───────────────── */}
      {activeTab === "property-features" && (
        <BusinessFeaturesTab
          features={PROPERTY_FEATURES_HIERARCHICAL}
          onOpenAdd={() => setAddFeatureOpen(true)}
          canAdd={canAddFeature}
          entityNamePlural="property features"
          searchPlaceholder="Search property features & sub-features..."
        />
      )}

      {/* ───────────────── Food: Venue Features (Hierarchical) ───────────────── */}
      {activeTab === "food-features" && (
        <BusinessFeaturesTab
          features={FOOD_FEATURES_HIERARCHICAL}
          onOpenAdd={() => setAddFeatureOpen(true)}
          canAdd={canAddFeature}
          entityNamePlural="venue features"
          searchPlaceholder="Search venue & dining features..."
        />
      )}

      {/* ───────────────── Food: Dietary Options ───────────────── */}
      {activeTab === "dietary" && <DietaryTab options={FOOD_DIETARY_OPTIONS} />}

      {/* ───────────────── Travel: Room Types ───────────────── */}
      {activeTab === "room-types" && <RoomTypesTab items={roomTypes} />}

      {/* ───────────────── Travel: Room Categories ───────────────── */}
      {activeTab === "room-categories" && <RoomCategoriesTab items={roomCategories} />}

      {/* ───────────────── Travel: Amenities ───────────────── */}
      {activeTab === "amenities" && <AmenitiesTab items={amenities} />}

      {/* Fallback for other module tabs */}
      {activeTab !== "business-features" &&
        activeTab !== "property-features" &&
        activeTab !== "food-features" &&
        activeTab !== "dietary" &&
        activeTab !== "room-types" &&
        activeTab !== "room-categories" &&
        activeTab !== "amenities" && (
          <GenericClassificationTab moduleId={moduleId} tabId={activeTab} />
        )}

      {/* Add Feature Dialog */}
      {addFeatureOpen && (
        <AddFeatureDialog
          open={addFeatureOpen}
          onOpenChange={setAddFeatureOpen}
          onAddFeature={handleAddFeature}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Business / Hierarchical Features Tab Implementation
// ─────────────────────────────────────────────────────────────
function BusinessFeaturesTab({
  features,
  onOpenAdd,
  canAdd,
  entityNamePlural = "features",
  searchPlaceholder = "Search business features...",
}: {
  features: typeof TRAVEL_BUSINESS_FEATURES_HIERARCHICAL;
  onOpenAdd: () => void;
  canAdd: boolean;
  entityNamePlural?: string;
  searchPlaceholder?: string;
}) {
  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items: features,
    searchFields: ["name", "slug", "categoryTag"],
    isHierarchical: true,
    initialPageSize: 10,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={searchPlaceholder}
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural={entityNamePlural}
        onAddClick={onOpenAdd}
        addLabel="Add Feature"
        canAdd={canAdd}
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural={entityNamePlural}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
          onAddClick={onOpenAdd}
          addLabel="Add Feature"
        />
      ) : (
        <>
          <ClassificationHierarchyList items={paginatedItems} />
          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural={entityNamePlural}
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Room Types Tab Implementation
// ─────────────────────────────────────────────────────────────
function RoomTypesTab({ items }: { items: TaxonomyRoomTypeItem[] }) {
  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items,
    searchFields: ["name", "slug", "capacity"],
    initialPageSize: 6,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search room types..."
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural="types"
        addLabel="Add Room Type"
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural="room types"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {paginatedItems.map((room) => (
              <Card
                key={room.id}
                variant="glass"
                className="border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 p-4 transition-all hover:border-slate-300 dark:hover:border-white/20 shadow-xs"
              >
                <CardContent className="p-0 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base dark:text-white text-slate-900 leading-tight">
                        {room.name}
                      </h4>
                      <p className="text-xs font-mono dark:text-white/60 text-slate-500 mt-1">
                        slug: {room.slug}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20 shrink-0">
                      {room.capacity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t dark:border-white/10 border-slate-200/80 text-xs dark:text-white/60 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Bed className="size-3.5 text-orange-500" />
                      Standard classification
                    </span>
                    <span
                      className={`font-medium capitalize ${
                        room.status === "active"
                          ? "text-emerald-500 dark:text-emerald-400"
                          : "text-slate-400"
                      }`}
                    >
                      {room.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural="room types"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Room Categories Tab Implementation
// ─────────────────────────────────────────────────────────────
function RoomCategoriesTab({ items }: { items: TaxonomyRoomCategoryItem[] }) {
  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items,
    searchFields: ["name", "slug", "tier"],
    initialPageSize: 6,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search room categories..."
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural="categories"
        addLabel="Add Category"
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural="room categories"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {paginatedItems.map((cat) => (
              <Card
                key={cat.id}
                variant="glass"
                className="border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 p-4 transition-all hover:border-slate-300 dark:hover:border-white/20 shadow-xs"
              >
                <CardContent className="p-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-sm sm:text-base dark:text-white text-slate-900 leading-tight">
                      {cat.name}
                    </h4>
                    <span className="text-xs px-2.5 py-0.5 rounded-full dark:bg-emerald-950/50 bg-emerald-50 text-emerald-500 dark:text-emerald-400 border dark:border-emerald-500/20 border-emerald-200 shrink-0">
                      Tier: {cat.tier}
                    </span>
                  </div>
                  <p className="text-xs font-mono dark:text-white/60 text-slate-500">
                    slug: {cat.slug}
                  </p>
                  <div className="pt-2 text-xs font-mono dark:text-white/40 text-slate-400 flex items-center justify-between border-t dark:border-white/5 border-slate-100">
                    <span className="flex items-center gap-1">
                      <Tag className="size-3 text-orange-500" />
                      Tag: travel_room_category
                    </span>
                    <span className="text-emerald-500 dark:text-emerald-400 font-medium capitalize">
                      {cat.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural="room categories"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Amenities Tab Implementation
// ─────────────────────────────────────────────────────────────
function AmenitiesTab({ items }: { items: TaxonomyAmenityItem[] }) {
  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items,
    searchFields: ["name", "slug", "group"],
    initialPageSize: 12,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search amenities..."
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural="amenities"
        addLabel="Add Amenity"
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural="amenities"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {paginatedItems.map((amenity) => (
              <div
                key={amenity.id}
                className="flex flex-col items-center justify-center p-3 text-center rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 hover:border-slate-300 dark:hover:border-white/20 transition-all shadow-xs"
              >
                <Sparkles className="size-5 text-orange-500 mb-1.5" />
                <span className="text-xs font-medium dark:text-white text-slate-900 truncate w-full">
                  {amenity.name}
                </span>
                <span className="text-[10px] dark:text-white/40 text-slate-400 mt-0.5">
                  {amenity.group}
                </span>
                <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-medium mt-1">
                  Active
                </span>
              </div>
            ))}
          </div>

          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural="amenities"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Dietary Options Tab (Food module)
// ─────────────────────────────────────────────────────────────
function DietaryTab({ options }: { options: typeof FOOD_DIETARY_OPTIONS }) {
  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items: options,
    searchFields: ["name", "slug", "categoryTag"],
    initialPageSize: 8,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search dietary options..."
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural="dietary options"
        addLabel="Add Dietary Option"
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural="dietary options"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 flex items-center justify-between shadow-xs"
              >
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm dark:text-white text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-mono dark:text-white/40 text-slate-400 mt-0.5">
                    {item.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full dark:bg-sky-950/50 bg-sky-50 dark:text-sky-300 text-sky-700 border dark:border-sky-500/20 border-sky-200">
                    {item.categoryTag}
                  </span>
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                </div>
              </div>
            ))}
          </div>

          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural="dietary options"
          />
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Generic Classification Tab for extensible modules
// ─────────────────────────────────────────────────────────────
function GenericClassificationTab({
  moduleId,
  tabId,
}: {
  moduleId: ClassificationModuleId;
  tabId: string;
}) {
  const genericItems = [
    { id: `${tabId}-1`, name: "Standard Level Tier", slug: "standard-level", status: "active" as const },
    { id: `${tabId}-2`, name: "Premium Enterprise Tier", slug: "premium-enterprise", status: "active" as const },
    { id: `${tabId}-3`, name: "Custom Partner Option", slug: "custom-partner", status: "inactive" as const },
  ];

  const {
    filteredItems,
    paginatedItems,
    pagination,
    search,
    setSearch,
    status,
    setStatus,
    setPage,
    resetFilters,
    hasActiveFilters,
    isSearching,
  } = useClassificationFilter({
    items: genericItems,
    searchFields: ["name", "slug"],
    initialPageSize: 10,
  });

  return (
    <div className="space-y-3">
      <ClassificationToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={`Search ${tabId.replace("-", " ")}...`}
        status={status}
        onStatusChange={setStatus}
        totalCount={filteredItems.length}
        entityNamePlural="entries"
        addLabel="Add Entry"
        isSearching={isSearching}
      />

      {filteredItems.length === 0 ? (
        <ClassificationEmptyState
          entityNamePlural="entries"
          hasActiveFilters={hasActiveFilters}
          onResetFilters={resetFilters}
        />
      ) : (
        <>
          <div className="space-y-2">
            {paginatedItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm dark:text-white text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-mono dark:text-white/40 text-slate-400 mt-0.5">
                    module: {moduleId} / tab: {tabId}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium capitalize ${
                    item.status === "active" ? "text-emerald-500" : "text-slate-400"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          <ClassificationPagination
            pagination={pagination}
            onPageChange={setPage}
            entityNamePlural="entries"
          />
        </>
      )}
    </div>
  );
}
