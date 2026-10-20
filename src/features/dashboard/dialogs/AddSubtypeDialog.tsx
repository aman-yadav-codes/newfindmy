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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/glass/select";
import type { TaxonomyCategory } from "../types";

interface AddSubtypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: TaxonomyCategory[];
  defaultCategoryId?: string;
  onAddSubtype: (categoryId: string, subtypeName: string, subtypeSlug: string) => void;
}

export function AddSubtypeDialog({
  open,
  onOpenChange,
  categories,
  defaultCategoryId,
  onAddSubtype,
}: AddSubtypeDialogProps) {
  const [selectedCatId, setSelectedCatId] = useState(defaultCategoryId || categories[0]?.id || "");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
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
      setError("Please enter a subtype name");
      return;
    }

    const catId = selectedCatId || defaultCategoryId || categories[0]?.id;
    if (!catId) {
      setError("Please select a parent category");
      return;
    }

    onAddSubtype(catId, name.trim(), slug || name.toLowerCase().replace(/\s+/g, "-"));
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
          <DialogTitle className="text-xl font-bold dark:text-white text-slate-900">Add Taxonomy Subtype</DialogTitle>
          <DialogDescription className="text-xs dark:text-white/60 text-slate-500">
            Add a specialized child classification subtype under a travel category.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {error && (
            <div className="rounded-lg bg-rose-500/10 border border-rose-500/25 p-2.5 text-xs text-rose-500 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="parent-category" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              Parent Category
            </Label>
            <Select
              value={selectedCatId || defaultCategoryId || categories[0]?.id || ""}
              onValueChange={(val) => setSelectedCatId(val)}
            >
              <SelectTrigger
                id="parent-category"
                className="w-full rounded-xl border dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 px-3.5 h-10 text-sm dark:text-white text-slate-900 focus:border-orange-500"
              >
                <SelectValue placeholder="Select parent category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sub-name" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              Subtype Name *
            </Label>
            <Input
              id="sub-name"
              placeholder="e.g. Eco Pods & Treehouse Stays"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 text-sm dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-orange-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="sub-slug" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              URL Slug *
            </Label>
            <Input
              id="sub-slug"
              placeholder="eco-pods-treehouse-stays"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 text-xs font-mono dark:text-white text-slate-900 placeholder:text-slate-400 dark:placeholder:text-white/40 focus:border-orange-500"
              required
            />
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
              Add Subtype
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
