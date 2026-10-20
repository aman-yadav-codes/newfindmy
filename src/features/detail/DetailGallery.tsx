"use client";

import { BandwidthEfficientGallery } from "@/components/shared/BandwidthEfficientGallery";
import type { GalleryPhoto } from "./types";

interface DetailGalleryProps {
  photos: GalleryPhoto[];
  listingName: string;
  totalCount?: number;
  logo?: {
    src: string;
    alt: string;
  };
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export function DetailGallery({
  photos,
  listingName,
  totalCount,
  logo,
  isSaved,
  onToggleSave,
}: DetailGalleryProps) {
  return (
    <BandwidthEfficientGallery
      images={photos}
      title={listingName}
      aspectRatio="16/10"
      totalCount={totalCount}
      logo={logo}
      isSaved={isSaved}
      onSave={onToggleSave}
    />
  );
}
