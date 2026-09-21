# Reconstructed product requirements document

Status: **Current-state reconstruction**  
Last verified: **2026-09-19**

## Product summary

Prompt Studio is a browser-based builder for curated AI prompts. It guides users through template-specific questions, validates required details, constructs the final prompt locally, and lets the user copy it to an external AI tool.

## Goals supported by the implementation

- Reduce the effort required to write a useful structured prompt.
- Encourage users to supply domain-relevant context through guided fields.
- Make prompt templates maintainable as content files rather than hard-coded generator logic.
- Keep generation provider-neutral and browser-local.
- Support multilingual response instructions and an RTL preview for Persian and Arabic.

Success metrics and business KPIs are **UNKNOWN**; no analytics exists in the repository.

## Personas

| Persona | Need | Relevant catalog |
| --- | --- | --- |
| Developer | Structure a request for debugging, implementation, testing, refactoring, or docs | Coding |
| Reflective user | Organize thoughts, decisions, habits, or a difficult conversation | Psychology |
| Home planner | Explore room, palette, space, or lighting decisions | Decoration |
| Template maintainer | Add or update curated prompt workflows safely | `public/prompts/`, `src/data/catalog.ts` |

Personas are inferred from template content; no formal user research is stored.

## Primary user journey

1. Open the app; the last valid selection is restored, otherwise Coding / Debug is selected.
2. Browse a category or search within the active category.
3. Select a template and wait for its Markdown/schema assets to load.
4. Complete the generated fields; the readiness indicator tracks required fields.
5. Choose the desired response language.
6. Generate; correct any required-field errors.
7. Review the prompt and copy it to another application.

## Secondary journeys

- Switch light/dark appearance and retain it for the same browser origin.
- Return later and resume field values retained in `localStorage`.
- Reset the active template's values and output.
- Retry a template whose assets failed to load.
- Use `/` to focus search or Ctrl/Cmd+Enter to submit.

## Current feature inventory and priority

The repository contains no explicit prioritization record. The following classification is inferred from what the primary flow requires.

| Priority | Capability | Basis |
| --- | --- | --- |
| Core | Category/template selection | Required entry point |
| Core | Runtime template/schema loading | Required for fields and generation |
| Core | Dynamic form and required validation | Required to collect valid input |
| Core | Placeholder replacement and output preview | Product's central outcome |
| Core | Language instruction | Applied to every output |
| Core | Clipboard copy | Primary handoff to another tool |
| Supporting | Search, readiness progress, retry, reset | Improves workflow |
| Supporting | Persistence and dark mode | Convenience/personalization |
| Supporting | Responsive layout and keyboard shortcuts | Usability |

## Acceptance behavior

- A valid catalog entry with matching assets renders a form whose fields match its JSON schema.
- Blank required fields prevent prompt generation and produce inline errors.
- Filled placeholders are substituted everywhere they occur.
- Empty optional placeholders remove their containing line.
- Generated text ends with the selected language instruction.
- Persian and Arabic previews use RTL direction.
- Copy reports success or failure through a toast.
- Asset failure presents a retry action instead of a broken form.

## Out of scope

- AI inference, prompt execution, or response display.
- Server-side storage, login, sharing, team workflows, history, analytics, or billing.
- A runtime template editor or management console.
- Automated prompt quality scoring.

## Explicitly identified future functionality

**NONE.** The repository contains no roadmap, backlog, TODO, or approved future feature definition.

## Product risks

- Sensitive user content can remain in `localStorage` with no global clear option.
- Users may interpret psychology prompt output as professional guidance; the app provides no global disclaimer.
- Dependence on third-party CDNs can materially affect appearance or availability.
- The UI's `13 templates` header label can become inaccurate as the catalog changes.
