---
name: agentic-browsing
description: Master skill for optimizing web applications for AI autonomous agents, Agentic Browsing (Lighthouse 2/2 audit), semantic accessibility trees, WebMCP integration, llms.txt discovery, and machine-actionable web interfaces. Use whenever preparing, auditing, or building pages for AI agents, crawlers, or modern browser automation.
---

# Agentic Browsing & AI-Ready Web Architecture

## Mission

Build, optimize, and audit web applications that are 100% ready for autonomous AI agents (Chrome DevTools MCP, Playwright, Puppeteer, Computer-Use agents, and LLM search crawlers) while passing the **Lighthouse Agentic Browsing audit with a perfect 2/2 score**.

This skill transforms traditional human-only web pages into **dual-purpose, beast-level interfaces**: visually stunning for humans and deterministically actionable for AI agents.

---

## 1. The Lighthouse Agentic Browsing Audit (2/2 Standard)

Lighthouse 13.3+ (Chrome 150+) audits websites for "Agent Readiness" using a pass/fail diagnostic:

### Audit Check 1: Well-Formed Accessibility Tree & Semantic Markup
- **Requirement**: AI agents do not "see" pixels like humans—they navigate the browser via the Accessibility (a11y) Tree and DOM landmarks.
- **Rules**:
  1. **Strict Landmark Hierarchy**: Every page must have one `<main>` landmark. `<header>` and `<footer>` must be root siblings, NEVER nested inside `<main>`.
  2. **Never mark landmark elements with `aria-hidden="true"`**: `<aside aria-hidden="true">` or `<nav aria-hidden="true">` breaks the accessibility tree. Use generic `<div aria-hidden="true">` for decorative elements.
  3. **Unique, Descriptive Interactive IDs**: Every clickable button, link, form input, and toggle must have a stable, human/agent-readable `id` or `aria-label` (e.g. `id="navbar-reserve-btn"`, `aria-label="Add Single Origin Huila to Cart"`).
  4. **Explicit State Attributes**: Interactive components must declare state dynamically via `aria-expanded`, `aria-pressed`, `aria-selected`, `aria-haspopup`, and `aria-current`.
  5. **Modals & Drawers**: Must declare `role="dialog"` or `role="alertdialog"`, `aria-modal="true"`, and `aria-labelledby="[modal-title-id]"`.

### Audit Check 2: Machine Discovery via `llms.txt` and `llms-full.txt`
- **Requirement**: AI agents and LLM crawlers query `/llms.txt` at the root domain before navigating to understand site capabilities, available actions, and data models without parsing massive HTML payloads.
- **Location**: Must be served at `/llms.txt` and `/llms-full.txt` (place in `public/llms.txt` or configure route handlers).
- **Structure**:
  ```markdown
  # Site Name

  > Concise summary of the organization, purpose, and offerings.

  ## Available Actions & Workflows
  - [Action Name](/path): Description of what the agent or user can perform.
  - [Catalog / Menu](/path#section): How products, prices, and options are structured.
  - [Reservations / Bookings](/path#booking): Form fields, required inputs, and endpoints.

  ## Machine-Readable Data & API Endpoints
  - [Sitemap](/sitemap.xml): Complete URL index.
  - [Structured Schema](/): JSON-LD LocalBusiness / Product schemas embedded in HTML.

  ## Guidelines for Autonomous Agents
  - Instructions on navigation, form submission, and rate limits.
  ```

---

## 2. Semantic HTML & Landmark Discipline

AI agents fail when pages use generic `<div>` soups. Enforce strict HTML5 semantic discipline:

### Landmark Structure
```html
<body>
  <!-- 1. Keyboard & Agent Skip Navigation -->
  <a href="#main-content" class="sr-only focus:not-sr-only">Skip to main content</a>

  <!-- 2. Header Landmark (Root level) -->
  <header role="banner">
    <nav aria-label="Primary navigation">...</nav>
  </header>

  <!-- 3. Main Landmark (Dominant content only) -->
  <main id="main-content" role="main">
    <section id="hero" aria-labelledby="hero-title">
      <h1 id="hero-title">Primary Title</h1>
    </section>
    <section id="features" aria-labelledby="features-title">
      <h2 id="features-title">Features</h2>
    </section>
  </main>

  <!-- 4. Footer Landmark (Root level, sibling to main) -->
  <footer role="contentinfo">
    <nav aria-label="Footer navigation">...</nav>
  </footer>
</body>
```

### Strict Heading Hierarchy
- **Rule 1**: Only ONE `<h1>` per page, placed as the primary headline of `<main>`.
- **Rule 2**: Eyebrows or metadata above the `<h1>` MUST be rendered as `<span>` or `<p>`, NEVER as `<h2>`.
- **Rule 3**: Strictly sequential descent (`h1` → `h2` → `h3` → `h4`). Zero skipped levels.
- **Rule 4**: Card titles inside an `<h2>` section must be `<h3>`.

---

## 3. WebMCP & AI Tool Discoverability

When websites support WebMCP (Web Model Context Protocol) or agentic tool use, agents can directly invoke actions rather than simulate fragile visual mouse clicks:

1. **Form Explicitness**:
   - Every `<form>` must have a descriptive `id`, `name`, and `action` or `onSubmit` handler.
   - Form inputs must have matching `<label htmlFor="field-id">` and `id="field-id"`.
   - Include `autocomplete` attributes (`name`, `email`, `tel`, `address-line1`) so agents can auto-populate accurately.
2. **Deterministic Action Triggers**:
   - Buttons must clearly express action verbs: `aria-label="Submit table reservation for 2 guests"`.
   - Success and error states must be exposed in the DOM with `aria-live="polite"` or `role="status"`.

---

## 4. Structured Data (JSON-LD Schema.org)

Always inject JSON-LD structured data into the `<head>` or root component. AI agents read JSON-LD directly into their knowledge graph:

```tsx
// Example for Next.js App Router layout or page
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant', // or 'Store', 'Organization', 'WebSite'
    name: 'AURA Coffee Roasters',
    description: 'Precision craft micro-lot coffee roastery and espresso atelier.',
    url: 'https://auracoffee.example.com',
    telephone: '+1-555-0199',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '418 Artisan Row',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94103',
      addressCountry: 'US',
    },
    servesCuisine: ['Specialty Coffee', 'Pastries'],
    priceRange: '$$',
    hasMenu: {
      '@type': 'Menu',
      name: 'Artisan Roast Menu',
      hasMenuItem: [
        {
          '@type': 'MenuItem',
          name: 'Direct-Trade Huila Single Origin',
          offers: { '@type': 'Offer', price: '6.50', priceCurrency: 'USD' },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

---

## 5. Layout Stability for Agent Visual Navigation (Zero CLS)

Vision-based AI agents (Anthropic Computer Use, Google Project Astra, OpenAI Operator) use coordinates `(x, y)` to click buttons:
- **If layout shifts (CLS > 0)**: The AI agent calculates coordinates for a button, but late-loading fonts, banners, or images move the button 50px down, causing the agent to click the wrong element!
- **Strict Requirement**: Maintain **CLS = 0.000**:
  - Always give images, video containers, and skeletons explicit `aspect-ratio` or `width`/`height`.
  - Use `display: "optional"` or `display: "swap"` with size-adjust fallbacks on fonts.
  - Never inject dynamic DOM banners above the viewport after page load.

---

## 6. Pre-Flight Checklist for 100% Agentic Browsing

Before delivering any web project:
- [ ] `/llms.txt` is present and valid markdown.
- [ ] `/robots.txt` and `/sitemap.xml` are accessible.
- [ ] Accessibility tree has no broken or hidden landmarks (`<aside aria-hidden>` removed).
- [ ] Single `<h1>`, zero skipped headings, no `<h2>` before `<h1>`.
- [ ] `<main>` is root sibling to `<header>` and `<footer>`.
- [ ] All interactive buttons and inputs have clear accessible labels and IDs.
- [ ] JSON-LD schema is valid and verified via Schema.org validator.
- [ ] CLS is 0.000 so visual coordinate targeting never misses.
