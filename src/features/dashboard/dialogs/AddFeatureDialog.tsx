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
import { Sparkles, Loader2 } from "lucide-react";
import type { TaxonomyFeatureItem } from "../types";

interface AddFeatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFeature: (feature: Omit<TaxonomyFeatureItem, "id">) => void;
}

const CATEGORY_OPTIONS = [
  "Recreation",
  "Connectivity",
  "Utilities",
  "Activities",
  "Culinary",
  "Transit",
  "Wellness",
];

export function AddFeatureDialog({
  open,
  onOpenChange,
  onAddFeature,
}: AddFeatureDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Recreation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a feature name");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onAddFeature({
        name: name.trim(),
        slug: name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-"),
        category,
        count: 0,
        status: "active",
      });

      setName("");
      setCategory("Recreation");
      setError("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 200);
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
            <DialogTitle className="text-xl font-bold dark:text-white text-slate-900">
              Add Business Feature
            </DialogTitle>
          </div>
          <DialogDescription className="text-xs dark:text-white/60 text-slate-500">
            Define a standard listing amenity or facility tag for travel classifications.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {error && (
            <div className="rounded-lg bg-rose-500/10 border border-rose-500/25 px-3 py-2 text-xs text-rose-500 font-medium">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="feature-name" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              Feature Name *
            </Label>
            <Input
              id="feature-name"
              placeholder="e.g. Infinity Pool, Solar Powered, Free Breakfast"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 text-sm dark:text-white text-slate-900"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="feature-category" className="text-xs font-semibold dark:text-white/80 text-slate-700">
              Category Tag *
            </Label>
            <Select
              value={category}
              onValueChange={(val) => setCategory(val)}
            >
              <SelectTrigger
                id="feature-category"
                className="w-full rounded-xl border dark:border-white/15 border-slate-200 dark:bg-[#061423]/80 bg-slate-50 px-3.5 h-10 text-sm dark:text-white text-slate-900 focus:border-orange-500"
              >
                <SelectValue placeholder="Select category tag" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="pt-2 gap-2 sm:gap-0">
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
              disabled={isSubmitting}
              className="rounded-xl text-xs font-semibold text-white gap-1.5"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add Feature</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
