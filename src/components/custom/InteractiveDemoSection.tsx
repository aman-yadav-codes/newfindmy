"use client";

import { Button } from "@/components/ui/glass/button";
import { Input } from "@/components/ui/glass/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/glass/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/glass/select";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/glass/sonner";

export function InteractiveDemoSection() {
  return (
    <>
      <Toaster />
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Modal Dialog Trigger */}
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="Open glass dialog preview modal"
              className="glass-bg rounded-lg py-6 px-4 text-center transition-opacity hover:opacity-90 w-full cursor-pointer"
            >
              <div className="font-semibold text-foreground">Open Dialog</div>
              <div className="text-xs text-muted-foreground mt-1">Glass modal overlay</div>
            </button>
          </DialogTrigger>
          <DialogContent variant="default" animated={false} className="max-w-md glass-dialog-panel border-[var(--glass-frosted-border)] text-foreground shadow-[var(--glass-frosted-shadow)]">
            <DialogHeader>
              <DialogTitle>Glass Dialog</DialogTitle>
              <DialogDescription>
                A frosted glass modal with form controls inside.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input variant="glass" placeholder="Your name" aria-label="Your full name" />
              <Select>
                <SelectTrigger variant="glass" aria-label="Pick an option from the dropdown">
                  <SelectValue placeholder="Pick an option" />
                </SelectTrigger>
                <SelectContent variant="glass">
                  <SelectItem value="a">Option A</SelectItem>
                  <SelectItem value="b">Option B</SelectItem>
                  <SelectItem value="c">Option C</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2 justify-end">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="glass">Confirm</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Success Toast Trigger */}
        <button
          type="button"
          aria-label="Show glass toast notification"
          className="glass-bg rounded-lg py-6 px-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          onClick={() =>
            toast.success("Success!", {
              description: "This is an authentic glass toast notification.",
            })
          }
        >
          <div className="font-semibold text-foreground">Show Toast</div>
          <div className="text-xs text-muted-foreground mt-1">Success notification</div>
        </button>

        {/* Action Toast Trigger */}
        <button
          type="button"
          aria-label="Show action toast notification with interactive button"
          className="glass-bg rounded-lg py-6 px-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          onClick={() =>
            toast("New update available", {
              description: "Glass UI v2.0 includes 10 new components.",
              action: {
                label: "View",
                onClick: () => window.open("/docs/getting-started", "_blank"),
              },
            })
          }
        >
          <div className="font-semibold text-foreground">Action Toast</div>
          <div className="text-xs text-muted-foreground mt-1">Toast with button</div>
        </button>
      </div>
    </>
  );
}
