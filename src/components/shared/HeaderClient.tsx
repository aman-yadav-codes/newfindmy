"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Grid2X2,
  MapPin,
  ChevronDown,
  Menu,
  Check,
} from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  findMyNavCategories,
  addListingOptions,
  type NavCategory,
} from "@/lib/findmy-nav"

const MobileSheet = dynamic(
  () => import("./MobileSheet").then((m) => m.MobileSheet),
  { ssr: false }
)

const locations = [
  "Cape Town, South Africa",
  "Johannesburg, South Africa",
  "Durban, South Africa",
  "Pretoria, South Africa",
  "Gqeberha, South Africa",
]

export function HeaderClient({
  categories = findMyNavCategories,
}: {
  categories?: NavCategory[]
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState("Cape Town, South Africa")
  const headerRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name))
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div ref={headerRef} className="flex min-w-0 flex-1 items-center justify-between gap-2 md:gap-4">
      {/* ───────────────── Desktop Category Navigation ───────────────── */}
      <nav
        className="hidden lg:flex items-center gap-1 xl:gap-2"
        aria-label="FindMy main navigation"
      >
        {categories.map((cat) => {
          const isOpen = activeDropdown === cat.name
          return (
            <div key={cat.name} className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown(cat.name)}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                  isOpen
                    ? "bg-white/15 text-white"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                )}
              >
                <span>{cat.name}</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isOpen && "rotate-180 text-white"
                  )}
                />
              </button>

              {isOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-72 rounded-2xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150 backdrop-blur-[var(--blur-frosted)] bg-white/92 dark:bg-slate-950/92 border border-black/10 dark:border-white/15 shadow-2xl shadow-slate-900/15 dark:shadow-black/70"
                >
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Explore {cat.name}
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {cat.subItems.map((sub) => (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        prefetch={false}
                        role="menuitem"
                        onClick={closeDropdowns}
                        className="flex flex-col p-2.5 rounded-xl transition-colors hover:bg-slate-100/90 dark:hover:bg-white/10 text-left group"
                      >
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {sub.title}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 leading-tight">
                          {sub.subtitle}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* ───────────────── Right Action Controls ───────────────── */}
      <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Add Listing Dropdown (Proper Frosted Surface & Theme-Aware Contrast) */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => toggleDropdown("add-listing")}
            aria-expanded={activeDropdown === "add-listing"}
            aria-haspopup="true"
            aria-label="Add Listing options"
            className={cn(
              "flex items-center gap-2 h-9 px-3.5 sm:px-4 rounded-full border border-white/30 text-sm font-semibold text-white transition-colors cursor-pointer",
              activeDropdown === "add-listing"
                ? "bg-white/20 border-white/40"
                : "bg-white/10 hover:bg-white/20"
            )}
          >
            <Grid2X2 className="h-4 w-4 text-white" />
            <span className="hidden sm:inline">Add Listing</span>
            <span className="sm:hidden">Add</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-white/80 transition-transform duration-200",
                activeDropdown === "add-listing" && "rotate-180"
              )}
            />
          </button>

          {activeDropdown === "add-listing" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-80 sm:w-88 rounded-2xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150 backdrop-blur-[var(--blur-frosted)] bg-white/92 dark:bg-slate-950/92 border border-black/10 dark:border-white/15 shadow-2xl shadow-slate-900/15 dark:shadow-black/70"
            >
              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Create a New Listing
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {addListingOptions.map((opt) => {
                  const Icon = opt.icon
                  return (
                    <Link
                      key={opt.title}
                      href={opt.href}
                      prefetch={false}
                      role="menuitem"
                      onClick={closeDropdowns}
                      className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-slate-100/90 dark:hover:bg-white/10 transition-all text-left w-full group"
                    >
                      <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200/90 dark:border-white/15 flex items-center justify-center text-slate-800 dark:text-white group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {opt.title}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 leading-tight truncate">
                          {opt.subtitle}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Location Selector */}
        <div className="relative hidden md:block">
          <button
            type="button"
            onClick={() => toggleDropdown("location")}
            aria-expanded={activeDropdown === "location"}
            aria-haspopup="true"
            aria-label="Change location"
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <MapPin className="h-4 w-4" />
          </button>

          {activeDropdown === "location" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-64 rounded-2xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150 backdrop-blur-[var(--blur-frosted)] bg-white/92 dark:bg-slate-950/92 border border-black/10 dark:border-white/15 shadow-2xl shadow-slate-900/15 dark:shadow-black/70"
            >
              <div className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Select City
              </div>
              <div className="flex flex-col gap-1 mt-1">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setCurrentLocation(loc)
                      closeDropdowns()
                    }}
                    className={cn(
                      "flex items-center justify-between p-2 rounded-xl text-left text-sm transition-colors",
                      currentLocation === loc
                        ? "bg-slate-200/80 dark:bg-white/15 font-semibold text-slate-900 dark:text-white"
                        : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-white/10"
                    )}
                  >
                    <span>{loc}</span>
                    {currentLocation === loc && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Auth UI stays signed out until a real session source is connected. */}
        <button type="button" disabled title="Sign-in is not connected yet" className="hidden h-9 items-center rounded-full border border-white/30 bg-white/10 px-4 text-sm font-semibold text-white opacity-70 md:inline-flex">
          Sign In
        </button>

        {/* Theme Toggle */}
        <div className="hidden md:block [&_button]:border-white/30 [&_button]:bg-white/10 [&_button]:text-white"><ModeToggle variant="glass" /></div>

        {/* Mobile Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* ───────────────── Lazy Mobile Sheet ───────────────── */}
      {mobileMenuOpen && (
        <MobileSheet
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          categories={categories}
          currentLocation={currentLocation}
        />
      )}
    </div>
  )
}
