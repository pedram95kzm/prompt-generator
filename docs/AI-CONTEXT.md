# AI agent context

Status: **Current continuation guide**  
Last verified: **2026-09-22**

## Read this first

Prompt Studio is a static, client-only prompt builder. It does **not** call an AI, backend, API, database, or authentication service. It fetches curated Markdown templates plus JSON schemas, renders a form, performs local text substitution, previews the result, and copies it to the clipboard.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

There is no automated test, lint, or format command.

## Architecture in one view

```text
src/data/catalog.ts
        ↓ asset paths
src/utils/loader.ts → public/prompts/**/*.md + *.json
        ↓ validated LoadedTemplate
src/main.ts → dynamic form/state/localStorage/UI
        ↓
src/utils/generator.ts → plain generated prompt → preview/clipboard
```

## Critical files

| File | Why it matters |
| --- | --- |
| `src/main.ts` | Single application orchestrator: runtime state, markup, renderers, events, persistence. |
| `src/data/catalog.ts` | Only registered templates appear in UI; asset paths are root-absolute. |
| `src/utils/generator.ts` | Defines required validation, optional-line removal, replacement, and language suffix. |
| `src/utils/parser.ts` | Defines legal placeholder syntax and schema parity. |
| `src/utils/loader.ts` | Defines fetch/error/cache behavior; cache key is template ID only. |
| `src/types/index.ts` | Shared contracts; runtime JSON is still only cast, not structurally validated. |
| `public/prompts/` | Runtime `.md` prompt assets and adjacent `.json` schemas organized by category. |
| `index.html` | Tailwind CDN dependency and inline visual theme configuration. |
| `src/style.css` | Custom CSS and Google Fonts dependency. |

## Core invariants

- Each catalog template has same-base-name `.md` and `.json` assets.
- Every non-`language` `{{key}}` in Markdown has exactly one schema key, and every schema key occurs in Markdown.
- Placeholder keys start with an ASCII letter and then use word characters/hyphens.
- Supported field types are only `text` and `textarea`.
- Empty optional values remove their entire source line.
- Every generated prompt ends with `Speak to me in <language>.`.
- Template IDs must remain globally unique while cache keys use ID alone.
- Generated user content must remain text-rendered, not inserted as HTML.

## State behavior

`prompt-studio-state-v1` contains category ID, template ID, language, theme, and inputs keyed by template ID. Output/search/errors/cache are transient. Reset affects only the active template. Changing category/template/language clears output.

## Things not to change casually

- Placeholder grammar or optional-line semantics: all templates depend on them.
- `localStorage` key/shape: there is no migration mechanism.
- Asset path convention: deployment assumes origin root.
- Category icon/color union types: they coordinate with UI icon/style maps.
- Language list and RTL set: they are separate and must remain aligned.
- Trusted-content assumptions around catalog/schema `innerHTML` use.
- Runtime Tailwind/Google Fonts dependencies without considering CSP, privacy, and deployment.

## Known risks

- User code and personal reflections persist unencrypted with no global clear-data UI.
- No automated tests or CI.
- Runtime Tailwind JavaScript has page privileges; no SRI/CSP is configured.
- Static asset and stored-state shapes lack runtime structural validation.
- Absolute prompt paths break ordinary subpath hosting.
- `main.ts` is the concentrated UI/state coupling point.

## Safe change checklist

1. Inspect affected code and matching prompt/schema assets.
2. Preserve current behavior unless change is explicitly requested.
3. For a new prompt, update both assets and the catalog, and use a globally unique ID.
4. Run `npm run typecheck` and `npm run build`.
5. Manually verify required/optional behavior, persistence, RTL if relevant, copy, responsive layout, and dark mode.
6. Update root README and affected `docs/` files.

## Documentation route

- Product: [01-idea.md](01-idea.md), [03-prd.md](03-prd.md), [15-user-guide.md](15-user-guide.md)
- Behavior: [02-requirements.md](02-requirements.md), [04-features.md](04-features.md)
- Engineering: [05-architecture.md](05-architecture.md), [06-technical-design.md](06-technical-design.md), [18-data-flow.md](18-data-flow.md)
- Risk/operations: [09-security.md](09-security.md), [10-testing-strategy.md](10-testing-strategy.md), [11-deployment.md](11-deployment.md)
- Continuation: [DECISIONS.md](DECISIONS.md), [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md), [14-developer-guide.md](14-developer-guide.md)
