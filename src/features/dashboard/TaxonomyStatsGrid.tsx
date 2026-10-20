"use client";

import { FolderTree, Layers, Settings2, Bed } from "lucide-react";
import type { DashboardStats } from "./types";

interface TaxonomyStatsGridProps {
  stats: DashboardStats;
}

export function TaxonomyStatsGrid({ stats }: TaxonomyStatsGridProps) {
  const cards = [
    {
      id: "stat-categories",
      title: "Categories",
      count: stats.categories,
      description: "Top level travel categories",
      icon: FolderTree,
      iconBg: "dark:bg-purple-950/40 bg-purple-50 border dark:border-purple-500/30 border-purple-200 dark:text-purple-400 text-purple-700",
    },
    {
      id: "stat-subtypes",
      title: "Subtypes",
      count: stats.subtypes,
      description: "Total sub categories",
      icon: Layers,
      iconBg: "dark:bg-blue-950/40 bg-blue-50 border dark:border-blue-500/30 border-blue-200 dark:text-blue-400 text-blue-700",
    },
    {
      id: "stat-business-features",
      title: "Business features",
      count: stats.businessFeatures,
      description: "Feature tags for listings",
      icon: Settings2,
      iconBg: "dark:bg-emerald-950/40 bg-emerald-50 border dark:border-emerald-500/30 border-emerald-200 dark:text-emerald-400 text-emerald-700",
    },
    {
      id: "stat-room-attributes",
      title: "Room attributes",
      count: stats.roomAttributes,
      description: "Attributes for room types",
      icon: Bed,
      iconBg: "dark:bg-amber-950/40 bg-amber-50 border dark:border-amber-500/30 border-amber-200 dark:text-amber-400 text-amber-700",
    },
  ];

  return (
    <section aria-label="Taxonomy metrics" className="grid grid-cols-1 min-[340px]:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 shrink-0">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative flex flex-col justify-between rounded-xl border dark:border-white/10 border-slate-200/80 dark:bg-[#092238]/60 bg-white/80 p-2.5 sm:p-3 shadow-xs dark:shadow-[0_4px_14px_rgba(0,0,0,0.2)] hover:border-slate-300 dark:hover:border-white/20 hover:-translate-y-0.5 transition-all backdrop-blur-md"
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg shadow-inner ${card.iconBg}`}>
                <Icon className="size-4" />
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight dark:text-white text-slate-900 leading-tight">
                {card.count}
              </span>
            </div>
            <div className="mt-2 flex flex-col min-w-0">
              <span className="text-xs font-semibold dark:text-white/85 text-slate-700 leading-snug break-words">
                {card.title}
              </span>
              <span className="text-[10px] dark:text-white/50 text-slate-400 leading-tight mt-0.5 break-words">
                {card.description}
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
