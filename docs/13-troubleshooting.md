# Troubleshooting

Status: **Current**  
Last verified: **2026-09-19**

## Install or startup problems

### `npm install` or `npm ci` fails on an optional Rollup/esbuild native package

- Confirm the environment has network access to the npm registry.
- Use a Node.js version supported by Vite 7.
- Do not copy `node_modules` between operating systems or CPU architectures.
- Remove/reinstall dependencies only if you have explicitly decided to recreate them; `node_modules` is generated and ignored by Git.

### Vite reports an unsupported Node.js version

Use Node.js 20.19+ or 22.12+ as documented by the project README, then reinstall dependencies.

### Port 5173 is in use

Vite normally selects another port. Use the exact URL printed by `npm run dev`.

## Template problems

### “We couldn't load this template”

1. Inspect the browser Network panel for the `.md` and `.json` requests.
2. Confirm both files exist under the same `public/prompts/<category>/` folder.
3. Confirm `src/data/catalog.ts` uses the exact category and template ID.
4. Confirm the server returns actual JSON for the `.json` URL, not an HTML fallback page.
5. Read the visible error; a placeholder/schema mismatch is reported explicitly.
6. Use the retry button after correcting the asset or network problem.

### Schema mismatch

Every `{{key}}` in Markdown, except reserved `language`, needs one JSON property with the same key. Every JSON property must occur in the Markdown file. Matching is case-sensitive.

### Optional content disappears unexpectedly

An empty optional placeholder removes its entire source line. Put an optional token on a line by itself or with only text that should disappear with it.

### Added files do not appear in the UI

Files are not discovered automatically. Add a matching template entry to `src/data/catalog.ts` and rebuild/reload.

## Styling and font problems

### Page is unstyled

- Confirm `https://cdn.tailwindcss.com/3.4.17` is reachable and not blocked by CSP, an extension, or a network filter.
- Review the browser console for Tailwind script errors.
- The production Vite CSS file contains custom CSS, but most layout utilities depend on runtime Tailwind.

### Fonts fall back to system fonts

Confirm access to Google Fonts. The app remains usable with fallback fonts.

## Persistence problems

### Old values return after reload

This is expected. Inputs are stored under `prompt-studio-state-v1`. Reset clears only the active template. To clear everything, delete site storage for the origin using browser settings or developer tools.

### Page fails after manually editing local storage

Invalid JSON is ignored, but valid JSON with an unexpected shape is not fully validated. Delete the `prompt-studio-state-v1` entry and reload.

### Storage changes are not shared across devices/browsers

Expected: there is no account or synchronization service.

## Generation and clipboard problems

### Generate does nothing useful

- Wait for the template form to finish loading.
- Fill every field marked `*`.
- Review the first focused field and inline error.

### Copy fails

- Serve the app through HTTPS or localhost where possible.
- Allow browser clipboard permission.
- The app attempts a legacy fallback; if the error toast remains, manually select the text from the preview.

## Deployment problems

### Prompt assets return 404 on a subpath deployment

The catalog uses root-absolute `/prompts/...` URLs. Current implementation assumes origin-root hosting. See [11-deployment.md](11-deployment.md).

### JSON request returns the application HTML

The static host is probably rewriting missing asset paths to `index.html`. Preserve direct static handling for `/prompts/*` and correct the missing file/path.

## Build diagnostics

Run in order:

```bash
npm run typecheck
npm run build
npm run preview
```

There is no configured linter, formatter, test runner, application logger, or telemetry system to inspect.
