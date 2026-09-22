# Developer guide

Status: **Current**  
Last verified: **2026-09-22**

## Start contributing

### Prerequisites

- Node.js 20.19+ or 22.12+.
- npm.
- A modern browser.
- Internet access for dependency installation, Tailwind CDN, and Google Fonts.

### Install and run

```bash
npm install
npm run dev
```

Open the URL printed by Vite.

### Validate

```bash
npm run typecheck
npm run build
npm run preview
```

There is no automated test command in the current project.

## Repository map

```text
index.html                 HTML shell and runtime Tailwind configuration
src/main.ts                UI shell, state, rendering, and event orchestration
src/style.css              Custom component styling and motion behavior
src/data/catalog.ts        Category/template registry
src/types/index.ts         Shared TypeScript contracts
src/utils/parser.ts        Placeholder discovery and schema-key validation
src/utils/loader.ts        Fetch and in-memory asset cache
src/utils/generator.ts     Required validation and prompt construction
public/prompts/            Runtime Markdown templates and JSON schemas
docs/                      Project knowledge base
package.json               npm commands and direct dev dependencies
tsconfig*.json             Strict TypeScript configuration
```

`dist/` and `node_modules/` are generated and ignored.

## Development workflow

1. Read [AI-CONTEXT.md](AI-CONTEXT.md), [05-architecture.md](05-architecture.md), and the feature-specific source.
2. Keep content changes in `public/prompts/` and catalog changes in `src/data/catalog.ts`.
3. Keep parsing/loading/generation rules in their utility modules rather than duplicating them in UI handlers.
4. Preserve per-template persistence semantics unless a migration is intentionally designed.
5. Run type checking and the production build.
6. Manually smoke-test affected desktop/mobile, light/dark, validation, persistence, and clipboard flows.
7. Update relevant documentation when behavior or constraints change.

## Add a prompt template

1. Choose a globally unique template ID; loader caching currently keys only by ID.
2. Add `public/prompts/<category>/<id>.md` using `{{placeholder}}` tokens.
3. Add adjacent `<id>.json` with one entry per token except reserved `language`.
4. Use only `text` or `textarea` field types.
5. Put empty-optional tokens on lines that may be removed in full.
6. Register the template in `src/data/catalog.ts` with title, description, tags, and `...prompt(category, id)`.
7. Validate required/optional generation and run the build.

Example schema entry:

```json
{
  "problem": {
    "required": true,
    "label": "Problem",
    "type": "textarea",
    "description": "Describe what is going wrong.",
    "placeholder": "The save button fails when…"
  }
}
```

## Add a category

- Add a `Category` object in `src/data/catalog.ts`.
- Current `Category.icon` and `Category.color` types are closed unions. A new visual variant requires coordinated updates in `src/types/index.ts`, the icon map, and `colorClasses()`.
- Check mobile horizontal navigation and large-screen sidebar behavior.

## Modify generator behavior

- Treat `src/utils/generator.ts` as the single source for validation/substitution rules.
- Review every current template for compatibility before changing optional-line or whitespace behavior.
- Add automated tests before expanding syntax; currently none exist.
- Keep generated values as text. Do not render generated content via `innerHTML`.

## Coding conventions observed

- Strict TypeScript and explicit return types on exported/major functions.
- Interfaces/types in `src/types/index.ts`.
- Small pure utilities for deterministic text behavior.
- DOM creation in `main.ts`; no framework abstractions.
- Single quotes in TypeScript and trailing commas in multiline constructs.
- kebab-case template/category IDs and snake_case placeholder keys.
- User-visible text is currently English except native language labels.

No formatter or linter codifies these conventions.

## Debugging

- Use browser Network tools for `.md`/`.json` failures.
- Use browser Application/Storage tools for `prompt-studio-state-v1`.
- Use DOM/Accessibility tools for field relationships and responsive behavior.
- Use `npm run typecheck` before debugging bundler issues.

## Common mistakes

- Adding prompt files without a catalog entry.
- Renaming an asset without updating catalog-generated paths.
- Adding a schema key not present in Markdown, or vice versa.
- Reusing a template ID across categories.
- Putting optional and required tokens on the same removable line.
- Expecting Markdown to render as formatted HTML; it is plain source text.
- Deploying under a URL subpath without addressing absolute asset paths.
- Assuming reset clears all stored template data.
