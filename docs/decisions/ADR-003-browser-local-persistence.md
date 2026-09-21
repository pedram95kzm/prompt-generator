# ADR-003: Browser-local persistence

Status: **Accepted by current implementation**  
Last verified: **2026-09-19**

## Context

Users may move between templates or return to the app and expect entered values and preferences to remain available. No backend exists.

## Problem

Persist workflow state without an account or server datastore.

## Decision

Serialize category ID, template ID, language, theme, and all per-template user inputs to `localStorage` under `prompt-studio-state-v1`.

Generated output, errors, search query, and fetched-asset cache remain transient.

## Alternatives

Historical alternatives considered are **UNKNOWN**. Session storage, IndexedDB, URL state, downloads, or server persistence are not evidenced as past evaluations.

## Reasoning

Historical rationale is **unknown**. `localStorage` provides simple same-browser persistence consistent with a serverless architecture.

## Consequences

- No login, backend, or network synchronization is needed.
- Inputs survive reload and template switching.
- Data is origin-local, synchronous, unencrypted, and readable by same-origin scripts.
- Sensitive code or personal reflections may persist unexpectedly.
- Reset only clears one template; browser settings are needed to clear everything.
- Corrupt JSON is handled, but object shape, quota failures, and migrations are not.
