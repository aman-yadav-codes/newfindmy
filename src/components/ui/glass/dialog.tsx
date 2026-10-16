"use client"

import { forwardRef, type ComponentProps, type ElementRef } from "react"
import {
  Dialog as BaseDialog,
  DialogContent as BaseDialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import type { GlassCustomization } from "@/lib/glass-utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface DialogContentProps extends Omit<ComponentProps<typeof BaseDialogContent>, "glass"> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  animated?: boolean
  hover?: HoverEffect
  glass?: GlassCustomization
}

/**
 * Glass UI Dialog - Enhanced dialog with glassy effects and animations
 * 
 * @example
 * ```tsx
 * <DialogContent 
 *   glass={{
 *     color: "rgba(139, 92, 246, 0.15)",
 *     blur: 40,
 *     outline: "rgba(139, 92, 246, 0.3)"
 *   }}
 * >
 *   Dialog content
 * </DialogContent>
 * ```
 */
export const DialogContent = forwardRef<
  ElementRef<typeof BaseDialogContent>,
  DialogContentProps
>(({ className, variant = "crystal", animated = true, hover = "none", glass, children, ...props }, ref) => {
  return (
    <BaseDialogContent
      ref={ref}
      variant={variant}
      glass={glass}
      className={cn(
        "overflow-hidden",
        animated && "backdrop-blur-[var(--blur-crystal)]",
        hoverEffects({ hover }),
        className
      )}
      {...props}
    >
      {children}
    </BaseDialogContent>
  )
})
DialogContent.displayName = "DialogContent"

export {
  BaseDialog as Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

