# External integrations and dependencies

Status: **Current**  
Last verified: **2026-09-19**

Prompt Studio has no business-service, AI-provider, authentication, payment, analytics, or storage integration. It has the runtime resource dependencies below.

## Same-origin prompt assets

| Item | Detail |
| --- | --- |
| Purpose | Supply prompt text and dynamic-form schemas. |
| Protocol | Browser HTTP(S) `GET` through `fetch()`. |
| Authentication | None. |
| Data sent | Asset path and ordinary browser request metadata; user input is not part of these requests. |
| Data received | Markdown text and JSON schema. |
| Failure behavior | Visible load-error state with manual retry. |
| Configuration | Paths compiled from `src/data/catalog.ts`. |
| Rate limits | Not applicable/unknown for the chosen static host. |

## Tailwind browser CDN

| Item | Detail |
| --- | --- |
| URL | `https://cdn.tailwindcss.com/3.4.17` |
| Purpose | Generate Tailwind utility styles in the browser at runtime. |
| Authentication | None. |
| Data exchanged | Browser requests the script; ordinary request metadata is exposed to the provider. |
| Failure behavior | Most utility-driven layout and appearance is missing; custom CSS alone remains. |
| Configuration | Inline `tailwind.config` in `index.html`. |
| Security | Third-party script executes with page privileges; no SRI/CSP is configured. |
| Rate limits/SLA | **UNKNOWN.** |

## Google Fonts

| Item | Detail |
| --- | --- |
| Entry URL | `https://fonts.googleapis.com/css2?...` from `src/style.css`. |
| Purpose | Inter, JetBrains Mono, and Vazirmatn typography. |
| Authentication | None. |
| Data exchanged | Browser requests CSS and font resources; ordinary request metadata is exposed. |
| Failure behavior | Browser uses declared system/sans-serif/monospace fallbacks. |
| Rate limits/SLA | **UNKNOWN.** |

## Clipboard

The system clipboard is a browser/platform capability rather than a remote service.

- Primary API: `navigator.clipboard.writeText()`.
- Fallback: hidden textarea and `document.execCommand('copy')`.
- Permission and secure-context rules are browser-controlled.
- Only the generated prompt is written and only after the user selects Copy.

## Explicitly absent integrations

- No OpenAI or other LLM API.
- No analytics or error-reporting provider.
- No user identity provider.
- No cloud/database service.
- No email, messaging, payment, or file-storage service.
