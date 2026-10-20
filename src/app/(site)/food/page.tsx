import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Search,
  SlidersHorizontal,
  FileText,
  Zap,
  Ellipsis,
} from "lucide-react";
import { FoodHeroSearch } from "@/features/food/FoodHeroSearch";
import { FoodFaqAccordion } from "@/features/food/FoodFaqAccordion";
import {
  AWARDS_DATA,
  HOW_IT_WORKS_FOOD,
  CRAVING_CATEGORIES,
  CUISINE_HIGHLIGHTS,
  FOODIE_ARTICLES,
  RESTAURANT_OWNER_CTA,
} from "@/features/food/food-content";

export const metadata: Metadata = {
  title: "Top Restaurants and Must-Try Flavourful Foods in South Africa | FindMy Food",
  description:
    "Welcome to FindMy Food Restaurants, the premier destination for discovering and booking tables at the best restaurants in town. Make dining out effortless and enjoyable.",
  keywords: [
    "best cape town restaurants",
    "best dining in cape town",
    "best restaurants cape town south africa",
    "south africa food",
    "restaurants",
    "dining",
    "food guide",
  ],
  alternates: {
    canonical: "/food",
  },
  openGraph: {
    title: "Your personal AI Agent at your Service - Search Food in South Africa",
    description:
      "Welcome to FindMy Food Restaurants, the premier destination for discovering and booking tables at the best restaurants in town. Make dining out effortless and enjoyable.",
    url: "/food",
    siteName: "FindMy Food",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/food-home/hero-plate.png",
        width: 1200,
        height: 630,
        alt: "FindMy Food",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your personal AI Agent at your Service - Search Food in South Africa",
    description:
      "Welcome to FindMy Food Restaurants, the premier destination for discovering and booking tables at the best restaurants in town. Make dining out effortless and enjoyable.",
    images: ["/food-home/hero-plate.png"],
  },
};

export default function FoodPage() {
  return (
    <div className="relative w-full text-white selection:bg-orange-500 selection:text-white">
      {/* ─────────────────────────────────────────────────────────────
          1. Hero Section
      ───────────────────────────────────────────────────────────── */}
      <section
        id="home"
        aria-labelledby="food-hero-heading"
        className="relative w-full min-h-[calc(100svh-4rem)] overflow-hidden border-b border-white/10"
        style={{
          background: `radial-gradient(ellipse 75% 65% at 78% 45%, rgba(200, 109, 68, 0.22) 0%, transparent 65%),
            radial-gradient(ellipse 50% 50% at 20% 60%, rgba(30, 78, 98, 0.25) 0%, transparent 70%),
            linear-gradient(180deg, rgba(7, 26, 43, 0.72) 0%, rgba(7, 20, 36, 0.52) 100%)`,
        }}
      >
        {/* Hero Artwork - Large Desktop Floating Plate */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:flex items-center justify-end overflow-hidden"
        >
          <Image
            src="/food-home/hero-plate.png"
            alt="Food dishes"
            priority
            width={760}
            height={760}
            className="h-[88%] max-h-[720px] w-auto max-w-[52%] object-contain object-right drop-shadow-[0_24px_60px_rgba(0,0,0,0.55)] select-none"
          />
        </div>

        {/* Hero Artwork - Mobile Subtle Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 flex lg:hidden w-full justify-end overflow-hidden opacity-25"
        >
          <Image
            src="/food-home/hero-plate.png"
            alt=""
            priority
            width={260}
            height={260}
            className="h-[260px] w-auto object-contain object-right"
          />
        </div>

        {/* Hero Foreground Content */}
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
                    Food
                  </span>
                </li>
              </ol>
            </nav>

            {/* H1 Heading */}
            <h1
              id="food-hero-heading"
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.08] text-white tracking-tight"
            >
              <span className="text-[#E08A58] dark:text-orange-500">Stop searching.</span> Start dining.
            </h1>

            {/* Subheading */}
            <p className="mt-4 text-base sm:text-lg lg:text-xl font-medium leading-relaxed text-white/80">
              South Africa&apos;s intelligent guide to the food scene.
              <br className="hidden sm:inline" /> From street corners to top tables.
            </p>

            {/* Interactive Hero Search Form & Action Chips */}
            <FoodHeroSearch />
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Featured Awards Section
      ───────────────────────────────────────────────────────────── */}
      <section id="awards" aria-labelledby="awards-heading" className="relative py-10 sm:py-14 border-b border-white/10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[#0b1f33]/70 backdrop-blur-2xl p-6 sm:p-8 md:p-10 shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
            {/* Ambient Background Blur Highlights */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-amber-500/10 blur-3xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-[#1e4e62]/20 blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10 lg:gap-12">
              {/* Gold Emblem Badge */}
              <div className="size-36 sm:size-44 md:size-48 shrink-0 relative rounded-full overflow-hidden flex items-center justify-center">
                <Image
                  src={AWARDS_DATA.badgeImage}
                  alt={AWARDS_DATA.badgeAlt}
                  width={192}
                  height={192}
                  className="size-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] rounded-full"
                />
              </div>

              {/* Award Details */}
              <div className="flex-1 text-center md:text-left space-y-3">
                <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase">
                  {AWARDS_DATA.tag}
                </span>
                <h2
                  id="awards-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-tight leading-tight"
                >
                  {AWARDS_DATA.title}
                </h2>
                <p className="text-sm sm:text-base text-white/75 font-normal max-w-xl">
                  {AWARDS_DATA.description}
                </p>
                <div className="pt-2">
                  <a
                    href={AWARDS_DATA.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md px-5 py-2.5 text-sm sm:text-base font-semibold text-white transition hover:bg-white/20 hover:border-white/35 shadow-md active:scale-95"
                  >
                    <span>{AWARDS_DATA.ctaText}</span>
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. Benefits Section: "The Smarter Way to Eat Out."
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="discover-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              DISCOVER
            </span>
            <h2
              id="discover-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              The Smarter Way to Eat Out.
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-2xl mx-auto">
              We&apos;ve upgraded the search experience. Better filters, deeper details, instant access.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {HOW_IT_WORKS_FOOD.map((item) => {
              const Icon =
                item.iconName === "Search"
                  ? Search
                  : item.iconName === "SlidersHorizontal"
                  ? SlidersHorizontal
                  : item.iconName === "FileText"
                  ? FileText
                  : Zap;

              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0c1f33]/55 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-[#102740]/70 text-center group"
                >
                  <div className="size-12 rounded-xl bg-white/[0.08] border border-white/15 grid place-items-center mb-4 text-white group-hover:scale-105 transition-transform">
                    <Icon className="size-5 sm:size-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-white/65 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Explore by Craving Section
      ───────────────────────────────────────────────────────────── */}
      <section aria-labelledby="cravings-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              EXPLORE BY CRAVING
            </span>
            <h2
              id="cravings-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              What are you craving?
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-xl mx-auto">
              From quick bites to fine dining. Jump straight to your favourites.
            </p>
          </div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 lg:grid-cols-10 gap-3 sm:gap-3.5">
            {CRAVING_CATEGORIES.map((craving) => (
              <Link
                key={craving.id}
                href={craving.href}
                className="group flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-[#0c1f33]/55 backdrop-blur-xl text-center shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-white/25 hover:bg-[#102740]/75 cursor-pointer active:scale-95"
              >
                <div className="size-11 sm:size-12 flex items-center justify-center text-3xl sm:text-3.5xl mb-2 transition-transform duration-200 group-hover:scale-115 select-none drop-shadow-md">
                  {craving.icon === "•••" ? (
                    <div className="size-8 rounded-full bg-white/15 border border-white/20 grid place-items-center text-white/80">
                      <Ellipsis className="size-4" />
                    </div>
                  ) : (
                    <span role="img" aria-label={craving.name}>
                      {craving.icon}
                    </span>
                  )}
                </div>
                <span className="text-xs sm:text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                  {craving.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Explore Cuisines Section
      ───────────────────────────────────────────────────────────── */}
      <section id="cuisines" aria-labelledby="cuisines-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-[#E08A58] uppercase mb-2">
              EXPLORE CUISINES
            </span>
            <h2
              id="cuisines-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              What are you craving?
            </h2>
            <p className="mt-3 text-sm sm:text-base font-normal text-white/70 max-w-xl mx-auto">
              Dive into popular cuisines and discover restaurants across South Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 text-left">
            {CUISINE_HIGHLIGHTS.map((cuisine) => (
              <Link
                key={cuisine.id}
                href={cuisine.href}
                className="group relative h-60 sm:h-68 overflow-hidden rounded-3xl border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:shadow-2xl cursor-pointer block"
              >
                <Image
                  src={cuisine.image}
                  alt={cuisine.title}
                  width={600}
                  height={400}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061424]/95 via-[#061424]/45 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex items-end justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                      {cuisine.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-white/75 font-normal">
                      {cuisine.description}
                    </p>
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
          6. The Foodie Guide: Eat like a local
      ───────────────────────────────────────────────────────────── */}
      <section id="intel" aria-labelledby="guide-heading" className="py-16 sm:py-20 border-b border-white/10 text-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <h2
              id="guide-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight"
            >
              The Foodie Guide: Eat like a local
            </h2>
            <p className="mt-3 text-base sm:text-lg font-medium text-white/70 max-w-xl mx-auto">
              Insider intel on the SA food scene.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {FOODIE_ARTICLES.map((article) => (
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
          7. Restaurant Owner CTA Section
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
            {RESTAURANT_OWNER_CTA.title}
          </h2>
          <p className="text-base sm:text-lg font-medium text-white/80 max-w-xl mx-auto leading-relaxed">
            {RESTAURANT_OWNER_CTA.subtitle}
          </p>
          <div className="pt-4">
            <a
              href={RESTAURANT_OWNER_CTA.href}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white transition hover:shadow-xl shadow-md cursor-pointer active:scale-95"
            >
              {RESTAURANT_OWNER_CTA.buttonText}
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          8. Food-Specific FAQs Section
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
              FindMy Food FAQs
            </h2>
            <p className="text-sm sm:text-base font-medium text-white/70 max-w-2xl mx-auto">
              Everything you need to know about discovering restaurants, booking tables and promoting your restaurant with FindMy Food.
            </p>
          </div>

          <FoodFaqAccordion />
        </div>
      </section>
    </div>
  );
}
