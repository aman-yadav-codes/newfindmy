"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardTopbar } from "./DashboardTopbar";
import { initialCategories } from "./dashboard-data";
import { useUIStore } from "@/stores/ui-store";

const GlobalSearchDialog = dynamic(
  () => import("./dialogs/GlobalSearchDialog").then((m) => m.GlobalSearchDialog),
  { ssr: false }
);

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  // Centralized Zustand UI selectors
  const searchOpen = useUIStore((state) => state.searchOpen);
  const setSearchOpen = useUIStore((state) => state.setSearchOpen);

  // Global keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(!useUIStore.getState().searchOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setSearchOpen]);

  return (
    <div className="min-h-screen lg:h-[100dvh] lg:overflow-hidden flex flex-col lg:flex-row dark:bg-[#06121e]/90 bg-slate-50/95 dark:text-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-orange-500/30 selection:text-orange-200 transition-colors duration-200">
      {/* 1. Persistent / Collapsible Sidebar using authoritative UI Store */}
      <DashboardSidebar />

      {/* 2. Main Workspace Layout */}
      <div className="flex-1 flex flex-col min-w-0 h-full lg:overflow-hidden transition-all duration-300">
        {/* Topbar with Global Search, Theme Toggle & User Status */}
        <DashboardTopbar />

        {/* Semantic Main Content Landmark */}
        <main
          id="main-content"
          className="flex-1 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl w-full mx-auto overflow-y-auto lg:overflow-hidden"
        >
          {children}
        </main>
      </div>

      {/* 3. Global Search Dialog (Ctrl+K) */}
      {searchOpen && (
        <GlobalSearchDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
          categories={initialCategories}
        />
      )}
    </div>
  );
}
