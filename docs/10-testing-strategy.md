# Testing and validation

Status: **Current-state assessment**  
Last verified: **2026-09-19**

## Current state

The project has **no automated test files and no test framework dependency**. `tsconfig.app.json` excludes `src/**/*.test.ts`, but no matching files exist and `package.json` has no `test` script.

The available automated validation is:

```bash
npm run typecheck
npm run build
```

- `typecheck` runs TypeScript strict checks without output.
- `build` repeats the type check and then creates a production Vite build.

During the 2026-09-19 documentation audit, both commands passed after the `.md` conversion, and all 13 Markdown/schema pairs were checked for matching placeholder keys. That catalog-pair check is not committed as a reusable script.

## Coverage

- Statement/branch/function/line coverage: **UNKNOWN / not measured**.
- Unit tests: **None**.
- Integration tests: **None**.
- End-to-end tests: **None**.
- Accessibility automation: **None**.
- CI testing: **None; no CI configuration exists**.

## Critical untested behavior

| Area | Important cases |
| --- | --- |
| Parser | Whitespace, duplicate tokens, invalid token forms, reserved `language`. |
| Schema validation | Missing/unused keys, malformed JSON, invalid field shapes. |
| Generator | Required blanks, repeated replacements, regex-safe keys, optional line removal, newline cleanup, language suffix. |
| Loader | Concurrent fetch success, non-2xx response, parse error, cache hit, duplicate IDs. |
| Persistence | Corrupt JSON, stale IDs, unexpected stored shapes, quota errors. |
| UI | Category/template switching, search, validation focus, reset, language/output invalidation, dark mode, copy fallback. |
| Accessibility | Keyboard-only flow, screen readers, focus order, contrast, responsive zoom. |
| Deployment | Root versus subpath hosting and CDN unavailability. |

## Manual smoke-test procedure

1. Run `npm install`, then `npm run dev`.
2. Open the URL Vite prints.
3. Visit each category and load each template.
4. Confirm required-field submission shows errors and focuses the first invalid field.
5. Fill required fields, leave an optional field empty, and generate.
6. Confirm the optional line is absent and the language instruction is last.
7. Generate with Persian or Arabic and confirm RTL preview direction.
8. Copy the result and verify clipboard contents.
9. Refresh and confirm selections/inputs/theme restore but generated output does not.
10. Reset one template and confirm other templates' saved values remain.
11. Search using text found in title, description, and tags; verify no-results behavior.
12. Test both narrow and wide layouts and reduced-motion/dark preferences.

## Suggested future test layers (not implemented)

- Unit tests for `parser.ts` and `generator.ts` first; these are deterministic and highest-value.
- Loader tests with mocked `fetch`.
- DOM integration tests for state transitions and persistence.
- One browser E2E happy path plus asset-failure, keyboard, RTL, and clipboard cases.
- A catalog-validation script in CI to enforce `.md`/`.json` pairing and registry consistency.
- Automated accessibility checks supplemented by manual keyboard/screen-reader review.

No test framework is recommended here because framework selection has not been decided.
