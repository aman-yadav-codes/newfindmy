---
trigger: always_on
description: Shared session protocol for reading applicable project rules and skills before changes.
---

# Mandatory Session Initialization Protocol

Read the root `AGENTS.md` entry point, then open the rule and skill files relevant to the task before changing code. Do not load every lengthy skill on unrelated tasks.

## Step 1: Discover & Read Applicable Skills
The project maintains project-specific skills inside `.agents/skills/`. Read the full `SKILL.md` for each relevant skill before implementation:
- **Liquid Glass & UI Components**: Read `.agents/skills/crenspire-glass-ui/SKILL.md`
- **Performance & TBT 0ms**: Read `.agents/skills/high-performance-ui/SKILL.md` and `.agents/skills/performance/SKILL.md`
- **Lighthouse 100/100 Standards**: Read `.agents/skills/web-perfection-100/SKILL.md`
- **Accessibility & SEO**: Read `.agents/skills/accessibility/SKILL.md` & `.agents/skills/semantic-html-and-seo/SKILL.md`
- **Agentic Browsing**: Read `.agents/skills/agentic-browsing/SKILL.md`
- **Git Branching & PRs**: Read `.agents/skills/git-collaboration/SKILL.md`

## Step 2: Enforce Project Performance Boundaries (Zero TBT Protocol)
1. **Critical Hydration Bundle Budget**:
   - Never import Radix overlays (`Dialog`, `Sheet`, `Tabs`, `Select`) in critical client path.
   - All below-the-fold interactive components must use `dynamic(() => import(...), { ssr: false })` via client wrappers.
   - Header is an RSC shell (`Header.tsx`) importing `HeaderClient.tsx`. Mobile sheet is deferred via dynamic with `ssr: false`.
2. **Turbopack & RSC Rules**:
   - `ssr: false` cannot be declared inside Server Components (`page.tsx`, `layout.tsx`). Always wrap in a client component.
3. **Mounted State Detection**:
   - Never use `useEffect(() => setMounted(true), [])`. Always use `useSyncExternalStore`.
4. **Validation Gate**:
   - Zero ESLint warnings: `npx eslint . --max-warnings 0`
   - For code changes, run the relevant build and report its actual result.
