import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface GlassMetricCardProps {
  label: string;
  value: string;
  target: string;
  status: "optimal" | "compliant";
  description: string;
}

/**
 * Metric Card for Core Web Vitals and Lighthouse Performance
 */
export function GlassMetricCard({
  label,
  value,
  target,
  status,
  description,
}: GlassMetricCardProps) {
  return (
    <Card
      variant="frosted"
      className="p-6 border-white/80 dark:border-white/10 shadow-lg hover-glow flex flex-col justify-between"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {label}
          </span>
          <Badge variant={status === "optimal" ? "success" : "glass"} className="text-[10px]">
            {status}
          </Badge>
        </div>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            (Goal: {target})
          </span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
          {description}
        </p>
      </div>
    </Card>
  );
}
