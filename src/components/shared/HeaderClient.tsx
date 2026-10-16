"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Menu } from "lucide-react"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Button } from "@/components/ui/button"

const MobileSheet = dynamic(() => import("./MobileSheet").then((m) => m.MobileSheet), {
  ssr: false,
})

interface NavItem {
  name: string
  href: string
}

export function HeaderClient({ navigation }: { navigation: NavItem[] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <ModeToggle variant="glass" />
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden h-9 w-9"
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      {mobileMenuOpen && (
        <MobileSheet
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          navigation={navigation}
          starCount={128}
        />
      )}
    </>
  )
}
