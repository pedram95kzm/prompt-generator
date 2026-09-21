import type { LoadedTemplate, PlaceholderSchema, Template } from '../types';
import { validateSchema } from './parser';

const cache = new Map<string, LoadedTemplate>();

async function fetchOrThrow(url: string): Promise<Response> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Could not load ${url} (${response.status}).`);
  }
  return response;
}

export async function loadTemplate(template: Template): Promise<LoadedTemplate> {
  const cached = cache.get(template.id);
  if (cached) return cached;

  const [templateResponse, schemaResponse] = await Promise.all([
    fetchOrThrow(template.templatePath),
    fetchOrThrow(template.schemaPath),
  ]);

  const loaded: LoadedTemplate = {
    content: await templateResponse.text(),
    schema: (await schemaResponse.json()) as PlaceholderSchema,
  };
  const schemaErrors = validateSchema(loaded.content, loaded.schema);

  if (schemaErrors.length) {
    throw new Error(`Invalid template configuration: ${schemaErrors.join(' ')}`);
  }

  cache.set(template.id, loaded);
  return loaded;
}
