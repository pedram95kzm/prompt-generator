# Configuration reference

Status: **Current**  
Last verified: **2026-09-19**

## Environment variables and secrets

- Required environment variables: **None**.
- Optional environment variables: **None defined by the application**.
- Secrets: **None**.
- `.env` files/examples: **None**.

## Configuration files

| File | Purpose | Important values |
| --- | --- | --- |
| `package.json` | npm metadata, scripts, direct dev dependencies | `dev`, `build`, `preview`, `typecheck`; Vite and TypeScript |
| `package-lock.json` | Reproducible dependency graph | Lockfile v3; exact transitive/platform packages |
| `tsconfig.json` | Main TypeScript rules | ES2022, ESNext modules, Bundler resolution, strict and unused checks, no emit |
| `tsconfig.app.json` | Application build type-check | Extends base; excludes `src/**/*.test.ts` |
| `index.html` | Runtime shell and Tailwind config | Tailwind 3.4.17 URL, dark mode class, theme colors/fonts/shadows |
| `src/data/catalog.ts` | Product catalog | Categories, template metadata/tags, asset paths |
| `src/main.ts` | UI/runtime defaults | Languages, RTL set, localStorage key, default selection behavior, hard-coded template count |
| `src/style.css` | Visual behavior | Google Fonts URL, field/surface/dark/motion styles |
| `.gitignore` | Generated/private file exclusions | `node_modules`, `dist`, local files, coverage |

## Defaults

| Setting | Default |
| --- | --- |
| Category | Coding unless a valid stored category exists |
| Template | First template in the category (Debug for Coding) unless a valid stored template exists |
| Language | English |
| Theme | Stored choice; otherwise OS `prefers-color-scheme` |
| Search | Empty and not persisted |
| Output | Empty and not persisted |
| Storage key | `prompt-studio-state-v1` |

## Supported language configuration

The list is hard-coded in `src/main.ts`:

- English
- Persian (فارسی)
- Arabic (العربية)
- Spanish
- French
- German

Persian and Arabic are separately hard-coded in the RTL language set. A new RTL language must be added to both places.

## Template configuration

Each catalog template requires:

```text
public/prompts/<category>/<id>.md
public/prompts/<category>/<id>.json
```

Schema fields:

| Property | Required | Meaning |
| --- | --- | --- |
| `required` | Yes | Whether blank input prevents generation. |
| `label` | Yes | User-visible field label. |
| `type` | Yes | `text` or `textarea`. |
| `description` | No | Help text shown above the field. |
| `placeholder` | No | Native input placeholder. |

Template files are plain text with Markdown-compatible formatting, but the application does not render Markdown. Placeholder syntax is `{{key}}`.

## Development versus production

No environment-specific values exist. Vite supplies its normal development/production behavior, but the project defines no `vite.config.*`, proxy, feature flags, or mode-specific files.

## Host-controlled configuration

The repository does not define:

- Domain or base URL.
- HTTPS certificates.
- Cache, compression, redirect, or security headers.
- CSP allowances for Tailwind and Google Fonts.
- Logging, monitoring, or analytics.
- Deployment credentials.

Those choices remain **UNKNOWN** until a hosting platform is selected.
