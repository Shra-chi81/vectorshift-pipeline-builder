// constants/nodeTypes.js
// --------------------------------------------------
// Canonical node type keys. Every place in the app that needs to
// refer to a node type (toolbar, ui.js nodeTypes map, color/icon
// lookups) should import from here instead of writing a string
// literal, so a typo becomes a build-time/lint error instead of a
// silent runtime mismatch.

export const NODE_TYPES = {
  INPUT: 'customInput',
  OUTPUT: 'customOutput',
  LLM: 'llm',
  TEXT: 'text',
  API: 'api',
  EMAIL: 'email',
  DATABASE: 'database',
  FILTER: 'filter',
  DELAY: 'delay',
};