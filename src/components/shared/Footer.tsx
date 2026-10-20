import Link from "next/link";
import { Mail, MapPin, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/glass/card";
import { NewsletterForm } from "./NewsletterForm";

const discover = [
  { label: "Property", href: "/property" },
  { label: "Cars", href: "/transport" },
  { label: "Restaurants", href: "/food" },
  { label: "Services", href: "/services" },
  { label: "Events", href: "/entertainment" },
  { label: "Travel", href: "/travel" },
  { label: "Insurance", href: "https://insure.findmy.co.za/" },
];
const company = ["About Us", "Blog", "Contact", "FAQ", "Terms & Conditions", "Privacy Policy", "Refund Policy", "Copyright Policy"];
const partners = ["GAC", "JMC"];
const business = ["Packages", "List Your Business / Join FindMy"];
const social = [
  { label: "Facebook", href: "https://www.facebook.com/share/BnSUy5U3SzGnomfg/?mibextid=qi2Omg", symbol: "f" },
  { label: "TikTok", href: "https://www.tiktok.com/@findmyza?is_from_webapp=1&sender_device=pc", symbol: "♪" },
  { label: "X", href: "https://x.com/Find_My_ZA?t=fcMvu1ofqBRz0_SNq59A0A&s=08", symbol: "X" },
  { label: "Instagram", href: "https://www.instagram.com/findmyza?igsh=MWJ5bnJ2ZTBobDkwMw==", symbol: "◎" },
];

function FooterList({ title, items }: { title: string; items: string[] }) {
  return <div><h2 className="text-xs font-bold uppercase tracking-wider text-amber-300">{title}</h2><ul className="mt-4 space-y-2.5 text-sm text-slate-300">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

export function Footer() {
  return (
    <footer className="w-full bg-[linear-gradient(180deg,transparent_0%,rgba(7,26,43,0.18)_18%,rgba(4,10,19,0.9)_100%)] px-4 pb-8 pt-10 text-white sm:px-6 sm:pt-14 lg:px-8 lg:pt-20">
      <div className="mx-auto max-w-[1440px]">
        {/* Newsletter Glass Card */}
        <Card
          variant="glass"
          className="flex flex-col gap-4 border-white/20 bg-white/10 p-4 sm:p-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6 lg:p-7 rounded-2xl sm:rounded-3xl"
        >
          <div className="flex items-start gap-3 sm:gap-4 min-w-0">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white sm:size-11">
              <Mail aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold text-white sm:text-base lg:text-lg tracking-tight">
                Find the Best of South Africa
              </h2>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed sm:text-sm max-w-xl">
                Get our expert guides and smart Alerts for SA&apos;s top restaurants, events and services. Stop hunting, start finding.
              </p>
            </div>
          </div>
          <NewsletterForm />
        </Card>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 py-10 sm:gap-x-5 sm:gap-y-10 sm:py-14 lg:grid-cols-[1.4fr_repeat(5,minmax(0,1fr))]">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block text-2xl sm:text-3xl font-black tracking-tight text-white" aria-label="FindMy homepage">
              Find<span className="text-orange-500">My</span>
            </Link>
            <p className="mt-2.5 max-w-xs text-xs sm:text-sm leading-relaxed text-slate-300">
              The premier local discovery platform for the best of South Africa.
            </p>
            <div className="mt-4 sm:mt-5 flex gap-2 sm:gap-2.5">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label={item.label}
                  className="grid size-8 sm:size-9 place-items-center rounded-lg border border-white/15 bg-white/5 text-xs sm:text-sm font-bold text-slate-300 transition-colors hover:bg-orange-600 hover:text-white"
                >
                  <span aria-hidden="true">{item.symbol}</span>
                </a>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-1.5 text-xs text-slate-300">
              <MapPin aria-hidden="true" className="size-3.5 text-amber-300 shrink-0" />
              <span>South Africa&apos;s Local Discovery Network</span>
            </p>
            <p className="mt-1.5 text-xs text-slate-300">
              Need assistance?{" "}
              <a href="mailto:support@findmy.co.za" className="font-semibold text-white hover:underline">
                support@findmy.co.za
              </a>
            </p>
          </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-amber-300">Discover</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {discover.map((item) => (
              <li key={item.label}>
                {item.href.startsWith("http") ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-slate-300 hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className="text-slate-300 hover:text-white">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <FooterList title="Company" items={company} />
        <FooterList title="Partner Pages" items={partners} />
        <FooterList title="For Business" items={business} />
        <div className="col-span-2 lg:col-span-1"><h2 className="text-xs font-bold uppercase tracking-wider text-amber-300">App</h2><p className="mt-4 text-sm leading-relaxed text-slate-300">FindMy app coming soon for faster local discovery.</p><div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1"><AppCard title="iOS App" copy="Coming soon on the App Store" /><AppCard title="Android App" copy="Coming soon on Google Play" /></div></div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-slate-400 sm:text-sm"><p>FindMy &reg; is a registered Trademark of Technology Pv. Limited (2016 / 195525 / 07)</p><p className="mt-1">Copyright &copy; 2026 FindMy Pvt Limited (2016 / 195525 / 07) | Design by FindMy</p></div>
    </div>
  </footer>
  );
}

function AppCard({ title, copy }: { title: string; copy: string }) {
  return <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"><span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-amber-300"><Smartphone aria-hidden="true" className="size-4" /></span><span><strong className="block text-sm text-white">{title}</strong><span className="block text-xs text-slate-400">{copy}</span></span></div>;
}
