"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, Layers, Tag, XCircle } from "lucide-react";
import type { HierarchicalClassificationItem } from "./types";

export interface ClassificationHierarchyListProps {
  items: HierarchicalClassificationItem[];
  onToggleStatus?: (id: string, currentStatus: "active" | "inactive") => void;
  entityNamePlural?: string;
}

export function ClassificationHierarchyList({
  items,
  onToggleStatus,
}: ClassificationHierarchyListProps) {
  // Track expanded parent IDs (all expanded by default for quick scanning)
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    items.forEach((item) => {
      initial[item.id] = true;
    });
    return initial;
  });

  const toggleParent = (id: string) => {
    setExpandedParents((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="space-y-3">
      {items.map((parent) => {
        const isExpanded = expandedParents[parent.id] !== false;
        const children = parent.children || [];

        return (
          <div
            key={parent.id}
            className="overflow-hidden rounded-2xl border dark:border-white/10 border-slate-200/80 dark:bg-[#081a2e]/60 bg-white/90 backdrop-blur-xl shadow-xs transition-all hover:border-slate-300 dark:hover:border-white/20"
          >
            {/* Parent Header Row */}
            <div
              onClick={() => toggleParent(parent.id)}
              className="flex items-center justify-between p-3 sm:p-4 cursor-pointer dark:bg-[#061423]/70 bg-slate-50/80 border-b dark:border-white/5 border-slate-200/60 select-none touch-manipulation"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <button
                  type="button"
                  aria-label={isExpanded ? "Collapse category" : "Expand category"}
                  className="p-1 rounded-lg text-slate-400 dark:text-white/40 hover:text-orange-500 transition-colors"
                >
                  {isExpanded ? (
                    <ChevronDown className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>

                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 shrink-0">
                    <Layers className="size-3.5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs sm:text-sm dark:text-white text-slate-900 leading-tight truncate">
                      {parent.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono dark:text-white/40 text-slate-400 mt-0.5">
                      slug: {parent.slug}
                    </p>
                  </div>
                </div>
              </div>

              {/* Parent Metadata Badges */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                {parent.categoryTag && (
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium dark:bg-sky-950/50 bg-sky-50 dark:text-sky-300 text-sky-700 border dark:border-sky-500/20 border-sky-200">
                    {parent.categoryTag}
                  </span>
                )}

                <span className="text-[11px] font-medium dark:text-white/60 text-slate-500 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md">
                  {children.length} {children.length === 1 ? "child feature" : "child features"}
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium ${
                    parent.status === "active"
                      ? "text-emerald-500 dark:text-emerald-400"
                      : "text-slate-400 dark:text-white/40"
                  }`}
                >
                  {parent.status === "active" ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : (
                    <XCircle className="size-3.5" />
                  )}
                  <span className="hidden sm:inline capitalize">{parent.status}</span>
                </span>
              </div>
            </div>

            {/* Children List */}
            {isExpanded && (
              <div className="divide-y dark:divide-white/5 divide-slate-100">
                {children.length === 0 ? (
                  <div className="p-4 text-center text-xs dark:text-white/40 text-slate-400">
                    No matching child features found under this group.
                  </div>
                ) : (
                  children.map((child) => (
                    <div
                      key={child.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:px-4 sm:py-3 gap-2 dark:hover:bg-white/5 hover:bg-slate-50/60 transition-colors"
                    >
                      {/* Left: Child Name & Slug */}
                      <div className="flex items-center gap-2.5 pl-6 sm:pl-7 min-w-0">
                        <div className="size-1.5 rounded-full bg-orange-500/80 shrink-0" />
                        <div className="min-w-0">
                          <h4 className="font-medium text-xs sm:text-sm dark:text-white text-slate-900 leading-snug truncate">
                            {child.name}
                          </h4>
                          <p className="text-[10px] font-mono dark:text-white/40 text-slate-400 truncate">
                            slug: {child.slug}
                          </p>
                        </div>
                      </div>

                      {/* Right: Category tag, Usage count, Status */}
                      <div className="flex items-center justify-between sm:justify-end gap-2.5 sm:gap-4 pl-6 sm:pl-0 pt-1 sm:pt-0 border-t sm:border-t-0 dark:border-white/5 border-slate-100 shrink-0">
                        {child.categoryTag && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium dark:bg-sky-950/50 bg-sky-50 dark:text-sky-300 text-sky-700 border dark:border-sky-500/20 border-sky-200">
                            <Tag className="size-2.5 opacity-60" />
                            <span>{child.categoryTag}</span>
                          </span>
                        )}

                        {child.usageCount !== undefined && (
                          <span className="dark:text-white/60 text-slate-500 font-mono text-[11px]">
                            {child.usageCount} items
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            onToggleStatus?.(
                              child.id,
                              child.status === "active" ? "active" : "inactive"
                            )
                          }
                          aria-label={`Status is ${child.status}. Click to toggle.`}
                          className={`inline-flex items-center gap-1 text-xs font-medium cursor-pointer transition-opacity hover:opacity-80 ${
                            child.status === "active"
                              ? "text-emerald-500 dark:text-emerald-400"
                              : "text-slate-400 dark:text-white/40"
                          }`}
                        >
                          {child.status === "active" ? (
                            <CheckCircle2 className="size-3.5" />
                          ) : (
                            <XCircle className="size-3.5" />
                          )}
                          <span className="capitalize">{child.status}</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
