# Feature reference

Status: **Current**  
Last verified: **2026-09-22**

## 1. Category and template selection

- **Purpose:** Choose a guided prompt workflow.
- **User:** End user.
- **Trigger:** Category or template button click.
- **Preconditions:** Catalog is compiled into the application.
- **Main flow:** Selecting a category clears search and selects its first template. Selecting a template clears current errors/output, persists the selection, and loads its assets.
- **Alternative/failure flow:** Selecting the already-active category or template does nothing. Asset failure shows a retry UI.
- **Input:** Category/template ID from a UI button.
- **Output:** Updated navigation, loading state, and dynamic form.
- **Dependencies:** Catalog and loader.
- **Permissions:** None.
- **Acceptance behavior:** Active category/template is marked; the corresponding form eventually renders or a visible error appears.
- **Source:** `src/data/catalog.ts`; `selectCategory()`, `selectTemplate()`, `renderCategories()`, `renderTemplates()` in `src/main.ts`.

## 2. Template search

- **Purpose:** Narrow templates in the selected category.
- **Trigger:** Input in desktop or mobile search field; `/` focuses the visible search field.
- **Main flow:** Case-insensitive matching across template title, description, and tags.
- **Alternative flow:** A no-results state is shown.
- **Limit:** Search does not span other categories and the query is not persisted.
- **Source:** `filteredTemplates()` and `setSearch()` in `src/main.ts`.

## 3. Runtime prompt and schema loading

- **Purpose:** Separate prompt content and form metadata from UI code.
- **Trigger:** Initial page load or template selection.
- **Main flow:** Fetch the `.md` and `.json` files concurrently, parse JSON, verify placeholder/schema key parity, cache the result by template ID.
- **Failure cases:** Non-2xx response, invalid JSON, or missing/unused schema key. The form displays an error and retry button.
- **Inputs:** `Template.templatePath`, `Template.schemaPath`.
- **Output:** `LoadedTemplate { content, schema }`.
- **Dependencies:** Browser `fetch`; same-origin `public/prompts` assets.
- **Source:** `src/utils/loader.ts`, `src/utils/parser.ts`.

## 4. Dynamic form rendering and readiness

- **Purpose:** Collect template-specific values without template-specific UI code.
- **Trigger:** Successful asset load.
- **Main flow:** Render each schema entry in JSON property order as a text field or textarea, with label, help, placeholder, required/optional marker, and error slot.
- **Alternative flow:** Loading skeleton or load-error card.
- **Input:** `PlaceholderSchema` and previously stored `UserInput`.
- **Output:** Form controls and readiness percentage.
- **Dependencies:** Supported schema `type` values are `text` and `textarea`.
- **Acceptance behavior:** Readiness is required fields completed / total required fields; it is informational and generation performs authoritative validation.
- **Source:** `createField()`, `renderForm()`, `updateCompletion()` in `src/main.ts`; `src/types/index.ts`.

## 5. Validation and prompt generation

- **Purpose:** Produce a complete prompt from template plus user values.
- **Trigger:** Generate button or Ctrl/Cmd+Enter.
- **Preconditions:** Template and schema loaded.
- **Main flow:** Reject blank required values, trim outer whitespace from supplied values, remove empty optional lines, replace all tokens, normalize trailing spaces and excessive blank lines, append language instruction.
- **Failure flow:** Inline errors are rendered, first invalid field is focused, and an error toast is shown.
- **Input:** Markdown template, schema, per-template user values, selected language.
- **Output:** Plain-text prompt.
- **Important constraint:** An empty optional placeholder removes its entire containing line. Template authors must isolate optional placeholders when other content on that line must be retained.
- **Source:** `src/utils/generator.ts`; submit handler in `src/main.ts`.

## 6. Language selection and RTL preview

- **Purpose:** Ask the downstream AI to respond in a chosen language.
- **Options:** English, Persian, Arabic, Spanish, French, German.
- **Main flow:** The selected language is appended as `Speak to me in <language>.` and persisted.
- **Alternative flow:** A `{{language}}` token in a template is also replaced, though authoring guidance says templates should not add it.
- **RTL behavior:** Persian and Arabic set `dir="rtl"` on the preview. Form inputs use `dir="auto"`; the overall UI remains English/LTR.
- **Side effect:** Changing language clears existing generated output.
- **Source:** `languages`, `rtlLanguages`, `renderForm()`, `renderPreview()` in `src/main.ts`; `generatePrompt()`.

## 7. Preview and clipboard copy

- **Purpose:** Review and transfer the generated prompt.
- **Trigger:** Successful generation; Copy button click.
- **Main flow:** Render output with `textContent`, display character count, call `navigator.clipboard.writeText()`.
- **Fallback:** Hidden textarea plus `document.execCommand('copy')`.
- **Failure case:** Failure toast asks the user to select text manually, although the preview is a `<pre>` rather than a dedicated selectable textarea.
- **Permissions:** Browser clipboard policy applies.
- **Source:** `renderPreview()` and copy handler in `src/main.ts`.

## 8. Browser-local persistence

- **Purpose:** Resume user choices and in-progress fields.
- **Stored under:** `prompt-studio-state-v1`.
- **Stored:** Category ID, template ID, language, theme, and inputs keyed by template ID.
- **Not stored:** Search query, generated output, validation errors, loaded asset cache.
- **Failure behavior:** Invalid JSON is ignored. Shape/schema validation is not performed.
- **Privacy:** Values can include source code or personal reflections and persist unencrypted for the origin.
- **Source:** `StoredState` in `src/types/index.ts`; `readStoredState()` and `persist()` in `src/main.ts`.

## 9. Reset, theme, feedback, and responsive behavior

- **Reset:** Clears current template inputs, current errors, and output; other templates' stored inputs remain.
- **Theme:** Uses saved choice, otherwise OS preference; button toggles light/dark and updates browser theme color.
- **Feedback:** Toasts report generation, reset, copy, and validation results; template loading has skeleton/error states.
- **Responsive behavior:** Mobile stacks sections and horizontally scrolls categories; wider layouts introduce a category sidebar and sticky result panel. Successful generation scrolls to preview below 1280px.
- **Accessibility helpers:** Visible focus styles, reduced-motion support, labels, `aria-live`, `aria-invalid`, and `aria-current`.
- **Source:** `src/main.ts`, `src/style.css`, `index.html`.

## Catalog contents

`src/data/catalog.ts` is the authoritative catalog. The Cinema collection provides separate movie and series recommendation workflows. Each asks for favorites plus optional taste, exclusion, mood, constraint, commitment, and availability context, then generates a prompt for accurate, title-specific comparisons.
