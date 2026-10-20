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
import { UploadCloud, CheckCircle2, FileCode } from "lucide-react";

interface ImportTaxonomyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess?: () => void;
}

export function ImportTaxonomyDialog({
  open,
  onOpenChange,
  onImportSuccess,
}: ImportTaxonomyDialogProps) {
  const [dragActive, setDragActive] = useState(false);
  const [imported, setImported] = useState(false);

  const handleSimulatedImport = () => {
    setImported(true);
    setTimeout(() => {
      setImported(false);
      onImportSuccess?.();
      onOpenChange(false);
    }, 1200);
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
              <UploadCloud className="size-4" />
            </span>
            <DialogTitle className="text-xl font-bold dark:text-white text-slate-900">Import Travel Taxonomy</DialogTitle>
          </div>
          <DialogDescription className="text-xs dark:text-white/60 text-slate-500">
            Upload classification schemas, SQL seed files, or CSV batches to sync travel categories and attributes.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {imported ? (
            <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center">
              <CheckCircle2 className="size-10 text-emerald-500 dark:text-emerald-400 mb-2 animate-bounce" />
              <p className="text-sm font-semibold dark:text-white text-slate-900">Taxonomy Synced Successfully</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-300 mt-1">Updated 5 categories and 29 subtypes</p>
            </div>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                handleSimulatedImport();
              }}
              className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
                dragActive
                  ? "border-orange-500 bg-orange-500/15"
                  : "dark:border-white/20 border-slate-300 dark:bg-white/5 bg-slate-50 hover:border-orange-400 dark:hover:border-white/30 hover:bg-slate-100/80 dark:hover:bg-white/10"
              }`}
              onClick={handleSimulatedImport}
            >
              <UploadCloud className="size-10 text-orange-500 dark:text-orange-400 mb-2" />
              <p className="text-sm font-semibold dark:text-white text-slate-900">Drop your classification JSON or CSV</p>
              <p className="text-xs dark:text-white/50 text-slate-500 mt-1">or click to browse your local filesystem</p>
              <div className="mt-4 flex items-center gap-2 text-[10px] dark:text-white/40 text-slate-400">
                <FileCode className="size-3.5" />
                <span>Supports SQL, CSV, JSON taxonomies up to 50MB</span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button
            type="button"
            variant="glass"
            onClick={() => onOpenChange(false)}
            className="dark:border-white/15 border-slate-200 dark:text-white/80 text-slate-700 text-xs rounded-xl"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
