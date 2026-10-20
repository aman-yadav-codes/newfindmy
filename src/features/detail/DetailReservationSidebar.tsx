"use client";

import { useState } from "react";
import {
  Calendar,
  Phone,
  Mail,
  Globe,
  Star,
  Car,
  Waves,
  Wifi,
  Wine,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ListingDetailData } from "./types";

interface DetailReservationSidebarProps {
  data: ListingDetailData;
  onOpenBooking?: () => void;
  onOpenWriteReview?: () => void;
}

export function DetailReservationCard({
  data,
  onOpenBooking,
}: DetailReservationSidebarProps) {
  return (
    <div className="rounded-2xl border border-white/15 bg-[#091b2c]/90 p-5 backdrop-blur-xl shadow-xl space-y-4">
      {/* Pricing header */}
      <div>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-slate-300 font-medium">From</span>
          <span className="text-2xl sm:text-3xl font-black text-white">
            {data.currency} {data.pricePerNight.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ Night</span>
        </div>
        <p className="mt-0.5 text-[11px] text-slate-400">{data.priceNote}</p>
      </div>

      {/* Primary CTA: Reserve Stay */}
      <button
        type="button"
        onClick={onOpenBooking}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-orange-500 font-semibold text-white shadow-lg shadow-orange-500/30 transition-transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
      >
        <Calendar className="h-4 w-4" aria-hidden="true" />
        <span>Reserve Stay</span>
      </button>

      {/* 3 Contact Actions */}
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${data.phone}`}
          className="flex h-9 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Phone className="h-3.5 w-3.5 text-orange-400" />
          <span className="truncate">Call Now</span>
        </a>
        <a
          href={`mailto:${data.email}`}
          className="flex h-9 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Mail className="h-3.5 w-3.5 text-orange-400" />
          <span className="truncate">Send Email</span>
        </a>
        <a
          href={data.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 items-center justify-center gap-1 rounded-lg border border-white/10 bg-white/5 text-[11px] font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Globe className="h-3.5 w-3.5 text-orange-400" />
          <span className="truncate">Visit Website</span>
        </a>
      </div>

      {/* 4 Quick Amenities */}
      <div className="grid grid-cols-4 gap-1 text-center pt-3 border-t border-white/10">
        <div className="flex flex-col items-center gap-1 p-1">
          <Car className="h-4 w-4 text-slate-300" />
          <span className="text-[10px] text-slate-300 leading-tight">Free parking</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-1">
          <Waves className="h-4 w-4 text-slate-300" />
          <span className="text-[10px] text-slate-300 leading-tight">Outdoor Pool</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-1">
          <Wifi className="h-4 w-4 text-slate-300" />
          <span className="text-[10px] text-slate-300 leading-tight">Wi-Fi</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-1">
          <Wine className="h-4 w-4 text-slate-300" />
          <span className="text-[10px] text-slate-300 leading-tight">Bar / Lounge</span>
        </div>
      </div>
    </div>
  );
}

export function DetailReservationSidebar({
  data,
  onOpenBooking,
  onOpenWriteReview,
}: DetailReservationSidebarProps) {
  const [reviewIndex, setReviewIndex] = useState(0);

  const currentReview = data.reviews[reviewIndex] || data.reviews[0];

  const handlePrevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? data.reviews.length - 1 : prev - 1));
  };

  const handleNextReview = () => {
    setReviewIndex((prev) => (prev === data.reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <aside aria-label="Reservation and lodge details" className="w-full space-y-4">
      {/* ───────────────── 1. Primary Pricing & Reservation Card (Desktop only; on mobile shown under title) ───────────────── */}
      <div className="hidden lg:block">
        <DetailReservationCard
          data={data}
          onOpenBooking={onOpenBooking}
          onOpenWriteReview={onOpenWriteReview}
        />
      </div>

      {/* ───────────────── 2. Operating Hours ───────────────── */}
      <div className="rounded-2xl border border-white/10 bg-[#091b2c]/75 p-5 backdrop-blur-md shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Clock className="h-4 w-4 text-orange-400" />
            <h3 className="text-sm font-bold tracking-tight">Operating Hours</h3>
          </div>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-slate-300">
            Closed Today
          </span>
        </div>

        <div className="divide-y divide-white/5 text-xs">
          {data.operatingHours.map((sched) => (
            <div key={sched.day} className="flex items-center justify-between py-1.5">
              <span className={`font-medium ${sched.isToday ? "text-amber-400" : "text-slate-300"}`}>
                {sched.day} {sched.isToday && <span className="ml-1 text-[10px] rounded bg-amber-500/20 px-1 py-0.2 text-amber-300">Today</span>}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">{sched.hours}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ───────────────── 3. Customer Reviews Carousel ───────────────── */}
      <div className="rounded-2xl border border-white/10 bg-[#091b2c]/75 p-5 backdrop-blur-md shadow-lg space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <h3 className="text-sm font-bold tracking-tight">Customer Reviews</h3>
          </div>
          <button
            type="button"
            onClick={onOpenWriteReview}
            className="rounded-lg bg-orange-500 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-orange-400 transition-colors cursor-pointer"
          >
            Write a Review
          </button>
        </div>

        {/* Big Rating Number */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-white">{data.rating.toFixed(1)}</span>
          <span className="text-xs text-slate-400">out of 5</span>
          <div className="flex items-center gap-0.5 text-amber-400 ml-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-amber-400" />
            ))}
          </div>
          <span className="text-slate-400 text-[11px]">Based on {data.reviewsCount} reviews</span>
        </div>

        {/* Review Quote Card */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-full bg-blue-600 text-[11px] font-bold text-white">
                {currentReview.avatarLetter}
              </span>
              <span className="text-xs font-bold text-white">{currentReview.author}</span>
            </div>
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed italic">
            &ldquo;{currentReview.content}&rdquo;
          </p>
        </div>

        {/* Review Pagination Controls */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            {data.reviews.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  reviewIndex === i ? "w-4 bg-orange-500" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrevReview}
              aria-label="Previous review"
              className="grid size-6 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleNextReview}
              aria-label="Next review"
              className="grid size-6 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
