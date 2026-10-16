---
trigger: model_decision
description: Apply to frontend performance, hydration, code splitting, animations, Lighthouse, and mobile UI work.
---

# Performance Code-Splitting Architecture (TBT Zero Protocol)

Mandatory rules derived from validated production optimizations on Glass UI.

## 1. Header / Navbar Splitting
The Header must be a **Server Component shell** (`zero JS`). All interactivity is isolated into `HeaderClient.tsx` loaded via `next/dynamic`.
- `Header.tsx`: RSC shell, imports `HeaderClient` via `next/dynamic` (`ssr: true`)
- `HeaderClient.tsx`: `"use client"` — logo, nav links, ModeToggle, star count fetch
- `MobileSheet.tsx`: `"use client"` — Radix Sheet for mobile menu, imported via `dynamic({ ssr: false })` inside `HeaderClient`

**Rule**: The `Sheet`, `SheetContent`, `Dialog`, and any Radix overlay component must NEVER be in the critical hydration bundle. Always lazy-load via `dynamic({ ssr: false })`.

## 2. Below-Fold Interactive Sections
Any component that uses `Tabs`, `Dialog`, `Select`, `Accordion`, or other Radix primitives and is placed **below the first viewport** must be lazy-loaded.

For every page, load below-the-fold images with native/Next image lazy loading so they are requested near the viewport, and supply fixed dimensions or an aspect ratio. Do not lazy-load the hero/LCP image or other content needed immediately. Keep meaningful text in server-rendered HTML. Defer only noncritical interactive JavaScript, with a stable placeholder when its layout space is needed. Confirm behavior and loading in a production build; do not assume viewport deferral improves a metric without measuring it.

**Pattern**: Create a `"use client"` wrapper file to hold `ssr: false` dynamic calls, since `ssr: false` cannot be used directly in RSC pages.
- `LazyInteractiveSections.tsx`: `"use client"` wrapper with `dynamic({ ssr: false })` imports
- `InteractiveVariantsSection.tsx`: actual component (lazy-loaded)
- `InteractiveDemoSection.tsx`: actual component (lazy-loaded)

## 3. The `ssr: false` Restriction in Turbopack
Turbopack (Next.js 16) will throw a build error if `next/dynamic({ ssr: false })` is used inside a Server Component file.
- `page.tsx` and `layout.tsx` are RSC. Use a `"use client"` wrapper for `ssr: false`.
- `"use client"` files can use `dynamic({ ssr: false })` freely.

## 4. `useSyncExternalStore` — Mandatory for Mounted Detection
All components that need to know if they are mounted (e.g., theme toggles, portals) must use `useSyncExternalStore`, not `useEffect(() => setMounted(true), [])`.

```tsx
const emptySubscribe = () => () => {}
const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
```

## 5. `optimizePackageImports` in next.config.ts
All UI library packages used in this project must be in `optimizePackageImports`.

## 6. Lighthouse Discipline & Audits
- **Always audit production builds**: `npm run build && npm run start`, never `npm run dev`.
- **Target scores**: Performance 100 (min 95), Accessibility 100, Best Practices 100, SEO 100, Agentic Browsing 3/3.
- **TBT**: 0ms (threshold < 200ms).
- **ESLint Zero-Warning Gate**: `npx eslint . --max-warnings 0` before every commit or completion.

## 7. Imports and navigation

- Use named runtime imports and `import type` for TypeScript-only symbols.
- Use `next/link` for internal navigation and Next navigation hooks instead of reading `window.location` during render.
- Keep animation timings coordinated, use transform and opacity when possible, honor reduced motion, and measure actual frame pacing before claiming a frame-rate target.
- Add packages to `optimizePackageImports` only when supported by the installed Next.js version and justified by measured bundle impact.
