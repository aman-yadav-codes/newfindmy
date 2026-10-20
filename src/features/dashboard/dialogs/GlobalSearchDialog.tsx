"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/glass/dialog";
import { Search, Tent, PawPrint, Home, Building2, Sparkles, ArrowRight } from "lucide-react";
import type { TaxonomyCategory } from "../types";

interface GlobalSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: TaxonomyCategory[];
  onSelectCategory?: (categoryId: string) => void;
}

export function GlobalSearchDialog({
  open,
  onOpenChange,
  categories,
  onSelectCategory,
}: GlobalSearchDialogProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.slug.toLowerCase().includes(query.toLowerCase()) ||
      c.subtypes.some((s) => s.name.toLowerCase().includes(query.toLowerCase()))
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "tent":
        return <Tent className="size-4 text-orange-400" />;
      case "paw":
        return <PawPrint className="size-4 text-orange-400" />;
      case "home":
        return <Home className="size-4 text-orange-400" />;
      case "hotel":
        return <Building2 className="size-4 text-orange-400" />;
      default:
        return <Sparkles className="size-4 text-orange-400" />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        variant="crystal"
        className="p-0 w-[calc(100vw-2rem)] sm:max-w-xl max-h-[85dvh] dark:border-white/15 border-slate-200/80 dark:bg-[#08182b]/95 bg-white/95 backdrop-blur-2xl dark:text-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden"
      >
        <div className="flex items-center gap-3 border-b dark:border-white/10 border-slate-200 px-4 py-3 dark:bg-white/5 bg-slate-50/80">
          <Search className="size-5 dark:text-white/50 text-slate-400" />
          <input
            placeholder="Type to search categories, subtypes, business features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:outline-none"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center rounded border dark:border-white/20 border-slate-300 dark:bg-white/10 bg-slate-100 px-1.5 py-0.5 text-[10px] dark:text-white/60 text-slate-600">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y dark:divide-white/5 divide-slate-100">
          {filteredCategories.length === 0 ? (
            <div className="p-8 text-center text-sm dark:text-white/40 text-slate-400">
              No categories or subtypes matched &quot;{query}&quot;
            </div>
          ) : (
            filteredCategories.map((c) => (
              <div
                key={c.id}
                role="button"
                tabIndex={0}
                onClick={() => {
                  onSelectCategory?.(c.id);
                  onOpenChange(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectCategory?.(c.id);
                    onOpenChange(false);
                  }
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-orange-500/15 border border-orange-500/25">
                    {getIcon(c.icon)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-medium dark:text-white text-slate-800 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                      {c.name}
                    </span>
                    <span className="text-xs dark:text-white/50 text-slate-500 font-mono">
                      {c.slug} • {c.subtypesCount} subtypes
                    </span>
                  </div>
                </div>
                <ArrowRight className="size-4 dark:text-white/30 text-slate-400 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
