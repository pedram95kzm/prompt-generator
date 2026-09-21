# Technical design

Status: **Current implementation**  
Last verified: **2026-09-19**

## Toolchain

| Area | Implementation |
| --- | --- |
| Language | TypeScript targeting ES2022 |
| Bundler/dev server | Vite 7 |
| UI | Vanilla DOM APIs |
| Styling | Tailwind CSS 3.4.17 CDN plus `src/style.css` |
| Package manager | npm with lockfile v3 |
| Runtime | Modern browser; static-file host |

Exact installed versions are recorded in `package-lock.json`; `package.json` declares only TypeScript and Vite as direct development dependencies.

## Type model

`src/types/index.ts` defines:

- `Category` → catalog group with visual metadata and templates.
- `Template` → identity, display metadata, tags, Markdown path, schema path.
- `Placeholder` → `required`, `label`, `type`, optional description/placeholder.
- `PlaceholderSchema` → placeholder key to field metadata.
- `UserInput` → placeholder key to string value.
- `LoadedTemplate` → fetched content and schema.
- `StoredState` → persisted selection, language, theme, and per-template values.
- `GenerateResult` and `ValidationErrors` → generator result contract.

Only `text` and `textarea` are valid `FieldType` values at compile time.

## Catalog and asset convention

`src/data/catalog.ts` builds paths as:

```text
/prompts/<category>/<template-id>.md
/prompts/<category>/<template-id>.json
```

The catalog is authoritative for what appears in the UI. Merely placing files under `public/prompts/` does not expose a new template in the picker.

The Markdown file is treated as plain template text; it is not parsed or rendered as HTML/Markdown. The JSON schema controls form order through JSON property order.

## Placeholder parsing and schema checks

`parsePlaceholders()` uses this grammar:

```regex
\{\{\s*([a-zA-Z][\w-]*)\s*\}\}
```

Consequences:

- Keys must start with an ASCII letter.
- Remaining characters may be word characters or hyphens.
- Whitespace inside braces is allowed.
- Duplicate occurrences are returned once, in first-seen order.
- `language` is reserved and excluded from schema matching.

`validateSchema()` reports both missing schema entries and schema entries unused by the template. Any report stops template loading.

## Loading and caching

`loadTemplate()`:

1. Returns an in-memory cached value if the template ID was loaded earlier.
2. Fetches Markdown and JSON concurrently with `Promise.all`.
3. Rejects non-2xx responses.
4. Reads text and casts parsed JSON to `PlaceholderSchema`.
5. Runs key-parity validation.
6. Caches and returns the result.

There is no timeout, abort controller, automatic retry, cache invalidation, schema shape validation, or persistent asset cache implemented by the app.

## Generation algorithm

`generatePrompt()` is synchronous:

1. Required fields are considered blank when missing or whitespace-only.
2. Generation returns no prompt when validation errors exist.
3. CRLF input template line endings are normalized to LF.
4. Every schema entry is processed in object order.
5. An empty optional field removes the entire line containing its token.
6. Remaining occurrences of the token are globally replaced with the trimmed user value.
7. A reserved `{{language}}` token is replaced if present.
8. Trailing horizontal whitespace and runs of 3+ newlines are normalized.
9. The final language sentence is appended after a blank line.

The algorithm performs textual substitution; it does not understand Markdown structure or escape user content.

## UI state and rendering

`src/main.ts` uses a module-scoped mutable `AppState`. Rendering is split by region:

- `renderCategories()`
- `renderTemplates()`
- `renderForm()` and its loading/error variants
- `renderPreview()`
- `renderTheme()`
- `renderAll()`

Static shell markup and trusted icon SVGs are inserted once. Dynamic form controls are created with DOM APIs. User input reaches input `.value` or preview `.textContent`, not preview `innerHTML`.

Event delegation is used for category, template, and form actions. Search inputs have direct listeners. Global keyboard handling implements `/` and Ctrl/Cmd+Enter.

## Persistence behavior

`persist()` synchronously serializes the complete `StoredState` on each form input event and relevant selection/theme change. `readStoredState()` catches invalid JSON but does not validate object shape.

Key: `prompt-studio-state-v1`.

The version suffix provides a manual migration boundary, but no migration code exists.

## Error handling

| Failure | Behavior |
| --- | --- |
| Corrupt `localStorage` JSON | Ignore and use defaults. |
| Invalid stored category/template/language | Fall back to valid catalog/default language. |
| Fetch non-2xx | Show template unavailable message with retry. |
| Invalid JSON/schema mismatch | Show template unavailable message with retry. |
| Required input missing | Re-render inline errors, focus first invalid field, show toast. |
| Clipboard API failure | Attempt legacy copy; show success/failure toast. |

There is no logging, telemetry, error reporting, or centralized error boundary.

## Styling and accessibility design

- Tailwind utility classes are embedded in DOM template strings.
- `src/style.css` provides reusable surfaces/fields, dark states, transitions, skeletons, and reduced-motion behavior.
- `dir="auto"` is used for user inputs; preview direction is explicit only for Persian/Arabic.
- Labels, visible focus, `aria-invalid`, `aria-describedby`, `aria-current`, and `aria-live` are present.
- Accessibility conformance has not been tested or certified.

## Dependency and build design

- `npm run typecheck` runs strict TypeScript without emitting.
- `npm run build` type-checks, then runs Vite build.
- `public/` is copied into `dist/`; the application bundle does not inline prompt assets.
- Tailwind itself is not an npm dependency and is not part of the Vite-generated CSS artifact.

## Not implemented

- Services/controllers/repositories in the server-side sense.
- Background processing, events, queues, concurrency coordination, or retries.
- App-level logs, metrics, traces, or analytics.
- Environment-variable configuration.
- Runtime extension/plugin system.
