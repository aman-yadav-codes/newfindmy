import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeState {
  theme: ThemePreference;
  resolvedTheme: ResolvedTheme;
}

export interface ThemeActions {
  setTheme: (theme: ThemePreference) => void;
  toggleTheme: () => void;
  initThemeListener: () => () => void;
}

export type ThemeStore = ThemeState & ThemeActions;

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeToDOM = (resolved: ResolvedTheme) => {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (resolved === "dark") {
    root.classList.add("dark");
    root.classList.remove("light");
    root.style.colorScheme = "dark";
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    root.style.colorScheme = "light";
  }
};

/**
 * Authoritative Theme Store:
 * - Single source of truth for explicit theme preference ('light' | 'dark' | 'system')
 * - Real-time resolution to 'light' or 'dark'
 * - Listens to OS prefers-color-scheme in system mode without page refresh
 * - Persists explicit preference to localStorage under 'theme' (shared with next-themes)
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "dark",
      resolvedTheme: "dark",

      setTheme: (theme: ThemePreference) => {
        const resolved: ResolvedTheme =
          theme === "system" ? getSystemTheme() : theme;

        applyThemeToDOM(resolved);
        set({ theme, resolvedTheme: resolved });

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("theme", theme);
          } catch {
            // Storage quota or private mode fallback
          }
        }
      },

      toggleTheme: () => {
        const current = get().resolvedTheme;
        const next: ThemePreference = current === "dark" ? "light" : "dark";
        get().setTheme(next);
      },

      initThemeListener: () => {
        if (typeof window === "undefined") return () => {};

        // Resolve current state on mount
        const currentPref = get().theme;
        const resolved: ResolvedTheme =
          currentPref === "system" ? getSystemTheme() : currentPref;

        applyThemeToDOM(resolved);
        if (get().resolvedTheme !== resolved) {
          set({ resolvedTheme: resolved });
        }

        // Listen for OS scheme updates
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e: MediaQueryListEvent) => {
          if (get().theme === "system") {
            const nextResolved: ResolvedTheme = e.matches ? "dark" : "light";
            applyThemeToDOM(nextResolved);
            set({ resolvedTheme: nextResolved });
          }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
      },
    }),
    {
      name: "theme", // Matches next-themes storage key for 100% interoperability
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return {
            getItem: (name: string) => {
              try {
                const val = localStorage.getItem(name);
                if (!val) return null;
                // If stored as raw string by next-themes ('dark' | 'light' | 'system')
                if (val === "dark" || val === "light" || val === "system") {
                  return JSON.stringify({ state: { theme: val } });
                }
                return val;
              } catch {
                return null;
              }
            },
            setItem: (name: string, value: string) => {
              try {
                const parsed = JSON.parse(value);
                const pref = parsed?.state?.theme || "dark";
                localStorage.setItem(name, pref);
              } catch {
                localStorage.setItem(name, value);
              }
            },
            removeItem: (name: string) => {
              try {
                localStorage.removeItem(name);
              } catch {}
            },
          };
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      partialize: (state) => ({ theme: state.theme }),
      version: 1,
    }
  )
);

// Atomic selector hooks
export const useThemePreference = () => useThemeStore((state) => state.theme);
export const useResolvedTheme = () => useThemeStore((state) => state.resolvedTheme);
