"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import {
  Grid2X2,
  Heart,
  MapPin,
  Bell,
  ChevronDown,
  Menu,
  Check,
  User,
  Settings,
  LogOut,
  Building2,
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
  "New York, USA",
  "London, UK",
  "San Francisco, USA",
  "Dubai, UAE",
  "Sydney, Australia",
]

export function HeaderClient({
  categories = findMyNavCategories,
}: {
  categories?: NavCategory[]
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [currentLocation, setCurrentLocation] = useState("New York, USA")
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
    <div ref={headerRef} className="flex items-center justify-between flex-1 gap-2 md:gap-4">
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
                  "flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold rounded-lg transition-all",
                  isOpen
                    ? "text-foreground bg-white/10 dark:bg-white/10 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <span>{cat.name}</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200",
                    isOpen && "rotate-180 text-foreground"
                  )}
                />
              </button>

              {isOpen && (
                <div
                  role="menu"
                  className="absolute top-full left-0 mt-2 w-72 glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-lg)] rounded-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
                >
                  <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                        className="flex flex-col p-2.5 rounded-xl transition-colors hover:bg-white/10 dark:hover:bg-white/10 text-left group"
                      >
                        <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {sub.title}
                        </span>
                        <span className="text-xs text-muted-foreground leading-tight">
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
      <div className="flex items-center gap-2 sm:gap-3 ml-auto">
        {/* Add Listing Dropdown (Matching Screenshot 2 & 3) */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("add-listing")}
            aria-expanded={activeDropdown === "add-listing"}
            aria-haspopup="true"
            aria-label="Add Listing options"
            className={cn(
              "flex items-center gap-2 h-9 px-3.5 sm:px-4 rounded-full border border-[var(--glass-border)] text-sm font-semibold transition-all cursor-pointer shadow-[var(--glass-shadow-sm)]",
              activeDropdown === "add-listing"
                ? "bg-white/20 dark:bg-white/20 text-foreground border-white/40"
                : "bg-[var(--glass-bg)] hover:bg-white/10 dark:hover:bg-white/10 text-foreground"
            )}
          >
            <Grid2X2 className="h-4 w-4 text-orange-500" />
            <span className="hidden sm:inline">Add Listing</span>
            <span className="sm:hidden">Add</span>
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                activeDropdown === "add-listing" && "rotate-180"
              )}
            />
          </button>

          {activeDropdown === "add-listing" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-80 sm:w-88 glass-frosted backdrop-blur-[var(--blur-frosted)] bg-slate-900/90 dark:bg-slate-950/90 border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/60">
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
                      className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition-all text-left w-full group"
                    >
                      <div className="h-10 w-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white group-hover:scale-105 transition-transform shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-semibold text-white leading-snug group-hover:text-orange-400 transition-colors">
                          {opt.title}
                        </span>
                        <span className="text-xs text-white/60 leading-tight truncate">
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

        {/* Favourites with Badge "1" */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("favourites")}
            aria-expanded={activeDropdown === "favourites"}
            aria-haspopup="true"
            aria-label="View favourites"
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-white/10 relative transition-all cursor-pointer shadow-[var(--glass-shadow-sm)]"
          >
            <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background">
              1
            </span>
          </button>

          {activeDropdown === "favourites" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-72 glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-lg)] rounded-2xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Favourites
                </span>
                <span className="text-xs text-rose-500 font-semibold">1 saved</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors">
                <div className="h-9 w-9 rounded-lg bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold text-xs shrink-0">
                  SB
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">
                    Sunset Bistro & Lounge
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Food • Central Park
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("location")}
            aria-expanded={activeDropdown === "location"}
            aria-haspopup="true"
            aria-label="Change location"
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-white/10 text-muted-foreground hover:text-foreground relative transition-all cursor-pointer shadow-[var(--glass-shadow-sm)]"
          >
            <MapPin className="h-4 w-4" />
          </button>

          {activeDropdown === "location" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-64 glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-lg)] rounded-2xl p-2.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
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
                        ? "bg-white/15 font-semibold text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/10"
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

        {/* Notifications with Badge "2" */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("notifications")}
            aria-expanded={activeDropdown === "notifications"}
            aria-haspopup="true"
            aria-label="View notifications"
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-white/10 text-muted-foreground hover:text-foreground relative transition-all cursor-pointer shadow-[var(--glass-shadow-sm)]"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-background">
              2
            </span>
          </button>

          {activeDropdown === "notifications" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-80 glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-lg)] rounded-2xl p-3 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Notifications
                </span>
                <span className="text-xs text-orange-500 font-semibold">2 unread</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-xs font-semibold text-foreground">
                    Listing Approved: Villa Serena
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Your property listing is now live in Monaco.
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-1 inline-block">10m ago</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <p className="text-xs font-semibold text-foreground">
                    New inquiry on BMW M3
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    A buyer sent you a message regarding your vehicle.
                  </p>
                  <span className="text-[10px] text-muted-foreground mt-1 inline-block">1h ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar "A" */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDropdown("profile")}
            aria-expanded={activeDropdown === "profile"}
            aria-haspopup="true"
            aria-label="User account menu"
            className="h-9 w-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 text-white font-bold text-sm border border-[var(--glass-border)] relative cursor-pointer shadow-[var(--glass-shadow-sm)] hover:ring-2 hover:ring-orange-500/50 transition-all"
          >
            <span>A</span>
            <span className="absolute -bottom-0.5 -right-0.5 bg-background border border-border rounded-full p-0.5 text-muted-foreground flex items-center justify-center">
              <ChevronDown className="h-2.5 w-2.5" />
            </span>
          </button>

          {activeDropdown === "profile" && (
            <div
              role="menu"
              className="absolute top-full right-0 mt-2 w-56 glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-lg)] rounded-2xl p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-150"
            >
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-sm font-semibold text-foreground">Alex Morgan</p>
                <p className="text-xs text-muted-foreground truncate">alex@findmy.local</p>
              </div>
              <div className="flex flex-col gap-0.5">
                <Link
                  href="#profile"
                  prefetch={false}
                  onClick={closeDropdowns}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
                >
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  My Profile
                </Link>
                <Link
                  href="#listings"
                  prefetch={false}
                  onClick={closeDropdowns}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
                >
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  My Listings (4)
                </Link>
                <Link
                  href="#settings"
                  prefetch={false}
                  onClick={closeDropdowns}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-white/10 transition-colors"
                >
                  <Settings className="h-3.5 w-3.5 text-muted-foreground" />
                  Account Settings
                </Link>
                <div className="my-1 border-t border-white/10" />
                <button
                  type="button"
                  onClick={closeDropdowns}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full text-left"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <ModeToggle variant="glass" />

        {/* Mobile Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:bg-white/10"
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
