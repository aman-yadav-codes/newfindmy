---
trigger: model_decision
description: Apply to web page changes and audits involving accessibility, SEO, Lighthouse, web quality, or agentic browsing.
---

# Universal Web Perfection Standard (The 100% Bar)

Whenever writing, auditing, or refactoring code in this repository, every AI agent must strictly enforce the **100% Perfection Standard**:

### 1. 100% Google Lighthouse Across All Pillars
- **Performance: 100**:
  - **TBT = 0ms**: Zero forced synchronous layout queries during hydration/mount. Defer measurements using `requestIdleCallback`. Code-split non-critical modals, drawers, and below-the-fold components via dynamic imports (`ssr: false`). Keep root `page.tsx` as a Server Component (RSC) to emit minimal client-side JavaScript.
  - **LCP < 1.2s**: Critical hero image has `priority`, `fetchPriority="high"`, never lazy-loaded, and explicit responsive container `sizes`.
  - **CLS = 0.000**: Explicit aspect ratios on all media/skeletons, `font-display: "optional"` or `"swap"` with size-adjust to eliminate font shifts.
- **Accessibility: 100**:
  - **Semantic Landmarks**: Exactly one `<main id="main-content">`. `<header role="banner">` and `<footer role="contentinfo">` are root siblings, NEVER nested inside `<main>`.
  - **No Hidden Landmarks**: NEVER place `aria-hidden="true"` on landmarks (`<aside>`, `<nav>`, `<header>`, `<footer>`, `<main>`). Use `<div aria-hidden="true">` for decorative elements.
  - **Skip Link**: The first element inside `<body>` must be `<a href="#main-content" className="sr-only focus:not-sr-only ...">Skip to main content</a>`.
  - **Heading Descent**: Single `<h1>` per page. Zero skipped headings (`h1` -> `h2` -> `h3`). Never place `<h2>` before `<h1>`.
  - **Accessible Names**: 100% of icon-only buttons/links must have `aria-label`. Dynamic controls declare `aria-expanded`, `aria-controls`, `aria-pressed`. Modals declare `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
  - **Contrast**: Text contrast >= 4.5:1 (WCAG AA/AAA). Muted text on dark themes must not fall below `#a0968c`.
- **Best Practices: 100**:
  - Zero console errors, modern doctype, HTTPS, `rel="noopener noreferrer"` on all external links, modern ES target (`ES2022+`).
- **SEO: 100**:
  - Unique meta title (50-60 chars) and description (120-155 chars).
  - Canonical URL link, OpenGraph tags, Twitter card tags.
  - Valid Schema.org JSON-LD structured data.
  - Root `/robots.txt` and `/sitemap.xml`.

### 2. Agentic Browsing (3/3 Score & Autonomous AI-Readiness)
- **Root `/llms.txt` and `/llms-full.txt`**: Standardized Markdown manifest defining site purpose, key page URLs, available actions, and schemas.
- **Accessibility Tree Navigation**: Clean, semantic markup that AI agents can navigate deterministically.
- **Machine-Actionable Controls**: Stable, descriptive IDs or labels on all interactive triggers (`id="btn-theme-toggle"`, `id="btn-quickstart-copy"`, `id="btn-dialog-trigger"`).
- **Layout Stability**: CLS = 0.000 guarantees visual AI agents calculating `(x, y)` coordinates never misclick shifted elements.
