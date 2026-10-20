"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Images,
  X,
  Maximize2,
  AlertCircle,
  Share2,
  Heart,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GalleryLogo {
  src: string;
  alt: string;
}

export interface BandwidthEfficientGalleryProps {
  images: GalleryItem[];
  title?: string;
  className?: string;
  aspectRatio?: "16/10" | "16/9" | "4/3" | "3/2";
  totalCount?: number;
  priorityLcp?: boolean;
  logo?: GalleryLogo;
  isSaved?: boolean;
  onSave?: () => void;
  onShare?: () => void;
}

/**
 * Resilient Image Component with broken-image fallback
 */
function SafeImage({
  src,
  alt,
  fill,
  priority,
  loading,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (prevSrc !== src) {
    setPrevSrc(src);
    setHasError(false);
  }

  if (hasError || !src) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#071625] text-slate-500 p-2 text-center select-none">
        <AlertCircle className="h-6 w-6 text-amber-500/70 mb-1" />
        <span className="text-[11px] text-slate-400 font-medium">Image unavailable</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      loading={loading}
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

/**
 * Bandwidth-Efficient Shared Image Gallery
 *
 * Rules:
 * 1. Mobile: Shows strictly 1 image, business logo (if available), Prev/Next buttons, and tap to expand.
 * 2. Desktop: Shows 2 images side-by-side with +X overlay on the 2nd image.
 * 3. If only 1 image available anywhere: shows 1 image in full width simple.
 * 4. Business logo: displayed only if available (hidden if not).
 * 5. Modal: strictly 1 counter at the bottom, top duplicate near close cross removed.
 */
export function BandwidthEfficientGallery({
  images = [],
  title = "Gallery",
  className,
  aspectRatio = "16/10",
  totalCount,
  priorityLcp = true,
  logo,
  isSaved,
  onSave,
  onShare,
}: BandwidthEfficientGalleryProps) {
  const [mobileHeroIndex, setMobileHeroIndex] = useState(0);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [internalSaved, setInternalSaved] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const activeSaved = isSaved !== undefined ? isSaved : internalSaved;

  const handleShare = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onShare) {
        onShare();
        return;
      }
      if (typeof window !== "undefined" && navigator.clipboard) {
        try {
          await navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          // ignore
        }
      }
    },
    [onShare]
  );

  const handleSave = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onSave) {
        onSave();
      } else {
        setInternalSaved((prev) => !prev);
      }
    },
    [onSave]
  );

  const effectiveTotal = totalCount ?? images.length;
  const isSingle = images.length <= 1;
  const hasMultiple = images.length > 1;

  // Remaining count for the second desktop image
  const extraOnSecondImage = effectiveTotal > 2 ? effectiveTotal - 2 : 0;

  const openExpanded = (index = 0) => {
    setSelectedPhotoIndex(index);
    setIsExpanded(true);
  };

  const closeExpanded = () => {
    setIsExpanded(false);
  };

  // Mobile hero navigation
  const handleMobilePrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMobileHeroIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleMobileNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setMobileHeroIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  // Lightbox modal navigation
  const handleModalPrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const handleModalNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setSelectedPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  // Keyboard navigation
  useEffect(() => {
    if (!isExpanded) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeExpanded();
      } else if (e.key === "ArrowLeft") {
        setSelectedPhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      } else if (e.key === "ArrowRight") {
        setSelectedPhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, images.length]);

  // Lock background scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  if (!images || images.length === 0) {
    return (
      <div
        role="region"
        aria-label={title}
        className={cn(
          "flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-white/10 bg-[#071625] text-slate-400",
          className
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <Images className="h-8 w-8 text-slate-500" />
          <p className="text-xs">No photos available</p>
        </div>
      </div>
    );
  }

  const aspectClass =
    aspectRatio === "16/9"
      ? "aspect-[16/9]"
      : aspectRatio === "4/3"
      ? "aspect-[4/3]"
      : aspectRatio === "3/2"
      ? "aspect-[3/2]"
      : "aspect-[16/10]";

  return (
    <div
      role="region"
      aria-label={`${title} image gallery`}
      className={cn("w-full relative", className)}
    >
      {/* ───────────────── Collapsed Gallery Layout ───────────────── */}
      {isSingle ? (
        /* ── ONLY 1 IMAGE: Full Width Simple ── */
        <div
          className={cn(
            "group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#071625] shadow-xl",
            aspectClass
          )}
        >
          <button
            type="button"
            onClick={() => openExpanded(0)}
            aria-label={`View photo: ${images[0].alt || title}`}
            className="relative h-full w-full block cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
          >
            <SafeImage
              src={images[0].src}
              alt={images[0].alt || title}
              fill
              priority={priorityLcp}
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.01]"
            />
          </button>

          {/* Business Logo Overlay on Bottom Left (Only if available) */}
          {logo && logo.src && (
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex size-14 sm:size-18 md:size-20 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#091b2c]/95 p-1.5 sm:p-2 shadow-2xl backdrop-blur-md pointer-events-none">
              <Image
                src={logo.src}
                alt={logo.alt || `${title} logo`}
                width={72}
                height={72}
                className="size-full object-contain rounded-xl"
                priority
              />
            </div>
          )}

          {/* Controls on Bottom Right for Single Image: [Share] [Save] [Expand] */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share listing link"
              className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
            >
              {copied ? (
                <Check className="size-3.5 sm:size-4 text-emerald-400" />
              ) : (
                <Share2 className="size-3.5 sm:size-4 text-slate-200" />
              )}
            </button>

            <button
              type="button"
              onClick={handleSave}
              aria-label={activeSaved ? "Saved to favorites" : "Save to favorites"}
              aria-pressed={activeSaved}
              className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
            >
              <Heart
                className={cn(
                  "size-3.5 sm:size-4 transition-colors",
                  activeSaved ? "fill-red-500 text-red-500" : "text-slate-200"
                )}
              />
            </button>

            <button
              type="button"
              onClick={() => openExpanded(0)}
              aria-label="Expand photo"
              className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-lg cursor-pointer hover:bg-black/85 active:scale-95 transition-all"
            >
              <Maximize2 className="size-3 text-orange-400" />
              <span>Expand</span>
            </button>
          </div>
        </div>
      ) : (
        /* ── MULTIPLE IMAGES: 1 image on Mobile with controls, 2 images side-by-side on Desktop ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
          {/* Primary Image Card: Full-width on mobile, Left column on desktop */}
          <div
            className={cn(
              "group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#071625] shadow-xl",
              aspectClass
            )}
          >
            <button
              type="button"
              onClick={() => openExpanded(mobileHeroIndex)}
              aria-label={`View photo ${mobileHeroIndex + 1} of ${effectiveTotal}: ${images[mobileHeroIndex].alt || title}`}
              className="relative h-full w-full block cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <SafeImage
                src={images[mobileHeroIndex].src}
                alt={images[mobileHeroIndex].alt || `${title} photo ${mobileHeroIndex + 1}`}
                fill
                priority={priorityLcp}
                sizes="(max-width: 640px) 100vw, 35vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
            </button>

            {/* Action Controls Group on Bottom Right: [Share] [Save] [Counter / Expand] */}
            <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share listing link"
                className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
              >
                {copied ? (
                  <Check className="size-3.5 sm:size-4 text-emerald-400" />
                ) : (
                  <Share2 className="size-3.5 sm:size-4 text-slate-200" />
                )}
              </button>

              <button
                type="button"
                onClick={handleSave}
                aria-label={activeSaved ? "Saved to favorites" : "Save to favorites"}
                aria-pressed={activeSaved}
                className="flex size-7 sm:size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
              >
                <Heart
                  className={cn(
                    "size-3.5 sm:size-4 transition-colors",
                    activeSaved ? "fill-red-500 text-red-500" : "text-slate-200"
                  )}
                />
              </button>

              {/* Mobile photo counter */}
              <button
                type="button"
                onClick={() => openExpanded(mobileHeroIndex)}
                aria-label={`View photo ${mobileHeroIndex + 1} of ${effectiveTotal}`}
                className="sm:hidden flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-lg cursor-pointer hover:bg-black/85 active:scale-95 transition-all"
              >
                <Images className="size-3 text-orange-400" />
                <span>{mobileHeroIndex + 1}/{effectiveTotal}</span>
              </button>

              {/* Desktop expand button */}
              <button
                type="button"
                onClick={() => openExpanded(0)}
                aria-label={`Expand photo 1 of ${effectiveTotal}`}
                className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-lg cursor-pointer hover:bg-black/85 active:scale-95 transition-all"
              >
                <Maximize2 className="size-3 text-orange-400" />
                <span>Expand</span>
              </button>
            </div>

            {/* Mobile Prev / Next Buttons */}
            {hasMultiple && (
              <>
                <button
                  type="button"
                  onClick={handleMobilePrev}
                  aria-label="Previous photo"
                  className="sm:hidden absolute left-2.5 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={handleMobileNext}
                  aria-label="Next photo"
                  className="sm:hidden absolute right-2.5 top-1/2 -translate-y-1/2 z-10 flex size-8 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white backdrop-blur-md transition-all hover:bg-black/85 active:scale-95 cursor-pointer shadow-lg"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}

            {/* Business Logo Overlay on Bottom Left (Only if available) */}
            {logo && logo.src && (
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 flex size-14 sm:size-18 md:size-20 items-center justify-center overflow-hidden rounded-2xl border border-white/25 bg-[#091b2c]/95 p-1.5 sm:p-2 shadow-2xl backdrop-blur-md pointer-events-none">
                <Image
                  src={logo.src}
                  alt={logo.alt || `${title} logo`}
                  width={72}
                  height={72}
                  className="size-full object-contain rounded-xl"
                  priority
                />
              </div>
            )}
          </div>

          {/* Second Image Card: Shown on Desktop, Hidden on Mobile */}
          <div
            className={cn(
              "hidden sm:block group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#071625] shadow-xl",
              aspectClass
            )}
          >
            <button
              type="button"
              onClick={() => openExpanded(1)}
              aria-label={
                extraOnSecondImage > 0
                  ? `View photo 2 and ${extraOnSecondImage} more photos`
                  : `View photo 2 of ${effectiveTotal}`
              }
              className="relative h-full w-full block cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
            >
              <SafeImage
                src={images[1].src}
                alt={images[1].alt || `${title} photo 2`}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, 35vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
              />

              {/* +X Overlay if more photos exist */}
              {extraOnSecondImage > 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#08192a]/75 backdrop-blur-xs text-white transition-all group-hover:bg-[#08192a]/65">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
                    +{extraOnSecondImage}
                  </span>
                  <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs sm:text-sm font-semibold text-orange-400 backdrop-blur-md shadow-lg">
                    <Images className="h-3.5 w-3.5" />
                    <span>View all {effectiveTotal} photos</span>
                  </span>
                </div>
              ) : (
                <>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
                  <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="h-3 w-3 text-orange-400" />
                    <span>Expand</span>
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ───────────────── On-Demand Expanded Gallery Modal ───────────────── */}
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} expanded view`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in-0 duration-200 p-2 sm:p-4 md:p-6"
        >
          <div className="relative max-h-[96vh] max-w-6xl w-full flex flex-col rounded-2xl border border-white/15 bg-[#061423] shadow-2xl overflow-hidden">
            {/* Modal Header: Title on left, Close button on right (Duplicate top counter removed) */}
            <header className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10 bg-[#081b2e]/80">
              <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-[280px] sm:max-w-md">
                {title}
              </h3>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeExpanded}
                aria-label="Close expanded view"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* Modal Body: Strictly 1 Single Image Mounted */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-3 sm:p-5 overflow-hidden">
              <div className="relative aspect-[16/10] w-full max-h-[72vh] overflow-hidden rounded-xl border border-white/15 bg-black">
                <SafeImage
                  key={images[selectedPhotoIndex]?.id || selectedPhotoIndex}
                  src={images[selectedPhotoIndex]?.src || ""}
                  alt={
                    images[selectedPhotoIndex]?.alt ||
                    `${title} photo ${selectedPhotoIndex + 1}`
                  }
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-contain"
                />
              </div>

              {/* Clean Caption & Single Counter at Bottom */}
              <div className="mt-3 flex items-center justify-between w-full px-2 text-slate-300 text-xs sm:text-sm">
                <p className="truncate max-w-[75%] text-slate-300 font-medium">
                  {images[selectedPhotoIndex]?.caption ||
                    images[selectedPhotoIndex]?.alt ||
                    `Photo ${selectedPhotoIndex + 1} of ${images.length}`}
                </p>
                <span className="font-semibold text-white shrink-0">
                  {selectedPhotoIndex + 1} / {images.length}
                </span>
              </div>

              {/* Lightbox Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handleModalPrev}
                    aria-label="Previous photo"
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all cursor-pointer shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={handleModalNext}
                    aria-label="Next photo"
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-black/90 transition-all cursor-pointer shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
