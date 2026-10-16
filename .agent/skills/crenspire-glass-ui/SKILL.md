---
name: crenspire-glass-ui
description: >-
  Use for building, styling, or reviewing this project's existing Crenspire Glass UI components: reuse, Glass/Frosted/Fluted/Crystal variants, dialogs, dropdowns, theme-aware styling, and performance-conscious UI changes.
license: MIT
metadata:
  author: Crenspire Technologies
  version: "0.1.0"
---

# Crenspire Glass UI

[Crenspire Glass UI](https://github.com/crenspire/glass-ui) is the default component library for this project. It is a modern, glassmorphic component library inspired by Apple's design language, built with Next.js 16, React 19, Radix UI primitives, and the shadcn-ui registry system.

Before changing a project UI component, inspect the existing component and its variant API. Reuse its implementation where possible. For styled glass surfaces, this project permits only `glass`, `frosted`, `fluted`, and `crystal`. Use `crystal` for every modal or dialog surface, including alert dialogs. Keep dropdowns readable in both themes, preserve keyboard and focus behavior, and check mobile paint cost before adding blur or animation.

Use named runtime imports and explicit type-only imports. Keep heavy overlays out of the critical hydration path when that improves measured loading, while preserving the initial content and interaction.

The components and CSS tokens already exist under `src/components/ui/`, `src/components/ui/glass/`, and `src/app/globals.css`. Inspect those files and reuse their supported props before considering registry installation or new styles.

---

## 1. Architecture Overview

Glass UI follows a clean two-layer component architecture:

1. **Base Components (`@/components/ui/`)**:
   - Foundation components built on [Radix UI](https://www.radix-ui.com) primitives for accessible keyboard navigation and ARIA attributes.
   - Expose glassy variants (`variant="glass"`, `variant="frosted"`, `variant="fluted"`, `variant="crystal"`).
   - Support the `glass?: GlassCustomization` prop.

2. **Glass UI Components (`@/components/ui/glass/`)**:
   - High-level designed components wrapping base components.
   - Preconfigured with Apple-style visual treatments:
     - Interactive hover effects (`effect="glow"`, `effect="shimmer"`, `effect="ripple"`, `effect="lift"`, `effect="scale"`).
     - Multi-stop glass gradients (`gradient={true}`).
     - Smooth micro-animations (`animated={true}`).
     - Exported centrally from `@/components/ui/glass`.

---

## 2. Prerequisites & Installation

### Tailwind CSS v4 Configuration

Crenspire Glass UI components use Tailwind CSS utility classes and CSS variables. Configure Tailwind CSS v4 with PostCSS:

1. **Install dependencies**:
   ```bash
   npm install tailwindcss @tailwindcss/postcss postcss
   ```

2. **Configure PostCSS (`postcss.config.mjs`)**:
   ```javascript
   const config = {
     plugins: {
       "@tailwindcss/postcss": {},
     },
   };
   export default config;
   ```

3. **Import Tailwind in CSS (`src/app/globals.css`)**:
   ```css
   @import "tailwindcss";
   ```

### Component Installation via Registry

Components are distributed via the shadcn CLI registry:

```bash
# npm
npx shadcn@latest add @glass-ui/<component-name>

# pnpm
pnpm dlx shadcn@latest add @glass-ui/<component-name>

# yarn
yarn dlx shadcn@latest add @glass-ui/<component-name>

# bun
bunx shadcn@latest add @glass-ui/<component-name>
```

### Core Supporting Files

When installing Glass UI components, ensure the following helper modules exist in `@/lib/`:

- **`lib/glass-utils.ts`**: Provides the `GlassCustomization` interface, `getGlassStyles()`, and `getGlassCSSVars()` for dynamic inline glass styles.
- **`lib/hover-effects.ts`**: Provides `hoverEffects` via `class-variance-authority` (`cva`) with `"none" | "glow" | "shimmer" | "ripple" | "lift" | "scale"`.
- **`lib/utils.ts`**: Lightweight `cn(...)` utility combining class strings.

---

## 3. Available Components

Documented directly from the official `@crenspire/glass-ui` component registry:

| Category | Component Names |
| :--- | :--- |
| **Forms & Inputs** | `Button`, `Input`, `Textarea`, `Label`, `Checkbox`, `Switch`, `RadioGroup`, `Select`, `InputOTP`, `ButtonGroup`, `InputGroup`, `DatePickerInput` |
| **Display & Layout** | `Card`, `Badge`, `Avatar`, `Alert`, `Skeleton`, `Separator`, `Table`, `Spinner`, `EmptyState` |
| **Overlays & Dialogs** | `Dialog`, `AlertDialog`, `Popover`, `Tooltip`, `HoverCard`, `Sheet`, `Drawer`, `Sidebar`, `ContextMenu`, `Sonner` |
| **Navigation** | `Tabs`, `Accordion`, `Breadcrumb`, `DropdownMenu`, `NavigationMenu`, `Pagination`, `ScrollArea`, `MenuBar` |
| **Data & Interactive** | `Calendar`, `Chart`, `Command`, `Slider`, `Toggle`, `ToggleGroup`, `Carousel`, `Cropper`, `ModeToggle` |

---

## 4. Usage & Imports

### Importing Components

Prefer importing from `@/components/ui/glass` for styled glassmorphic components, or from `@/components/ui/<component>` for foundation base components:

```tsx
import { 
  Button, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  Input 
} from "@/components/ui/glass"
```

### Basic Component Usage

```tsx
export function HeroCard() {
  return (
    <Card variant="glass" gradient animated hover="glow">
      <CardHeader>
        <CardTitle>Glassmorphic Interface</CardTitle>
        <CardDescription>Inspired by Apple design standards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter your email..." />
        <Button variant="glass" effect="glow">
          Get Started
        </Button>
      </CardContent>
    </Card>
  )
}
```

---

## 5. Variants, Effects & Customization

### Container Variants

Use exactly four styled glass variants in this project:

- `glass`: Apple-standard subtle translucent surface with a specular inner highlight and moderate blur. Default for cards, buttons, badges, and headers.
- `frosted`: Higher-opacity satin surface with deeper blur. Use for elevated or higher-contrast containers.
- `fluted`: Vertical ridge texture and glass refraction. Use for textural accents and separators.
- `crystal`: Clear, high-separation surface with sharp specular edges. Required for modals and dialogs so background text does not bleed through.

Do not introduce another styled glass variant or use `default`/`glassSubtle` as a styled glass variant. Check each component's supported prop values before changing it; do not pass a variant to a component that does not accept it.

### Hover Effects (`HoverEffect`)

Buttons, cards, and interactive elements accept the `effect` (or `hover`) prop:

- `"none"`: Default, no additional hover effect.
- `"glow"`: Purple glow shadow that intensifies on hover.
- `"shimmer"`: Moving light sweep across the element.
- `"ripple"`: Subtle expanding circle highlight on hover.
- `"lift"`: Subtle vertical translation (`-translate-y-1`) with elevation.
- `"scale"`: Gentle scale-up (`scale-105` or `scale-[1.02]`).

### Per-Component `glass` Customization (`GlassCustomization`)

Any component accepting `variant="glass"` supports custom glass properties:

```tsx
<Card
  variant="glass"
  glass={{
    color: "rgba(139, 92, 246, 0.2)",   // Tint color (rgba, hex, or named)
    transparency: 0.25,                  // Opacity override (0 - 1)
    blur: 20,                            // Blur amount in px (or "20px")
    outline: "rgba(139, 92, 246, 0.4)",  // Border / outline color
    outlineWidth: 1,                     // Border width in px
    shadow: "0 8px 32px rgba(0,0,0,0.1)", // Outer drop shadow
    innerGlow: "rgba(255, 255, 255, 0.2)", // Inset shadow for specular shine
    innerGlowBlur: 20                    // Inset shadow radius
  }}
>
  Card Content
</Card>
```

### Global CSS Variables

Glass UI styling is powered by CSS variables in `:root` and `.dark`:

```css
:root {
  --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.12) 100%);
  --glass-border: rgba(255, 255, 255, 0.12);
  --glass-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --glass-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.1);
  --blur: 10px;
}

.dark {
  --glass-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  --glass-shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

---

## 6. Performance Rules

When implementing or reviewing Crenspire Glass UI components, enforce these rules:

1. **Prefer Lightweight CSS-Based Effects**:
   - Prefer CSS `transform` and `opacity` for animation. Treat `backdrop-filter` as paint work that must be measured on target devices; do not animate blur values continuously.
   - Do NOT introduce custom JavaScript calculation loops or WebGL shaders for basic glassmorphic cards.

2. **Moderate Blur & Avoid Backdrop Stacking**:
   - Keep `backdrop-filter: blur(...)` values moderate (10px–25px). Excessive blur (>40px) causes GPU fill-rate bottlenecks.
   - **Never stack multiple nested backdrop-filters** (e.g., a glass card inside a glass modal over a glass navigation bar). Child elements inside a glass container should use solid translucent backgrounds (`rgba(...)`) rather than compounding nested `backdrop-filter: blur()`.

3. **Avoid Unnecessary JavaScript & Continuous Animations**:
   - Do not run continuous JavaScript animations or `requestAnimationFrame` loops.
   - Use CSS transitions triggered on `:hover` or `:focus-visible`.

4. **Strictly Respect `prefers-reduced-motion`**:
   - Ensure all animations (shimmer sweeps, hover lifts, scaling) are suppressed or minimized when the user requests reduced motion:
     ```css
     @media (prefers-reduced-motion: reduce) {
       *, ::before, ::after {
         animation-duration: 0.01ms !important;
         animation-iteration-count: 1 !important;
         transition-duration: 0.01ms !important;
       }
     }
     ```

5. **Mobile Rendering & Responsiveness**:
   - Mobile GPUs can experience frame drops when rendering large full-screen glass surfaces.
   - On low-power or mobile screens, maintain performance by testing responsive layouts and reducing blur radius where appropriate.

6. **Strict Minimal Imports & Clean Tree-Shaking**:
   - Never use wildcard / namespace imports (`import * as React from "react"`). Only import the specific named hooks, functions, or components needed.
   - Always isolate TypeScript types with explicit type imports (`import { type ComponentPropsWithoutRef } from "react"`) for 100% compile-time erasure.
   - Internal navigation links inside glass headers, navs, and cards must use `<Link>` from `next/link` instead of raw `<a>` to avoid full-page reloads and duplicate bundle downloads.
   - Isolate heavy interactive glass dialogs, sheets, and below-the-fold demo sections via dynamic imports (`ssr: false`) with lightweight skeleton fallbacks.

---

## 7. Web Quality & Validation Integration

Validate all Glass UI implementations using the workspace's Addy Osmani Web Quality Skills:

- **[web-quality-audit](../web-quality-audit/SKILL.md)**:
  Run comprehensive quality reviews verifying accessibility, SEO, best practices, and runtime health.

- **[accessibility](../accessibility/SKILL.md)**:
  **High Priority for Glass UI**: Ensure text contrast meets WCAG 2.2 AA (minimum 4.5:1 for regular text, 3:1 for large text and UI components) against translucent backgrounds regardless of underlying content. Never rely on white text over light-colored glass.

- **[performance](../performance/SKILL.md)**:
  Check for GPU composite layers and paint invalidation caused by glass surfaces during scroll or hover.

- **[core-web-vitals](../core-web-vitals/SKILL.md)**:
  - **LCP**: Ensure hero glass containers do not delay Largest Contentful Paint.
  - **INP**: Verify interactive buttons (`effect="glow"`, `effect="ripple"`) respond within 200ms without main-thread jank.
  - **CLS**: Ensure glass cards and dialogs reserve appropriate dimensions to prevent layout shifts.

- **[best-practices](../best-practices/SKILL.md)**:
  Enforce modern CSS variables, cross-browser `-webkit-backdrop-filter` compatibility, and clean Radix UI primitive usage.
