"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, Calendar, Phone } from "lucide-react";
import type { ListingDetailData } from "./types";
import { cn } from "@/lib/utils";

interface DetailBottomBannerProps {
  data: ListingDetailData;
  onOpenBooking?: () => void;
}

export function DetailBottomBanner({ data, onOpenBooking }: DetailBottomBannerProps) {
  const inlineRef = useRef<HTMLDivElement>(null);
  const [isInlineVisible, setIsInlineVisible] = useState(true);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Performance-optimized IntersectionObserver (0 scroll listeners, 0 layout reflows)
  useEffect(() => {
    const inlineEl = inlineRef.current;
    const footerEl = document.querySelector("footer");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === inlineEl) {
            setIsInlineVisible(entry.isIntersecting);
          } else if (entry.target === footerEl) {
            setIsFooterVisible(entry.isIntersecting);
          }
        }
      },
      {
        threshold: 0.05,
      }
    );

    if (inlineEl) observer.observe(inlineEl);
    if (footerEl) observer.observe(footerEl);

    return () => observer.disconnect();
  }, []);

  const isStickyVisible = !isInlineVisible && !isFooterVisible;

  return (
    <>
      {/* ───────────────── 1. Primary Inline Banner ───────────────── */}
      <div
        ref={inlineRef}
        role="region"
        aria-label="Direct booking inquiry"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-gradient-to-r from-[#0a233a]/90 to-[#071625]/90 p-4 sm:p-5 backdrop-blur-xl shadow-xl"
      >
        {/* Left Text with Shield */}
        <div className="flex items-start gap-3 sm:gap-3.5">
          <div className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-orange-400">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Ready to work with {data.name}?
            </h3>
            <p className="mt-0.5 text-xs text-slate-300">
              Get in touch today for availability, reservations, and enquiries.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="flex h-10 items-center gap-2 rounded-xl bg-orange-500 px-4 text-xs font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            <span>Reserve Stay</span>
          </button>

          <a
            href={`tel:${data.phone}`}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 text-xs font-semibold text-slate-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>Call Now</span>
          </a>
        </div>
      </div>

      {/* ───────────────── 2. Sticky Bottom Bar (Appears when scrolled away from inline banner) ───────────────── */}
      <div
        aria-hidden={!isStickyVisible}
        className={cn(
          "fixed bottom-0 inset-x-0 z-40 border-t border-white/15 bg-[#071625]/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))]",
          isStickyVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="mx-auto max-w-[1440px] px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 flex items-center justify-between gap-3 sm:gap-4">
          {/* Banner Left Info */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="hidden sm:grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-orange-400">
              <ShieldCheck className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                Ready to work with {data.name}?
              </h4>
              <p className="hidden md:block text-[11px] text-slate-300 truncate">
                Get in touch today for availability, reservations, and enquiries.
              </p>
              <p className="md:hidden text-[11px] text-emerald-400 font-semibold">
                From {data.currency} {data.pricePerNight.toLocaleString()}{" "}
                <span className="text-[10px] text-slate-400 font-normal">/ Night</span>
              </p>
            </div>
          </div>

          {/* Banner Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={onOpenBooking}
              className="flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-xl bg-orange-500 px-3 sm:px-4 text-xs font-bold text-white shadow-lg shadow-orange-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span>Reserve Stay</span>
            </button>

            <a
              href={`tel:${data.phone}`}
              className="flex h-9 sm:h-10 items-center gap-1.5 sm:gap-2 rounded-xl border border-white/20 bg-white/10 px-3 sm:px-4 text-xs font-semibold text-slate-200 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
