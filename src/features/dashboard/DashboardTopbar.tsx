"use client";

import { Search, Bell, Menu, User, LogOut, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/glass/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useUIStore } from "@/stores/ui-store";

interface DashboardTopbarProps {
  onOpenSearch?: () => void;
  onOpenMobileSidebar?: () => void;
}

export function DashboardTopbar({
  onOpenSearch,
  onOpenMobileSidebar,
}: DashboardTopbarProps) {
  // Use authoritative UI store with prop fallbacks
  const setSearchOpen = useUIStore((state) => state.setSearchOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  const handleOpenSearch = onOpenSearch || (() => setSearchOpen(true));
  const handleOpenMobileSidebar = onOpenMobileSidebar || (() => setMobileSidebarOpen(true));

  return (
    <header
      role="banner"
      className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b dark:border-white/10 border-slate-200/80 dark:bg-[#071626]/85 bg-white/85 dark:text-white text-slate-900 px-4 backdrop-blur-xl sm:px-6 lg:px-8 shrink-0 transition-colors duration-200"
    >
      {/* Left Area: Mobile Menu Toggle + Global Search */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-xl">
        <button
          type="button"
          onClick={handleOpenMobileSidebar}
          aria-label="Open mobile navigation sidebar"
          className="flex lg:hidden size-9 sm:size-8 items-center justify-center rounded-xl dark:bg-white/5 bg-slate-100 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:text-white/80 text-slate-700 transition-colors touch-manipulation shrink-0"
        >
          <Menu className="size-4" />
        </button>

        {/* Global Search Bar (Trigger) */}
        <button
          type="button"
          onClick={handleOpenSearch}
          aria-label="Search businesses, listings, categories (Press Ctrl+K)"
          className="group flex w-full max-w-md items-center justify-between rounded-xl border dark:border-white/10 border-slate-200 dark:bg-[#0b2138]/70 bg-slate-100/80 px-2.5 sm:px-3 py-1.5 h-9 sm:h-8 text-xs sm:text-sm dark:text-white/60 text-slate-500 shadow-inner hover:border-slate-300 dark:hover:border-white/20 dark:hover:text-white/90 hover:text-slate-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 touch-manipulation min-w-0"
        >
          <div className="flex items-center gap-2 sm:gap-2.5 truncate">
            <Search className="size-4 shrink-0 dark:text-white/50 text-slate-400 group-hover:text-orange-500 transition-colors" />
            <span className="truncate text-xs sm:text-sm hidden sm:inline">Search businesses, listings, categories...</span>
            <span className="truncate text-xs sm:hidden">Search...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border dark:border-white/15 border-slate-300 dark:bg-white/5 bg-white px-1.5 py-0.5 text-[10px] font-medium dark:text-white/60 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white/90 shadow-2xs shrink-0">
            <span>Ctrl</span>
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right Area: Theme Toggle + Notifications + User Controls */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
        {/* Authoritative Theme Toggle (Light / Dark / System) */}
        <ModeToggle variant="glass" />

        {/* Notification Bell */}
        <button
          type="button"
          aria-label="View notifications - 1 unread update"
          className="relative flex size-9 items-center justify-center rounded-xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100/90 hover:bg-slate-200/80 dark:hover:bg-white/10 dark:text-white/80 text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-2 rounded-full bg-orange-500 ring-2 dark:ring-[#071626] ring-white" />
        </button>

        {/* User Account Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="Open user profile menu for Nexa Admin"
              className="flex items-center gap-2.5 rounded-xl border dark:border-white/10 border-slate-200 dark:bg-white/5 bg-slate-100/90 hover:bg-slate-200/80 dark:hover:bg-white/10 p-1 sm:pr-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              {/* Avatar Initial "N" */}
              <div className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-600 to-blue-500 text-xs font-bold text-white shadow-sm">
                N
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold leading-tight dark:text-white text-slate-900">Nexa</span>
                <span className="text-[10px] leading-tight dark:text-white/50 text-slate-500">Admin</span>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56 dark:border-white/10 border-slate-200 dark:bg-[#071a2d]/95 bg-white/95 dark:text-white text-slate-900 backdrop-blur-xl shadow-2xl rounded-xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none dark:text-white text-slate-900">Nexa System</p>
                <p className="text-xs leading-none dark:text-white/60 text-slate-500">admin@findmy.co.za</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-white/10 bg-slate-200" />
            <DropdownMenuItem className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 dark:focus:text-white focus:text-slate-900">
              <User className="size-4 dark:text-white/60 text-slate-500" />
              <span>Admin Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer gap-2 dark:focus:bg-white/10 focus:bg-slate-100 dark:focus:text-white focus:text-slate-900">
              <CheckCircle2 className="size-4 text-emerald-500" />
              <span>System Status: Healthy</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="dark:bg-white/10 bg-slate-200" />
            <DropdownMenuItem className="cursor-pointer gap-2 text-rose-500 dark:text-rose-400 focus:bg-rose-500/10 focus:text-rose-600 dark:focus:text-rose-300">
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
