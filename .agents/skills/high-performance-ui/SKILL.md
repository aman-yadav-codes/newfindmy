---
name: high-performance-ui
description: Engineers and audits high-performance web interfaces with smooth animations, optimized React and Next.js rendering, Core Web Vitals, zero layout shift, GPU compositing, responsive design, and measurable browser performance. Use when building, reviewing, debugging, or optimizing frontend pages, animations, scrolling, transitions, and interactive UI.
---

# High-Performance UI Engineering Skill

## Mission

Act as a senior frontend performance engineer specializing in production-grade Next.js and React applications.

Build interfaces that feel fluid, responsive, precise, and visually polished while maintaining accessibility, SEO, responsive behavior, and maintainable architecture.

Prioritize measured performance over assumptions. Never claim an animation achieves 120 FPS or a page has zero CLS without appropriate measurements.

## 1. Performance-First Workflow

Before modifying code:

1. Inspect the existing framework, package.json, dependencies, component structure, styles, and rendering strategy.
2. Identify the actual page, components, and animation code involved.
3. Measure the current behavior when browser profiling tools are available.
4. Identify the bottleneck before selecting an optimization.
5. Make targeted changes that preserve existing functionality and design intent.
6. Validate the implementation and report measured results separately from estimates.

Do not replace existing libraries, introduce dependencies, or rewrite architecture without a demonstrated need.

## 2. Animation Engineering

### Preferred animation properties

Prefer compositor-friendly properties:

- `transform`: translate, scale, and rotate.
- `opacity`: fades and visibility transitions.

Prefer CSS transitions and keyframes for simple, self-contained effects.

Use an existing animation library when complex timelines, coordinated sequences, SVG animation, or scroll-linked effects justify it.

Avoid animating these properties continuously unless profiling demonstrates an acceptable cost:

- `width`, `height`, `top`, `left`, `right`, `bottom`
- `margin`, `padding`, and layout-affecting properties
- `filter`, `backdrop-filter`, and expensive shadows
- Properties that trigger repeated layout or large-area repainting

For expandable accordions and other interactions that genuinely change layout, select an appropriate technique rather than blindly forbidding all layout animation.

### GPU compositing

- Use `will-change` only on elements that demonstrably benefit from layer promotion.
- Apply it shortly before an animation and remove it when appropriate.
- Do not apply `translateZ(0)` or `backface-visibility: hidden` to every element.
- Avoid unnecessary compositing layers, large textures, and excessive simultaneous animations.
- Use `contain` only when its layout and rendering implications are understood.

GPU acceleration does not automatically make every animation faster.

### Frame-rate targets

Target smooth presentation at the display's refresh rate.

- 60 Hz: approximately 16.67 ms per frame.
- 120 Hz: approximately 8.33 ms per frame.
- 144 Hz: approximately 6.94 ms per frame.

Distinguish JavaScript execution time, main-thread rendering work, GPU work, and dropped frames. A 120 FPS target is conditional on hardware, browser, display refresh rate, and workload.

Avoid long tasks and unnecessary synchronous JavaScript during interactions.

## 3. Scroll and Entrance Animations

- Use `IntersectionObserver` for viewport-based entrance reveals.
- Prefer CSS classes, data attributes, and CSS transitions for simple reveal effects.
- Use `requestAnimationFrame` for genuinely frame-dependent JavaScript animation.
- Use an existing scroll-animation library when its features justify the cost.
- Never perform forced synchronous layout measurements repeatedly during scrolling.
- Avoid updating React state on every scroll event.
- If scroll events are necessary, use passive listeners where appropriate and throttle work through `requestAnimationFrame`.
- Prefer CSS scroll-driven animations when supported and appropriate.
- Ensure animations do not interfere with anchor navigation, sticky elements, browser scrolling, or touch gestures.

Use `prefers-reduced-motion` to provide accessible alternatives.

## 4. Next.js and React Optimization

- Follow the existing Next.js version and App Router or Pages Router architecture.
- Prefer Server Components for non-interactive content in the App Router.
- Use Client Components only where browser APIs, local state, event handlers, or client-side animation require them.
- Keep client component boundaries as small as practical.
- Avoid unnecessary state updates, effects, context-wide rerenders, and expensive computations during rendering.
- Use `memo`, `useMemo`, and `useCallback` only when they address a demonstrated or clear performance issue.
- Avoid hydration mismatches and unnecessary client-side JavaScript.
- **Strict Minimal Imports & Tree-Shaking**:
  - Never use wildcard / namespace imports (`import * as React from "react"`). Only import the specific named functions, hooks, or constants required.
  - Always separate TypeScript types using explicit `type` imports (`import { type RefObject } from "react"` or `import type { Foo } from "..."`) to ensure 100% compile-time erasure with zero runtime bundle bloat.
  - Never use raw `<a href="...">` for internal routes. Always use `<Link>` from `next/link` for SPA navigation without full document reloads or duplicate bundle fetches.
  - Use `usePathname()` from `next/navigation` instead of accessing `window.location.pathname` directly.
- Lazy-load below-the-fold content and heavy components when appropriate via `dynamic({ ssr: false })` inside client wrappers with lightweight skeleton placeholders.
- Avoid adding a large animation library for a simple CSS transition.
- Clean up event listeners, observers, animation instances, and subscriptions.
- Prevent duplicate animation initialization during React Strict Mode and component remounts.

## 5. Zero Layout Shift and Asset Optimization

Aim for a CLS score of 0 where practical, while respecting the measured Core Web Vitals thresholds.

### Images

- Use `next/image` in Next.js projects when appropriate.
- Specify intrinsic dimensions or a stable aspect ratio.
- Reserve space for images, videos, embeds, and dynamically loaded content.
- Use responsive image sizes and modern formats where supported.
- Prioritize only the actual LCP image.
- Use `priority` or the appropriate `fetchPriority="high"` configuration supported by the installed Next.js version for the critical hero asset.
- Do not lazy-load the LCP image.
- Lazy-load non-critical below-the-fold images.
- Avoid downloading oversized images or rendering large images at unnecessarily high resolutions.

### Fonts
- Prefer `display: "optional"` with `preload: true` in `next/font` to completely eliminate font-swap Cumulative Layout Shift (CLS = 0).
- Lock typography line-heights (`line-height: 1.2` or explicit rem) on monospaced labels and headings so character metric swaps cannot alter container heights.
- Preload only critical font weights.

### Zero Forced Reflows
- Never call synchronous geometric DOM queries (`getBoundingClientRect()`, `offsetWidth`, `offsetHeight`, `scrollTop`) inside `requestAnimationFrame` or scroll loops.
- Use `IntersectionObserver` for section tracking and viewport detection.
- Cache window and document heights on passive `resize` events rather than reading them during active scrolling.

### Accessibility, Semantic Landmarks & Heading Hierarchy
- **Landmark Structure**: Exactly one `<main id="main-content">` representing primary content. `<header>` and `<footer>` must be root siblings, NEVER nested inside `<main>`.
- **Landmark aria-hidden prohibition**: NEVER place `aria-hidden="true"` on landmark elements (`<aside>`, `<nav>`, `<header>`, `<footer>`, `<main>`). Use `<div aria-hidden="true">` for decorative borders/rulers.
- **Skip-to-Content**: Always include a keyboard & screen reader skip link as the very first focusable element in `<body>`.
- **Heading Order**: Strictly sequential descent (`h1` -> `h2` -> `h3`) with zero skipped levels. Never place `<h2>` physically before `<h1>`.
- **Color Contrast**: Maintain WCAG AA/AAA minimum contrast ratio (4.5:1 for normal text, 3:1 for large text and UI controls). Avoid dark-on-dark muted tones below `#a0968c`.
- **Modals & Drawers**: Must declare `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **Interactive Controls**: 100% of icon-only buttons and links must have explicit `aria-label` and dynamic `aria-expanded` / `aria-controls` states.

### Dynamic content
- Reserve space for skeletons, advertisements, embeds, and asynchronous content.
- Avoid inserting content above the current viewport unexpectedly.
- Avoid layout changes caused by late-loading CSS or fonts.

## 6. Viewport-Aware Loading & Bandwidth Optimization

### Core Principle
Load only the resources needed for the current experience. Defer non-critical images, videos, heavy components, animation code, and third-party resources until they are needed. Do not download an entire page's heavy assets just because the page has mounted.

### 1. Images and Media
- Use native `loading="lazy"` or Next.js Image lazy loading for below-the-fold images.
- Use `next/image` with appropriate `sizes`, responsive dimensions, and supported modern image formats.
- Load the actual LCP image eagerly; use high fetch priority only for the genuine critical image.
- Never lazy-load the LCP image.
- Avoid downloading full-resolution images when a smaller responsive variant is sufficient.
- Use thumbnails, responsive `srcset`, and appropriate compression.
- For video, use `preload="none"` or `preload="metadata"` when appropriate. Do not autoplay large videos outside the visible experience.
- Use IntersectionObserver when custom media loading or viewport-specific activation is required.
- Pause non-essential video and expensive visual effects when they are outside the viewport.

### 2. Components and JavaScript
- Keep initial JavaScript bundles small.
- Prefer Server Components for static content in the Next.js App Router.
- Use `next/dynamic` or lazy imports for genuinely heavy client-side components.
- Defer maps, complex charts, editors, carousels, 3D scenes, and other expensive features until needed.
- Do not dynamically import every small component; excessive splitting can introduce waterfalls and delayed rendering.
- Avoid prefetching heavy resources for content the user is unlikely to visit.
- Preserve Next.js route prefetching where beneficial, but control expensive page-specific data and asset preloading when justified.
- Do not fetch the same data repeatedly when existing caching or query deduplication can reuse it.

### 3. Viewport-Aware Activation
- Use IntersectionObserver to detect when heavy content approaches the viewport.
- For expensive components, begin loading slightly before visibility to avoid blank spaces while the user scrolls.
- Use a consistent root margin based on measured loading latency, connection conditions, and scrolling behavior.
- Keep below-the-fold components lightweight until activation.
- Once loaded, avoid repeatedly mounting and unmounting expensive content unless memory constraints justify it.

## 7. Crenspire Glass UI Design System & Aesthetics

Implement modern glassmorphism inspired by Apple's design language, balancing stunning translucency with 120 FPS compositor performance and WCAG AA accessibility:

### 1. Liquid Glass Aesthetic Principles
- **Translucency, not Opacity**: Never use solid white or opaque backgrounds for glass cards. Keep light mode background opacity around `0.15` and dark mode opacity around `0.08` (`rgba(255, 255, 255, 0.08)` / `rgba(0, 0, 0, 0.2)`).
- **Backdrop Filter & Saturation Boost**: Combine backdrop blur with saturation enhancement:
  ```css
  backdrop-filter: blur(var(--blur, 16px)) saturate(180%);
  -webkit-backdrop-filter: blur(var(--blur, 16px)) saturate(180%);
  ```
- **Specular Border Highlights**: Authentic Apple glass features directional lighting with a crisp, subtle specular top edge highlight:
  ```css
  box-shadow: 
    inset 0 1px 1px 0 rgba(255, 255, 255, 0.2),
    0 8px 32px 0 rgba(0, 0, 0, 0.12);
  ```
- **Dual-Tier Geometric Background**: Always place glass components over an ambient canvas consisting of:
  - Subtle radial color blobs (e.g. `bg-radial from-blue-500/20`, `bg-radial from-purple-500/15`).
  - Dual-tier grid lines: 80px macro grid with nested 20px micro grid dots or rules.

### 2. The Four Official Glass Variants
Every primitive must support four distinct glass surface treatments:
- `glass`: Standard translucent acrylic with subtle specular border and medium blur (16px).
- `frosted`: High-diffusion matte glass with denser opacity, soft light scattering, and heavy blur (24px).
- `fluted`: Vertical striated glass effect with directional refraction and micro-shadows.
- `crystal`: Ultra-crisp, high-transparency glass with sharp refraction and intensified edge specular highlights.

### 3. Glassmorphic Performance Rules
- **Never animate `backdrop-filter` directly**: Continuously recalculating gaussian blur on every frame crushes the GPU compositor. Animate `opacity` or `transform: scale()` instead.
- **Hardware Layer Promotion**: Use `will-change: transform` only during active hover or gesture states, and clean it up on idle.
- **Contrast Ratios**: In light mode, glass text must maintain 4.5:1 contrast against both the card and the underlying background canvas. Use semantic tokens (`text-foreground`, `text-muted-foreground`).

### 4. Component Architecture (Section 11 Standard)
Organize components following strict ownership boundaries:
```text
src/
  components/
    ui/          # Base Radix UI primitives with glass variant support
    ui/glass/    # Pre-styled Apple-inspired components with hover effects
    shared/      # Project-wide reusable components (Header, Footer, GridBackground)
    custom/      # Project-specific custom cards and features (GlassHeroCard, GlassMetricCard)
  features/      # Domain-specific feature modules (audit, analytics)
```

### 5. Interactive Micro-Effects
Enrich components using typed hover effects (`hoverEffects` CVA utility):
- `glow`: Subtle exterior luminous halo using primary accent color.
- `shimmer`: High-speed directional light sweep across the glass surface.
- `ripple`: Radial wave expansion on click or touch.
- `lift`: Compositor-only `transform: translateY(-2px)` with shadow bloom.
- `scale`: Subtle `active:scale-[0.98]` tactile press feedback.

### 6. Theme Switching & Hydration
- Use `next-themes` with `defaultTheme="dark"` and `attribute="class"`.
- Wrap the root layout in `<ThemeProvider disableTransitionOnChange>`.
- In `<html>`, add `suppressHydrationWarning` to eliminate theme attribute mismatch warnings.
- Header must include an accessible `ModeToggle` button (`aria-label="Toggle theme"`).

## 8. Accessibility & Zero-Lighthouse-Defect Standards (100% Score)

Achieve a certified 100/100 Accessibility score on Lighthouse and WCAG 2.2 AA compliance:

### 1. Mandatory Accessible Names for All Buttons
- **Icon-Only Buttons**: Every button lacking visible text MUST declare an explicit `aria-label`:
  ```tsx
  <Button size="icon" aria-label="Toggle theme"><Sun /></Button>
  <Button size="icon" aria-label="Send message"><Send /></Button>
  <Button size="icon" aria-label="Copy code to clipboard"><Copy /></Button>
  <SheetTrigger aria-label="Open mobile navigation menu"><Menu /></SheetTrigger>
  ```
- **Clickable Containers**: Never use `div` with `onClick` without `role="button"`, `tabIndex={0}`, and `onKeyDown`. Prefer native semantic `<button>` elements.

### 2. Mandatory Text Alternatives for All Images
- **Avatar & Next.js Images**: Every `<Image>`, `<img>`, and `<AvatarImage>` MUST have a descriptive `alt` attribute:
  ```tsx
  <AvatarImage src="/avatar.png" alt="Profile avatar of Akshay Joshi" />
  <Image src="/logo.png" alt="Crenspire Glass UI logo" width={120} height={32} />
  ```
- **Decorative Images**: Use `alt=""` and `role="presentation"` or wrap SVG icons in `aria-hidden="true"`. Never use generic redundant phrases like `"image of"`, `"icon"`, or `"graphic"`.

### 3. Accessible Form Controls & ARIA Inputs
- **Inputs & Textareas**: Every input element MUST have an accessible name, either via an explicit `<Label htmlFor="input-id">` or direct `aria-label`:
  ```tsx
  <Input id="chat-input" placeholder="Type a message..." aria-label="Chat message input" />
  ```
- **Sliders & Range Controls**: Always provide `aria-label` or `aria-labelledby` on `<Slider>`:
  ```tsx
  <Slider aria-label="Volume level control" defaultValue={[65]} max={100} />
  ```
- **Switches & Toggles**:
  ```tsx
  <Switch id="dark-mode-switch" aria-label="Dark mode toggle" />
  ```
- **Select Triggers**: Ensure `<SelectTrigger aria-label="Select component variant">` has an accessible name.

### 4. Skip-to-Content Navigation
Include a skip link as the very first interactive element in `<body>`:
```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
>
  Skip to main content
</a>
```

### 5. Dialogs, Sheets, & Modals
- Every modal container must declare `role="dialog"` or `role="alertdialog"` and `aria-modal="true"`.
- Must include a programmatically linked `<DialogTitle>` (via `aria-labelledby`) and `<DialogDescription>` (via `aria-describedby`).
- Focus must be trapped inside the active modal and returned to the trigger upon closing.

## 9. Performance Validation

Use the available tools rather than guessing.

### Browser profiling

Use Chrome DevTools Performance to inspect:

- Long tasks and main-thread activity.
- Layout, paint, and compositing work.
- Frame timing and dropped frames.
- JavaScript execution during scrolling and interactions.
- Repeated layout calculations and expensive event handlers.

Use the Rendering panel and FPS meter when available to diagnose visual stuttering.

### Core Web Vitals

Measure:

- LCP (Largest Contentful Paint): good at 2.5 seconds or less.
- INP (Interaction to Next Paint): good at 200 ms or less.
- CLS (Cumulative Layout Shift): good at 0.1 or less.

Use Lighthouse for lab diagnostics. Distinguish Lighthouse lab results from field data and real-user Core Web Vitals.

### Project validation

Use the scripts already defined in package.json.

Where available, verify:

1. Production build succeeds.
2. TypeScript checks pass.
3. Linting passes.
4. Existing tests pass.
5. Lighthouse or browser profiling is performed when relevant.
6. Desktop and mobile layouts work.
7. Reduced-motion behavior works.
8. No new console errors, broken interactions, or layout regressions appear.

Do not claim a performance improvement without comparing measurements under reasonably consistent conditions.

## 10. Implementation Rules

For each requested task:

1. Identify the affected files.
2. Explain the specific performance problem.
3. Make the smallest correct implementation change.
4. Preserve existing behavior and responsive layouts.
5. Test the affected interactions and relevant build checks.
6. Report the files changed, the issue fixed, and the validation performed.
7. State any remaining bottlenecks or unverified claims explicitly.

Do not make unrelated design changes. Do not sacrifice accessibility, maintainability, SEO, or correctness for a superficial benchmark improvement.

## Definition of Done

An implementation is complete when:

- The requested behavior works correctly.
- Animations are smooth under the tested conditions.
- Unnecessary layout and paint work has been reduced where relevant.
- React and browser workloads are reasonable.
- Images and fonts do not cause avoidable layout shifts.
- Accessibility and reduced-motion behavior are preserved.
- Production build and applicable checks pass.
- Performance claims are supported by actual measurements when available.

---

## Runtime & Package Manager: Bun

Use Bun as the default JavaScript runtime, package manager, dependency installer, and script runner for supported projects.

### Rules

- Use `bun install` to install dependencies.
- Use `bun add <package>` to add dependencies.
- Use `bun remove <package>` to remove dependencies.
- Use `bun run dev` to start the development server.
- Use `bun run build` to build the application.
- Use `bun run lint` and `bun run test` when these scripts exist.
- Use `bunx` to execute compatible package binaries without unnecessary global installations.
- Preserve the existing `package.json` scripts and project conventions.
- Commit `bun.lock` or `bun.lockb` only as appropriate for the installed Bun version; use the lockfile format generated by that version.
- Do not mix npm, pnpm, Yarn, and Bun lockfiles. Keep the repository's package-manager configuration consistent.
- Check the installed Bun version and project compatibility before making changes.
- Verify Next.js, React, native dependencies, build tools, and deployment scripts work with Bun before adopting it in production.
- Do not migrate an existing project to Bun or delete another lockfile without explicit approval.
- If a dependency or deployment environment requires Node.js, identify the incompatibility and use the supported runtime where necessary.
- Never claim Bun improves browser animation FPS. Browser animation performance must be optimized and measured separately.

### Default Policy

For new projects, prefer Bun unless a framework, dependency, deployment platform, or project requirement makes another runtime necessary.

For existing projects, inspect the current setup first and request approval before migrating the runtime or package manager.

---

## 11. Coordinated Page Entrance & Refresh Transitions (The EffectCraft Standard)

### Core Principle

When a user loads or refreshes the page, the application must never pop, flash, or jump abruptly into view. Every primary surface (navigation bar, interactive rulers/HUDs, hero headlines, badges, and initial viewport components) must smoothly mount through a coordinated, compositor-driven sequence.

### Engineering Rules

1. **Precision Easing**: Use `cubic-bezier(0.16, 1, 0.3, 1)` with a 500ms - 700ms duration. Avoid bouncy, springy, or jarring curves.
2. **Cascading Stagger Timing**:
   - Header/Navigation: `hudSlideFadeDown` (0ms delay, 550ms duration)
   - Right CAD Ruler/Telemetry: `hudSlideFadeLeft` (120ms delay, 700ms duration)
   - Hero Badge & Eyebrow: `hudSlideFadeUp` (50ms delay)
   - Hero Heading: `hudSlideFadeUp` (110ms delay)
   - Hero Subtext & Actions: `hudSlideFadeUp` (170ms - 240ms delay)
   - Hero Media/Showcase: `hudSlideFadeUp` (310ms - 380ms delay)
3. **Viewport Awareness on Refresh**: If a user refreshes the page while scrolled down, viewport reveal triggers (`IntersectionObserver`) must immediately detect elements already in the visible rect (`rect.top < window.innerHeight && rect.bottom > 0`) and trigger their smooth transition without delay.
4. **Layer Memory Cleanup**: Apply `will-change: opacity, transform` during the transition window and release it (`will-change: auto`) once settled.
5. **Reduced Motion Respect**: When `prefers-reduced-motion` is active, disable all translate offsets and display elements at `opacity: 1` instantly.

---

## 12. Lighthouse Diagnostics & Production Auditing Standard

### Core Audit Rule: Dev vs. Production Separation

- **Never benchmark Lighthouse against `next dev` (`bun run dev`)**: Development servers serve unminified React development modules, WebSocket hot-reloading clients, and devtool debug wrappers. This inevitably triggers artificial red diagnostics:
  - `Minify JavaScript`: Development code is unminified by design.
  - `Reduce unused JavaScript`: Development devtools and overlays are included in the bundle.
  - `Page prevented back/forward cache restoration`: HMR WebSockets actively hold open connections.
- **Always benchmark against a production build**: Execute `bun run build` followed by `bun run start` (or deploy to a production preview) before running Lighthouse audits.
- **Image Delivery Elimination**:
  - Always provide explicit responsive `sizes` matching the rendered CSS container bounds on every `next/image` component. Never leave a `fill` image without a container-specific `sizes` attribute.
  - Enable modern formats `['image/avif', 'image/webp']` in `next.config.ts`.

---

## 13. Total Blocking Time (TBT) 0ms Protocol & Code-Splitting

### Core Principle

Total Blocking Time (TBT) measures main-thread execution stalls (>50ms) between First Contentful Paint (FCP) and Time to Interactive (TTI). To achieve a strict 0ms TBT:

### 1. Zero Forced Reflows During Initial Hydration
- Never query geometric or layout properties (`scrollHeight`, `offsetHeight`, `getBoundingClientRect()`, `window.innerHeight`) synchronously inside `useEffect` or initial component render.
- Defer all layout measurements and non-critical observers using `requestIdleCallback` (`window.requestIdleCallback(measure, { timeout: 1000 })`) or `setTimeout(measure, 150)` as fallback.
- Rely on native asynchronous `IntersectionObserver` callbacks for visibility instead of reading bounding rects on mount.

### 2. Code-Splitting Non-Visible Components
- Defer modal dialogs, slide-over drawers, toast managers, and user-initiated panels using `next/dynamic` with `ssr: false`:
  ```tsx
  const ReservationModal = dynamic(() => import('../components/ui/ReservationModal'), { ssr: false });
  const CartDrawer = dynamic(() => import('../components/ui/CartDrawer'), { ssr: false });
  ```
- Code-split below-the-fold sections so the initial page bundle contains only the critical hero and immediate viewport code. This eliminates the "Reduce unused JavaScript" diagnostic completely.

### 3. Package Import Optimization
- Enable `optimizePackageImports` in `next.config.ts` for icon libraries such as `lucide-react` to prevent bundling hundreds of unused SVGs:
  ```ts
  experimental: {
    optimizePackageImports: ['lucide-react'],
  }
  ```

---

## 14. Elimination of "Reduce Unused JavaScript" via Server Components (RSC)

### Core Principle

When an entire Next.js page is marked with `'use client'`, React is forced to ship hydration code and client component trees for every section of the page, even if those sections are purely static markup. Chrome DevTools Coverage flags uncalled React runtime and hydration routines as "unused JavaScript".

### Architecture Protocol

1. **RSC-First Root Page**:
   - Never put `'use client'` at the top of `page.tsx`.
   - Keep `page.tsx` as an asynchronous React Server Component.
2. **Isolate Client Boundaries into Leaf Providers**:
   - Wrap interactive state and context providers in a dedicated `ClientProviders.tsx` (`'use client'`).
   - Place modals, drawers, and toasts inside `ClientProviders` with `next/dynamic` (`ssr: false`) so they are never bundled into the initial document payload.
3. **Pure Server Presentation Sections**:
   - Any component without user input state, click handlers, or lifecycle hooks (`useEffect`, `useState`) must NEVER have `'use client'` (e.g. `CraftStorySection`, `ReviewsSection`, `Footer`, `CornerTick`, `EyebrowHeader`).
   - These components render to pure HTML with 0 KiB of JavaScript emitted to the browser.

---

## 15. Comprehensive Lighthouse Performance Optimization

Act as a senior Next.js performance engineer. Audit and optimize pages to address every relevant Lighthouse issue shown in performance reports.

### 1. Legacy JavaScript — Elimination Protocol
- Identify which dependencies or build outputs are shipping unnecessary legacy JavaScript.
- Inspect the existing Next.js and Browserslist configuration.
- Set TypeScript target to modern ECMAScript (`"target": "ES2022"` in `tsconfig.json`).
- Define modern evergreen browsers in `browserslist` (`["last 2 Chrome versions", "last 2 Firefox versions", "last 2 Safari versions", "last 2 Edge versions", "not dead"]`).
- Remove unnecessary polyfills and compatibility code only when browser support requirements permit.
- Preserve compatibility with the browsers supported by the project. Do not change build targets blindly.

### 2. Network Dependency Tree
- Inspect Lighthouse's network dependency tree and identify critical request chains.
- Reduce unnecessary sequential requests and dependency waterfalls.
- Prioritize critical CSS, fonts, the LCP image, and essential JavaScript.
- Avoid unnecessary preloads, duplicate downloads, and redundant API requests.
- Use caching and parallel requests where appropriate.
- Do not preload every resource.

### 3. Render-Blocking Requests
- Identify the exact stylesheets, scripts, and other resources blocking the initial render.
- For web fonts, enforce `display: "swap"` and use system monospace/fallbacks where feasible.
- Remove unused CSS and unnecessary synchronous JavaScript.
- Defer non-critical scripts and lazy-load non-critical components.
- Inline critical CSS only when justified by measurements.
- Preserve first-viewport rendering, font stability, and visual correctness.

### 4. Optimize DOM Size
- Inspect the DOM for excessively nested elements and repeated component structures.
- Simplify unnecessary wrappers and duplicated markup.
- Reduce excessive off-screen elements and oversized rendered lists.
- Use pagination or virtualization for genuinely large collections when appropriate.
- Preserve semantic HTML, accessibility, responsive layouts, and existing functionality.
- Do not remove necessary structure merely to reduce element counts.

### 5. LCP Breakdown
- Identify the actual Largest Contentful Paint element.
- Determine whether the bottleneck is TTFB, resource discovery, resource download time, or rendering delay.
- Prioritize the real LCP image or content (`priority`, `quality`, and precise container `sizes`).
- Never lazy-load the LCP image.
- Avoid unnecessarily expensive hero animations that delay visible content.

### 6. Third-Party Resources
- Audit analytics, tracking scripts, embeds, external widgets, and other third-party resources.
- Remove unnecessary resources only after verifying they are unused.
- Defer non-critical third-party scripts when appropriate.
- Preserve required analytics, consent behavior, and essential functionality.

### 7. Unused JavaScript — Elimination Protocol
Investigate reported chunks (e.g. `react-dom` runtime, framework router chunks):
- Identify the actual modules and dependencies inside them using source maps, bundle analysis, or build output.
- Enforce React Server Components (RSC): Keep root `page.tsx` as a Server Component.
- Move client providers and interactive overlays into isolated leaf components with `next/dynamic` (`ssr: false`).
- Convert static presentational components into Server Components to emit 0 KiB client JavaScript.
- Enable `optimizePackageImports` for component/icon libraries.
- Split genuinely heavy components using appropriate dynamic imports.
- Do not infer the cause from filenames alone.

### 8. Long Main-Thread Tasks & 0ms TBT
- Record a Chrome DevTools Performance trace.
- Identify both long tasks and inspect their call stacks.
- Reduce expensive synchronous JavaScript and unnecessary React rerenders.
- Avoid repeated layout calculations and expensive work inside scroll handlers.
- Defer measurements (`scrollHeight`, observers) using `requestIdleCallback`.
- Use `requestAnimationFrame` only for work that genuinely needs frame synchronization.
- Keep animation work lightweight and use `transform`/`opacity` on the GPU compositor.

### 9. Technology and Implementation Rules
- Preserve the existing Next.js, React, TypeScript, and Tailwind architecture.
- Use Bun for package management and scripts where the project supports it (`bun run dev`, `bun run build`, `bun add`).
- Do not migrate runtimes or introduce new dependencies without approval.
- Prefer native CSS for simple transitions and the existing Motion library for complex UI animations.
- Do not add animation libraries merely to fix Lighthouse warnings.
- Reserve space for images and deferred components to prevent layout shifts.
- Maintain SEO, accessibility, reduced-motion support, and responsive behavior.

### 10. Validation and Deliverables
1. Inspect the repository and identify the exact affected files.
2. Capture a reproducible production baseline.
3. Fix the underlying causes rather than suppressing diagnostics.
4. Build the production application (`npm run build`) and run applicable checks.
5. Run Lighthouse again under comparable conditions on production builds (`npm run start`).
6. Report before-and-after Performance, Accessibility, Best Practices, and SEO scores.
7. Report LCP, INP where field data is available, CLS, total JavaScript transferred, unused JavaScript estimates, and any remaining long tasks.
8. List every changed file and explain the specific fix.
9. Clearly distinguish measured improvements from estimates.

---

## 11. Next.js 16 Turbopack — TBT Zero Protocol (Crenspire Glass UI)

These rules were validated and discovered during production optimization of the Crenspire Glass UI documentation site (Next.js 16 + Turbopack, Performance 86→target 100).

### 11.1 RSC Shell + Dynamic Client Sliver Pattern

**Problem**: A `"use client"` Header that imports `Sheet`/`SheetContent` (Radix Dialog code) adds ~80–120 KiB to the critical hydration bundle on every page load, even on desktop where the Sheet is never shown.

**Solution**: Split into RSC shell + dynamically-imported client sliver.

```tsx
// Header.tsx — Server Component (zero JS)
import dynamic from "next/dynamic"

const HeaderClient = dynamic(
  () => import("./HeaderClient").then((m) => m.HeaderClient),
  { ssr: true } // SSR the nav links; Sheet is ssr:false inside HeaderClient
)

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full" role="banner">
      <div className="container mx-auto px-4 pt-4">
        <HeaderClient />
      </div>
    </header>
  )
}
```

```tsx
// HeaderClient.tsx — "use client" — holds logo, nav, ModeToggle
// MobileSheet is separately lazy-loaded below
import dynamic from "next/dynamic"

const MobileSheet = dynamic(
  () => import("./MobileSheet").then((m) => m.MobileSheet),
  { ssr: false } // Sheet/Radix Dialog code never included in desktop bundle
)
```

### 11.2 `ssr: false` in RSC Pages — Client Wrapper Required

**Problem**: `next/dynamic({ ssr: false })` is **not allowed** in Server Component files (`page.tsx`, `layout.tsx`). Turbopack throws:
```
Error: `ssr: false` is not allowed with `next/dynamic` in Server Components.
```

**Solution**: Create a dedicated `"use client"` wrapper file that holds the `dynamic()` calls:

```tsx
// LazyInteractiveSections.tsx — "use client"
import dynamic from "next/dynamic"

const InteractiveVariantsSection = dynamic(
  () => import("./InteractiveVariantsSection").then((m) => m.InteractiveVariantsSection),
  {
    ssr: false,
    loading: () => <div className="h-64 glass-bg rounded-xl animate-pulse" aria-hidden="true" />,
  }
)

const InteractiveDemoSection = dynamic(
  () => import("./InteractiveDemoSection").then((m) => m.InteractiveDemoSection),
  { ssr: false }
)

export { InteractiveVariantsSection, InteractiveDemoSection }
```

Then import from this client wrapper in your RSC page:
```tsx
// page.tsx (Server Component) — import from the client wrapper
import {
  InteractiveVariantsSection,
  InteractiveDemoSection,
} from "@/components/custom/LazyInteractiveSections"
```

### 11.3 `useSyncExternalStore` for SSR-safe Hydration Detection

**Problem**: `useEffect(() => setMounted(true), [])` in `ModeToggle` and similar components triggers an extra render cycle and counts as a cascading setState in the ESLint `react-hooks/set-state-in-effect` rule.

**Solution**: Use `useSyncExternalStore` — no extra render, React 19 idiomatic, ESLint-clean:

```tsx
const emptySubscribe = () => () => {}

const mounted = React.useSyncExternalStore(
  emptySubscribe,
  () => true,   // client snapshot: always mounted
  () => false   // server snapshot: not mounted
)
```

### 11.4 Development vs Production Lighthouse Discrepancy

**Root Cause**: Lighthouse run against `npm run dev` shows:
- **"Minify JavaScript (~260 KiB)"** — Turbopack leaves code unminified with source maps.
- **"Reduce Unused JavaScript (~395 KiB)"** — React dev runtime + Fast Refresh + HMR WebSocket client.
- **"bfcache failure (2 reasons)"** — Active HMR WebSocket connection blocks Back/Forward Cache.

**Solution**: Always audit Lighthouse against production:
```bash
npm run build && npm run start
# Then run Lighthouse against http://localhost:3000
```

None of these 3 issues exist in production builds.

### 11.5 ESLint Zero-Warning Checklist for Glass UI Projects

Run `npx eslint . --max-warnings 0` before every commit. Common fixable patterns:

| Warning | Fix |
|---------|-----|
| `'React' is defined but never used` | Remove `import * as React from "react"` from non-JSX files |
| `'Button' is defined but never used` | Import only used named exports |
| `interface ... {}` empty interface | Replace with `type Foo = BaseType` |
| `'variant' assigned but never used` | Prefix with `_variant` or remove from destructuring |
| `setState in useEffect` | Use `useSyncExternalStore` or `useRef` |
| `'resolvedTheme' never used` | Remove from destructuring if not needed |


