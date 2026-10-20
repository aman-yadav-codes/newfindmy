import { Calendar, Phone } from "lucide-react";
import type { ListingDetailData } from "./types";

interface MobileReservationBarProps {
  data: ListingDetailData;
  onOpenBooking?: () => void;
}

export function MobileReservationBar({
  data,
  onOpenBooking,
}: MobileReservationBarProps) {
  return (
    <div
      role="region"
      aria-label="Quick mobile booking"
      className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between border-t border-white/15 bg-[#071625]/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] backdrop-blur-xl shadow-2xl lg:hidden"
    >
      {/* Price Info */}
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] text-slate-300">From</span>
          <span className="text-lg font-black text-white">
            {data.currency} {data.pricePerNight.toLocaleString()}
          </span>
          <span className="text-[10px] text-slate-400">/ Night</span>
        </div>
        <p className="text-[9px] text-slate-400">Subject to availability</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <a
          href={`tel:${data.phone}`}
          aria-label="Call property"
          className="grid size-10 place-items-center rounded-xl border border-white/20 bg-white/10 text-slate-200 hover:text-white"
        >
          <Phone className="h-4 w-4" />
        </a>

        <button
          type="button"
          onClick={onOpenBooking}
          className="flex h-10 items-center gap-1.5 rounded-xl bg-orange-500 px-4 text-xs font-bold text-white shadow-lg shadow-orange-500/25 active:scale-95"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Reserve Stay</span>
        </button>
      </div>
    </div>
  );
}
