"use client";

import {
  Plane,
  Building2,
  Utensils,
  Wrench,
  Car,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/glass/dropdown-menu";
import { CLASSIFICATION_MODULES } from "./classification-data";
import type { ClassificationModuleId } from "./types";

export interface ClassificationModuleSelectorProps {
  currentModule: ClassificationModuleId;
  onModuleChange: (module: ClassificationModuleId) => void;
}

export function ClassificationModuleSelector({
  currentModule,
  onModuleChange,
}: ClassificationModuleSelectorProps) {
  const getModuleIcon = (iconName: string, className: string = "size-3.5") => {
    switch (iconName) {
      case "Plane":
        return <Plane className={className} />;
      case "Building2":
        return <Building2 className={className} />;
      case "Utensils":
        return <Utensils className={className} />;
      case "Wrench":
        return <Wrench className={className} />;
      case "Car":
        return <Car className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const currentInfo =
    CLASSIFICATION_MODULES.find((m) => m.id === currentModule) ||
    CLASSIFICATION_MODULES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={`Current module: ${currentInfo.name}. Click to switch classification module.`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border dark:border-white/10 border-slate-200/80 dark:bg-white/5 bg-slate-100 text-xs font-semibold dark:text-white text-slate-800 dark:hover:bg-white/10 hover:bg-slate-200/80 transition-colors cursor-pointer touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
        >
          <span className="text-orange-500">
            {getModuleIcon(currentInfo.iconName, "size-3.5")}
          </span>
          <span>{currentInfo.name}</span>
          <ChevronDown className="size-3 text-slate-400 dark:text-white/40" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-64 p-1.5 rounded-xl dark:border-white/10 border-slate-200 dark:bg-[#071626]/98 bg-white/98 backdrop-blur-2xl shadow-xl"
      >
        <DropdownMenuLabel className="text-[11px] font-semibold text-slate-400 dark:text-white/50 px-2 py-1">
          Select Classification Module
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-white/10 bg-slate-200 my-1" />

        {CLASSIFICATION_MODULES.map((m) => {
          const isSelected = m.id === currentModule;
          return (
            <DropdownMenuItem
              key={m.id}
              onClick={() => onModuleChange(m.id)}
              className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                isSelected
                  ? "bg-orange-500/10 text-orange-500 font-semibold"
                  : "dark:hover:bg-white/5 hover:bg-slate-100 dark:text-white text-slate-800"
              }`}
            >
              <div
                className={`flex size-6 items-center justify-center rounded-md shrink-0 mt-0.5 ${
                  isSelected
                    ? "bg-orange-500 text-white"
                    : "dark:bg-white/5 bg-slate-100 text-slate-500 dark:text-white/60"
                }`}
              >
                {getModuleIcon(m.iconName, "size-3")}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold leading-tight">{m.name}</span>
                <span className="text-[10px] dark:text-white/50 text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {m.description}
                </span>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
