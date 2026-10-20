import * as React from "react"
import { Button as BaseButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { GlassCustomization } from "@/lib/glass-utils"
import { hoverEffects, type HoverEffect } from "@/lib/hover-effects"

export interface ButtonProps
  extends Omit<React.ComponentProps<typeof BaseButton>, "glass"> {
  effect?: HoverEffect
  glass?: GlassCustomization
}

/**
 * Glass UI Button - A beautifully designed button component with glassy effects
 * Built on top of the base Button component with enhanced visual effects
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(({ className, effect, variant, glass, ...props }, ref) => {
  // If className has custom orange/solid background and no variant is specified, resolve to "orange" or "default"
  // so that .glass-bg { background-color: transparent } does not override the button styling.
  const isOrangeBg = className && (className.includes("bg-orange") || className.includes("from-orange") || className.includes("bg-amber"));
  const resolvedVariant = variant || (isOrangeBg ? "orange" : "glass");
  const resolvedEffect = effect || (isOrangeBg ? "none" : (variant === "glass" || !variant ? "glow" : "none"));

  return (
    <BaseButton
      ref={ref}
      variant={resolvedVariant}
      glass={glass}
      className={cn(
        "relative overflow-hidden",
        resolvedEffect !== "none" && hoverEffects({ hover: resolvedEffect }),
        className
      )}
      {...props}
    />
  )
})
Button.displayName = "Button"
