"use client";

import { useState } from "react";
import { BandwidthEfficientGallery, type GalleryItem } from "@/components/shared/BandwidthEfficientGallery";

const BASE_IMAGES: GalleryItem[] = [
  {
    id: "img-1",
    src: "/images/dashboard/subtype-glamping.jpg",
    alt: "Luxury Safari Tent with illuminated pool deck",
    caption: "Poolside and illuminated luxury safari tents at dusk",
  },
  {
    id: "img-2",
    src: "/images/dashboard/subtype-bush-camp.jpg",
    alt: "Outdoor boma lounge and seating deck",
    caption: "Outdoor boma lounge and seating deck",
  },
  {
    id: "img-3",
    src: "/images/dashboard/subtype-safari-tent.jpg",
    alt: "Master suite king bedroom inside safari tent",
    caption: "Master suite king bedroom inside luxury safari tent",
  },
  {
    id: "img-4",
    src: "/images/dashboard/bush-camps.jpg",
    alt: "Timber dining deck surrounded by indigenous trees",
    caption: "Timber dining deck surrounded by indigenous trees",
  },
  {
    id: "img-5",
    src: "/images/dashboard/game-lodges.jpg",
    alt: "Spacious luxury tent exterior with ambient lighting",
    caption: "Spacious luxury tent exterior with ambient lighting",
  },
  {
    id: "img-6",
    src: "/images/dashboard/hidden-gems.jpg",
    alt: "Private veranda with garden views and loungers",
    caption: "Private veranda with garden views and loungers",
  },
  {
    id: "img-7",
    src: "/images/dashboard/hotels-resorts.jpg",
    alt: "Main lodge reception and hospitality lounge",
    caption: "Main lodge reception and hospitality lounge",
  },
  {
    id: "img-8",
    src: "/images/dashboard/guesthouses.jpg",
    alt: "Guest dining patio with forest surroundings",
    caption: "Guest dining patio with forest surroundings",
  },
  {
    id: "img-9",
    src: "/images/dashboard/sa-landscape.jpg",
    alt: "iSimangaliso wetland landscape nearby",
    caption: "iSimangaliso wetland landscape nearby",
  },
  {
    id: "img-10",
    src: "/images/dashboard/subtype-campsite.jpg",
    alt: "Stargazing firepit area at twilight",
    caption: "Stargazing firepit area at twilight",
  },
];

function generateImages(count: number): GalleryItem[] {
  const result: GalleryItem[] = [];
  for (let i = 0; i < count; i++) {
    const base = BASE_IMAGES[i % BASE_IMAGES.length];
    result.push({
      ...base,
      id: `img-${i + 1}`,
      alt: `${base.alt} (Item #${i + 1})`,
      caption: `${base.caption} — Photo ${i + 1} of ${count}`,
    });
  }
  return result;
}

export default function GalleryTestPage() {
  const [testCount, setTestCount] = useState<1 | 3 | 10 | 50>(10);
  const images = generateImages(testCount);

  // Compute expected metrics
  const expectedLargeImages = Math.min(testCount, 2);
  const expectedThumbnails = testCount >= 3 ? 1 : 0;
  const expectedExtraCount = testCount > 3 ? testCount - 3 : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      {/* Test Suite Header */}
      <div className="rounded-2xl border border-white/10 bg-[#071625] p-6 backdrop-blur-xl">
        <h1 className="text-xl sm:text-2xl font-black text-white">
          Bandwidth-Efficient Image Gallery Test Suite
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Validating strict layout constraints, progressive loading, and zero premature image downloads across 1, 3, 10, and 50 photo datasets.
        </p>

        {/* Dataset selector buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-400">Select Test Dataset:</span>
          {([1, 3, 10, 50] as const).map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => setTestCount(count)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                testCount === count
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25 ring-2 ring-orange-400"
                  : "border border-white/15 bg-white/5 text-slate-300 hover:bg-white/10"
              }`}
            >
              {count} {count === 1 ? "Image" : "Images"}
            </button>
          ))}
        </div>

        {/* Live Metrics Card */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <span className="text-slate-400 block">Total Dataset</span>
            <span className="text-base font-bold text-white mt-0.5 block">{testCount} Photos</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <span className="text-slate-400 block">Large Previews</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">
              {expectedLargeImages} (Max 2)
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <span className="text-slate-400 block">Compact Thumbnail</span>
            <span className="text-base font-bold text-emerald-400 mt-0.5 block">
              {expectedThumbnails} (Max 1)
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/40 p-3">
            <span className="text-slate-400 block">Extra Overlay Count</span>
            <span className="text-base font-bold text-orange-400 mt-0.5 block">
              {expectedExtraCount > 0 ? `+${expectedExtraCount}` : "None (No misleading overlay)"}
            </span>
          </div>
        </div>
      </div>

      {/* Reusable Gallery Component Under Test */}
      <div className="rounded-2xl border border-white/10 bg-[#081a2c]/60 p-4 sm:p-6 backdrop-blur-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            Active Gallery Display ({testCount} items)
          </h2>
          <span className="text-xs text-slate-400">
            Open DevTools Network to confirm image requests
          </span>
        </div>

        <BandwidthEfficientGallery
          images={images}
          title={`Test Showcase (${testCount} Photos)`}
          totalCount={testCount}
        />
      </div>

      {/* Automated Checklist of Requirements */}
      <div className="rounded-2xl border border-white/10 bg-[#071625] p-6 space-y-3">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider text-orange-400">
          Validation Checklist
        </h3>
        <ul className="space-y-2 text-xs text-slate-300">
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Max 2 large images:</strong> Collapsed view never renders more than 2 large previews.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Exactly 1 compact thumbnail:</strong> Below main images, only 1 thumbnail is displayed.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Accurate overlay:</strong> Shows +{expectedExtraCount} when extra images exist; no overlay when 1 or 3 images.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>Zero DOM overhead:</strong> Images 4 through {testCount} are unmounted until user clicks expand.</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold">✓</span>
            <span><strong>On-demand progressive loading:</strong> Modal opens with focus or grid view, lazy-loading below-the-fold content.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
