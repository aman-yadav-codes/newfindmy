import Link from "next/link"
import dynamic from "next/dynamic"
import { findMyNavCategories } from "@/lib/findmy-nav"

const HeaderClient = dynamic(
  () => import("./HeaderClient").then((m) => m.HeaderClient),
  { ssr: true }
)

export function Header() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-[var(--blur)] shadow-[var(--glass-shadow)]"
      role="banner"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between gap-4">
        {/* ───────────────── FindMy Branding & Logo ───────────────── */}
        <Link
          href="/"
          prefetch={false}
          className="flex flex-col justify-center select-none group shrink-0"
          aria-label="FindMy homepage"
        >
          <div className="flex items-baseline tracking-tight">
            <span className="text-xl sm:text-2xl font-black text-foreground">Find</span>
            <span className="text-xl sm:text-2xl font-black text-orange-500">My</span>
          </div>
          <span className="text-[10px] text-muted-foreground -mt-1 font-medium tracking-tight">
            find more. live more.
          </span>
        </Link>

        {/* ───────────────── Interactive Navigation & Controls ───────────────── */}
        <HeaderClient categories={findMyNavCategories} />
      </div>
    </header>
  )
}
