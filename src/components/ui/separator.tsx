import * as React from "react"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "glass",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  variant?: "default" | "glass"
}) {
  const variants = {
    default: "bg-border",
    glass: "bg-[var(--glass-border)]",
  }

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Separator }
