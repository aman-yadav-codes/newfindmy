"use client";

import { Upload, Plus } from "lucide-react";
import { Button } from "@/components/ui/glass/button";
import { ClassificationModuleSelector } from "./classification/ClassificationModuleSelector";
import { CLASSIFICATION_MODULES } from "./classification/classification-data";
import type { ClassificationModuleId } from "./classification/types";

interface DashboardHeaderProps {
  currentModule?: ClassificationModuleId;
  onModuleChange?: (module: ClassificationModuleId) => void;
  onOpenImport: () => void;
  onOpenAddCategory: () => void;
}

export function DashboardHeader({
  currentModule = "travel",
  onModuleChange,
  onOpenImport,
  onOpenAddCategory,
}: DashboardHeaderProps) {
  const currentInfo =
    CLASSIFICATION_MODULES.find((m) => m.id === currentModule) ||
    CLASSIFICATION_MODULES[0];

  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 shrink-0">
      {/* Title & Breadcrumbs with Module Selector */}
      <div>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-[11px] font-medium dark:text-white/50 text-slate-400 mb-1"
        >
          {onModuleChange ? (
            <ClassificationModuleSelector
              currentModule={currentModule}
              onModuleChange={onModuleChange}
            />
          ) : (
            <span>{currentInfo.name}</span>
          )}
          <span>/</span>
          <span className="dark:text-white/80 text-slate-700 font-semibold">Classification</span>
        </nav>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight dark:text-white text-slate-900 leading-tight">
          {currentInfo.name} taxonomy
        </h1>
        <p className="mt-0.5 text-xs dark:text-white/60 text-slate-500">
          {currentInfo.description}
        </p>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
        <Button
          type="button"
          onClick={onOpenImport}
          variant="glass"
          effect="lift"
          className="dark:border-white/15 border-slate-200 dark:bg-white/5 bg-slate-100/90 dark:hover:bg-white/10 hover:bg-slate-200/80 dark:text-white text-slate-800 text-xs rounded-xl px-3 py-1.5 h-9 sm:h-8 gap-1.5 shadow-xs cursor-pointer touch-manipulation justify-center"
        >
          <Upload className="size-3.5 dark:text-white/70 text-slate-500" />
          <span>Import</span>
        </Button>

        <Button
          type="button"
          onClick={onOpenAddCategory}
          variant="orange"
          className="rounded-xl text-xs font-semibold px-3.5 py-1.5 h-9 sm:h-8 shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 gap-1.5 cursor-pointer text-white touch-manipulation justify-center"
        >
          <Plus className="size-3.5" />
          <span>Add category</span>
        </Button>
      </div>
    </div>
  );
}
