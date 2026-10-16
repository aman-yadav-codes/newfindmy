"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Github } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  href: string
}

interface MobileSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  navigation: NavItem[]
  starCount: number | null
}

export function MobileSheet({ open, onOpenChange, navigation, starCount }: MobileSheetProps) {
  const pathname = usePathname()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-menu"
        variant="glass"
        side="right"
        className="w-[300px] sm:w-[400px]"
      >
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-border">
            <div className="relative h-8 w-8 shrink-0">
              <Image
                src="/logo-dark.png"
                alt="Glass UI logo"
                width={32}
                height={32}
                className="hidden dark:block h-full w-full object-contain"
              />
              <Image
                src="/logo-light.png"
                alt="Glass UI logo"
                width={32}
                height={32}
                className="block dark:hidden h-full w-full object-contain"
              />
            </div>
            <span className="text-lg font-bold text-foreground">Glass UI</span>
          </div>
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "text-base font-medium transition-colors hover:text-foreground/80 py-2",
                  pathname?.startsWith(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          {starCount !== null && (
            <div className="pt-4 border-t border-border">
              <a
                href="https://github.com/crenspire/glass-ui"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOpenChange(false)}
                className="flex items-center"
                aria-label={`View GitHub repository with ${starCount} stars`}
              >
                <Badge variant="glass" className="flex items-center gap-1.5 h-9 px-3">
                  <Github className="h-4 w-4" />
                  <span className="text-xs font-semibold">{starCount.toLocaleString()}</span>
                </Badge>
              </a>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
