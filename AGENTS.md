<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 0. MANDATORY SESSION INITIALIZATION PROTOCOL (EXECUTE ON EVERY NEW SESSION)

> **CRITICAL DIRECTIVE FOR ALL AI AGENTS & IDE SESSIONS**:
> Before answering any user prompt, writing code, refactoring components, or running commands in this workspace, you MUST execute this protocol:

### Step 1: Consult Required Skills via `view_file`
Skills are located in `.agents/skills/`. You MUST read the relevant `SKILL.md` before executing tasks:
- **UI & Glass Design**: [crenspire-glass-ui](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/crenspire-glass-ui/SKILL.md) (Liquid glass tokens, variants, Apple design)
- **Performance & TBT 0ms**: [high-performance-ui](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/high-performance-ui/SKILL.md) and [performance](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/performance/SKILL.md)
- **Lighthouse 100/100 Standards**: [web-perfection-100](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/web-perfection-100/SKILL.md)
- **Accessibility & SEO**: [accessibility](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/accessibility/SKILL.md) & [semantic-html-and-seo](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/semantic-html-and-seo/SKILL.md)
- **Agentic Browsing**: [agentic-browsing](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/agentic-browsing/SKILL.md)
- **Git Operations**: [git-collaboration](file:///c:/Users/lenovo/Desktop/newfindmy/.agents/skills/git-collaboration/SKILL.md)

### Step 2: Enforce the Zero-Violation Architectural Rules
1. **Never load Radix Overlay Primitives in Critical Hydration Bundle**:
   - `Sheet`, `Dialog`, `Tabs`, `Select` MUST be isolated via `next/dynamic({ ssr: false })` in client wrappers or lazy components.
   - Root Header is an RSC shell (`Header.tsx`) importing `HeaderClient.tsx`.
2. **Turbopack & RSC Safety**:
   - Never place `dynamic({ ssr: false })` inside RSC files (`page.tsx`, `layout.tsx`). Always wrap in a client component.
3. **Mounted State Detection**:
   - Never use `useEffect(() => setMounted(true), [])`. Always use `useSyncExternalStore`.
4. **Build & ESLint Zero-Warning Gate**:
   - Before finishing any task, run `npx eslint . --max-warnings 0` and ensure clean passes.
5. **Strict Minimal Import & Explicit Tree-Shaking Standard**:
   - Never use wildcard or namespace imports (e.g. `import * as React from "react"`). Only import the exact named functions, hooks, or constants needed.
   - Always use explicit `type` imports (`import { type RefObject } from "react"` or `import type { Foo } from "..."`) so TypeScript types are 100% erased by the bundler.
   - Never use raw `<a href="...">` for internal routes. Always use `<Link>` from `next/link` for SPA client transitions without full-page reloads.
   - Use `usePathname()` from `next/navigation` instead of `window.location.pathname`.

---

## 11. Custom and Shared Component Architecture

Create a dedicated structure for project-owned components that need customization beyond the default Crenspire Glass UI library.

### Folder structure

Follow the project conventions:

```text
src/
  components/
    ui/
      # Existing or library-provided base components (Crenspire Glass UI)
    shared/
      # Reusable, project-wide components
    custom/
      # Project-specific customized components
  features/
    # Feature-specific components and business logic
```

### Component ownership rules

1. **Library components:** Use Crenspire Glass UI directly when its default behavior and appearance meet requirements.
2. **Shared components:** Place reusable components used across multiple pages or features in `components/shared/`.
3. **Custom components:** Place components that require project-specific appearance, behavior, layout, or customization in `components/custom/`.
4. **Feature components:** Keep components used only by one feature inside that feature's directory instead of making them globally shared.

### Customization requirements

- Do not modify or copy the entire Crenspire library into the project.
- Prefer composition and documented props over duplicating library implementations.
- Wrap library components when project-specific defaults or behavior need to be applied consistently.
- Keep custom styling in the appropriate component stylesheet, CSS module, or existing styling system.
- Centralize reusable design tokens such as glass variants, blur levels, radii, shadows, spacing, and colors when appropriate.
- Allow components to accept typed props for supported customization.
- Preserve accessibility, responsive behavior, and keyboard interactions.
- Avoid unnecessary wrapper layers when the original component already supports the required customization.

### Shared component standards

- Keep each component focused on one responsibility.
- Prefer fewer than 300 lines where practical.
- Review files approaching 400 lines for possible decomposition.
- Do not exceed 500 lines without a documented justification.
- Extract genuinely reusable hooks, types, constants, and utilities when beneficial.
- Avoid duplicated business logic, oversized prop interfaces, deeply nested conditionals, and excessive component fragmentation.
- Maintain backward compatibility when refactoring existing components.
- Update imports and tests when moving or extracting components.

---

## 12. Rendering Strategy, SSR and API Latency Optimization

Use the optimal Next.js 16 App Router rendering strategy for every route and component. The objective is fast initial rendering, minimal client-side JavaScript, low data-fetching latency, and correct, fresh data.

### A. Choose the correct rendering strategy

1. **Server Components by default**
   - Fetch data on the server when it is required to render the initial page.
   - Keep components server-rendered unless client-side interactivity is necessary.
   - Avoid fetching initial page data from `useEffect` after the page loads.
2. **SSR for request-dependent content**
   - Use server-side rendering when content depends on the current request, authenticated user, cookies, permissions, or other request-specific data.
   - Render the required content on the server before sending the response.
   - Avoid unnecessarily forcing every route into dynamic rendering.
3. **Static rendering and prerendering**
   - Prefer static generation for public pages whose content can safely be generated ahead of time.
   - Use `generateStaticParams` where appropriate for known dynamic routes.
   - Use revalidation when content changes periodically but does not need to be fresh on every request.
4. **Streaming and Suspense**
   - Use `Suspense` and streaming when independent page sections can render progressively.
   - Render important page content as early as possible.
   - Avoid blocking the entire page on a slow, noncritical API.
   - Provide appropriate loading states without causing layout shifts.

### B. Eliminate unnecessary API waiting

- Fetch data directly from its underlying database or service within Server Components when appropriate, rather than making an HTTP request from the server to the application's own API route.
- Reuse existing service and repository functions to prevent duplicated business logic.
- Start independent data requests concurrently with `Promise.all` or another appropriate concurrency mechanism.
- Avoid sequential API requests when they have no dependency on each other.
- Fetch only the fields and records required by the current page.
- Avoid waterfalls caused by nested components waiting unnecessarily for parent requests.
- Use pagination, filtering, and bounded queries for large datasets.
- Use appropriate database indexes and inspect slow queries before attempting to optimize them at the UI layer.
- Avoid making the same request multiple times during one render when safe deduplication is possible.

### C. Use caching correctly

Inspect the project's existing caching behavior before changing it.

- Follow the current Next.js 16 caching APIs and documented defaults.
- Use `use cache`, `cacheLife`, and `cacheTag` where appropriate and supported by the project configuration.
- Use `revalidateTag` or `revalidatePath` when cached content must be invalidated after relevant changes.
- Use request-level memoization for duplicate data access where appropriate.
- Distinguish request memoization, persistent data caching, and browser caching.
- Do not assume every `fetch` request is automatically persistently cached.
- Never cache user-specific or sensitive responses in a way that exposes one user's data to another.
- Do not serve stale data where business requirements demand current data.
- Avoid disabling caching globally to solve an isolated stale-data problem.

### D. Keep API routes where they are necessary

Retain Route Handlers for:

- External API consumers.
- Webhooks and integrations.
- Client-triggered mutations where an HTTP endpoint is appropriate.
- Explicit public or authenticated API contracts.
- Operations that require an HTTP boundary.

Do not create an API route solely to fetch data that a Server Component can safely access through an existing server-side service.
Preserve authentication, authorization, validation, rate limiting, and error handling.

### E. Keep interactive components fast

- Render initial content and data on the server where possible.
- Pass only the serializable data needed by Client Components.
- Keep `"use client"` boundaries narrow.
- Use client-side fetching only when data must update interactively, periodically, or in response to browser events.
- Avoid refetching data immediately after hydration when the server already supplied an equivalent result.
- Use optimistic updates only when appropriate and reconcile them with authoritative server responses.
- Avoid unnecessary hydration, large serialized payloads, and duplicated client/server state.

### F. Choose the strategy per route

For each important route, document:

- Whether it is statically rendered, dynamically rendered, or partially streamed.
- Which data is fetched on the server and which is fetched on the client.
- Which requests can run concurrently.
- Which data can be cached and for how long.
- How mutations invalidate or refresh relevant data.
- Whether slow dependencies block the initial response.
- The reason for the chosen strategy.

Do not force SSR onto every route. Select the strategy that minimizes latency while preserving data freshness, security, and correctness.

### G. Measure the actual result

Use the existing performance, Core Web Vitals, and web quality audit skills.

Measure where possible:

- Time to First Byte (TTFB).
- Largest Contentful Paint (LCP).
- Initial JavaScript transferred and executed.
- Server rendering and data-fetching duration.
- API latency and database query duration.
- Hydration overhead.
- Cache hit rate where observable.
- Lighthouse mobile and desktop results.

Compare baseline and post-change results under comparable conditions.
Do not claim that SSR makes a page faster merely because it renders on the server. Server rendering can increase TTFB when server work, database queries, or external APIs are slow.

### H. Implementation requirements

Audit first, then make targeted changes.

Do not:

- Convert every route to SSR.
- Cache sensitive data publicly.
- Replace existing architecture without a verified reason.
- Introduce unnecessary libraries or caching layers.
- Hide slow requests behind indefinite loading states.
- Claim performance improvements without measurements.

Preserve the existing project architecture, business logic, authorization, and API contracts unless a validated fix requires a change.

---

# Universal Web Perfection Standard (The 100% Bar)

Whenever writing, auditing, or refactoring code in ANY project, every AI agent must strictly enforce the **100% Perfection Standard**:

### 1. 100% Google Lighthouse Across All Pillars
- **Performance: 100**:
  - **TBT = 0ms**: Zero forced synchronous layout queries (`getBoundingClientRect()`, `scrollHeight`, `offsetHeight`) during hydration/mount. Defer measurements using `requestIdleCallback`. Code-split non-critical modals, drawers, and below-the-fold components via dynamic imports (`ssr: false`). Keep root `page.tsx` as a Server Component (RSC) to emit minimal client-side JavaScript.
  - **LCP < 1.2s**: Critical hero image has `priority`, `fetchPriority="high"`, never lazy-loaded, and explicit responsive container `sizes`.
  - **CLS = 0.000**: Explicit aspect ratios on all media/skeletons, `font-display: "optional"` or `"swap"` with size-adjust to eliminate font shifts.
- **Accessibility: 100**:
  - **Semantic Landmarks**: Exactly one `<main id="main-content">`. `<header role="banner">` and `<footer role="contentinfo">` are root siblings, NEVER nested inside `<main>`.
  - **No Hidden Landmarks**: NEVER place `aria-hidden="true"` on landmarks (`<aside>`, `<nav>`, `<header>`, `<footer>`, `<main>`). Use `<div aria-hidden="true">` for decorative elements.
  - **Skip Link**: The first element inside `<body>` must be `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>`.
  - **Heading Descent**: Single `<h1>` per page. Zero skipped headings (`h1` -> `h2` -> `h3`). Never place `<h2>` before `<h1>`.
  - **Accessible Names**: 100% of icon-only buttons/links must have `aria-label` (theme toggle, copy command, mobile menu toggle, send button). Dynamic controls declare `aria-expanded`, `aria-controls`, `aria-pressed`. Modals declare `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
  - **Contrast**: Text contrast >= 4.5:1 (WCAG AA/AAA). Muted text on dark themes must not fall below `#a0968c`.
- **Best Practices: 100**:
  - Zero console errors, modern doctype, HTTPS, `rel="noopener noreferrer"` on all external links, modern ES target (`ES2022+`).
- **SEO: 100**:
  - Unique meta title (50-60 chars) and description (120-155 chars).
  - Canonical URL link, OpenGraph tags, Twitter card tags.
  - Valid Schema.org JSON-LD structured data.
  - Root `/robots.txt` and `/sitemap.xml`.

### 2. 100% Agentic Browsing (Lighthouse 2/2 Score & Autonomous AI-Readiness)
- **Root `/llms.txt` and `/llms-full.txt`**: Standardized Markdown manifest defining site purpose, key page URLs, available user/agent actions, and API/schema references.
- **Accessibility Tree Navigation**: Clean, semantic markup that AI agents (Chrome DevTools MCP, Playwright, Puppeteer, Computer-Use agents) can navigate deterministically.
- **Machine-Actionable Controls**: Stable, descriptive IDs or labels on all interactive triggers (`id="btn-reserve"`, `id="btn-checkout"`).
- **Layout Stability**: CLS = 0.000 guarantees visual AI agents calculating `(x, y)` coordinates never misclick shifted elements.

### 3. Agent Skills Discovery
This repository contains a portable, framework-agnostic `.agents/skills/` directory:
- `.agents/skills/web-perfection-100/SKILL.md`: The 100% Lighthouse audit standard.
- `.agents/skills/agentic-browsing/SKILL.md`: AI agent readiness, WebMCP, and `llms.txt`.
- `.agents/skills/semantic-html-and-seo/SKILL.md`: Semantic tags, heading hierarchy, and technical SEO.
- `.agents/skills/high-performance-ui/SKILL.md`: Zero layout shift, TBT 0ms, GPU compositing, and Crenspire Glass UI design tokens.
- `.agents/skills/crenspire-glass-ui/SKILL.md`: The official Crenspire Glass UI component library skill.
- `.agents/skills/git-collaboration/SKILL.md`: Safe Git branch and PR workflows.
AI agents must consult and adhere to these skills during all coding tasks.

---

# Styling Strategy: Tailwind CSS + Regular CSS (Crenspire Glass UI)

- **Tailwind CSS first:** Use Tailwind utility classes for layouts, spacing, sizing, typography, colors, borders, responsive breakpoints, flexbox, grid, and common hover/focus states.
- **Crenspire Glass UI tokens:** Use standardized tokens (`glass-bg`, `glass-frosted`, `glass-fluted`, `glass-crystal`, `--blur`, `--glass-border`, `--glass-shadow`) from `@crenspire/glass-ui`.
- **Regular CSS when necessary:** Use CSS modules or `@/app/globals.css` for complex keyframes, specular highlights, ambient radial meshes, and styles that become difficult to maintain with utility classes.
- **No unnecessary CSS:** Do not create separate CSS rules when Tailwind and Glass UI utilities express the styling clearly.
- **No oversized class strings:** Extract reusable components (`components/ui/`, `components/custom/`) when Tailwind classes become excessively complex.
- **Performance first:** Neither Tailwind nor regular CSS is inherently faster at runtime. Never animate `backdrop-filter` continuously; animate compositor-only properties (`transform`, `opacity`).

# Animation Library Selection Policy

Use this priority order:
1. **CSS + Tailwind:** Default for simple transitions, glass hover effects, transforms, opacity, and basic keyframes.
2. **Motion for React (`motion`):** Preferred library for complex React UI animation, scroll reveals, staggered sequences, gestures, and page transitions. Prefer `motion/react-mini` for supported simple animations when its reduced feature set is sufficient.
3. **GSAP:** Use only when complex timelines or specialized animation features justify the additional dependency.

Rules:
- Inspect existing dependencies before selecting a library.
- Do not install multiple animation libraries for overlapping functionality.
- Do not use JavaScript animation when native CSS can achieve the same result cleanly.
- Prefer transform and opacity animations when appropriate.
- Respect `prefers-reduced-motion`.
- Clean up animation instances and subscriptions.

# Scroll Animation Synchronization & Consistent Reveal Timing

### 1. Consistent Animation Timing
- Use a shared animation configuration for elements belonging to the same section.
- Keep reveal durations (e.g. 400-500ms), easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`), and stagger intervals consistent (e.g. 60-80ms).
- Animate related elements as a coordinated group instead of triggering each element independently with arbitrary delays.
- Avoid excessive delays that make content appear uneven or late.

### 2. Reliable Scroll Triggers
- Use `IntersectionObserver` with consistent viewport thresholds (e.g. `threshold: 0.12, rootMargin: '0px 0px -40px 0px'`).
- Avoid triggering animations too early or too late because of inconsistent observer settings.
- Prevent repeated animation re-initialization and duplicate observers.
- Ensure animations behave stably during fast scrolling, backward scrolling, window resizing, or direct anchor navigation.

### 3. Prevent Late-Loading Components & Layout Shifts
- Reserve final layout space for images, videos, and dynamic components with explicit aspect ratios.
- Do not delay rendering actual content merely to synchronize its animation.
- Ensure essential content remains accessible when JavaScript is disabled or reduced motion is active.

---

# Repository Git Collaboration Rules

- The main branch is protected project integration code.
- Every developer and AI agent must work on a separate feature or fix branch.
- Never commit or push feature changes directly to main.
- Fetch and inspect remote changes before synchronizing branches.
- Preserve all uncommitted work and unrelated changes.
- Resolve merge conflicts carefully; never overwrite another developer's changes blindly.
- Run applicable tests and inspect the final diff before pushing.
- Use pull requests to merge feature branches into main.
- Require explicit user approval before merging a pull request or running destructive Git commands.
- Do not deploy production changes unless explicitly authorized.
- Report the exact Git operations performed and their verified results.

---

## 13. Performance Code-Splitting Architecture (TBT Zero Protocol)

These rules are derived from validated production optimizations on this project and are **mandatory** for all agents.

### 13.1 Header / Navbar Splitting

The Header must be a **Server Component shell** (`zero JS`). All interactivity is isolated into `HeaderClient.tsx` loaded via `next/dynamic`.

```
src/components/shared/
  Header.tsx        ← RSC shell, imports HeaderClient via next/dynamic (ssr: true)
  HeaderClient.tsx  ← "use client" — logo, nav links, ModeToggle, star count fetch
  MobileSheet.tsx   ← "use client" — Radix Sheet for mobile menu, imported via dynamic({ ssr: false }) inside HeaderClient
```

**Rule**: The `Sheet`, `SheetContent`, `Dialog`, and any Radix overlay component must NEVER be in the critical hydration bundle. Always lazy-load via `dynamic({ ssr: false })`.

### 13.2 Below-Fold Interactive Sections

Any component that uses `Tabs`, `Dialog`, `Select`, `Accordion`, or other Radix primitives and is placed **below the first viewport** must be lazy-loaded.

**Pattern**: Create a `"use client"` wrapper file to hold `ssr: false` dynamic calls, since `ssr: false` cannot be used directly in RSC pages.

```
src/components/custom/
  LazyInteractiveSections.tsx  ← "use client" wrapper with dynamic({ ssr: false }) imports
  InteractiveVariantsSection.tsx  ← actual component (lazy-loaded)
  InteractiveDemoSection.tsx      ← actual component (lazy-loaded)
```

### 13.3 The `ssr: false` Restriction in Turbopack

**Turbopack (Next.js 16) will throw a build error** if `next/dynamic({ ssr: false })` is used inside a Server Component file. Always verify:

- `page.tsx` and `layout.tsx` — these are RSC. Use a `"use client"` wrapper for `ssr: false`.
- `"use client"` files — can use `dynamic({ ssr: false })` freely.

### 13.4 `useSyncExternalStore` — Mandatory for Mounted Detection

All components that need to know if they are mounted (e.g., theme toggles, portals) must use `useSyncExternalStore`, not `useEffect(() => setMounted(true), [])`.

```tsx
const emptySubscribe = () => () => {}
const mounted = React.useSyncExternalStore(emptySubscribe, () => true, () => false)
```

Reason: `setState` inside a `useEffect` body triggers cascading re-renders (ESLint error `react-hooks/set-state-in-effect`) and adds measurable TBT.

### 13.5 `optimizePackageImports` in next.config.ts

All UI library packages used in this project must be in `optimizePackageImports`:

```ts
experimental: {
  optimizePackageImports: [
    "lucide-react",
    "@radix-ui/react-dialog",
    "@radix-ui/react-tabs",
    "@radix-ui/react-select",
    "@radix-ui/react-slot",
    "@radix-ui/react-switch",
    "@radix-ui/react-slider",
    "@radix-ui/react-avatar",
    "@radix-ui/react-separator",
    "@radix-ui/react-label",
    "sonner",
  ],
}
```

### 13.6 Mandatory Minimal Imports & Explicit Tree-Shaking Standard

- **No Wildcard / Namespace Imports**:
  - `import * as React from "react"` is strictly prohibited. It bloats bundles, breaks granular dead-code elimination, and causes ESLint `'React' is defined but never used` warnings in modern React 19 JSX environments.
  - Always use targeted named imports:
    ```tsx
    // BAD
    import * as React from "react"
    
    // GOOD
    import { useState, useEffect, useRef, type RefObject } from "react"
    ```
- **Explicit Type-Only Imports**:
  - Always separate TypeScript types/interfaces using `type` modifier or `import type`. Bundlers (Turbopack/esbuild/webpack) guarantee that type-only imports are completely eliminated from the client JS runtime bundle:
    ```tsx
    import { useState, type ReactNode, type RefObject } from "react"
    import type { ComponentPropsWithoutRef } from "react"
    ```
- **Client-Side SPA Navigation (`next/link`)**:
  - Internal navigation links MUST use `<Link href="...">` from `next/link`. Never use raw `<a href="...">` for internal routes. Raw `<a>` forces the browser to discard the document, re-fetch the entire HTML page, and re-download all shared CSS/JS bundles.
- **SSR-Safe Navigation Hooks**:
  - Avoid accessing `window.location` directly inside rendering or initialization. Use `usePathname()` and `useSearchParams()` from `next/navigation`.

---

## 14. Lighthouse Discipline Rules

### 14.1 Always Audit Production Builds

**Never run Lighthouse against `npm run dev`**. The dev server inflates scores with:
- ~260 KiB of unminified JavaScript (Turbopack source maps)
- ~395 KiB of unused JS (React dev runtime + HMR WebSocket client)
- bfcache failure (active HMR WebSocket blocks Back/Forward Cache)

**Always use:**
```bash
npm run build && npm run start
# Audit http://localhost:3000 (production port)
```

### 14.2 Lighthouse Score Targets

| Pillar | Target | Minimum Acceptable |
|--------|--------|-------------------|
| Performance | 100 | 95 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Agentic Browsing | 3/3 | 3/3 |

### 14.3 Core Web Vitals Targets

| Metric | Target | Threshold |
|--------|--------|-----------|
| TBT | 0ms | < 200ms |
| LCP | < 0.8s | < 1.2s |
| FCP | < 0.5s | < 0.8s |
| CLS | 0.000 | 0.000 |
| Speed Index | < 1.0s | < 1.5s |

### 14.4 ESLint Zero-Warning Gate

Before every commit and build, run:
```bash
npx eslint . --max-warnings 0
```

All **0 errors and 0 warnings** is the gate. Common Glass UI project fixes:

| Warning | Fix |
|---------|-----|
| `'React' is defined but never used` | Remove `import * as React` from non-JSX re-export files |
| `interface Foo extends Bar {}` empty | Replace with `type Foo = Bar` |
| `setState in useEffect` | Use `useSyncExternalStore` |
| Unused imported named export | Remove from import statement |
| Unused destructured prop | Prefix with `_` or remove |

### 14.5 Skills to Consult

Before writing any optimization code, read the relevant skill:

- `.agents/skills/high-performance-ui/SKILL.md` — TBT, animations, React rendering
- `.agents/skills/web-perfection-100/SKILL.md` — Full Lighthouse 100 playbook
- `.agents/skills/crenspire-glass-ui/SKILL.md` — Glass component patterns
- `.agents/skills/semantic-html-and-seo/SKILL.md` — Accessibility and SEO

