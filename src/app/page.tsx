import Link from "next/link";
import { Button } from "@/components/ui/glass/button";
import { Badge } from "@/components/ui/glass/badge";
import { CopyCommandButton } from "@/components/custom/CopyCommandButton";
import {
  InteractiveVariantsSection,
  InteractiveDemoSection,
} from "@/components/custom/LazyInteractiveSections";
import { ShowcaseSection } from "@/components/custom/ShowcaseSection";
import {
  ArrowRight,
  Zap,
  Sparkles,
  Palette,
  Layers,
} from "lucide-react";


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10">

        {/* ───────────────────── Hero ───────────────────── */}
        <section className="container mx-auto px-4 pt-24 pb-32 md:pt-32 md:pb-40" aria-labelledby="hero-heading">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="glass" className="mb-8 px-4 py-1.5 text-sm">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              50+ Liquid Glass Components
            </Badge>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.08]">
              <span className="text-foreground">Beautiful interfaces,</span>
              <br />
              <span className="text-foreground/35">built with liquid glass.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A component library inspired by Apple&apos;s design language. Drop-in
              replacements for shadcn/ui with blur, depth, and translucency baked&nbsp;in.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <Button asChild size="lg" variant="glass">
                <Link href="#interactive" prefetch={false} className="gap-2 font-medium">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#showcase" prefetch={false} className="font-medium">
                  Browse Components
                </Link>
              </Button>
            </div>

            <CopyCommandButton command="pnpm dlx shadcn@latest add @glass-ui/button" />
          </div>
        </section>

        {/* ───────────────── Component Showcase ───────────────── */}
        <section id="showcase" className="container mx-auto px-4 pb-32" aria-labelledby="showcase-heading" style={{ contentVisibility: 'auto', containIntrinsicSize: '0 600px' }}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 id="showcase-heading" className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Components that speak for themselves
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Real UI patterns built entirely with Liquid Glass components.
            </p>
          </div>

          <ShowcaseSection />
        </section>

        {/* ───────────────── Variants ───────────────── */}
        <section id="variants" className="container mx-auto px-4 pb-32" aria-labelledby="variants-heading">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 id="variants-heading" className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Four distinct glass variants
            </h2>
            <p className="text-muted-foreground">
              Every component ships with Glass, Frosted, Fluted, and Crystal styles.
            </p>
          </div>

          <InteractiveVariantsSection />
        </section>

        {/* ───────────────── Interactive ───────────────── */}
        <section id="interactive" className="container mx-auto px-4 pb-32" aria-labelledby="interactive-heading">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 id="interactive-heading" className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Try it live
            </h2>
            <p className="text-muted-foreground">
              Click to experience liquid glass in action.
            </p>
          </div>

          <InteractiveDemoSection />
        </section>

        {/* ───────────────── Features ───────────────── */}
        <section id="features" className="container mx-auto px-4 pb-32" aria-labelledby="features-heading">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h2 id="features-heading" className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Why Liquid Glass?
            </h2>
            <p className="text-muted-foreground">
              Everything you need to ship polished interfaces.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "40+ Components",
                desc: "Buttons, cards, dialogs, selects, tabs, and more — all glass-ready out of the box.",
              },
              {
                icon: Palette,
                title: "4 Variants",
                desc: "Glass, Frosted, Fluted, and Crystal. Each component adapts to every variant automatically.",
              },
              {
                icon: Layers,
                title: "Fully Customizable",
                desc: "Tweak blur, transparency, color, and glow per component via simple props or CSS variables.",
              },
              {
                icon: Sparkles,
                title: "Accessible",
                desc: "Built on Radix UI primitives with full keyboard navigation and screen reader support.",
              },
            ].map((f) => (
              <div key={f.title} className="glass-bg rounded-xl p-6 text-center">
                <div className="glass-bg w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <f.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────── CTA ───────────────── */}
        <section className="container mx-auto px-4 pb-32" aria-labelledby="cta-heading">
          <div className="max-w-2xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start building today.
            </h2>
            <p className="text-muted-foreground mb-10 max-w-md mx-auto">
              Install a single component or the full library.
              Works with any Next.js + shadcn/ui project.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Button asChild size="lg" variant="glass">
                <Link href="#interactive" prefetch={false} className="gap-2 font-medium">
                  Read the Docs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#showcase" prefetch={false} className="font-medium">
                  Browse Components
                </Link>
              </Button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
