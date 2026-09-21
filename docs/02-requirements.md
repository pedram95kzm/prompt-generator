# Current requirements

Status: **Reconstructed from implementation**  
Last verified: **2026-09-19**

## Functional requirements

| ID | Current requirement | Evidence |
| --- | --- | --- |
| FR-01 | Show Coding, Psychology, and Decoration categories. | `src/data/catalog.ts`, `src/main.ts` |
| FR-02 | Show templates for the active category and visually mark the active template. | `renderCategories()`, `renderTemplates()` in `src/main.ts` |
| FR-03 | Filter the active category's templates by title, description, or tag. | `filteredTemplates()` in `src/main.ts` |
| FR-04 | Load a template Markdown file and JSON schema from same-origin public assets. | `src/utils/loader.ts` |
| FR-05 | Reject a template when placeholder keys and schema keys do not match. | `validateSchema()` in `src/utils/parser.ts` |
| FR-06 | Render schema fields dynamically as text inputs or textareas. | `createField()` in `src/main.ts` |
| FR-07 | Mark required and optional fields and show form readiness based on required completion. | `createField()`, `updateCompletion()` |
| FR-08 | Prevent generation when a required value is blank and focus the first invalid field. | `validateInputs()` and form submit handler |
| FR-09 | Substitute every schema placeholder with its user value. | `generatePrompt()` in `src/utils/generator.ts` |
| FR-10 | Remove the complete line containing an empty optional placeholder. | `generatePrompt()` optional-line regular expression |
| FR-11 | Append `Speak to me in <language>.` to every generated prompt. | `generatePrompt()` |
| FR-12 | Support English, Persian, Arabic, Spanish, French, and German response instructions. | `languages` in `src/main.ts` |
| FR-13 | Render generated Persian and Arabic output right-to-left. | `rtlLanguages` and `renderPreview()` |
| FR-14 | Copy generated output using the Clipboard API, with a legacy fallback. | Copy-button handler in `src/main.ts` |
| FR-15 | Reset the active template's form and output. | Reset handler in `src/main.ts` |
| FR-16 | Persist active selection, language, theme, and per-template inputs in `localStorage`. | `StoredState`, `readStoredState()`, `persist()` |
| FR-17 | Use the OS color preference when no stored theme exists and allow manual theme switching. | State initialization and `renderTheme()` |
| FR-18 | Show loading, empty, success, validation-error, and template-load-error states. | Render functions and toast handling in `src/main.ts` |
| FR-19 | Support `/` for search focus and Ctrl/Cmd+Enter for generation. | Global keydown handler |
| FR-20 | Cache successfully loaded templates in memory for the current page session. | `cache` in `src/utils/loader.ts` |

## Non-functional requirements observed in code

### Maintainability

- TypeScript strict mode, unused checks, and no-fallthrough checks are enabled.
- Domain types, catalog data, parsing, loading, generation, styling, and UI orchestration are separated into modules.
- Template content and field metadata are separate static files.

### Accessibility

- Inputs have labels, error relationships, focus-visible styles, and `aria-invalid` state.
- Categories expose `aria-current`; toast updates use an `aria-live` region.
- Reduced-motion preferences suppress animation.
- **NOT VERIFIED:** No automated accessibility audit or assistive-technology test exists.

### Responsiveness

- The UI defines mobile, medium, large, and extra-large layouts through Tailwind utilities.
- Mobile uses horizontal category navigation; wider screens use sidebars and a sticky preview.

### Performance

- Static assets are small and templates are loaded only when selected.
- Loaded templates are cached in a process-local `Map` for the page lifetime.
- No formal performance target, bundle budget, or benchmark exists.

### Reliability

- Failed asset loads produce a visible retry action.
- A schema mismatch prevents the bad template from rendering.
- No automatic retry, offline mode, service worker, telemetry, or crash reporting exists.

### Security and privacy

- Generation is local; the project contains no backend submission path.
- User values are rendered into the preview with `textContent`.
- User values are persisted unencrypted in browser `localStorage`.
- Detailed current-state security notes are in [09-security.md](09-security.md).

## Technology and runtime constraints

- Vite 7 and TypeScript 5 development toolchain.
- ES2022 browser target.
- Vanilla DOM APIs; no UI framework.
- Tailwind CSS 3.4.17 is loaded at runtime from `cdn.tailwindcss.com`.
- Inter, JetBrains Mono, and Vazirmatn are loaded from Google Fonts.
- A modern browser with `fetch`, `localStorage`, `matchMedia`, ES modules, and standard DOM APIs is required.
- Clipboard API availability depends on browser permissions and secure-context rules; a legacy fallback is attempted.

## Known limitations

- Search is scoped to the current category rather than all 13 templates.
- The category/template count displayed in the header is hard-coded as `13 templates`.
- Categories, templates, languages, icons, and colors are source-code configuration, not runtime configuration.
- Interface text is English; selecting Persian or Arabic only changes the generated prompt's direction and final language instruction.
- Generated output is cleared when the user changes templates or languages and is not persisted.
- Reset clears only the current template's saved inputs.
- There is no global clear-data action.
- Static asset paths begin with `/`, which assumes deployment at the host root.
- Styling and custom fonts degrade or fail when their external CDNs are unavailable.
- No automated test suite, linter, formatter, CI pipeline, or application monitoring is configured.
- Psychology templates are general-purpose prompts, not professional mental-health care; the application has no global safety notice.

## Assumptions and unknowns

- **INFERRED:** Static hosting is the intended production model.
- **UNKNOWN:** Browser support matrix and accessibility conformance target.
- **UNKNOWN:** Availability, latency, performance, or privacy service-level requirements.
- **UNKNOWN:** Ownership and review policy for prompt content.
