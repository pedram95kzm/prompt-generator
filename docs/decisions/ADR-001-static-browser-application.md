# ADR-001: Static browser-only application

Status: **Accepted by current implementation**  
Last verified: **2026-09-19**

## Context

The product selects static prompt content, collects strings, performs deterministic substitution, and lets the user copy the result. The repository contains a Vite browser application and no backend code.

## Problem

Define where prompt loading, input handling, generation, and persistence execute.

## Decision

All application behavior executes in the browser. Deployable output is a static `dist/` directory. State is page-local or browser-local; there is no application server or database.

## Alternatives

Historical alternatives considered are **UNKNOWN**. Plausible server-rendered, backend API, or desktop alternatives must not be presented as historically evaluated.

## Reasoning

Historical rationale is **unknown**. The current task is deterministic and needs no shared state, so the observed design is internally consistent; that is an architectural inference, not evidence of the original decision process.

## Consequences

- Static hosting is sufficient.
- User form values are not submitted to an application server.
- Accounts, cross-device sync, shared history, server-side controls, and AI execution do not exist.
- Browser compatibility, local storage, clipboard policy, same-origin assets, and runtime CDNs become core constraints.
- Hosting configuration owns transport, headers, availability, and observability.
