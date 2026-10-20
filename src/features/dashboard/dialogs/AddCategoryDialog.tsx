"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/glass/dialog";
import { Button } from "@/components/ui/glass/button";
import { Input } from "@/components/ui/glass/input";
import { Label } from "@/components/ui/glass/label";
import { Tent, PawPrint, Home, Building2, Sparkles } from "lucide-react";
import type { CategoryIconType, TaxonomyCategory } from "../types";

interface AddCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCategory: (category: Partial<TaxonomyCategory>) => void;
}

export function AddCategoryDialog({
  open,
  onOpenChange,
  onAddCategory,
}: AddCategoryDialogProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [icon, setIcon] = useState<CategoryIconType>("tent");
  const [error, setError] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
    setSlug(generatedSlug);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a category name");
      return;
    }

    onAddCategory({
      name: name.trim(),
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      icon,
      image: "/images/dashboard/bush-camps.jpg",
      status: "active",
      subtypesCount: 0,
      subtypes: [],
    });

    setName("");
    setSlug("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        variant="crystal"
        className="w-[calc(100vw-2rem)] sm:max-w-md max-h-[90dvh] overflow-y-auto dark:border-white/15 border-slate-200/80 dark:bg-[#091f35]/95 bg-white/95 backdrop-blur-2xl dark:text-white text-slate-900 shadow-2xl rounded-2xl"
      >
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex size-7 items-center justify-center rounded-lg bg-orange-500/15 text-orange-500 border border-orange-500/25">
              <Sparkles className="size-4" />
            </span>
            <DialogTitle className="text-xl font-bold dark:text-white text-slate-900">Add Travel Category</DialogTitle>
          </div>
          <DialogDescription className="text-xs dark:text-white/60 text-slate-500">
            Create a top-level classification tier for travel accommodations and experiences.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="rounded-lg bg-rose-500/10 border border-rose-500/25 p-2.5 text-xs text-rose-500 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="cat-name" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              Category Name *
            </Label>
            <Input
              id="cat-name"
              placeholder="e.g. Eco Lodges & Off-Grid Stays"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 text-sm dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-orange-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="cat-slug" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              URL Slug *
            </Label>
            <Input
              id="cat-slug"
              placeholder="eco-lodges-off-grid-stays"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 text-xs font-mono dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-orange-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-semibold dark:text-white/80 text-slate-700">Category Icon</Label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { type: "tent" as CategoryIconType, icon: Tent, label: "Tent" },
                { type: "paw" as CategoryIconType, icon: PawPrint, label: "Safari" },
                { type: "home" as CategoryIconType, icon: Home, label: "Stay" },
                { type: "hotel" as CategoryIconType, icon: Building2, label: "Resort" },
                { type: "gem" as CategoryIconType, icon: Sparkles, label: "Gem" },
              ].map((item) => {
                const IconComponent = item.icon;
                const isSelected = icon === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setIcon(item.type)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-all ${
                      isSelected
                        ? "border-orange-500 bg-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold"
                        : "dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100/80 dark:text-white/70 text-slate-600 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:hover:text-white hover:text-slate-900"
                    }`}
                  >
                    <IconComponent className="size-5 mb-1" />
                    <span className="text-[10px]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="pt-3 gap-2 sm:gap-0">
            <Button
              type="button"
              variant="glass"
              onClick={() => onOpenChange(false)}
              className="dark:border-white/15 border-slate-200 dark:text-white/80 text-slate-700 text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="orange"
              className="rounded-xl text-xs font-semibold text-white shadow-lg shadow-orange-950/40"
            >
              Create Category
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
