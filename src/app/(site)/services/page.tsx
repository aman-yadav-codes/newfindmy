import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { VerticalHeroSearch } from "@/features/verticals/VerticalHeroSearch";
import { VerticalFaqAccordion } from "@/features/verticals/VerticalFaqAccordion";
import {
  SERVICES_HERO,
  SERVICES_BENEFITS,
  SERVICES_LOCATIONS,
  SERVICES_MATCH_BANNER,
  SERVICES_ARTICLES,
  SERVICES_OWNER_CTA,
  SERVICES_CONSUMER_FAQS,
  SERVICES_BUSINESS_FAQS,
} from "@/features/verticals/content/services-content";

export const metadata: Metadata = {
  title: "FindMy Service | Connect with Trusted Local Professionals in South Africa",
  description:
    "Welcome to FindMy Service, Your trusted platform for locating reliable services near you. From home maintenance to professional solutions, connect with top-rated experts effortlessly!",
  keywords: [
    "local services south africa",
    "find a plumber",
    "find an electrician",
    "home cleaning services",
    "handyman cape town",
    "tradespeople johannesburg",
    "contractors durban",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "FindMy Service - Find Trusted Local Professionals",
    description:
      "South Africa’s intelligent network of local professionals. From emergency fixes to long-term projects.",
    url: "/services",
    siteName: "FindMy Service",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/service-home/hero-signpost.png",
        width: 1200,
        height: 630,
        alt: "FindMy Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FindMy Service - Connect with Top-Rated Experts",
    description:
      "South Africa’s intelligent network of local professionals. From emergency fixes to long-term projects.",
    images: ["/service-home/hero-signpost.png"],
  },
};

export default function ServicesPage() {
  return (
    <div className="relative w-full text-white selection:bg-orange-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. Hero Section
      ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        aria-labelledby="services-hero-heading"
        className="relative w-full min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/10"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 78% 45%, rgba(200, 109, 68, 0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 60%, rgba(30, 78, 98, 0.25) 0%, transparent 70%),
            linear-gradient(180deg, rgba(7, 26, 43, 0.72) 0%, rgba(7, 20, 36, 0.52) 100%)`,
        }}
      >
        {/* Hero Artwork - Large Desktop Floating Graphic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:flex items-center justify-end overflow-hidden"
        >
          <Image
            src={SERVICES_HERO.heroImage}
            alt="FindMy Service professions signpost"
            priority
            width={760}
            height={760}
            className="h-[88%] max-h-[720px] w-auto max-w-[50%] object-contain object-right drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)] select-none"
          />
        </div>

        {/* Hero Artwork - Mobile Subtle Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 flex lg:hidden w-full justify-end overflow-hidden opacity-25"
        >
          <Image
            src={SERVICES_HERO.heroImage}
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
                    Services
                  </span>
                </li>
              </ol>
            </nav>

            {/* H1 Heading */}
            <h1
              id="services-hero-heading"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.08] text-white tracking-tight"
            >
              <span className="text-[#E08A58] dark:text-orange-500">{SERVICES_HERO.h1Prefix}</span>{" "}
              {SERVICES_HERO.h1Suffix}
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/80">
              {SERVICES_HERO.subhead}
            </p>

            {/* Interactive Hero Search Form & Action Chips */}
            <VerticalHeroSearch
              placeholder={SERVICES_HERO.searchPlaceholder}
              searchRoute={SERVICES_HERO.searchRoute}
              ariaLabel="Search services, trades, and professionals"
              chips={SERVICES_HERO.chips}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Benefits: "The Smarter Way to Hire"
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
              The Smarter Way to Hire
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-2xl mx-auto">
              Connecting you with verified professionals across South Africa with zero guesswork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES_BENEFITS.map((item) => (
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
          3. Locations: "Who are you looking for?"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="locations-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              LOCAL EXPERTS
            </span>
            <h2
              id="locations-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              Who are you looking for?
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-xl mx-auto">
              Find verified local professionals and trade specialists in your metro area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {SERVICES_LOCATIONS.map((loc) => (
              <Link
                key={loc.id}
                href={loc.href}
                className="group relative h-64 sm:h-72 overflow-hidden rounded-3xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-2xl cursor-pointer block"
              >
                <Image
                  src={loc.image}
                  alt={loc.name}
                  width={600}
                  height={400}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061424]/95 via-[#061424]/45 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                      {loc.name}
                    </h3>
                    {loc.description && (
                      <p className="mt-1 text-xs sm:text-sm text-white/75 font-normal">
                        {loc.description}
                      </p>
                    )}
                  </div>
                  <div className="size-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 group-hover:bg-white/25 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0 ml-3">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Match Banner: "Can’t find the perfect fit?"
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="match-heading" className="py-14 sm:py-16 border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-[#0c2f4d]/80 via-[#0a233b]/70 to-[#071929]/80 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_16px_48px_rgba(0,0,0,0.35)] text-center max-w-4xl mx-auto space-y-4">
            <h2
              id="match-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight"
            >
              {SERVICES_MATCH_BANNER.title}
            </h2>
            <p className="text-sm sm:text-base text-white/75 font-normal max-w-2xl mx-auto leading-relaxed">
              {SERVICES_MATCH_BANNER.subtitle}
            </p>
            <div className="pt-2">
              <a
                href={SERVICES_MATCH_BANNER.href}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-7 py-3 text-sm sm:text-base font-bold text-white transition hover:shadow-xl shadow-md active:scale-95"
              >
                <span>{SERVICES_MATCH_BANNER.ctaText}</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Editorial Articles: "The Expert Edit"
      ───────────────────────────────────────────────────────────── */}
      <section id="articles" aria-labelledby="articles-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2
              id="articles-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              The Expert Edit
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-white/70 max-w-2xl mx-auto">
              Practical tips on maintenance, hiring strategies, and fair pricing to help you manage your projects like a pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {SERVICES_ARTICLES.map((article) => (
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
          6. Business Owner CTA: "Grow Your Local Client Base"
      ───────────────────────────────────────────────────────────── */}
      <section
        aria-labelledby="owner-heading"
        className="py-16 sm:py-20 border-b border-white/10 text-center bg-gradient-to-r from-[#0c2f4d]/50 via-[#092238]/35 to-[#061829]/50"
      >
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 space-y-4">
          <h2
            id="owner-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
          >
            {SERVICES_OWNER_CTA.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-white/80 max-w-xl mx-auto leading-relaxed">
            {SERVICES_OWNER_CTA.subtitle}
          </p>
          <div className="pt-4">
            <a
              href={SERVICES_OWNER_CTA.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white transition hover:shadow-xl shadow-md cursor-pointer active:scale-95"
            >
              {SERVICES_OWNER_CTA.buttonText}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. Services FAQs Section
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
              FindMy Service FAQs
            </h2>
            <p className="text-sm sm:text-base font-medium text-white/70 max-w-2xl mx-auto">
              Everything you need to know about finding trusted local service providers and growing your service business with FindMy.
            </p>
          </div>

          <VerticalFaqAccordion
            consumerFaqs={SERVICES_CONSUMER_FAQS}
            businessFaqs={SERVICES_BUSINESS_FAQS}
            consumerSubhead="Everything you need to know about finding service experts"
            businessSubhead="Everything you need to know about listing your service"
            verticalType="services"
          />
        </div>
      </section>
    </div>
  );
}
