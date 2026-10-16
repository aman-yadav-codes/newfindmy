import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark, Car, CalendarDays, Compass, Heart, Home, MapPin, PawPrint, Search, ShieldCheck, ShoppingBag, Ticket, Utensils, Wrench } from "lucide-react";
import { Card } from "@/components/ui/glass/card";
import { browseCategories, businessFaqs, collections, generalFaqs, howItWorks, intentCards, sampleTrending } from "./home-content";

const intentIcons = [Utensils, Compass, Wrench, CalendarDays, PawPrint, Car];
const categoryIcons = [Utensils, Compass, Car, Wrench, Home, Ticket, ShieldCheck];
const stepIcons = [Search, Bookmark, ShieldCheck];
const stats = [
  { title: "120,000+", subtitle: "Listings across South Africa", icon: ShoppingBag },
  { title: "Verified Businesses", subtitle: "Quality you can count on", icon: ShieldCheck },
  { title: "Updated Daily", subtitle: "Fresh info you can rely on", icon: CalendarDays },
  { title: "Real Reviews", subtitle: "From real South Africans", icon: Heart },
  { title: "All Across SA", subtitle: "Big cities and small towns", icon: MapPin },
];

export function IntentCards() {
  return <section className="mt-10" aria-labelledby="intent-heading">
    <h2 id="intent-heading" className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-sm">What are you looking for today?</h2>
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {intentCards.map((item, index) => {
        const Icon = intentIcons[index];
        return <Link key={item.title} href={`#${item.category}`} className="group scroll-mt-24">
          <Card variant="glass" className="flex min-h-32 flex-col justify-between border-white/25 bg-white/15 p-4 text-white transition-colors hover:bg-white/25">
            <div className="flex items-start gap-2"><Icon aria-hidden="true" className="size-5 shrink-0 text-amber-300" /><h3 className="text-sm font-semibold leading-snug">{item.title}</h3></div>
            <ArrowRight aria-hidden="true" className="size-4 text-white/75 transition-transform group-hover:translate-x-1" />
          </Card>
        </Link>;
      })}
    </div>
  </section>;
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return <div><h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{title}</h2>{subtitle && <p className="mt-1 text-sm text-white/75">{subtitle}</p>}</div>;
}

export function DiscoverySections() {
  return <div className="relative isolate overflow-hidden text-white">
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-[#0b3145] to-transparent" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden select-none lg:block">
      <div className="absolute left-[calc(50%-48rem)] top-[8%] aspect-[2844/1601] w-[34rem] opacity-35"><Image src="/images/home/aurora-cloud-left.webp" alt="" fill loading="lazy" sizes="544px" className="object-contain" /></div>
      <div className="absolute right-[calc(50%-48rem)] top-[26%] aspect-[2678/2017] w-[34rem] -scale-x-100 opacity-30"><Image src="/images/home/aurora-cloud-right.webp" alt="" fill loading="lazy" sizes="544px" className="object-contain" /></div>
      <div className="absolute left-[calc(50%-48rem)] top-[58%] aspect-[2678/2017] w-[32rem] opacity-35"><Image src="/images/home/aurora-cloud-lower-left.webp" alt="" fill loading="lazy" sizes="512px" className="object-contain" /></div>
      <div className="absolute right-[calc(50%-48rem)] top-[76%] aspect-[2844/1601] w-[34rem] -scale-x-100 opacity-35"><Image src="/images/home/aurora-cloud-lower-right.webp" alt="" fill loading="lazy" sizes="544px" className="object-contain" /></div>
    </div>
    <div className="relative mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-16 sm:px-8 lg:px-14 lg:py-20">
      <section aria-labelledby="trending-heading">
        <h2 id="trending-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Trending Near You</h2>
        <p className="mt-1 text-sm text-white/75">Most clicked listings across South Africa</p>
        <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-amber-300">Sample listings for layout preview</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {sampleTrending.map((item) => <Card key={item.title} variant="glass" className="relative aspect-[4/3] overflow-hidden border-white/20 p-0">
            <Image src={`/images/home/${item.image}`} alt="" fill loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
            <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-slate-950/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">{item.category}</span>
            <span className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4"><strong className="block truncate text-sm sm:text-base">{item.title}</strong><span className="mt-1 flex justify-between gap-2 text-xs text-white/80"><span>{item.place}</span><span className="text-amber-300">★ {item.rating}</span></span></span>
          </Card>)}
        </div>
      </section>

      <section id="categories" className="scroll-mt-24" aria-label="Browse Categories">
        <SectionHeading title="Browse Categories" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {browseCategories.map((item, index) => {
            const Icon = categoryIcons[index];
            return <Link key={item.title} id={item.category === "insurance" ? "insurance" : item.category} href={item.category === "insurance" ? "#business" : "#categories"} className="group scroll-mt-24">
              <Card variant="glass" className="flex min-h-28 flex-col items-center justify-center gap-3 border-white/20 bg-white/10 px-2 py-4 text-center transition-colors group-hover:bg-white/20">
                <Icon aria-hidden="true" className="size-6 text-amber-300" /><span className="text-sm font-semibold text-white">{item.title}</span>
              </Card>
            </Link>;
          })}
        </div>
      </section>

      <section aria-label="Continue Exploring">
        <SectionHeading title="Continue Exploring" subtitle="Handpicked collections across South Africa" />
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {collections.map((item) => <Link key={item.title} href="#categories" className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/25 sm:aspect-[5/4]">
            <Image src={`/images/home/${item.image}`} alt="" fill loading="lazy" sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4 text-sm font-bold text-white"><span>{item.title}</span><ArrowRight aria-hidden="true" className="size-4 shrink-0" /></span>
          </Link>)}
        </div>
      </section>

      <section aria-label="How FindMy Works">
        <SectionHeading title="How FindMy Works" />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, index) => {
            const Icon = stepIcons[index];
            return <Card key={step.title} variant="glass" className="border-white/20 bg-white/10 p-6">
              <div className="flex items-center justify-between"><Icon aria-hidden="true" className="size-7 text-amber-300" /><span className="text-3xl font-bold text-white/25">0{index + 1}</span></div>
              <h3 className="mt-5 text-lg font-bold text-white">{step.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/75">{step.description}</p>
            </Card>;
          })}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2" aria-label="Frequently asked questions">
        <FaqCard title="FAQs" items={generalFaqs} />
        <FaqCard title="For Businesses" items={businessFaqs} />
      </section>

      <section aria-label="More ways to use FindMy" className="space-y-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Why people use FindMy</p>
        <Card variant="glass" className="grid grid-cols-2 gap-y-5 border-white/20 bg-white/10 p-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-y-0">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return <div key={stat.title} className="flex min-w-0 items-center gap-3 lg:border-r lg:border-white/15 lg:px-5 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"><span className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/25 bg-white/10 shadow-sm"><Icon aria-hidden="true" className="size-5 text-white" /></span><div className="min-w-0"><p className="text-sm font-bold leading-tight text-white">{stat.title}</p><p className="mt-1 text-xs leading-snug text-white/75">{stat.subtitle}</p></div></div>;
          })}
        </Card>
        <Card variant="frosted" className="overflow-hidden border-white/20 bg-slate-900/70 p-6 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0">
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.85fr_1fr]">
            <div><h2 className="text-3xl font-bold text-white sm:text-4xl">Create your free<br />FindMy profile</h2><p className="mt-4 max-w-md text-sm leading-relaxed text-white/75">Save your favourites, build collections, leave reviews and get personalised recommendations.</p><div className="mt-6 flex flex-wrap items-center gap-4"><button type="button" disabled title="Account creation is not connected yet" className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white opacity-70">Create Free Account</button><span className="text-sm text-white/75">Learn more →</span></div></div>
            <ul className="space-y-4 text-sm text-white/90"><li className="flex items-center gap-3"><Heart aria-hidden="true" className="size-5 text-amber-300" />Save favourites</li><li className="flex items-center gap-3"><Bookmark aria-hidden="true" className="size-5 text-amber-300" />Build collections</li><li className="flex items-center gap-3"><ShieldCheck aria-hidden="true" className="size-5 text-amber-300" />Leave reviews</li></ul>
            <div aria-hidden="true" className="mx-auto -mb-44 h-[440px] w-full max-w-[285px] self-end rounded-t-[2.8rem] border-[7px] border-b-0 border-slate-950 bg-[#0c1523] p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between text-[10px] text-white/80"><span>9:41</span><span className="h-3 w-16 rounded-full bg-black" /><span>●</span></div><p className="text-xs font-bold text-white">My Favourites</p><div className="mt-3 flex gap-2 text-[10px] text-white/70"><span className="rounded-full bg-white px-2 py-1 text-slate-900">Restaurants</span><span>Hiking</span><span>Coffee</span></div><div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-xl"><Image src="/images/home/restaurant-interior.webp" alt="" fill loading="lazy" sizes="256px" className="object-cover" /></div><p className="mt-2 text-xs font-bold text-white">Osteria Verde <span className="float-right text-amber-300">★ 4.8</span></p><p className="text-[10px] text-white/60">Somerset West</p></div>
          </div>
        </Card>
        <Card id="business" variant="frosted" className="relative min-h-72 scroll-mt-24 overflow-hidden border-white/20 p-0">
          <Image src="/images/home/restaurant-interior.webp" alt="Restaurant dining interior" fill loading="lazy" sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-right" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/20" />
          <div className="relative grid gap-8 p-8 lg:grid-cols-[1.2fr_0.85fr_1fr] lg:p-10"><div><h2 className="text-3xl font-bold text-white sm:text-4xl">Own a business?</h2><p className="mt-4 max-w-sm text-sm text-white/80">Get discovered by thousands of customers searching for what you offer.</p><div className="mt-6 flex flex-wrap items-center gap-4"><button type="button" disabled title="Business listing is not connected yet" className="rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white opacity-70">Add Your Business</button><span className="text-sm text-white/80">Learn more →</span></div></div><ul className="space-y-4 text-sm text-white/90"><li>Increase visibility</li><li>Attract more customers</li><li>Grow your business</li></ul></div>
        </Card>
      </section>
    </div>
  </div>;
}

function FaqCard({ title, items }: { title: string; items: typeof generalFaqs }) {
  return <Card variant="frosted" className="border-white/20 bg-slate-900/50 p-6 sm:p-8">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    <div className="mt-4 divide-y divide-white/15">{items.map((item) => <details key={item.question} className="group py-4"><summary className="cursor-pointer text-sm font-semibold text-white marker:text-amber-300">{item.question}</summary><p className="mt-3 text-sm leading-relaxed text-white/75">{item.answer}</p></details>)}</div>
  </Card>;
}
