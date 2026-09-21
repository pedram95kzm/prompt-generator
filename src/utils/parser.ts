import type { PlaceholderSchema } from '../types';

const PLACEHOLDER_PATTERN = /\{\{\s*([a-zA-Z][\w-]*)\s*\}\}/g;

export function parsePlaceholders(template: string): string[] {
  const placeholders = new Set<string>();

  for (const match of template.matchAll(PLACEHOLDER_PATTERN)) {
    placeholders.add(match[1]);
  }

  return [...placeholders];
}

export function validateSchema(template: string, schema: PlaceholderSchema): string[] {
  const placeholders = parsePlaceholders(template).filter((key) => key !== 'language');
  const schemaKeys = Object.keys(schema);
  const missing = placeholders.filter((key) => !(key in schema));
  const unused = schemaKeys.filter((key) => !placeholders.includes(key));

  return [
    ...missing.map((key) => `Missing schema entry for "${key}".`),
    ...unused.map((key) => `Schema entry "${key}" is not used by the template.`),
  ];
}
