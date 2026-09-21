import type { Category } from '../types';

const prompt = (category: string, id: string) => ({
  templatePath: `/prompts/${category}/${id}.md`,
  schemaPath: `/prompts/${category}/${id}.json`,
});

export const categories: Category[] = [
  {
    id: 'coding',
    title: 'Coding',
    description: 'Ship cleaner, safer software',
    icon: 'code',
    color: 'blue',
    templates: [
      {
        id: 'debug',
        title: 'Debug an issue',
        description: 'Trace a bug and propose a reliable fix.',
        tags: ['Debugging', 'Analysis'],
        ...prompt('coding', 'debug'),
      },
      {
        id: 'add-feature',
        title: 'Add a feature',
        description: 'Plan and implement a focused product change.',
        tags: ['Feature', 'Planning'],
        ...prompt('coding', 'add-feature'),
      },
      {
        id: 'generate-tests',
        title: 'Generate tests',
        description: 'Create meaningful coverage for existing code.',
        tags: ['Testing', 'Quality'],
        ...prompt('coding', 'generate-tests'),
      },
      {
        id: 'refactor',
        title: 'Audit and refactor codebase',
        description: 'Audit and improve the current codebase end to end.',
        tags: ['Refactor', 'Audit', 'Security', 'Performance'],
        ...prompt('coding', 'refactor'),
      },
      {
        id: 'generate-docs',
        title: 'Generate project docs',
        description: 'Document an existing codebase as a reliable knowledge base.',
        tags: ['Docs', 'Architecture', 'Knowledge base'],
        ...prompt('coding', 'generate-docs'),
      },
    ],
  },
  {
    id: 'psychology',
    title: 'Psychology',
    description: 'Reflect with structure and care',
    icon: 'mind',
    color: 'violet',
    templates: [
      {
        id: 'thought-reframe',
        title: 'Reframe a thought',
        description: 'Examine an unhelpful thought with balance.',
        tags: ['Reflection', 'CBT-inspired'],
        ...prompt('psychology', 'thought-reframe'),
      },
      {
        id: 'decision-clarity',
        title: 'Find decision clarity',
        description: 'Compare options against what matters to you.',
        tags: ['Decisions', 'Values'],
        ...prompt('psychology', 'decision-clarity'),
      },
      {
        id: 'habit-builder',
        title: 'Build a habit',
        description: 'Turn an intention into a sustainable routine.',
        tags: ['Habits', 'Action plan'],
        ...prompt('psychology', 'habit-builder'),
      },
      {
        id: 'difficult-conversation',
        title: 'Prepare a conversation',
        description: 'Plan a calm, honest, boundaried discussion.',
        tags: ['Communication', 'Boundaries'],
        ...prompt('psychology', 'difficult-conversation'),
      },
    ],
  },
  {
    id: 'decoration',
    title: 'Decoration',
    description: 'Shape spaces that feel like home',
    icon: 'home',
    color: 'amber',
    templates: [
      {
        id: 'room-makeover',
        title: 'Plan a room makeover',
        description: 'Create a cohesive redesign within budget.',
        tags: ['Interior', 'Planning'],
        ...prompt('decoration', 'room-makeover'),
      },
      {
        id: 'color-palette',
        title: 'Create a color palette',
        description: 'Build a practical palette around a mood.',
        tags: ['Color', 'Mood'],
        ...prompt('decoration', 'color-palette'),
      },
      {
        id: 'small-space',
        title: 'Optimize a small space',
        description: 'Make a compact room work harder.',
        tags: ['Layout', 'Storage'],
        ...prompt('decoration', 'small-space'),
      },
      {
        id: 'lighting-plan',
        title: 'Design a lighting plan',
        description: 'Layer useful and atmospheric lighting.',
        tags: ['Lighting', 'Ambience'],
        ...prompt('decoration', 'lighting-plan'),
      },
    ],
  },
];
