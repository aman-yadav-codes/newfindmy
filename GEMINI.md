<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# MANDATORY SESSION INITIALIZATION PROTOCOL (EXECUTE ON EVERY NEW SESSION)

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
5. **Strict Minimal Import & Tree-Shaking Standard**:
   - Never use wildcard/namespace imports (e.g., `import * as React from "react"`). Only import the exact named functions/hooks needed (e.g., `import { useState, useEffect } from "react"`).
   - Always use explicit type imports (`import { type RefObject } from "react"` or `import type { Foo } from "..."`) so bundlers erase them completely from client bundles.
   - Never use raw `<a href="...">` for internal routes. Always use `<Link>` from `next/link` to prevent full document reloads and redundant bundle downloads.
   - Use `usePathname()` from `next/navigation` instead of `window.location.pathname` for SSR/hydration safety.

Refer to [AGENTS.md](file:///c:/Users/lenovo/Desktop/newfindmy/AGENTS.md) and `.agents/rules/` for full component standards and rendering strategies.
