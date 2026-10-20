"use client";

import { useState } from "react";
import { DetailBreadcrumbs, DetailTitleBlock } from "./DetailHeader";
import { DetailGallery } from "./DetailGallery";
import { DetailAbout } from "./DetailAbout";
import { DetailFeatures } from "./DetailFeatures";
import { DetailPackages } from "./DetailPackages";
import { DetailBottomBanner } from "./DetailBottomBanner";
import {
  DetailReservationSidebar,
  DetailReservationCard,
} from "./DetailReservationSidebar";
import { DetailRelatedListings } from "./DetailRelatedListings";
import { WriteReviewModal } from "./WriteReviewModal";
import type { ListingDetailData, ListingReview } from "./types";

interface DetailClientProps {
  data: ListingDetailData;
}

export function DetailClient({ data }: DetailClientProps) {
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [reviews, setReviews] = useState<ListingReview[]>(data.reviews);
  const [isSaved, setIsSaved] = useState(false);

  const handleToggleSave = () => {
    setIsSaved((prev) => !prev);
  };

  const handleOpenBooking = () => {
    setBookingMessage(
      `Direct reservation system for ${data.name} is connecting. Please call or email the lodge directly for instant booking.`
    );
    setTimeout(() => setBookingMessage(null), 5000);
  };

  const handleAddReview = (newReview: ListingReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const dynamicData = {
    ...data,
    reviews,
  };

  return (
    <div className="relative mx-auto max-w-[1440px] px-4 py-4 sm:px-6 sm:py-8 lg:px-8 space-y-5 sm:space-y-8 lg:space-y-10">
      {/* ───────────────── Semantic Breadcrumbs (Always top) ───────────────── */}
      <DetailBreadcrumbs data={dynamicData} />

      {/* Booking Toast Notice */}
      {bookingMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm rounded-2xl border border-orange-500/40 bg-[#091b2c]/95 p-4 text-xs font-medium text-white shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-2"
        >
          <p>{bookingMessage}</p>
        </div>
      )}

      {/* ───────────────── Main Balanced 2-Column Layout ───────────────── */}
      <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
        {/* Left Primary Column */}
        <main className="flex-1 w-full min-w-0 space-y-6 sm:space-y-8 lg:space-y-10">
          {/* 1. Large Photo Gallery */}
          <DetailGallery
            photos={dynamicData.photos}
            listingName={dynamicData.name}
            logo={dynamicData.logo}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
          />

          {/* 1b. Title Block (Shown directly below gallery on desktop & mobile) */}
          <div className="-mt-1 sm:-mt-2">
            <DetailTitleBlock data={dynamicData} />
          </div>

          {/* 1c. Mobile Pricing & Reservation Card (Rendered below title on mobile/tablet < lg) */}
          <div className="lg:hidden">
            <DetailReservationCard
              data={dynamicData}
              onOpenBooking={handleOpenBooking}
            />
          </div>

          {/* 2. About Section */}
          <DetailAbout data={dynamicData} />

          {/* 3. Rooms & Features */}
          <DetailFeatures features={dynamicData.features} />

          {/* 4. Holiday Rentals & Packages */}
          <DetailPackages packages={dynamicData.packages} listingName={dynamicData.name} />

          {/* 5. Bottom Callout Banner */}
          <DetailBottomBanner data={dynamicData} onOpenBooking={handleOpenBooking} />
        </main>

        {/* Right Sticky Aside Column */}
        <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 lg:sticky lg:top-24 self-start pb-16 lg:pb-0">
          <DetailReservationSidebar
            data={dynamicData}
            onOpenBooking={handleOpenBooking}
            onOpenWriteReview={() => setIsWriteReviewOpen(true)}
          />
        </div>
      </div>

      {/* ───────────────── Full-Width Related Listings (Below 2-Column Area) ───────────────── */}
      <DetailRelatedListings listings={dynamicData.relatedListings} />

      {/* ───────────────── Write Review Modal ───────────────── */}
      <WriteReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmitReview={handleAddReview}
        listingName={dynamicData.name}
      />
    </div>
  );
}
