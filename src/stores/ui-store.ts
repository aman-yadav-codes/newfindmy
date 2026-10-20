import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UIState {
  sidebarCollapsed: boolean;
  mobileSidebarOpen: boolean;
  searchOpen: boolean;
}

export interface UIActions {
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileSidebarOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
}

export type UIStore = UIState & UIActions;

/**
 * UI Store: Centralized single source of truth for shared navigation & overlay states.
 * Selectively persists only user-owned layout preference (sidebarCollapsed).
 * Transient flags (mobileSidebarOpen, searchOpen) are never persisted.
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      mobileSidebarOpen: false,
      searchOpen: false,

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed: boolean) =>
        set({ sidebarCollapsed: collapsed }),

      setMobileSidebarOpen: (open: boolean) =>
        set({ mobileSidebarOpen: open }),

      setSearchOpen: (open: boolean) =>
        set({ searchOpen: open }),
    }),
    {
      name: "findmy-ui-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      // Only persist sidebarCollapsed, ignore transient overlay states
      partialize: (state) => ({ sidebarCollapsed: state.sidebarCollapsed }),
      version: 1,
    }
  )
);

// High-performance selectors avoiding store-wide subscriptions
export const useSidebarCollapsed = () => useUIStore((state) => state.sidebarCollapsed);
export const useMobileSidebarOpen = () => useUIStore((state) => state.mobileSidebarOpen);
export const useSearchOpen = () => useUIStore((state) => state.searchOpen);
