---
name: git-collaboration
description: Git collaboration workflow, branch protection rules, safe merge and PR procedures.
---

# Git Collaboration Skill

## Mandatory Rules
- Never push directly to main without explicit approval.
- Never merge changes into main without explicit user approval.
- Never run destructive Git commands without explicit user approval.
- Never discard, overwrite, reset, or stash the user's uncommitted changes without approval.
- Always inspect the current branch and working tree before modifying Git state.

## Before Every Git Operation
Run and inspect:
```bash
git status --short --branch
git branch --show-current
git remote -v
```
Fetch remote updates when necessary using `git fetch origin`.

## Branch Workflow
- Work on a dedicated feature branch.
- Before creating a branch, verify the working tree and preserve existing changes.
- Update the local base branch safely before creating new feature branches.
- Use descriptive branch names, such as `feature/search-filters` or `fix/login-error`.
- Commit only the intended files with descriptive commit messages.
- Push changes to the matching remote feature branch, never directly to main.

## Pull and Merge
- Fetch remote updates before integrating remote changes.
- Inspect local commits, remote commits, and uncommitted changes.
- Never assume that `git pull` is safe without checking the current branch and working tree.
- Prefer integrating the latest `origin/main` into the feature branch before opening or updating a pull request.
- Resolve conflicts only after understanding both sides of the changes.
- Never blindly accept ours or theirs for an entire file.
- After conflict resolution, inspect the diff and run relevant tests.
- Do not force-push or rewrite shared history without explicit approval.

## Pull Requests
- Push the feature branch.
- Create a pull request targeting main.
- Review the diff, tests, and CI status.
- Merge only after the user explicitly approves.
- Verify the resulting commit and remote branch state.

## Completion Report
Report:
- Current branch
- Files changed
- Commands executed
- Commit and push status
- Merge conflicts and their resolution
- Tests and validation results
- Pull request URL, if created
Never claim an operation succeeded unless its result was verified.
