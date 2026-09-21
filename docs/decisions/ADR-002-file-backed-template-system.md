# ADR-002: Markdown prompts with adjacent JSON schemas

Status: **Accepted by current implementation**  
Last verified: **2026-09-19**

## Context

Different prompt workflows require different wording, placeholders, labels, field types, and required/optional rules.

## Problem

Represent prompt content and form metadata without implementing separate UI logic for every template.

## Decision

Each registered template uses:

```text
public/prompts/<category>/<id>.md
public/prompts/<category>/<id>.json
```

The Markdown file contains plain text and `{{key}}` placeholders. The JSON object maps those keys to field metadata. `src/data/catalog.ts` explicitly registers display metadata and paths. Runtime loading rejects key mismatches.

## Alternatives

Historical alternatives considered are **UNKNOWN**. Embedding strings in TypeScript, using one combined JSON/YAML format, build-time raw imports, or remote content management are not evidenced as past options.

## Reasoning

Historical rationale is **unknown**. The current split visibly separates long prompt wording from typed form metadata and lets one renderer support all templates.

## Consequences

- Prompt content can change independently of generator/UI logic.
- Authors must keep two files plus one catalog entry synchronized.
- Asset loading can fail at runtime.
- Markdown is not rendered; it is simply a convenient text format.
- Optional-line behavior imposes an authoring convention.
- New field types or richer validation require code and type changes.
