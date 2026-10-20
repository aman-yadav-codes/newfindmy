"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { useThemeStore } from "@/stores/theme-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/glass/dropdown-menu";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

export function ModeToggle({
  variant = "glass",
  className,
}: {
  variant?: "default" | "glass";
  className?: string;
}) {
  const theme = useThemeStore((s) => s.theme);
  const resolvedTheme = useThemeStore((s) => s.resolvedTheme);
  const setTheme = useThemeStore((s) => s.setTheme);

  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <Button
        variant={variant === "glass" ? "glass" : "outline"}
        size="icon"
        aria-label="Toggle theme"
        className={className}
      >
        <Moon className="h-[1.1rem] w-[1.1rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant === "glass" ? "glass" : "outline"}
          size="icon"
          aria-label={`Current theme: ${theme}. Click to change theme`}
          className={className}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="h-[1.1rem] w-[1.1rem] text-sky-400 transition-all" />
          ) : (
            <Sun className="h-[1.1rem] w-[1.1rem] text-amber-500 transition-all" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8.5rem] p-1">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-amber-500" />
            <span>Light</span>
          </div>
          {theme === "light" && <Check className="h-3.5 w-3.5 text-orange-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-sky-400" />
            <span>Dark</span>
          </div>
          {theme === "dark" && <Check className="h-3.5 w-3.5 text-orange-500" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Laptop className="h-4 w-4 text-slate-400" />
            <span>System</span>
          </div>
          {theme === "system" && <Check className="h-3.5 w-3.5 text-orange-500" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
