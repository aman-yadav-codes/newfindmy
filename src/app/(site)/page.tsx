import { getImageProps } from "next/image";
import { MapPin, Search, ShieldCheck } from "lucide-react";
import { HeroSearch } from "@/features/home/HeroSearch";
import { DiscoverySections, IntentCards } from "@/features/home/HomeSections";

const highlights = [
  {
    icon: Search,
    title: "Search naturally",
    description: "Use your own words and find exactly what you need.",
  },
  {
    icon: ShieldCheck,
    title: "Discover confidently",
    description: "Explore trusted businesses, places and experiences.",
  },
  {
    icon: MapPin,
    title: "Explore locally",
    description: "Exceptional results based on what is near you.",
  },
];

export default function Home() {
  const common = { alt: "African painted dog overlooking a South African mountain landscape at sunset", sizes: "100vw" };
  const { props: { srcSet: desktopSrcSet } } = getImageProps({
    ...common,
    src: "/images/home/hero-desktop.webp",
    width: 1672,
    height: 941,
    quality: 75,
  });
  const { props: { srcSet: mobileSrcSet, ...mobileImageProps } } = getImageProps({
    ...common,
    src: "/images/home/hero-mobile.webp",
    width: 887,
    height: 1774,
    quality: 75,
  });

  return (
    <div>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden bg-[#092338] text-white" aria-labelledby="hero-heading">
        <picture className="absolute inset-0 -z-20 block">
          <source media="(min-width: 768px)" srcSet={desktopSrcSet} />
          <img
            {...mobileImageProps}
            srcSet={mobileSrcSet}
            alt={common.alt}
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,19,30,0.83)_0%,rgba(5,19,30,0.56)_35%,rgba(5,19,30,0.08)_75%),linear-gradient(0deg,rgba(5,16,27,0.78)_0%,transparent_42%)] max-md:bg-[linear-gradient(180deg,rgba(5,18,30,0.78)_0%,rgba(5,18,30,0.48)_37%,rgba(5,18,30,0.08)_62%,rgba(5,18,30,0.9)_100%)]" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[min(40vw,26rem)] bg-gradient-to-b from-transparent via-[#0b3145]/55 to-[#0b3145]" />

        <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1440px] flex-col justify-between px-5 pb-8 pt-12 sm:px-8 md:pb-12 md:pt-16 lg:px-14 lg:pt-20 max-md:min-h-[920px]">
          <div className="max-w-[760px]">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-sm">
              The premier local discovery platform
            </p>
            <h1 id="hero-heading" className="max-w-[750px] text-balance text-[clamp(2.7rem,5vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.28)]">
              Find the best of<br className="hidden sm:block" /> South Africa
            </h1>
            <p className="mt-5 text-base font-medium text-white/90 sm:text-lg md:text-xl">
              Food, Travel, Services, Property, Events, Cars &amp; more
            </p>
            <HeroSearch />
          </div>

          <div className="mt-16 max-w-[960px]">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-300 sm:text-sm">
              One place to discover
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              The best of South Africa
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-3 sm:gap-8">
              {highlights.map(({ icon: Icon, title, description }) => (
                <div key={title} className="max-w-[280px]">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-white sm:text-base">
                    <Icon aria-hidden="true" className="size-5 shrink-0" />
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">{description}</p>
                </div>
              ))}
            </div>
          </div>
          <IntentCards />
        </div>
      </section>

      <DiscoverySections />
    </div>
  );
}
