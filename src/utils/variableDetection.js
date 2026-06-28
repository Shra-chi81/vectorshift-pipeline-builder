// utils/variableDetection.js
// --------------------------------------------------
// Detects {{variable}} references inside a block of text and turns
// them into a deduped list of valid handle ids, following the same
// rules JavaScript uses for identifier names.

const VARIABLE_PATTERN = /\{\{\s*([^}]*?)\s*\}\}/g;
const VALID_IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export const isValidVariableName = (name) => VALID_IDENTIFIER.test(name);

export const extractVariables = (text) => {
  if (!text) return [];

  const seen = new Set();
  const result = [];
  let match;

  VARIABLE_PATTERN.lastIndex = 0;

  while ((match = VARIABLE_PATTERN.exec(text)) !== null) {
    const name = match[1];
    if (isValidVariableName(name) && !seen.has(name)) {
      seen.add(name);
      result.push(name);
    }
  }

  return result;
};