// constants/nodeColors.js
// --------------------------------------------------
// Single source of truth for the node color theme. BaseNode reads
// from this map using a node's type, so every node automatically
// gets a themed accent without any node file hardcoding a hex value.

import { NODE_TYPES } from './nodeTypes';

export const NODE_COLORS = {
  [NODE_TYPES.INPUT]:    { accent: '#34D399', accentSoft: 'rgba(52, 211, 153, 0.14)' },
  [NODE_TYPES.OUTPUT]:   { accent: '#F87171', accentSoft: 'rgba(248, 113, 113, 0.14)' },
  [NODE_TYPES.LLM]:      { accent: '#A78BFA', accentSoft: 'rgba(167, 139, 250, 0.14)' },
  [NODE_TYPES.TEXT]:     { accent: '#60A5FA', accentSoft: 'rgba(96, 165, 250, 0.14)' },
  [NODE_TYPES.API]:      { accent: '#3B82F6', accentSoft: 'rgba(59, 130, 246, 0.14)' },
  [NODE_TYPES.DATABASE]: { accent: '#FB923C', accentSoft: 'rgba(251, 146, 60, 0.14)' },
  [NODE_TYPES.DELAY]:    { accent: '#FBBF24', accentSoft: 'rgba(251, 191, 36, 0.14)' },
  [NODE_TYPES.FILTER]:   { accent: '#22D3EE', accentSoft: 'rgba(34, 211, 238, 0.14)' },
  [NODE_TYPES.EMAIL]:    { accent: '#F472B6', accentSoft: 'rgba(244, 114, 182, 0.14)' },
};

export const DEFAULT_NODE_COLOR = { accent: '#94A3B8', accentSoft: 'rgba(148, 163, 184, 0.14)' };

export const getNodeColor = (nodeType) => NODE_COLORS[nodeType] || DEFAULT_NODE_COLOR;