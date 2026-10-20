"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Plane,
  LayoutGrid,
  FileText,
  Building2,
  MapPin,
  Image as ImageIcon,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface DashboardSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  isCollapsed: propIsCollapsed,
  onToggleCollapse: propOnToggleCollapse,
  mobileOpen: propMobileOpen,
  onCloseMobile: propOnCloseMobile,
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [travelOpen, setTravelOpen] = useState(true);

  // Authoritative UI store selectors with prop fallback
  const storeSidebarCollapsed = useUIStore((state) => state.sidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const storeMobileOpen = useUIStore((state) => state.mobileSidebarOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  const isCollapsed = propIsCollapsed !== undefined ? propIsCollapsed : storeSidebarCollapsed;
  const onToggleCollapse = propOnToggleCollapse || toggleSidebar;
  const mobileOpen = propMobileOpen !== undefined ? propMobileOpen : storeMobileOpen;
  const onCloseMobile = propOnCloseMobile || (() => setMobileSidebarOpen(false));

  const isClassificationActive = pathname === "/dashboard" || pathname.startsWith("/dashboard/classification");

  const handleNavClick = () => {
    if (mobileOpen) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          role="presentation"
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        aria-label="Dashboard sidebar"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col dark:bg-[#071626]/95 bg-white/95 border-r dark:border-white/10 border-slate-200/80 backdrop-blur-xl transition-[width,background-color] duration-200 ease-in-out motion-reduce:transition-none lg:static lg:h-full lg:min-h-0",
          isCollapsed ? "lg:w-20" : "lg:w-64",
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0",
          "w-64"
        )}
      >
        {/* Header: Logo as the single accessible toggle control */}
        <div
          className={cn(
            "flex h-14 items-center border-b dark:border-white/10 border-slate-200/80 shrink-0 transition-all",
            isCollapsed ? "justify-center px-2" : "justify-between px-4"
          )}
        >
          <div className="relative group flex items-center justify-center">
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!isCollapsed}
              className={cn(
                "flex items-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer touch-manipulation",
                isCollapsed
                  ? "size-10 justify-center dark:hover:bg-white/10 hover:bg-slate-100 p-0"
                  : "gap-3 p-1.5 dark:hover:bg-white/5 hover:bg-slate-100 -ml-1 text-left"
              )}
            >
              {/* FindMy Circular Logo */}
              <div className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 p-[2px] shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200 motion-reduce:transition-none">
                <div className="flex size-full items-center justify-center rounded-full dark:bg-[#071626] bg-white">
                  <div className="size-3.5 rounded-full bg-orange-500 ring-2 ring-sky-400" />
                </div>
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold tracking-tight dark:text-white text-slate-900 group-hover:text-orange-500 transition-colors">
                  Find<span className="text-orange-500">My</span>
                </span>
              )}
            </button>

            {/* Accessible tooltip for collapsed logo */}
            {isCollapsed && (
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
              >
                Expand sidebar
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close navigation sidebar"
            className="flex lg:hidden size-9 items-center justify-center rounded-xl dark:bg-white/5 bg-slate-100 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:text-white/70 text-slate-600 transition-colors touch-manipulation"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex-1 min-h-0",
            isCollapsed
              ? "overflow-visible py-3 px-2 flex flex-col items-center space-y-2"
              : "overflow-y-auto px-3 py-2 space-y-1 scrollbar-thin dark:scrollbar-thumb-white/10 scrollbar-thumb-slate-300"
          )}
        >
          {/* Overview */}
          <div className={cn("relative group", isCollapsed && "flex items-center justify-center")}>
            <Link
              href="/dashboard"
              onClick={handleNavClick}
              aria-label="Overview"
              className={cn(
                "flex items-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 touch-manipulation",
                isCollapsed
                  ? "size-10 justify-center dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100"
                  : "gap-3 px-3 py-2 text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 min-h-[40px]"
              )}
            >
              <LayoutDashboard className={cn(isCollapsed ? "size-4.5" : "size-4", "shrink-0 dark:text-white/70 text-slate-500")} />
              {!isCollapsed && <span>Overview</span>}
            </Link>

            {isCollapsed && (
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
              >
                Overview
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
              </div>
            )}
          </div>

          {/* Travel Group */}
          {isCollapsed ? (
            /* In collapsed mode, render Travel and its sub-items as uniform, centered icon buttons */
            <>
              {/* Travel Icon Button */}
              <div className="relative group flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => {
                    onToggleCollapse?.();
                    setTravelOpen(true);
                  }}
                  aria-label="Travel"
                  className="flex size-10 items-center justify-center rounded-xl dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 cursor-pointer"
                >
                  <Plane className="size-4.5 shrink-0 dark:text-white/70 text-slate-500" />
                </button>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Travel
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>

              {/* Classification (Active Item) */}
              <div className="relative group flex items-center justify-center">
                <Link
                  href="/dashboard"
                  aria-label="Classification"
                  className={cn(
                    "flex size-10 items-center justify-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                    isClassificationActive
                      ? "bg-orange-500/15 text-orange-500 font-semibold border border-orange-500/30 shadow-[0_0_12px_rgba(249,115,22,0.18)] ring-1 ring-orange-500/20"
                      : "dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100"
                  )}
                >
                  <LayoutGrid className={cn("size-4.5 shrink-0", isClassificationActive ? "text-orange-500" : "dark:text-white/70 text-slate-500")} />
                </Link>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Classification
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>

              {/* Listings */}
              <div className="relative group flex items-center justify-center">
                <Link
                  href="/dashboard?view=listings"
                  aria-label="Listings"
                  className="flex size-10 items-center justify-center rounded-xl dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <FileText className="size-4.5 shrink-0 dark:text-white/70 text-slate-500" />
                </Link>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Listings
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>

              {/* Businesses */}
              <div className="relative group flex items-center justify-center">
                <Link
                  href="/dashboard?view=businesses"
                  aria-label="Businesses"
                  className="flex size-10 items-center justify-center rounded-xl dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Building2 className="size-4.5 shrink-0 dark:text-white/70 text-slate-500" />
                </Link>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Businesses
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>

              {/* Locations */}
              <div className="relative group flex items-center justify-center">
                <Link
                  href="/dashboard?view=locations"
                  aria-label="Locations"
                  className="flex size-10 items-center justify-center rounded-xl dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <MapPin className="size-4.5 shrink-0 dark:text-white/70 text-slate-500" />
                </Link>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Locations
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>

              {/* Media */}
              <div className="relative group flex items-center justify-center">
                <Link
                  href="/dashboard?view=media"
                  aria-label="Media"
                  className="flex size-10 items-center justify-center rounded-xl dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <ImageIcon className="size-4.5 shrink-0 dark:text-white/70 text-slate-500" />
                </Link>
                <div
                  role="tooltip"
                  className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
                >
                  Media
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
                </div>
              </div>
            </>
          ) : (
            /* In expanded mode, render collapsible Travel group with accordion sub-items */
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setTravelOpen(!travelOpen)}
                className="flex w-full items-center justify-between px-3 py-1.5 rounded-xl text-sm font-medium dark:text-white text-slate-800 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Plane className="size-4 shrink-0 dark:text-white/70 text-slate-500" />
                  <span>Travel</span>
                </div>
                {travelOpen ? (
                  <ChevronDown className="size-3.5 dark:text-white/50 text-slate-400" />
                ) : (
                  <ChevronRight className="size-3.5 dark:text-white/50 text-slate-400" />
                )}
              </button>

              {travelOpen && (
                <div className="mt-0.5 space-y-0.5 pl-3 border-l dark:border-white/10 border-slate-200 ml-5">
                  {/* Classification (Active Item) */}
                  <Link
                    href="/dashboard"
                    onClick={handleNavClick}
                    className={cn(
                      "flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all relative touch-manipulation min-h-[38px]",
                      isClassificationActive
                        ? "bg-orange-500/15 text-orange-500 font-semibold shadow-[inset_0_0_12px_rgba(249,115,22,0.12)] border border-orange-500/20"
                        : "dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100"
                    )}
                  >
                    {isClassificationActive && (
                      <span className="absolute left-0 top-1 bottom-1 w-1 bg-orange-500 rounded-r-full" />
                    )}
                    <LayoutGrid className={cn("size-3.5 shrink-0", isClassificationActive ? "text-orange-500" : "dark:text-white/60 text-slate-400")} />
                    <span>Classification</span>
                  </Link>

                  <Link
                    href="/dashboard?view=listings"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors touch-manipulation min-h-[38px]"
                  >
                    <FileText className="size-3.5 shrink-0 dark:text-white/60 text-slate-400" />
                    <span>Listings</span>
                  </Link>

                  <Link
                    href="/dashboard?view=businesses"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors touch-manipulation min-h-[38px]"
                  >
                    <Building2 className="size-3.5 shrink-0 dark:text-white/60 text-slate-400" />
                    <span>Businesses</span>
                  </Link>

                  <Link
                    href="/dashboard?view=locations"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors touch-manipulation min-h-[38px]"
                  >
                    <MapPin className="size-3.5 shrink-0 dark:text-white/60 text-slate-400" />
                    <span>Locations</span>
                  </Link>

                  <Link
                    href="/dashboard?view=media"
                    onClick={handleNavClick}
                    className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs sm:text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 transition-colors touch-manipulation min-h-[38px]"
                  >
                    <ImageIcon className="size-3.5 shrink-0 dark:text-white/60 text-slate-400" />
                    <span>Media</span>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          <div className={cn("pt-1 relative group", isCollapsed && "flex items-center justify-center")}>
            <Link
              href="/dashboard?view=settings"
              onClick={handleNavClick}
              aria-label="Settings"
              className={cn(
                "flex items-center rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 touch-manipulation",
                isCollapsed
                  ? "size-10 justify-center dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100"
                  : "gap-3 px-3 py-2 text-sm font-medium dark:text-white/70 text-slate-600 dark:hover:text-white hover:text-slate-900 dark:hover:bg-white/5 hover:bg-slate-100 min-h-[40px]"
              )}
            >
              <Settings className={cn(isCollapsed ? "size-4.5" : "size-4", "shrink-0 dark:text-white/70 text-slate-500")} />
              {!isCollapsed && <span>Settings</span>}
            </Link>

            {isCollapsed && (
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 -translate-x-1.5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-has-[:focus-visible]:translate-x-0 group-has-[:focus-visible]:opacity-100 transition-all duration-150 ease-out z-[60] px-2.5 py-1 rounded-lg dark:bg-[#081829]/95 bg-slate-900/95 text-white text-xs font-medium dark:border-white/15 border-slate-700 shadow-xl backdrop-blur-md whitespace-nowrap motion-reduce:transition-none"
              >
                Settings
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900/95 dark:border-r-[#081829]/95" />
              </div>
            )}
          </div>
        </nav>

        {/* Bottom Promo Card (South Africa Experiences - hidden on short viewports to prevent document scroll) */}
        {!isCollapsed && (
          <div className="p-2.5 mt-auto shrink-0 hidden [@media(min-height:760px)]:block">
            <div className="relative overflow-hidden rounded-xl border dark:border-white/10 border-slate-200/80 shadow-lg group">
              <div className="relative h-28 w-full">
                <Image
                  src="/images/dashboard/sa-landscape.jpg"
                  alt="Scenic coastal mountain range in South Africa"
                  fill
                  sizes="240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-[#06121e] from-slate-950 via-slate-950/75 dark:via-[#06121e]/75 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-2.5 flex flex-col">
                <h3 className="text-[11px] font-bold leading-snug text-white">
                  Build extraordinary travel experiences
                </h3>
                <p className="mt-0.5 text-[10px] leading-tight text-white/80 line-clamp-2">
                  Connect travellers with amazing places across South Africa.
                </p>
                <div className="mt-1.5 h-0.5 w-5 rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
