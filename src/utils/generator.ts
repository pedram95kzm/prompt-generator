import type { GenerateResult, PlaceholderSchema, UserInput, ValidationErrors } from '../types';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function validateInputs(schema: PlaceholderSchema, inputs: UserInput): ValidationErrors {
  return Object.fromEntries(
    Object.entries(schema)
      .filter(([key, field]) => field.required && !inputs[key]?.trim())
      .map(([key, field]) => [key, `${field.label} is required.`]),
  );
}

export function generatePrompt(
  template: string,
  schema: PlaceholderSchema,
  inputs: UserInput,
  language: string,
): GenerateResult {
  const errors = validateInputs(schema, inputs);

  if (Object.keys(errors).length > 0) {
    return { prompt: '', errors };
  }

  let output = template.replace(/\r\n/g, '\n');

  for (const [key, field] of Object.entries(schema)) {
    const value = inputs[key]?.trim() ?? '';
    const token = `\\{\\{\\s*${escapeRegExp(key)}\\s*\\}\\}`;

    if (!field.required && !value) {
      const optionalLine = new RegExp(`^[^\\n]*${token}[^\\n]*(?:\\n|$)`, 'gm');
      output = output.replace(optionalLine, '');
    }

    output = output.replace(new RegExp(token, 'g'), value);
  }

  output = output
    .replace(/\{\{\s*language\s*\}\}/g, language)
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return {
    prompt: `${output}\n\nSpeak to me in ${language}.`,
    errors: {},
  };
}
