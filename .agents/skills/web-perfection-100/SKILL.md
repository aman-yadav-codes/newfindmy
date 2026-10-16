---
name: web-perfection-100
description: Universal master playbook to achieve 100/100 on all Google Lighthouse pillars (Performance, Accessibility, Best Practices, SEO) and 2/2 Agentic Browsing across ANY web application or framework (Next.js, React, Astro, Vite, Vue, HTML/CSS).
---

# Universal Web Perfection: 100% Lighthouse & Agentic Browsing Standard

## Mission

Build, optimize, and audit web applications that score a flawless **100% Performance, 100% Accessibility, 100% Best Practices, 100% SEO, and 2/2 Agentic Browsing** in Google Lighthouse and production web vitals on ANY web framework.

---

## Pillar 1: 100% Performance (Sub-Second Delivery & 0ms TBT)

### 1. Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 1.2s (Threshold: 2.5s)
- **FCP (First Contentful Paint)**: < 0.8s (Threshold: 1.8s)
- **TBT (Total Blocking Time)**: **0 ms** (Strict Zero Stalls > 50ms)
- **CLS (Cumulative Layout Shift)**: **0.000** (Strict Zero Layout Shifts)
- **INP (Interaction to Next Paint)**: < 100ms (Threshold: 200ms)

### 2. The 0ms TBT Protocol
1. **Zero Synchronous Geometric DOM Reads During Hydration**:
   - Never call `getBoundingClientRect()`, `offsetWidth`, `offsetHeight`, `scrollHeight`, `window.innerHeight`, or `scrollTop` in initial render passes or top-level component mounts.
   - Defer all layout measurements and non-critical observers using `requestIdleCallback` with a graceful timeout fallback:
     ```ts
     const scheduleIdle = (fn: () => void, timeout = 1000) => {
       if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
         return (window as any).requestIdleCallback(fn, { timeout });
       }
       return setTimeout(fn, 150);
     };
     ```
2. **Dynamic Code-Splitting of User-Initiated & Below-the-Fold UI**:
   - Modals, slide-out cart drawers, search overlays, toast managers, and contact dialogs must NEVER be bundled in the initial document bundle.
   - In Next.js: `dynamic(() => import('./Component'), { ssr: false })`.
   - In Vite/React: `React.lazy(() => import('./Component'))` wrapped in `<Suspense>`.
3. **Package Import Trees & Minimal Imports**:
   - Never use wildcard / namespace imports (`import * as React from "react"`). Only import the specific named functions, hooks, or constants required.
   - Always separate TypeScript types using explicit `type` imports (`import { type RefObject } from "react"` or `import type { Foo } from "..."`) to ensure 100% compile-time erasure with zero runtime bundle overhead.
   - Tree-shake large icon libraries (e.g., `lucide-react`, `@heroicons/react`).
   - Enable `experimental: { optimizePackageImports: ['lucide-react'] }` in Next.js or configure modern bundler tree-shaking.
4. **Client-Side SPA Navigation**:
   - Internal links MUST use framework-native client navigation (`<Link>` from `next/link`) rather than raw `<a>` tags. Raw `<a>` forces full document reloads and re-downloads of all shared CSS/JS bundles.
   - Use `usePathname()` from `next/navigation` instead of `window.location.pathname` for SSR/hydration safety.

### 3. Sub-Second LCP Protocol
1. **Critical Hero Image Asset**:
   - The primary hero image MUST be marked with `priority` and `fetchpriority="high"`.
   - NEVER set `loading="lazy"` on the LCP image.
   - Always supply explicit responsive `sizes` matching exact container viewport widths:
     `sizes="(max-width: 640px) 100vw, (max-width: 1200px) 90vw, 1200px"`.
   - Serve modern AVIF and WebP formats with optimized compression.
2. **Font Optimization**:
   - Use `display: "swap"` or `display: "optional"` with `preload: true`.
   - Preload only required critical subsets (e.g. `latin`) and weights.
   - Lock typography `line-height` and fallback font metrics (`size-adjust`) to eliminate font-swap layout shift.

---

## Pillar 2: 100% Accessibility (WCAG 2.2 AA/AAA)

### 1. Landmark & Semantic Architecture
- Every page must contain exactly one `<main id="main-content">` representing the dominant body content.
- `<header role="banner">` and `<footer role="contentinfo">` must be root siblings, **NEVER** children of `<main>`.
- **Landmark aria-hidden prohibition**: NEVER place `aria-hidden="true"` on landmark elements (`<aside>`, `<nav>`, `<header>`, `<footer>`, `<main>`). If an element is purely decorative (rulers, borders, tick marks), use `<div aria-hidden="true">` or `<span aria-hidden="true">`.

### 2. Strict Sequential Heading Hierarchy
- Exactly **ONE `<h1>`** per page.
- Eyebrows, categories, and badges displayed above the `<h1>` MUST be rendered as `<span className="hud-eyebrow">` or `<p>`, **NEVER** as `<h2>`.
- Headings must descend sequentially without skipping: `h1` → `h2` → `h3` → `h4`.
- Never jump from `h1` directly to `h3` or `h4`.

### 3. Accessible Names on All Interactive Controls
- Every button containing only an icon or symbol MUST have an explicit `aria-label`:
  `<button aria-label="Open navigation menu">`
- Every link without visible descriptive text must have an `aria-label`:
  `<a href="/" aria-label="Homepage">`
- Dynamic interactive states must declare:
  - `aria-expanded="true|false"` on expandable drawers and dropdowns.
  - `aria-controls="[target-id]"` pointing to the toggled drawer/menu.
  - `aria-pressed="true|false"` on toggle buttons.
  - `aria-haspopup="dialog|menu"` on modal/menu triggers.

### 4. Modals & Dialogs
- Modal containers must declare:
  `role="dialog"` (or `role="alertdialog"`), `aria-modal="true"`, and `aria-labelledby="[modal-title-id]"`.
- Must include keyboard `Escape` close handlers and focus trapping.

### 5. Color Contrast (WCAG 2.2 Standards)
- Regular text (<18pt / <24px normal, <14pt / <19px bold): **minimum 4.5:1** contrast against background.
- Large text: **minimum 3:1** contrast.
- Graphical objects and user interface controls (borders, active toggles): **minimum 3:1** contrast.
- On dark backgrounds (`#090807` to `#121212`), muted text must never fall below `#a0968c` or `#9e9e9e`.

### 6. Skip-to-Content Link
- The very first focusable element inside `<body>` must be a skip link:
  ```html
  <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:p-3 focus:bg-white focus:text-black">
    Skip to main content
  </a>
  ```

---

## Pillar 3: 100% Best Practices

### 1. Modern Web & Security Standards
- **HTTPS & Secure Links**: All external links (`target="_blank"`) must include `rel="noopener noreferrer"`.
- **Zero Console Errors**: The console must be completely free of runtime exceptions, unhandled rejections, or missing resource 404s.
- **Doctype & Character Encoding**: `<meta charset="UTF-8" />` and `<!DOCTYPE html>` declared.
- **Modern ECMAScript**: Target modern evergreen browsers (`ES2022+`), eliminating dead polyfills and legacy JS overhead.
- **Aspect Ratios**: All media elements (`<img>`, `<video>`, `<iframe>`) must have explicit width/height attributes or CSS `aspect-ratio` to avoid layout thrashing.

---

## Pillar 4: 100% SEO Mastery

### 1. Technical SEO Metadata
- **Title Tag**: Unique, compelling, 50-60 characters, containing primary brand and target keywords.
- **Meta Description**: Descriptive, actionable, 120-155 characters.
- **Viewport**: `<meta name="viewport" content="width=device-width, initial-scale=1" />`.
- **Robots & Sitemaps**: Valid `/robots.txt` pointing to `/sitemap.xml`.
- **Canonical URL**: Self-referencing `<link rel="canonical" href="https://..." />` to prevent duplicate indexing.
- **Social Graph**: Complete OpenGraph (`og:title`, `og:description`, `og:image`, `og:type`) and Twitter Card tags.

### 2. Structured Data (JSON-LD Schema.org)
- Embed machine-readable JSON-LD in the document head matching the site purpose (`Organization`, `WebSite`, `Store`, `Restaurant`, `Article`, `Product`).
- Schema must validate with zero errors on Schema.org and Google Rich Results Test.

---

## Pillar 5: 100% Agentic Browsing (Lighthouse 2/2 Score)

### 1. `llms.txt` and `llms-full.txt`
Serve a clean, standardized Markdown manifest at the root domain (`/llms.txt`) detailing:
- Site name, identity, and mission.
- Core pages and action URLs.
- Available interactions (e.g. how to order, book, query).
- Structured schema and API documentation links.

### 2. Accessibility Tree Navigation for AI Agents
Autonomous AI agents (Chrome DevTools MCP, Playwright, Puppeteer, Computer-Use agents) navigate by inspecting the a11y tree:
- Provide semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`).
- Provide human-and-agent readable IDs for critical actions (`id="btn-reserve"`, `id="btn-order"`).
- Maintain **CLS = 0.000** so visual agents calculating `(x, y)` coordinates never misclick shifted elements.

---

## Universal Pre-Deployment Verification Checklist

```
[ ] Performance 100: TBT = 0ms, LCP < 1.2s, FCP < 0.8s, CLS = 0.000
[ ] Accessibility 100: Strict landmarks, zero skipped headings, WCAG 4.5:1 contrast
[ ] Best Practices 100: Modern doctype, no console errors, safe rel="noopener noreferrer"
[ ] SEO 100: Meta title, description, canonical, robots, sitemap, JSON-LD Schema.org
[ ] Agentic Browsing 2/2: Valid /llms.txt, clean a11y tree, machine-actionable element IDs
[ ] ESLint: Zero errors and zero warnings (npx eslint . --max-warnings 0)
[ ] Build: npm run build exits with code 0
[ ] Always audit Lighthouse on production (npm run start), never on npm run dev
```

---

## Critical Next.js 16 Rules (Turbopack)

### `ssr: false` Cannot Be Used in Server Components

`next/dynamic({ ssr: false })` **cannot** be called inside RSC files (`page.tsx`, `layout.tsx`). Turbopack will throw a build error. Always move `ssr: false` dynamic imports into a dedicated `"use client"` wrapper:

```tsx
// ✅ CORRECT — "use client" wrapper file
"use client"
import dynamic from "next/dynamic"
const Modal = dynamic(() => import("./Modal"), { ssr: false })
export { Modal }

// ❌ WRONG — RSC page.tsx (will fail build)
const Modal = dynamic(() => import("./Modal"), { ssr: false })
```

### RSC Shell + Dynamic Client Sliver (Reduces TBT)

For components like headers/navbars that are partially static:

```tsx
// Header.tsx — RSC, zero JS shipped
import dynamic from "next/dynamic"
const HeaderClient = dynamic(() => import("./HeaderClient").then(m => m.HeaderClient), { ssr: true })
export function Header() {
  return <header role="banner"><div className="container"><HeaderClient /></div></header>
}
```

Inside `HeaderClient`, split mobile-only Radix components:
```tsx
// HeaderClient.tsx — "use client"
const MobileSheet = dynamic(() => import("./MobileSheet").then(m => m.MobileSheet), { ssr: false })
```

This pattern removes ~80–120 KiB of Radix Dialog/Sheet code from the desktop critical path.

### `useSyncExternalStore` for SSR-safe Mounting (No useEffect setState)

```tsx
const emptySubscribe = () => () => {}
const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false)
```

Replaces the `useEffect(() => setMounted(true), [])` anti-pattern — no extra re-render, ESLint-clean, React 19 idiomatic.

### Always Audit Production, Not Dev Server

| Symptom in dev Lighthouse | Root cause | Disappears in prod? |
|---|---|---|
| "Minify JavaScript (~260 KiB)" | Turbopack source maps | ✅ Yes |
| "Reduce Unused JS (~395 KiB)" | React dev runtime + HMR | ✅ Yes |
| "bfcache failure (2 reasons)" | HMR WebSocket connection | ✅ Yes |
| High TBT (100–400ms) | Real long tasks | ❌ Fix needed |
| Forced reflow | Real layout thrashing | ❌ Fix needed |

```bash
npm run build && npm run start
# Lighthouse audit → http://localhost:3000
```
