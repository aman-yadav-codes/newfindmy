"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Grid2X2,
  MapPin,
  ChevronDown,
} from "lucide-react"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { cn } from "@/lib/utils"
import {
  addListingOptions,
  type NavCategory,
} from "@/lib/findmy-nav"

interface MobileSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: NavCategory[]
  currentLocation: string
}

export function MobileSheet({
  open,
  onOpenChange,
  categories,
  currentLocation,
}: MobileSheetProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [addListingOpen, setAddListingOpen] = useState(false)

  const toggleCategory = (name: string) => {
    setExpandedCategory((prev) => (prev === name ? null : name))
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-menu"
        variant="glass"
        side="right"
        className="w-full max-w-[320px] sm:max-w-[380px] p-4 sm:p-6 overflow-y-auto"
      >
        <div className="flex flex-col gap-6 mt-4">
          {/* ───────────────── FindMy Brand ───────────────── */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <Link
              href="/"
              prefetch={false}
              onClick={() => onOpenChange(false)}
              className="flex flex-col select-none"
              aria-label="FindMy homepage"
            >
              <div className="flex items-baseline tracking-tight">
                <span className="text-2xl font-black text-foreground">Find</span>
                <span className="text-2xl font-black text-orange-500">My</span>
              </div>
              <span className="text-[10px] text-muted-foreground -mt-1 font-medium tracking-tight">
                find more. live more.
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle variant="glass" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-3 text-sm">
            <span className="flex items-center gap-2 text-muted-foreground"><MapPin aria-hidden="true" className="size-4" />{currentLocation.split(",")[0]}</span>
            <button type="button" disabled title="Sign-in is not connected yet" className="rounded-full border border-[var(--glass-border)] px-4 py-2 font-semibold text-foreground opacity-70">Sign In</button>
          </div>

          {/* ───────────────── Add Listing Expandable ───────────────── */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 overflow-hidden bg-slate-100/90 dark:bg-slate-900/60">
            <button
              type="button"
              onClick={() => setAddListingOpen((prev) => !prev)}
              className="flex items-center justify-between w-full p-3.5 text-left font-semibold text-foreground hover:bg-slate-200/60 dark:hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Grid2X2 className="h-4 w-4 text-orange-500" />
                <span className="text-sm">Add Listing</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform duration-200",
                  addListingOpen && "rotate-180"
                )}
              />
            </button>

            {addListingOpen && (
              <div className="flex flex-col gap-1 p-2 pt-0 border-t border-slate-200 dark:border-white/10">
                {addListingOptions.map((opt) => {
                  const Icon = opt.icon
                  return (
                    <Link
                      key={opt.title}
                      href={opt.href}
                      prefetch={false}
                      onClick={() => onOpenChange(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-white/10 transition-all text-left"
                    >
                      <div className="h-8 w-8 rounded-full bg-slate-200/80 dark:bg-white/10 flex items-center justify-center text-slate-800 dark:text-white shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {opt.title}
                        </span>
                        <span className="text-[10px] text-slate-600 dark:text-slate-300 truncate">
                          {opt.subtitle}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* ───────────────── Categories Navigation ───────────────── */}
          <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 mb-1">
              Explore Categories
            </span>
            {categories.map((cat) => {
              const isExpanded = expandedCategory === cat.name
              return (
                <div
                  key={cat.name}
                  className="rounded-xl border border-transparent hover:border-white/10 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleCategory(cat.name)}
                    className="flex items-center justify-between w-full px-3 py-2 text-left font-semibold text-sm text-foreground hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <span>{cat.name}</span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>

                  {isExpanded && (
                    <div className="flex flex-col gap-1 pl-4 pr-2 py-1 mt-1 border-l-2 border-white/20 ml-3">
                      {cat.subItems.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          prefetch={false}
                          onClick={() => onOpenChange(false)}
                          className="flex flex-col py-1.5 px-2 rounded-lg hover:bg-white/10 transition-colors"
                        >
                          <span className="text-xs font-medium text-foreground">
                            {sub.title}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {sub.subtitle}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

        </div>
      </SheetContent>
    </Sheet>
  )
}
