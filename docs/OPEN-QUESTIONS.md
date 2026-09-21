# Open questions

Status: **Current**  
Last verified: **2026-09-19**

No question blocks running or building the current application. The questions matter for production ownership, future changes, or risk acceptance.

## Blocking

**None for the current documented behavior.**

Questions would become blocking before a formal production launch if ownership, hosting, privacy obligations, and browser support are not already decided outside this repository.

## Non-blocking

| ID | Question | Why it matters | Current evidence/assumption |
| --- | --- | --- | --- |
| Q-001 | Is this a production product, internal tool, or prototype? | Determines assurance, support, and operational expectations. | **UNKNOWN.** |
| Q-002 | Which browsers and accessibility standard must be supported? | Current code uses modern browser APIs and has accessibility affordances but no conformance test. | **UNKNOWN.** |
| Q-003 | Which static host, domain, and URL base are intended? | Current prompt URLs require origin-root hosting. | **UNKNOWN; inferred static hosting.** |
| Q-004 | What privacy policy governs stored code and personal psychology inputs? | Values persist automatically in clear-text browser storage. | **UNKNOWN.** |
| Q-005 | Should users receive a global warning or data-clear control? | Current reset is per template and psychology content may be sensitive. | **UNKNOWN; no implementation exists.** |
| Q-006 | Who owns and reviews prompt wording/schema changes? | Content accuracy and safety are product behavior. | **UNKNOWN.** |
| Q-007 | Are external Tailwind and Google Fonts dependencies acceptable for production/privacy/CSP? | They are runtime availability and trust dependencies. | Current implementation accepts them; approval rationale is **UNKNOWN**. |
| Q-008 | Is search intentionally category-scoped? | Users may expect global search. | Verified current behavior; product intent **UNKNOWN**. |
| Q-009 | Is the header template total intentionally hard-coded? | It can drift from catalog size. | Verified current implementation; intent **UNKNOWN**. |
| Q-010 | Should generated output be persisted or history maintained? | Current output is transient while inputs persist. | Verified current behavior; future intent **UNKNOWN**. |
| Q-011 | What automated test/CI standard is expected? | No test runner or CI exists. | **UNKNOWN.** |
| Q-012 | Should schema and stored-state shapes receive runtime validation? | Current TypeScript casts do not protect runtime JSON/storage. | Not implemented; risk acceptance **UNKNOWN**. |
| Q-013 | What availability, performance, or support targets apply? | None can be validated without defined targets. | **UNKNOWN.** |
| Q-014 | Why were vanilla TS, runtime Tailwind, and `localStorage` selected historically? | Helps future maintainers judge whether alternatives violate intent. | Historical rationale **UNKNOWN**. |

## Resolved documentation ambiguity

- Documentation directory: the supplied documentation specification briefly named `ai-docs/` but consistently defined all required files under `docs/`. This documentation uses `docs/`.
- Prompt format: runtime templates were explicitly converted from `.txt` to `.md` on 2026-09-19; catalog and root README references were updated accordingly.
