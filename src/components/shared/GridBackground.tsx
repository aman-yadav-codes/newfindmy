/**
 * High-Performance Theme-Aware Wallpaper (Server Component)
 * Zero JavaScript, zero hydration delay, GPU-accelerated via composited CSS gradients.
 * Eliminates heavy multi-pass gaussian blur rasterization and layout recalculations.
 */
export function GridBackground() {
  return (
    <div 
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden [contain:strict]"
    >
      {/* Primary Ambient Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-100 dark:from-[oklch(0.18_0.025_260)] dark:via-[oklch(0.14_0.02_275)] dark:to-[oklch(0.12_0.02_280)]" />

      {/* Top Center Glow (Naturally soft radial gradient - zero filter:blur penalty) */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1200px] h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.22)_0%,rgba(147,51,234,0.12)_40%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18)_0%,rgba(139,92,246,0.12)_45%,transparent_70%)]" />

      {/* Top Left Ambient Blob */}
      <div className="hidden md:block absolute -top-[10%] -left-[10%] w-[50vw] h-[50vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12)_0%,transparent_70%)]" />

      {/* Center Right Ambient Blob */}
      <div className="hidden md:block absolute top-[30%] -right-[10%] w-[45vw] h-[55vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.10)_0%,transparent_70%)]" />

      {/* Bottom Center Ambient Blob */}
      <div className="hidden md:block absolute -bottom-[15%] left-[20%] w-[60vw] h-[45vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.16)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />

      {/* Macro Grid (80px) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Micro Grid (20px) */}
      <div className="hidden md:block absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px]" />
    </div>
  );
}
