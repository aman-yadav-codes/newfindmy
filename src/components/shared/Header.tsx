import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"
import { Github } from "@/components/icons"
import { Badge } from "@/components/ui/badge"

const HeaderClient = dynamic(
  () => import("./HeaderClient").then((m) => m.HeaderClient),
  { ssr: true }
)

const navigation = [
  { name: "Docs", href: "#features" },
  { name: "Components", href: "#showcase" },
  { name: "Blocks", href: "#interactive" },
  { name: "Themes", href: "#variants" },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--glass-border)] backdrop-blur-[var(--blur)] shadow-[var(--glass-shadow)]" role="banner">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" prefetch={false} className="flex items-center gap-2.5" aria-label="Glass UI homepage">
            <span className="relative h-7 w-7 md:h-8 md:w-8 shrink-0">
              <Image src="/logo-dark.png" alt="" width={32} height={32} sizes="32px" className="hidden dark:block h-full w-full object-contain" />
              <Image src="/logo-light.png" alt="" width={32} height={32} sizes="32px" className="block dark:hidden h-full w-full object-contain" />
            </span>
            <span className="text-lg md:text-xl font-bold text-foreground">Glass UI</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6" aria-label="Desktop primary navigation">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} prefetch={false} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground/80">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <a href="https://github.com/crenspire/glass-ui" target="_blank" rel="noopener noreferrer" aria-label="View GitHub repository" className="hidden sm:flex items-center">
            <Badge variant="glass" className="flex items-center gap-1.5 h-9 px-3">
              <Github className="h-4 w-4" />
              <span className="text-xs font-semibold">128</span>
            </Badge>
          </a>
          <HeaderClient navigation={navigation} />
        </div>
      </div>
    </header>
  )
}
