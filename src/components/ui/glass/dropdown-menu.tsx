"use client"

import * as React from "react"
import {
  DropdownMenu as BaseDropdownMenu,
  DropdownMenuContent as BaseDropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export interface DropdownMenuContentProps extends React.ComponentProps<typeof BaseDropdownMenuContent> {
  glow?: boolean
}

/**
 * Glass UI Dropdown Menu - Enhanced dropdown menu with glassy effects
 */
export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof BaseDropdownMenuContent>,
  DropdownMenuContentProps
>(({ className, variant = "crystal", glow = false, collisionPadding = 12, ...props }, ref) => {
  return (
    <BaseDropdownMenuContent
      ref={ref}
      variant={variant}
      collisionPadding={collisionPadding}
      className={cn(
        glow && "shadow-lg shadow-orange-500/20",
        className
      )}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

export {
  BaseDropdownMenu as DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
}

