"use client";

import { useState, useTransition } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { DashboardHeader } from "./DashboardHeader";
import { TaxonomyStatsGrid } from "./TaxonomyStatsGrid";
import { TaxonomyWorkspace } from "./TaxonomyWorkspace";
import {
  initialCategories,
  initialStats,
  initialBusinessFeatures,
  initialRoomTypes,
  initialRoomCategories,
  initialAmenities,
} from "./dashboard-data";
import { MODULE_TABS } from "./classification/classification-data";
import type { TaxonomyCategory } from "./types";
import type { ClassificationModuleId } from "./classification/types";

// Lazy-load crystal dialog overlays with ssr: false (Zero TBT rule)
const AddCategoryDialog = dynamic(
  () => import("./dialogs/AddCategoryDialog").then((m) => m.AddCategoryDialog),
  { ssr: false }
);

const AddSubtypeDialog = dynamic(
  () => import("./dialogs/AddSubtypeDialog").then((m) => m.AddSubtypeDialog),
  { ssr: false }
);

const ImportTaxonomyDialog = dynamic(
  () => import("./dialogs/ImportTaxonomyDialog").then((m) => m.ImportTaxonomyDialog),
  { ssr: false }
);

interface DashboardClientProps {
  onRegisterSearchTrigger?: (trigger: () => void) => void;
}

export function DashboardClient({}: DashboardClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const urlModule = searchParams.get("module") as ClassificationModuleId | null;
  const validModules: ClassificationModuleId[] = [
    "travel",
    "food",
    "property",
    "services",
    "transport",
    "entertainment",
  ];
  const activeModule: ClassificationModuleId =
    urlModule && validModules.includes(urlModule) ? urlModule : "travel";

  const [currentModule, setCurrentModule] = useState<ClassificationModuleId>(activeModule);
  const [categories, setCategories] = useState<TaxonomyCategory[]>(initialCategories);
  const [stats, setStats] = useState(initialStats);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);
  const [addSubtypeOpen, setAddSubtypeOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [targetCategoryId, setTargetCategoryId] = useState<string | undefined>(undefined);

  const handleModuleChange = (newMod: ClassificationModuleId) => {
    setCurrentModule(newMod);
    const params = new URLSearchParams(searchParams.toString());
    params.set("module", newMod);
    const modTabs = MODULE_TABS[newMod] || MODULE_TABS.travel;
    params.set("tab", modTabs[0].id);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const handleAddCategory = (newCat: Partial<TaxonomyCategory>) => {
    const created: TaxonomyCategory = {
      id: `cat-${Date.now()}`,
      name: newCat.name || "New Category",
      slug: newCat.slug || "new-category",
      icon: newCat.icon || "tent",
      image: newCat.image || "/images/dashboard/bush-camps.jpg",
      status: "active",
      subtypesCount: 0,
      subtypes: [],
    };

    setCategories((prev) => [created, ...prev]);
    setStats((prev) => ({
      ...prev,
      categories: prev.categories + 1,
    }));
  };

  const handleOpenAddSubtype = (categoryId?: string) => {
    setTargetCategoryId(categoryId || categories[0]?.id);
    setAddSubtypeOpen(true);
  };

  const handleAddSubtype = (categoryId: string, name: string, slug: string) => {
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id === categoryId) {
          const newSub = {
            id: `sub-${Date.now()}`,
            name,
            slug,
            icon: cat.icon,
            image: cat.image,
            status: "active" as const,
          };
          return {
            ...cat,
            subtypesCount: cat.subtypesCount + 1,
            subtypes: [...cat.subtypes, newSub],
          };
        }
        return cat;
      })
    );

    setStats((prev) => ({
      ...prev,
      subtypes: prev.subtypes + 1,
    }));
  };

  const handleUpdateCategoryStatus = (categoryId: string, status: "active" | "inactive") => {
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, status } : c))
    );
  };

  const handleDeleteCategory = (categoryId: string) => {
    const target = categories.find((c) => c.id === categoryId);
    if (!target) return;

    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    setStats((prev) => ({
      ...prev,
      categories: Math.max(0, prev.categories - 1),
      subtypes: Math.max(0, prev.subtypes - target.subtypesCount),
    }));
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col space-y-2.5 sm:space-y-3">
      {/* 1. Header with Module Switcher, Breadcrumb, H1 Title, and Primary Actions */}
      <DashboardHeader
        currentModule={currentModule}
        onModuleChange={handleModuleChange}
        onOpenImport={() => setImportOpen(true)}
        onOpenAddCategory={() => setAddCategoryOpen(true)}
      />

      {/* 2. Four Statistics Cards */}
      <TaxonomyStatsGrid stats={stats} />

      {/* 3. Taxonomy Workspace with Tabs, Filters, and Expandable Categories */}
      <TaxonomyWorkspace
        moduleId={currentModule}
        categories={categories}
        features={initialBusinessFeatures}
        roomTypes={initialRoomTypes}
        roomCategories={initialRoomCategories}
        amenities={initialAmenities}
        onOpenAddSubtype={handleOpenAddSubtype}
        onUpdateCategoryStatus={handleUpdateCategoryStatus}
        onDeleteCategory={handleDeleteCategory}
      />

      {/* 4. Crystal Dialog Overlays */}
      {addCategoryOpen && (
        <AddCategoryDialog
          open={addCategoryOpen}
          onOpenChange={setAddCategoryOpen}
          onAddCategory={handleAddCategory}
        />
      )}

      {addSubtypeOpen && (
        <AddSubtypeDialog
          open={addSubtypeOpen}
          onOpenChange={setAddSubtypeOpen}
          categories={categories}
          defaultCategoryId={targetCategoryId}
          onAddSubtype={handleAddSubtype}
        />
      )}

      {importOpen && (
        <ImportTaxonomyDialog
          open={importOpen}
          onOpenChange={setImportOpen}
          onImportSuccess={() => {
            // Success handler
          }}
        />
      )}
    </div>
  );
}
