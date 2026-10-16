<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Shared project instructions

Read and follow the repository-root `AGENTS.md` before work. It is the single shared entry point and routes each task to applicable `.agents/rules/*.md` files and `.agents/skills/*/SKILL.md` files. Read those files before implementation. In particular, UI and component work requires `.agents/skills/crenspire-glass-ui/SKILL.md`; performance work requires the performance and rendering guidance. Preserve existing behavior, make minimal changes, and report validation results honestly.
