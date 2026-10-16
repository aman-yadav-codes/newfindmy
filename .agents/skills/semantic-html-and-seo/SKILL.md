---
name: semantic-html-and-seo
description: Universal master skill for implementing 100% semantic HTML5 architecture, strict heading hierarchies, zero invalid landmarks, rich accessible components, and complete 100% on-page & technical SEO across ANY web framework (Next.js, React, Astro, Vite, Vue, Svelte, static HTML).
---

# Universal Semantic HTML5 & 100% SEO Mastery

## Mission

Transform any web project into a **semantically flawless, 100% SEO-optimized digital asset** that achieves a guaranteed 100/100 SEO score on Lighthouse, complete accessibility tree compliance, and premier search engine discoverability.

---

## 1. Universal Semantic HTML5 Architecture

Never build with generic `<div>` wrappers. Every element in the DOM must carry semantic meaning according to the W3C HTML5 Living Standard.

### The Universal Page Skeleton
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Primary Keyword - Brand Name</title>
</head>
<body>
  <!-- 1. Keyboard & Screen Reader Skip Navigation Link -->
  <a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to main content
  </a>

  <!-- 2. Root Header Landmark (Banner) -->
  <header role="banner">
    <a href="/" aria-label="Brand Home">Logo</a>
    <nav aria-label="Primary Navigation">
      <ul>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
      </ul>
    </nav>
  </header>

  <!-- 3. Root Main Landmark (One per page, dominant content only) -->
  <main id="main-content" role="main">
    <!-- Hero Section -->
    <section id="hero" aria-labelledby="hero-heading">
      <span class="eyebrow">Category Badge</span> <!-- NEVER H2 -->
      <h1 id="hero-heading">Primary Unique Value Proposition</h1>
      <p>Supporting descriptive subtext...</p>
    </section>

    <!-- Content Sections -->
    <section id="features" aria-labelledby="features-heading">
      <h2 id="features-heading">Core Features</h2>
      <div class="grid">
        <article aria-labelledby="feat-1-title">
          <h3 id="feat-1-title">Feature One</h3>
          <p>Feature details...</p>
        </article>
      </div>
    </section>
  </main>

  <!-- 4. Root Footer Landmark (Contentinfo) -->
  <footer role="contentinfo">
    <nav aria-label="Footer Navigation">
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
      </ul>
    </nav>
    <p>&copy; 2026 Brand Name. All rights reserved.</p>
  </footer>
</body>
</html>
```

### Semantic Tag Dictionary & Strict Usage Rules

| Tag | Purpose & Strict Rules |
| :--- | :--- |
| `<header>` | Document or section header. Root header represents the banner landmark. **NEVER nest root `<header>` inside `<main>`.** |
| `<nav>` | Navigation block. **MUST have `aria-label`** if multiple `<nav>` elements exist (e.g., `aria-label="Primary Navigation"`, `aria-label="Footer Navigation"`). |
| `<main>` | Dominant content of the document. **Exactly ONE per document.** Must be root sibling to `<header>` and `<footer>`. |
| `<section>` | Thematic grouping of content, typically with an introductory heading (`aria-labelledby="[heading-id]"`). |
| `<article>` | Self-contained, independently distributable composition (blog post, product card, review testimonial, news item). |
| `<aside>` | Content tangentially related to the content around it (sidebars, callout boxes). **NEVER apply `aria-hidden="true"` to `<aside>`.** If purely decorative, use `<div>`. |
| `<footer>` | Document or section footer. Root footer represents the contentinfo landmark. **NEVER nest root `<footer>` inside `<main>`.** |
| `<figure>` & `<figcaption>` | Self-contained media (image, diagram, code snippet) with its associated caption. |
| `<time>` | Machine-readable date/time representation (`<time datetime="2026-10-12">October 12, 2026</time>`). |
| `<address>` | Contact information for the author/owner of the document. |

---

## 2. Heading Hierarchy Enforcement (Zero Skipped Levels)

Violating heading order severely penalizes SEO and Accessibility scores:

1. **Single `<h1>`**: Exactly one `<h1>` per document. It must be the primary semantic headline of the page inside `<main>`.
2. **No `<h2>` before `<h1>`**: Eyebrows, telemetry bars, and category tags displayed physically above the `<h1>` MUST be rendered as `<span className="eyebrow">` or `<p>`, NEVER as `<h2>`.
3. **Sequential Descent**:
   - `h1` → `h2` → `h3` → `h4`.
   - **Illegal**: `h1` directly followed by `h3` or `h4`.
   - **Illegal**: Card titles in section 2 rendered as `h4` when section title is `h2`.
4. **Modal / Drawer Headings**: In modal dialogs, use `aria-labelledby="modal-title"` with an `h2` or `h3` heading inside the dialog container.

---

## 3. 100% SEO Technical & On-Page Mastery

### Metadata Template for Modern Frameworks (Next.js / Astro / HTML)

```tsx
export const metadata: Metadata = {
  // Title: 50-60 chars, front-load primary keyword
  title: 'Brand Name | Primary Keyword & Unique Offering',
  
  // Description: 120-155 chars, engaging CTA
  description: 'Precision artisan single-origin roasts sourced directly from high-elevation micro-lots. Fresh 48-hour roasting and precision extraction atelier.',
  
  // Canonical URL (Eliminates duplicate content issues)
  alternates: {
    canonical: 'https://www.example.com',
  },
  
  // Keywords
  keywords: ['keyword 1', 'keyword 2', 'keyword 3', 'brand name'],
  
  // OpenGraph (Facebook, LinkedIn, Discord, Slack)
  openGraph: {
    title: 'Brand Name | Primary Keyword & Unique Offering',
    description: 'Precision artisan single-origin roasts sourced directly from high-elevation micro-lots.',
    url: 'https://www.example.com',
    siteName: 'Brand Name',
    images: [
      {
        url: 'https://www.example.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Brand Name Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Name | Primary Keyword & Unique Offering',
    description: 'Precision artisan single-origin roasts sourced directly from high-elevation micro-lots.',
    images: ['https://www.example.com/og-image.jpg'],
    creator: '@brandhandle',
  },
  
  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

---

## 4. Crawlers & AI Discoverability: `robots.txt`, `sitemap.xml`, `llms.txt`

Every production deployment MUST have these 3 root endpoints:

### 1. `robots.txt`
```txt
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap.xml
```

### 2. `sitemap.xml`
Include all indexable routes, priorities, and `lastmod` timestamps.

### 3. `llms.txt` (AI & LLM Agent Sitemap)
Place in `public/llms.txt`:
```markdown
# [Project Name]

> [Short summary of website purpose, business, or application]

## Key Navigation & Actions
- [Home](https://www.example.com): Main landing page.
- [Catalog / Services](https://www.example.com#catalog): Full list of offerings.
- [Bookings / Contact](https://www.example.com#contact): Interactive reservations and queries.

## Structured Data & APIs
- Schema: Schema.org JSON-LD is embedded in the main document.
- Sitemap: https://www.example.com/sitemap.xml
```

---

## 5. Structured Data (JSON-LD Schema.org)

Always output valid JSON-LD in the root HTML:
- **Businesses / Cafes / Stores**: `LocalBusiness`, `Restaurant`, `Store`
- **SaaS / Web Apps**: `SoftwareApplication`, `WebApplication`, `Organization`
- **E-Commerce**: `Product`, `Offer`, `AggregateRating`
- **Articles / Blogs**: `Article`, `BlogPosting`, `BreadcrumbList`

---

## 6. Verification Audit Checklist

Before releasing any project:
- [ ] Exactly one `<h1>` per page.
- [ ] No `<h2>` placed before `<h1>`.
- [ ] Zero skipped heading levels throughout entire page (`h1` → `h2` → `h3`).
- [ ] `<header>` and `<footer>` are root siblings to `<main>`.
- [ ] No `<aside>` or landmark element marked with `aria-hidden="true"`.
- [ ] All `<nav>` landmarks have descriptive `aria-label` attributes.
- [ ] `title` tag is 50-60 characters and unique.
- [ ] `meta description` is 120-155 characters.
- [ ] Canonical URL tag is present.
- [ ] OpenGraph and Twitter card tags are complete with 1200x630 image.
- [ ] JSON-LD schema is present and validates cleanly.
- [ ] `/robots.txt`, `/sitemap.xml`, and `/llms.txt` are served at root.
