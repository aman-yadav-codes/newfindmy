"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close
const DrawerPortal = DialogPrimitive.Portal

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
DrawerOverlay.displayName = DialogPrimitive.Overlay.displayName

const drawerVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-xl transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-400 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top rounded-b-2xl",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom rounded-t-2xl max-h-[85dvh]",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "bottom",
    },
  }
)

export interface DrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  variant?: "default" | "glass" | "glassSubtle" | "frosted" | "fluted" | "crystal"
}

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DrawerContentProps
>(({ side = "bottom", variant = "crystal", className, children, ...props }, ref) => {
  const getVariantClass = () => {
    if (variant === "default") return "bg-background border"
    
    const variants = {
      glass: "glass-bg backdrop-blur-[var(--blur-lg)] border border-[var(--glass-border)] text-foreground shadow-[var(--glass-shadow-lg)]",
      glassSubtle: "glass-bg backdrop-blur-[var(--blur-sm)] border border-[var(--glass-border)] text-foreground shadow-[var(--glass-shadow-lg)] opacity-50",
      frosted: "glass-frosted backdrop-blur-[var(--blur-frosted)] border border-[var(--glass-frosted-border)] text-foreground shadow-[var(--glass-frosted-shadow)]",
      fluted: "glass-fluted backdrop-blur-[var(--blur)] border border-[var(--glass-border)] text-foreground shadow-[var(--glass-shadow-lg)]",
      crystal: "dark:bg-[#071626]/98 bg-white/98 backdrop-blur-2xl border-t dark:border-white/10 border-slate-200/90 text-foreground shadow-2xl",
    }
    return variants[variant] || variants.crystal
  }
  
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ side }), getVariantClass(), className)}
        {...props}
      >
        {/* Mobile handle indicator */}
        <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300 dark:bg-white/20 shrink-0" />
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-full size-8 bg-black/10 dark:bg-white/10 flex items-center justify-center text-slate-500 dark:text-white/70 hover:text-slate-900 dark:hover:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DrawerPortal>
  )
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-left",
      className
    )}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-3",
      className
    )}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-base sm:text-lg font-bold dark:text-white text-slate-900 tracking-tight", className)}
    {...props}
  />
))
DrawerTitle.displayName = DialogPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-xs dark:text-white/60 text-slate-500", className)}
    {...props}
  />
))
DrawerDescription.displayName = DialogPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
