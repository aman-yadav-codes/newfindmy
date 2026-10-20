"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterDropdownOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  id: string;
  label: string;
  value: string;
  options: (string | FilterDropdownOption)[];
  placeholder?: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onChange: (value: string) => void;
  preferredPlacement?: "top" | "bottom" | "auto";
}

export function FilterDropdown({
  id,
  label,
  value,
  options,
  placeholder = "Select...",
  isOpen,
  onToggle,
  onClose,
  onChange,
  preferredPlacement = "auto",
}: FilterDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const [maxHeight, setMaxHeight] = useState<number>(220);

  // Calculate available viewport space and choose collision-free direction
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelowViewport = window.innerHeight - rect.bottom - 16;
    const spaceAbove = rect.top - 16;

    // Check distance to footer or newsletter card to avoid collision
    const footerEl = document.querySelector("footer");
    let spaceToFooter = Infinity;
    if (footerEl) {
      const footerRect = footerEl.getBoundingClientRect();
      if (footerRect.top > rect.bottom) {
        spaceToFooter = footerRect.top - rect.bottom - 12;
      }
    }

    const effectiveSpaceBelow = Math.min(spaceBelowViewport, spaceToFooter);
    const requiredHeight = 200;

    if (preferredPlacement === "top") {
      if (spaceAbove >= 120) {
        setPlacement("top");
        setMaxHeight(Math.max(120, Math.min(spaceAbove, 240)));
      } else {
        setPlacement("bottom");
        setMaxHeight(Math.max(120, Math.min(effectiveSpaceBelow, 240)));
      }
    } else if (effectiveSpaceBelow < requiredHeight && spaceAbove > effectiveSpaceBelow) {
      setPlacement("top");
      setMaxHeight(Math.max(120, Math.min(spaceAbove, 240)));
    } else {
      setPlacement("bottom");
      setMaxHeight(Math.max(120, Math.min(effectiveSpaceBelow, 240)));
    }
  }, [preferredPlacement]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
    }
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  // Click outside and escape handling
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Normalize options to { label, value }
  const normalizedOptions: FilterDropdownOption[] = options.map((opt) =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : value || placeholder;

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <label id={`${id}-label`} className="text-xs font-semibold text-slate-300">
        {label}
      </label>
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          aria-labelledby={`${id}-label ${id}`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={onToggle}
          className="flex h-10 w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs sm:text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-labelledby={`${id}-label`}
            style={{ maxHeight: `${maxHeight}px` }}
            className={cn(
              "absolute left-0 z-50 w-full overflow-y-auto overflow-x-hidden rounded-xl border border-white/15 bg-[#0a1c2e]/98 p-1.5 pr-2 shadow-2xl backdrop-blur-2xl animate-in fade-in-0 duration-150 glass-scrollbar",
              placement === "top"
                ? "bottom-full mb-1.5"
                : "top-full mt-1.5"
            )}
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    onClose();
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition-colors cursor-pointer",
                    isSelected
                      ? "bg-orange-500/20 text-orange-400 font-semibold"
                      : "text-slate-200 hover:bg-white/10 hover:text-white"
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <span className="text-orange-400 font-bold ml-1">✓</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
