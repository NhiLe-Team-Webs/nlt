---
name: docs
description: "Analyze codebase and manage project documentation — init, update, summarize."
argument-hint: "init|update|summarize"
---

# Documentation Management

Analyze codebase and manage project documentation through scouting, analysis, and structured doc generation.

## Default (No Arguments)

If invoked without arguments, use `AskUserQuestion` to present available documentation operations:

| Operation | Description |
|-----------|-------------|
| `init` | Analyze codebase & create initial docs |
| `update` | Analyze changes & update docs |
| `summarize` | Quick codebase summary |

Present as options via `AskUserQuestion` with header "Documentation Operation", question "What would you like to do?".

## Subcommands

| Subcommand | Reference | Purpose |
|------------|-----------|---------|
| `/docs init` | `resources/init-workflow.md` | Analyze codebase and create initial documentation |
| `/docs update` | `resources/update-workflow.md` | Analyze codebase and update existing documentation |
| `/docs summarize` | `resources/summarize-workflow.md` | Quick analysis and update of codebase summary |

## Routing

Parse `$ARGUMENTS` first word:
- `init` → Load `resources/init-workflow.md`
- `update` → Load `resources/update-workflow.md`
- `summarize` → Load `resources/summarize-workflow.md`
- empty/unclear → AskUserQuestion (do not auto-run `init`)

## Shared Context

Documentation lives in `./docs` directory:
```
./docs
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── design-guidelines.md
├── deployment-guide.md
├── system-architecture.md
└── project-roadmap.md
```

Use `docs/` directory as the source of truth for documentation.

**IMPORTANT**: **Do not** start implementing code.
