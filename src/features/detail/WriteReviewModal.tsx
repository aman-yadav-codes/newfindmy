"use client";

import { useState, useEffect, useRef } from "react";
import { Star, MessageSquarePlus, Send, X, CheckCircle2 } from "lucide-react";
import type { ListingReview } from "./types";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview?: (review: ListingReview) => void;
  listingName: string;
}

const RATING_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

export function WriteReviewModal({
  isOpen,
  onClose,
  onSubmitReview,
  listingName,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("Admin (main)");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap / escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDisplayRating = hoverRating || rating;
  const ratingText = RATING_LABELS[currentDisplayRating] || "Excellent";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    const newReview: ListingReview = {
      id: `review-${Date.now()}`,
      author: name.trim(),
      avatarLetter: name.trim().charAt(0).toUpperCase() || "U",
      rating,
      date: "Just now",
      content: content.trim(),
    };

    onSubmitReview?.(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContent("");
      onClose();
    }, 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="write-review-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in-0 duration-200"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#091b2c]/95 p-6 shadow-2xl backdrop-blur-2xl">
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close write review modal"
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 hover:bg-white/15 hover:text-white transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <CheckCircle2 className="size-12 text-emerald-400 animate-in zoom-in-75 duration-300" />
            <h3 className="text-lg font-bold text-white">Review Submitted!</h3>
            <p className="text-xs text-slate-300 max-w-xs">
              Thank you for sharing your experience at {listingName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2 text-white">
              <MessageSquarePlus className="size-5 text-amber-400" />
              <h2 id="write-review-title" className="text-base font-bold tracking-tight">
                Write your review
              </h2>
            </div>

            {/* Rating Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200">
                Rating <span className="text-orange-400">*</span>
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(null)}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      aria-label={`Rate ${star} out of 5 stars`}
                      className="p-0.5 text-amber-400 transition-transform hover:scale-115 active:scale-95 cursor-pointer focus-visible:outline-hidden"
                    >
                      <Star
                        className={`size-6 ${
                          star <= currentDisplayRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-600 fill-transparent"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                {/* Rating Label Badge */}
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
                  {ratingText}
                </span>
              </div>
            </div>

            {/* Your Name */}
            <div className="space-y-1.5">
              <label htmlFor="review-name" className="block text-xs font-semibold text-slate-200">
                Your Name <span className="text-orange-400">*</span>
              </label>
              <input
                id="review-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:bg-white/10 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
              />
            </div>

            {/* Review Content */}
            <div className="space-y-1.5">
              <label htmlFor="review-content" className="block text-xs font-semibold text-slate-200">
                Review <span className="text-orange-400">*</span>
              </label>
              <textarea
                id="review-content"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share details of your experience..."
                required
                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:bg-white/10 focus:ring-1 focus:ring-orange-500 outline-none resize-none transition-all"
              />
            </div>

            {/* Post Review CTA */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!content.trim()}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:scale-102 active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <Send className="size-3.5" />
                <span>Post Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
