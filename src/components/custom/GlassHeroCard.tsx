import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export interface GlassHeroCardProps {
  title: string;
  badge: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
}

/**
 * Custom Project Hero Card with Apple-inspired liquid glass depth
 */
export function GlassHeroCard({
  title,
  badge,
  description,
  ctaText = "Explore Architecture",
  ctaHref = "#features",
  secondaryText = "Web Quality Audit",
  secondaryHref = "#quality",
}: GlassHeroCardProps) {
  return (
    <Card
      variant="frosted"
      className="max-w-4xl mx-auto my-6 p-8 sm:p-12 border-white/60 dark:border-white/15 shadow-2xl relative overflow-hidden"
    >
      {/* Decorative glass glow corner */}
      <div
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-500/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <CardHeader className="items-start text-left gap-4 relative z-10 p-0">
        <Badge variant="glass" className="px-3.5 py-1 text-xs font-semibold gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          {badge}
        </Badge>
        <CardTitle className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
          {title}
        </CardTitle>
        <CardDescription className="text-base sm:text-lg max-w-2xl text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8 flex flex-wrap items-center gap-4 relative z-10 p-0">
        <Button asChild variant="default" size="lg">
          <Link href={ctaHref} prefetch={false} className="gap-2 font-medium">
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link href={secondaryHref} prefetch={false} className="font-medium">
            {secondaryText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
