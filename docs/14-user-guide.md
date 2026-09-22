# User guide

Status: **Current**  
Last verified: **2026-09-22**

## What Prompt Studio does

Prompt Studio helps you assemble a detailed prompt for another AI tool. It does not send the prompt to an AI or generate an AI answer. You fill out a guided form, copy the resulting text, and paste it into the AI tool you choose.

## Create a prompt

1. Choose a category from the current catalog.
2. Select a template card.
3. Fill every field marked with `*`. Optional fields may be left blank.
4. Choose a response language.
5. Select **Generate prompt**.
6. Review the Final prompt panel.
7. Select **Copy**, then paste the text into your chosen AI tool.

If a required field is missing, Prompt Studio highlights it and does not generate output.

## Find a template

Use the search box to match a template's name, description, or tags. Search applies only to the currently selected category. Press `/` when you are not typing in another field to focus search.

## Response language

Available choices are English, Persian, Arabic, Spanish, French, and German. The app adds a final instruction such as:

```text
Speak to me in English.
```

Persian and Arabic results are displayed right-to-left. The rest of the interface remains English.

## Saved values and privacy

The app automatically saves:

- Last category and template.
- Response language.
- Light/dark theme.
- Values entered for every template.

These values stay in the current browser's local storage. They are not synchronized to another device by this application. Avoid entering sensitive personal or proprietary information on a shared browser.

**Reset fields** clears only the currently selected template. To remove all saved Prompt Studio values, clear site data for this site in your browser settings.

## Appearance and shortcuts

- Use the moon/sun button to switch dark or light mode.
- Press `/` to focus template search.
- Press Ctrl+Enter on Windows/Linux or Cmd+Enter on macOS to generate.

## Common errors

- **Template unavailable:** A required `.md` or `.json` file could not load or is misconfigured. Try again; contact the site maintainer if it continues.
- **Required-field message:** Fill the highlighted field and generate again.
- **Copy failed:** Allow clipboard access, use HTTPS/localhost, or manually select the prompt text.
- **Unstyled page:** Tailwind CDN may be blocked or offline.

## Limitations

- The app does not evaluate whether generated prompts are correct, safe, or effective.
- It does not run prompts or show AI responses.
- It has no accounts, history, sharing, or cross-device sync.
- Generated output disappears after changing template/language or reloading, though field values remain saved.
- Search is limited to the selected category.
- Psychology templates support reflection only and are not a substitute for diagnosis, treatment, crisis support, or professional care.

## FAQ

### Does Prompt Studio send my input to an AI?

No application code sends form values to an AI or backend. Values are processed locally. Runtime Tailwind and font resources still contact external CDNs, and any script on the same origin can technically access local storage.

### Why did an optional section disappear?

Empty optional fields are intentionally removed with their full line so the final prompt stays clean.

### Why did my generated prompt disappear?

Generated output is not saved. Changing templates/languages or reloading clears it. The underlying field values are normally retained.
