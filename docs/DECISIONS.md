# Decision register

Status: **Observed decisions**  
Last verified: **2026-09-19**

This register documents decisions evident in the repository. It does not claim that the original authors formally recorded or approved them. Where historical rationale is absent, it is stated as unknown.

| ID | Observed decision | Evidence | Historical rationale | Consequences | Status |
| --- | --- | --- | --- | --- | --- |
| D-001 | Run as a client-only static browser application. | No server code/dependencies; Vite build; browser APIs in `src/main.ts`. | Unknown. The deterministic client-side task makes the choice technically coherent. | Simple static deployment and no server data transfer; browser/CDN/storage constraints apply. | Active; see ADR-001. |
| D-002 | Use vanilla TypeScript rather than a component framework. | Direct DOM creation/event listeners; no framework dependency. | Unknown. | Small dependency surface; `main.ts` holds substantial UI responsibility. | Active. |
| D-003 | Store prompt bodies as Markdown files and form metadata as adjacent JSON. | `public/prompts/`, catalog path helper, loader. | Unknown. Separation of content and presentation metadata is inferable, not historically verified. | Content is independently editable; each template requires two synchronized assets and a catalog entry. | Active; see ADR-002. |
| D-004 | Use `{{key}}` placeholders with strict key parity. | `src/utils/parser.ts`, `src/utils/loader.ts`. | Unknown. | Misconfigured templates fail visibly; syntax and key grammar are constrained. | Active. |
| D-005 | Remove an entire line for an empty optional value. | `src/utils/generator.ts`; root README authoring guidance. | Unknown. | Produces clean output when convention is followed; mixed-content lines can be removed unexpectedly. | Active. |
| D-006 | Append response-language instruction globally. | `generatePrompt()`; language UI. | Unknown. | Every generated prompt receives consistent language guidance; templates should not duplicate it. | Active. |
| D-007 | Persist selections and all template inputs in browser `localStorage`. | `StoredState`, `readStoredState()`, `persist()`. | Unknown. | Convenient resume behavior without backend; privacy, quota, and same-origin script risks. | Active; see ADR-003. |
| D-008 | Load templates lazily and cache them in memory by template ID. | `src/utils/loader.ts`. | Unknown. | Avoids repeat page-session fetches; IDs must remain globally unique to avoid collisions. | Active. |
| D-009 | Load Tailwind CSS from its browser CDN and fonts from Google Fonts. | `index.html`, `src/style.css`. | Root README says Tailwind CDN was requested; broader historical reasoning unknown. | Fast setup; runtime availability, privacy, CSP, and supply-chain dependencies. | Active. |
| D-010 | Keep the catalog and language list as compiled source configuration. | `src/data/catalog.ts`, `src/main.ts`. | Unknown. | Simple and typed; content addition requires source edit/build and some duplicate counts/config. | Active. |
| D-011 | Use no database, API, authentication, or application backend. | Complete repository audit. | Unknown; consistent with local deterministic generation. | No shared state or server operations; no sync, accounts, history, or AI execution. | Active. |

## Decision authority and approval

Historical approvers and dates are **UNKNOWN**. These entries describe current implementation constraints, not new recommendations or proof of formal product approval.
