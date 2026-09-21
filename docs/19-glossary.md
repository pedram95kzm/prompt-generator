# Glossary

Status: **Current**  
Last verified: **2026-09-19**

| Term | Meaning in this project |
| --- | --- |
| Prompt Studio | The complete browser application. |
| Category | A catalog grouping: Coding, Psychology, or Decoration. |
| Template | A registered guided-prompt workflow with display metadata and two runtime asset paths. |
| Prompt asset | A `.md` file under `public/prompts/` containing literal text and `{{key}}` tokens. It is not rendered as Markdown. |
| Schema | The adjacent `.json` map describing form fields for a prompt asset. |
| Placeholder/token | A `{{key}}` marker replaced during generation. |
| Required field | A schema field that must contain non-whitespace text before generation. |
| Optional field | A schema field that may be empty; its containing template line is then removed. |
| Reserved `language` placeholder | A token the parser excludes from normal schema matching and the generator replaces directly. Templates are instructed not to use it because a language sentence is always appended. |
| Catalog | The hard-coded category/template registry in `src/data/catalog.ts`. |
| Loaded template | In-memory pair of Markdown content and parsed schema. |
| User input | String values keyed by placeholder name for one template. |
| Generated prompt | Final plain text after validation, optional-line removal, replacement, cleanup, and language suffix. |
| Response language | The language named in the final instruction; not a localization of the UI. |
| RTL | Right-to-left preview direction, currently used for Persian and Arabic. |
| Readiness | Percentage of required fields currently containing non-whitespace input. |
| Stored state | Selection, language, theme, and inputs persisted under `prompt-studio-state-v1`. |
| Runtime cache | Page-lifetime `Map` of successfully loaded assets keyed by template ID. |
| Static host | Any server/CDN capable of serving the built `dist/` files; no provider is selected. |
| Vite | Development server and production bundler. |
| Tailwind CDN | Third-party runtime script that supplies most utility CSS. |
| Source of truth | Current implementation/configuration, which takes precedence over prose documentation. |
