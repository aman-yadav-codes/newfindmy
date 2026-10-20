"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  }
>(({ className, children, variant = "glass", ...props }, ref) => {
  const getVariantClass = () => {
    if (variant === "default") return "border-input bg-background"
    
    const variants = {
      glass: "glass-bg backdrop-blur-[var(--blur-sm)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)]",
      glassSubtle: "glass-bg backdrop-blur-[var(--blur-sm)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)] opacity-50",
      frosted: "glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-frosted-border)] shadow-[var(--glass-frosted-shadow)]",
      fluted: "glass-fluted backdrop-blur-[var(--blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)]",
      crystal: "glass-crystal backdrop-blur-[var(--blur-crystal)] border border-[var(--glass-crystal-border)] shadow-[var(--glass-crystal-shadow)]",
    }
    return variants[variant] || variants.glass
  }
  
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex h-9 sm:h-8 w-full items-center justify-between whitespace-nowrap rounded-lg border px-2.5 sm:px-3 text-xs sm:text-sm font-medium shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors [&>span]:line-clamp-1",
        getVariantClass(),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-3.5 w-3.5 opacity-60 text-slate-400 dark:text-white/50 shrink-0 ml-1.5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
  }
>(({ className, children, position = "popper", variant = "crystal", ...props }, ref) => {
  const getVariantClass = () => {
    if (variant === "default") return "border-input bg-popover text-popover-foreground"
    
    const variants = {
      glass: "glass-bg backdrop-blur-[var(--blur-sm)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)]",
      glassSubtle: "glass-bg backdrop-blur-[var(--blur-sm)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)] opacity-50",
      frosted: "glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-frosted-border)] shadow-[var(--glass-frosted-shadow)]",
      fluted: "glass-fluted backdrop-blur-[var(--blur)] border border-[var(--glass-border)] shadow-[var(--glass-shadow-sm)]",
      crystal: "dark:border-white/10 border-slate-200/80 dark:bg-[#071a2d]/95 bg-white/95 backdrop-blur-xl dark:text-white text-slate-900 shadow-2xl",
    }
    return variants[variant] || variants.crystal
  }

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-xl border p-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          getVariantClass(),
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-xs font-semibold dark:text-white/60 text-slate-500", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-lg py-1.5 pl-2.5 pr-8 text-xs sm:text-sm font-medium outline-none dark:text-white/80 text-slate-700 hover:text-slate-900 dark:hover:text-white focus:bg-orange-500/10 focus:text-orange-600 dark:focus:bg-orange-500/20 dark:focus:text-orange-400 data-[state=checked]:font-semibold data-[state=checked]:text-orange-600 dark:data-[state=checked]:text-orange-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors",
      className
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-3.5 w-3.5 text-orange-500" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

