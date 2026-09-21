# Prompt Studio documentation

Status: **Current**  
Last verified: **2026-09-19**

This directory is the current-state knowledge base for Prompt Studio. Source code and configuration remain authoritative if a future change makes a document stale.

## Documentation map

| Document | Purpose | Audience | Status |
| --- | --- | --- | --- |
| [01-idea.md](01-idea.md) | Observed product purpose, users, scope, and constraints | Everyone | Complete |
| [02-requirements.md](02-requirements.md) | Reconstructed functional and non-functional requirements | Product, engineering | Complete |
| [03-prd.md](03-prd.md) | Current-state product requirements and journeys | Product, engineering | Complete |
| [04-features.md](04-features.md) | Feature behavior, failure cases, and source locations | Product, QA, engineering | Complete |
| [05-architecture.md](05-architecture.md) | System boundaries, components, runtime, and concerns | Engineering, AI agents | Complete |
| [06-technical-design.md](06-technical-design.md) | Module-level implementation design | Engineering, AI agents | Complete |
| [09-security.md](09-security.md) | Security boundary, local data, dependencies, and risks | Engineering, security | Complete |
| [10-testing-strategy.md](10-testing-strategy.md) | Current validation facilities and testing gaps | Engineering, QA | Complete |
| [11-deployment.md](11-deployment.md) | Verified build output and static-hosting requirements | Engineering, operations | Complete |
| [13-troubleshooting.md](13-troubleshooting.md) | Reproducible setup, build, asset, and browser issues | Engineering, support | Complete |
| [14-developer-guide.md](14-developer-guide.md) | Contributor setup and safe change workflow | Developers, AI agents | Complete |
| [15-user-guide.md](15-user-guide.md) | End-user workflows, shortcuts, privacy, and limitations | End users | Complete |
| [16-integrations.md](16-integrations.md) | Runtime CDN and same-origin asset dependencies | Engineering, operations | Complete |
| [17-configuration.md](17-configuration.md) | Config files, defaults, hard-coded options, and absence of environment variables | Engineering | Complete |
| [18-data-flow.md](18-data-flow.md) | Template loading, generation, persistence, and clipboard flows | Engineering, AI agents | Complete |
| [19-glossary.md](19-glossary.md) | Product and implementation terminology | Everyone, AI agents | Complete |
| [DECISIONS.md](DECISIONS.md) | Observed architectural and technical decisions | Engineering, AI agents | Complete |
| [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) | Information not recoverable from the repository | Product, engineering | Complete |
| [AI-CONTEXT.md](AI-CONTEXT.md) | Compact continuation guide for future AI agents | AI agents | Complete |
| [decisions/ADR-001-static-browser-application.md](decisions/ADR-001-static-browser-application.md) | Client-only runtime decision | Engineering | Complete |
| [decisions/ADR-002-file-backed-template-system.md](decisions/ADR-002-file-backed-template-system.md) | Markdown template and JSON schema decision | Engineering | Complete |
| [decisions/ADR-003-browser-local-persistence.md](decisions/ADR-003-browser-local-persistence.md) | Browser-local persistence decision | Engineering | Complete |

## Intentionally not applicable

| Expected topic | Status | Reason |
| --- | --- | --- |
| `07-database-design.md` | **NOT APPLICABLE** | The application has no database, models, migrations, repositories, or server persistence. Browser `localStorage` is covered in architecture and data flow. |
| `08-api-design.md` / OpenAPI | **NOT APPLICABLE** | The application exposes and consumes no application API. Its `fetch()` calls retrieve static, same-origin `.md` and `.json` assets. |
| `12-operations.md` | **NOT APPLICABLE** | There is no application server, job runner, scheduler, queue, health endpoint, logging pipeline, backup process, or monitoring configuration in the repository. Static-host operations are provider-specific and unknown. |

## Evidence hierarchy

This documentation applies the following precedence when sources disagree:

1. `src/` and `public/`
2. Build and TypeScript configuration
3. Validation results
4. Root `README.md`

The documentation audit found one stale root README claim about an original `/prompts` directory. The directory does not exist in the audited repository; the README was corrected during this documentation update.

## Documentation audit summary

| Audited item | Finding | Action |
| --- | --- | --- |
| Root `README.md` | Setup, scripts, feature list, and template authoring guidance matched the implementation after the `.md` conversion. Its project tree and final note referenced a nonexistent root `/prompts` directory. | Retained and corrected; added links to this knowledge base. |
| Existing `docs/` or `ai-docs/` | Neither directory existed. | Created the smallest relevant current-state set listed above. |
| Database/API/operations docs | No corresponding application components exist. | Marked not applicable instead of creating empty documents. |
| Source/configuration coverage | UI, catalog, type contracts, parser, generator, loader, styles, public assets, dependency manifests, TypeScript config, and build output were inspected. | Reflected across architecture, technical design, configuration, and data-flow docs. |
| Test/deployment/infrastructure docs | No tests, CI/CD, containers, deployment provider, or infrastructure configuration existed. | Documented verified commands and unknowns without inventing infrastructure. |

No pre-existing documentation was duplicated or replaced.
