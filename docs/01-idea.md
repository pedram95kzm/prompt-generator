# Idea and product overview

Status: **Current-state reconstruction**  
Last verified: **2026-09-19**

## Project

**Name:** Prompt Studio  
**Observed purpose:** Help a user turn domain-specific context into a structured AI prompt without writing the prompt from scratch.

The original business narrative is **UNKNOWN**. The description below is reconstructed from the working application, runtime assets, and root README.

## Problem being solved

Users often know the outcome they want from an AI assistant but omit context, constraints, or output instructions. Prompt Studio supplies curated templates and converts each template's placeholders into a guided form. It then produces plain text that the user can copy to another AI product.

## Target users

- Software developers seeking debugging, feature, testing, refactoring, or documentation prompts.
- People seeking structured reflection, decision, habit, or communication prompts.
- People planning interior-decoration, color, layout, or lighting work.
- Template authors who maintain the catalog, Markdown prompt files, and JSON schemas.

No accounts, organizations, roles, or paid tiers exist in the implementation.

## Value proposition

- Makes prompt construction guided and repeatable.
- Collects required details before generation.
- Keeps prompt content separate from form metadata.
- Runs entirely in the browser and sends no form input to an application backend.
- Produces portable text rather than binding the user to a particular AI provider.

## High-level solution

1. The user selects one of three categories and one of 13 templates.
2. The browser fetches the template's `.md` content and adjacent `.json` schema.
3. The app renders text or textarea fields from the schema.
4. The user supplies values and selects a response language.
5. The app validates required values and substitutes placeholders locally.
6. The final prompt is previewed and can be copied to the clipboard.

## Major use cases

- Generate a prompt from a curated template.
- Search templates within the active category.
- Resume previously entered values in the same browser origin.
- Generate a prompt instructing the eventual AI response to use English, Persian, Arabic, Spanish, French, or German.
- Maintain or extend the prompt catalog without changing generator logic.

## Current scope

- Three hard-coded categories: Coding, Psychology, Decoration.
- Thirteen statically registered templates.
- `text` and `textarea` field types.
- Browser-local generation, state persistence, preview, and copying.
- Responsive light/dark interface with limited RTL behavior for generated Persian and Arabic output.

## Out of scope in the current implementation

- Calling an LLM or AI-provider API.
- User accounts, sharing, synchronization, collaboration, or server persistence.
- A database, backend, analytics, billing, administration, or content management UI.
- User-created templates through the interface.
- Import/export of saved form state.
- Full localization of the interface.

## Constraints

- Templates must use `{{placeholder}}` syntax and have matching JSON schema keys.
- Optional placeholders intended for full-line removal must be placed on their own line.
- Catalog entries are compiled into the application; adding a template requires a source change.
- Runtime styling relies on Tailwind's CDN and web fonts rely on Google Fonts.
- Prompt asset paths are absolute from the site root.

## Assumptions

- **INFERRED:** The app is intended for static hosting because it has no server runtime and Vite emits static files.
- **INFERRED:** Template authors are trusted maintainers; there is no runtime content-author role or validation boundary for untrusted catalog assets.
- **UNKNOWN:** Whether this is a production product, prototype, or internal tool.
