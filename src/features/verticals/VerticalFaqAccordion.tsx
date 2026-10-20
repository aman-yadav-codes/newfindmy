"use client";

import { useState } from "react";
import {
  ChevronDown,
  Users,
  Briefcase,
  Building2,
  Car,
  Ticket,
  Compass,
  Wrench,
  Store,
} from "lucide-react";
import type { FaqItem } from "./types";

interface VerticalFaqAccordionProps {
  consumerFaqs: FaqItem[];
  businessFaqs: FaqItem[];
  consumerSubhead?: string;
  businessSubhead?: string;
  verticalType?: "services" | "property" | "transport" | "entertainment" | "travel" | "default";
}

export function VerticalFaqAccordion({
  consumerFaqs,
  businessFaqs,
  consumerSubhead = "Everything you need to know about using FindMy",
  businessSubhead = "How to list and grow your business on FindMy",
  verticalType = "default",
}: VerticalFaqAccordionProps) {
  const [openConsumerIndex, setOpenConsumerIndex] = useState<number | null>(null);
  const [openBusinessIndex, setOpenBusinessIndex] = useState<number | null>(null);

  const toggleConsumer = (index: number) => {
    setOpenConsumerIndex((prev) => (prev === index ? null : index));
  };

  const toggleBusiness = (index: number) => {
    setOpenBusinessIndex((prev) => (prev === index ? null : index));
  };

  // Structured Data Schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [...consumerFaqs, ...businessFaqs].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const renderConsumerIcon = () => {
    switch (verticalType) {
      case "services":
        return <Wrench className="size-4 sm:size-5" />;
      case "property":
        return <Building2 className="size-4 sm:size-5" />;
      case "transport":
        return <Car className="size-4 sm:size-5" />;
      case "entertainment":
        return <Ticket className="size-4 sm:size-5" />;
      case "travel":
        return <Compass className="size-4 sm:size-5" />;
      default:
        return <Users className="size-4 sm:size-5" />;
    }
  };

  const renderBusinessIcon = () => {
    switch (verticalType) {
      case "services":
        return <Briefcase className="size-4 sm:size-5" />;
      case "property":
        return <Building2 className="size-4 sm:size-5" />;
      case "transport":
        return <Store className="size-4 sm:size-5" />;
      case "entertainment":
        return <Briefcase className="size-4 sm:size-5" />;
      case "travel":
        return <Store className="size-4 sm:size-5" />;
      default:
        return <Store className="size-4 sm:size-5" />;
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
        {/* ───────────────── 1. Consumer FAQs ───────────────── */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/[0.08] backdrop-blur-2xl p-4 sm:p-6 lg:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.25)] space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="size-10 sm:size-11 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/20 grid place-items-center shrink-0">
              {renderConsumerIcon()}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Consumer FAQs</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-medium">
                {consumerSubhead}
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {consumerFaqs.map((faq: FaqItem, idx: number) => {
              const isOpen = openConsumerIndex === idx;
              return (
                <div key={faq.question} className="py-3 sm:py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleConsumer(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`consumer-faq-${idx}`}
                    className="w-full flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition-colors cursor-pointer group"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-white/60 group-hover:text-amber-300 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`consumer-faq-${idx}`}
                      className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-normal animate-in fade-in-0 slide-in-from-top-1 duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ───────────────── 2. Business FAQs ───────────────── */}
        <div className="rounded-2xl sm:rounded-3xl border border-white/20 bg-white/[0.08] backdrop-blur-2xl p-4 sm:p-6 lg:p-8 shadow-[0_12px_30px_rgba(0,0,0,0.25)] space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <div className="size-10 sm:size-11 rounded-2xl bg-amber-400/10 text-amber-300 border border-amber-400/20 grid place-items-center shrink-0">
              {renderBusinessIcon()}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Business FAQs</h3>
              <p className="text-[11px] sm:text-xs text-white/60 font-medium">
                {businessSubhead}
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {businessFaqs.map((faq: FaqItem, idx: number) => {
              const isOpen = openBusinessIndex === idx;
              return (
                <div key={faq.question} className="py-3 sm:py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleBusiness(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`business-faq-${idx}`}
                    className="w-full flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-bold text-white hover:text-amber-300 transition-colors cursor-pointer group"
                  >
                    <span className="leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-white/60 group-hover:text-amber-300 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`business-faq-${idx}`}
                      className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed font-normal animate-in fade-in-0 slide-in-from-top-1 duration-150"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
