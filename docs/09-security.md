# Security and privacy

Status: **Current-state assessment, not a security certification**  
Last verified: **2026-09-19**

## Security boundary

Prompt Studio is a public static browser application. It has no accounts, authentication, authorization, roles, sessions, tokens, server-side secrets, application API, or database.

The effective trust boundaries are:

1. First-party JavaScript and same-origin prompt/schema assets.
2. Third-party Tailwind CDN JavaScript and Google Fonts resources.
3. Browser storage containing user-entered data.
4. Clipboard access initiated by the user.

## Current controls

| Area | Current implementation |
| --- | --- |
| Input validation | Required fields are checked for non-whitespace content. This is product validation, not a general security validator. |
| Output rendering | Generated prompt text is assigned with `textContent`, preventing user input from becoming preview HTML. Form values use the DOM `value` property. |
| Static schema consistency | Placeholder and schema key sets are compared before a form is rendered. |
| Clipboard | Primary Clipboard API call is user-triggered; a legacy textarea fallback is attempted. |
| Secrets | No secrets or environment credentials are present or required. |
| Transport | Not controlled by the repository. Production should be served over HTTPS for integrity and Clipboard API compatibility. |
| Dependency locking | npm lockfile v3 records build dependency versions. |

A point-in-time `npm audit` against the HTTPS npm registry on 2026-09-19 reported zero known vulnerabilities across the locked dependency graph. This is not a continuous guarantee; no audit is configured in CI.

## Sensitive data behavior

Users may paste proprietary code, error logs, personal reflections, relationship details, or home information. The application does not send those values to an application backend, but it does store them in clear text under the browser origin's `localStorage` key `prompt-studio-state-v1`.

Implications:

- Values persist across restarts until reset, browser-site data deletion, storage eviction, or manual developer-tools removal.
- Reset clears only the active template; other template values remain.
- Any JavaScript executing on the same origin can read the data.
- Generated output is not persisted separately, but the values used to create it usually are.
- Shared-browser and shared-origin deployments require particular caution.

## External supply-chain surface

- `https://cdn.tailwindcss.com/3.4.17` executes third-party JavaScript at runtime.
- Google Fonts CSS and font files are requested at runtime from Google infrastructure.
- No Subresource Integrity attribute or Content Security Policy is configured in `index.html`.
- npm dependencies are development/build dependencies, but their install scripts and build execution remain a supply-chain boundary.

## DOM/XSS assessment

- User-supplied field values are previewed with `textContent`, which is the important safe behavior.
- Catalog titles/descriptions and schema labels/descriptions are trusted repository content.
- Several trusted strings and load-error text are interpolated into `innerHTML`. The load error is built from configured paths, status codes, or schema keys.
- If future work allows untrusted users to author catalog/schema content, the current rendering model must not be treated as safe without sanitization or conversion to DOM text APIs.

## Applicability matrix

| Control | Status | Reason |
| --- | --- | --- |
| Authentication/authorization | Not applicable | No restricted functionality or identities exist. |
| CSRF | Not applicable to current app | No state-changing server requests exist. |
| CORS policy | Host responsibility | App only requests same-origin prompt assets. |
| Rate limiting | Not applicable | No application service or API exists. |
| Encryption at rest | Not implemented | Browser `localStorage` is unencrypted application storage. |
| Security headers | Not configured in repository | Must be set by the static host; runtime Tailwind complicates a strict CSP. |
| Audit logging | Not implemented | No logging or backend exists. |

## Known security and safety concerns

1. **Local privacy:** Potentially sensitive content is retained automatically with no global clear-data action.
2. **Runtime third-party script:** Tailwind CDN JavaScript is trusted and can access the page and same-origin storage.
3. **No repository-defined security headers:** CSP, HSTS, frame restrictions, MIME sniffing protection, and referrer policy depend on hosting configuration.
4. **Trusted-content assumption:** JSON is cast to a schema type without runtime structural validation and some metadata is inserted through `innerHTML`.
5. **Psychology content:** The product includes reflection prompts but no application-level statement distinguishing the tool from professional mental-health care or emergency support.
6. **No continuous security checks:** No dependency audit, SAST, secret scan, or CI security job is configured, despite the point-in-time audit noted above.

## Potential improvements (not implemented)

- Provide explicit per-template and global stored-data deletion controls and a privacy notice.
- Bundle Tailwind/CSS and fonts locally or define an explicit third-party trust policy.
- Add host-level HTTPS and security-header guidance for the selected deployment platform.
- Validate schema shape at runtime and avoid `innerHTML` for data-derived text.
- Add automated dependency/security scanning.

These are recommendations only; they are not current behavior.
