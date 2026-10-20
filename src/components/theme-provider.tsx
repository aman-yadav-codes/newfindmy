"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useThemeStore } from "@/stores/theme-store";

function ThemeSync() {
  React.useEffect(() => {
    const cleanup = useThemeStore.getState().initThemeListener();
    return cleanup;
  }, []);
  return null;
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}
