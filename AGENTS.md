<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project agent entry point

This file is the shared, always-loaded entry point for Codex and Antigravity. Before changing code, identify the task scope, read the applicable `.agents/rules/*.md` files and the full `SKILL.md` for each relevant skill under `.agents/skills/`, then follow them. Read actual file contents; filenames and discovery descriptions are only an index. Do not load every skill on unrelated tasks.

For TypeScript and React work, use specific named imports and explicit `import type` for type-only symbols; avoid namespace imports. Use `next/link` for internal routes. Keep client bundles small and check the installed Next.js documentation before using rendering or bundling APIs.

## Route to the right guidance

| Work | Required guidance |
| --- | --- |
| Any code change | `.agents/rules/00-session-protocol.md`; relevant local Next.js docs for Next.js code |
| UI, components, dialogs, dropdowns, or themes | `.agents/rules/component-architecture.md`; `.agents/skills/crenspire-glass-ui/SKILL.md` |
| New features, RBAC, authenticated pages, or production APIs | `.agents/rules/component-architecture.md`; `.agents/rules/rendering-optimization.md` |
| Performance, animation, or mobile rendering | `.agents/rules/performance-and-tbt.md`; `.agents/skills/high-performance-ui/SKILL.md`; `.agents/skills/performance/SKILL.md` |
| Routes, SSR, data, API latency, or caching | `.agents/rules/rendering-optimization.md` |
| Any web page or web quality change | `.agents/rules/universal-perfection-standard.md`; corresponding accessibility, SEO, Lighthouse, or agentic browsing skill when relevant |
| Git changes | `.agents/skills/git-collaboration/SKILL.md` |

The project supports exactly four styled Glass UI variants: `glass`, `frosted`, `fluted`, and `crystal`. Use `crystal` for modals and dialogs. The Glass UI skill holds their details and performance constraints.

Preserve existing architecture, functionality, accessibility, SEO, responsive layout, and light/dark theme behavior. Make the smallest justified change. Avoid unnecessary CSS, JavaScript, dependencies, abstractions, and duplicate overrides. Do not assume SSR, lazy loading, or a Lighthouse score improves performance without measurement.

Validate affected behavior and run `npx eslint . --max-warnings 0` for code changes. Run a relevant build or targeted check where needed. Report observed results and limitations; never claim a score, frame rate, discovery event, or agent activation without evidence.

Work on a feature branch, preserve existing uncommitted work, and follow `.agents/skills/git-collaboration/SKILL.md` for Git operations. Do not merge or deploy without user authorization.
