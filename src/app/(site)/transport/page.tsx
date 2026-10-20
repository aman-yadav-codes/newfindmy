import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { VerticalHeroSearch } from "@/features/verticals/VerticalHeroSearch";
import { VerticalFaqAccordion } from "@/features/verticals/VerticalFaqAccordion";
import {
  TRANSPORT_HERO,
  TRANSPORT_BENEFITS,
  TRANSPORT_CATEGORIES,
  TRANSPORT_MATCH_BANNER,
  TRANSPORT_ARTICLES,
  TRANSPORT_SERVICES,
  TRANSPORT_OWNER_CTA,
  TRANSPORT_CONSUMER_FAQS,
  TRANSPORT_BUSINESS_FAQS,
} from "@/features/verticals/content/transport-content";

export const metadata: Metadata = {
  title: "Your personal AI Agent at your Service - Search Transport in South Africa | FindMy Transport",
  description:
    "Welcome to FindMy Transport, your premier platform for listing and discovering transport options. FindMy Transport provides a seamless and efficient experience.",
  keywords: [
    "cars for sale south africa",
    "used cars",
    "dealerships",
    "bakkies for sale",
    "suvs",
    "commercial vehicles",
    "car finance",
  ],
  alternates: {
    canonical: "/transport",
  },
  openGraph: {
    title: "FindMy Transport - Search Vehicles in South Africa",
    description: "Search thousands of new & used vehicles from trusted dealers nationwide.",
    url: "/transport",
    siteName: "FindMy Transport",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/transport-home/hero-car.png",
        width: 1200,
        height: 630,
        alt: "FindMy Transport",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMy Transport - Your Next Ride, Found Smarter",
    description: "Search thousands of new & used vehicles from trusted dealers nationwide.",
    images: ["/transport-home/hero-car.png"],
  },
};

export default function TransportPage() {
  return (
    <div className="relative w-full text-white selection:bg-orange-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. Hero Section
      ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        aria-labelledby="transport-hero-heading"
        className="relative w-full min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/10"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 78% 45%, rgba(200, 109, 68, 0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 60%, rgba(30, 78, 98, 0.25) 0%, transparent 70%),
            linear-gradient(180deg, rgba(7, 26, 43, 0.72) 0%, rgba(7, 20, 36, 0.52) 100%)`,
        }}
      >
        {/* Desktop Floating Graphic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:flex items-center justify-end overflow-hidden"
        >
          <Image
            src={TRANSPORT_HERO.heroImage}
            alt="FindMy Transport modern vehicle"
            priority
            width={760}
            height={760}
            className="h-[88%] max-h-[720px] w-auto max-w-[52%] object-contain object-right drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)] select-none"
          />
        </div>

        {/* Mobile Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 flex lg:hidden w-full justify-end overflow-hidden opacity-25"
        >
          <Image
            src={TRANSPORT_HERO.heroImage}
            alt=""
            priority
            width={260}
            height={260}
            className="h-[260px] w-auto object-contain object-right"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8 min-h-[calc(100svh-4rem)] pt-20 pb-16 lg:pt-12 lg:pb-12">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/70">
              <ol className="flex items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-orange-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li className="inline-flex items-center gap-2">
                  <ChevronRight className="size-3 opacity-60" aria-hidden="true" />
                  <span aria-current="page" className="text-white font-bold">
                    Transport
                  </span>
                </li>
              </ol>
            </nav>

            {/* H1 Heading */}
            <h1
              id="transport-hero-heading"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.08] text-white tracking-tight"
            >
              <span className="text-[#E08A58] dark:text-orange-500">{TRANSPORT_HERO.h1Prefix}</span>{" "}
              {TRANSPORT_HERO.h1Suffix}
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/80">
              {TRANSPORT_HERO.subhead}
            </p>

            {/* Search Form & Chips */}
            <VerticalHeroSearch
              placeholder={TRANSPORT_HERO.searchPlaceholder}
              searchRoute={TRANSPORT_HERO.searchRoute}
              ariaLabel="Search vehicles, body types, and dealerships"
              chips={TRANSPORT_HERO.chips}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Benefits: "We're with you, all the way"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="benefits-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              DISCOVER
            </span>
            <h2
              id="benefits-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              We&apos;re with you, all the way
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-2xl mx-auto">
              Transparent vehicle discovery with finance pre-approval and instant test-drive scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TRANSPORT_BENEFITS.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0c1f33]/55 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#102740]/70 text-center group"
              >
                {item.image && (
                  <div className="h-44 w-full relative mb-6 rounded-2xl overflow-hidden bg-white/5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={260}
                      className="size-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. Categories: "Not sure where to start? Try one of these"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="browse-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              BROWSE INVENTORY
            </span>
            <h2
              id="browse-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              Not sure where to start? Try one of these
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-xl mx-auto">
              Popular vehicle searches and body types across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TRANSPORT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0c1f33]/55 backdrop-blur-xl text-left space-y-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              >
                <h3 className="text-xl font-bold text-white flex items-center justify-between">
                  <span>{cat.name}</span>
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {cat.items.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="group flex items-center justify-between p-3 rounded-xl border border-white/15 bg-white/5 text-white/90 hover:bg-white/15 hover:text-white transition"
                    >
                      <span className="text-xs sm:text-sm font-medium">{sub.name}</span>
                      <ArrowRight className="size-3.5 text-white/40 group-hover:text-amber-300 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Match Banner: "Can't find the one?"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="match-heading" className="py-14 sm:py-16 border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0c2f4d]/80 via-[#0a233b]/70 to-[#071929]/80 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.35)] text-center max-w-4xl mx-auto space-y-4">
            <h2
              id="match-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight"
            >
              {TRANSPORT_MATCH_BANNER.title}
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
              {TRANSPORT_MATCH_BANNER.subtitle}
            </p>
            <div className="pt-2">
              <a
                href={TRANSPORT_MATCH_BANNER.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm sm:text-base font-bold text-white transition hover:shadow-xl shadow-md active:scale-95"
              >
                <span>{TRANSPORT_MATCH_BANNER.ctaText}</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Articles: "Motor Manual"
      ───────────────────────────────────────────────────────────── */}
      <section id="articles" aria-labelledby="articles-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2
              id="articles-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              Motor Manual
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-white/70 max-w-2xl mx-auto">
              The latest reviews, tips, and advice to help you choose wisely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {TRANSPORT_ARTICLES.map((article) => (
              <div
                key={article.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/20 bg-white/[0.08] backdrop-blur-2xl shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/[0.12]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={375}
                    className="size-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <div className="mt-auto pt-4 text-right">
                    <a
                      href={article.href}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-300 hover:text-amber-200 hover:underline"
                    >
                      <span>Read</span>
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a
              href="https://blog.findmy.co.za/"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-bold text-white transition hover:bg-white/20 hover:border-white/50 shadow-sm active:scale-95"
            >
              <span>Explore Our Blog</span>
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. Cross-Vertical Services: "Stay on the Road"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <h2
              id="services-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              Stay on the Road
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-xl mx-auto">
              Your car is just the start. Find every service you need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TRANSPORT_SERVICES.map((serv) => (
              <Link
                key={serv.id}
                href={serv.href}
                className="group flex flex-col items-center p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#0c1f33]/55 backdrop-blur-xl shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-[#102740]/75 text-center active:scale-95"
              >
                <div className="size-16 sm:size-20 relative mb-3 rounded-xl overflow-hidden bg-white/5 p-2">
                  <Image
                    src={serv.image}
                    alt={serv.title}
                    width={80}
                    height={80}
                    className="size-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {serv.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. Dealer CTA: "Stock Your Virtual Showroom"
      ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="dealer-cta-heading"
        className="py-16 sm:py-20 border-b border-white/10 text-center bg-gradient-to-r from-[#0c2f4d]/50 via-[#092238]/35 to-[#061829]/50"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <h2
            id="dealer-cta-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
          >
            {TRANSPORT_OWNER_CTA.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-white/80 max-w-xl mx-auto leading-relaxed">
            {TRANSPORT_OWNER_CTA.subtitle}
          </p>
          <div className="pt-4">
            <a
              href={TRANSPORT_OWNER_CTA.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white transition hover:shadow-xl shadow-md cursor-pointer active:scale-95"
            >
              {TRANSPORT_OWNER_CTA.buttonText}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. Transport FAQs Section
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="faqs-heading" className="py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E08A58]">
              HAVE QUESTIONS?
            </span>
            <h2
              id="faqs-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              FindMy Transport FAQs
            </h2>
            <p className="text-sm sm:text-base font-medium text-white/70 max-w-2xl mx-auto">
              Everything you need to know about buying, selling, and servicing vehicles with FindMy Transport.
            </p>
          </div>

          <VerticalFaqAccordion
            consumerFaqs={TRANSPORT_CONSUMER_FAQS}
            businessFaqs={TRANSPORT_BUSINESS_FAQS}
            consumerSubhead="Everything you need to know about buying & financing vehicles"
            businessSubhead="Everything you need to know about listing dealer inventory"
            verticalType="transport"
          />
        </div>
      </section>
    </div>
  );
}
