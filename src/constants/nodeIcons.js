// constants/nodeIcons.js
// --------------------------------------------------
// One small inline-SVG icon component per node type. Kept dependency
// free (no icon package) since each icon is a single simple glyph.

const iconProps = {
  width: 14,
  height: 14,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const InputIcon = () => (
  <svg {...iconProps}><path d="M5 12h11M12 5l7 7-7 7" /></svg>
);

const OutputIcon = () => (
  <svg {...iconProps}><path d="M19 12H8M11 5l-7 7 7 7" /></svg>
);

const LLMIcon = () => (
  <svg {...iconProps}><path d="M12 2a4 4 0 0 1 4 4v1.17a4 4 0 0 1 1.41 7.32A4 4 0 0 1 14 21h-4a4 4 0 0 1-3.41-6.51A4 4 0 0 1 8 7.17V6a4 4 0 0 1 4-4z" /><path d="M9 13h.01M15 13h.01" /></svg>
);

const TextIcon = () => (
  <svg {...iconProps}><path d="M4 6h16M4 12h10M4 18h16" /></svg>
);

const ApiIcon = () => (
  <svg {...iconProps}><path d="M5 12a7 7 0 0 1 7-7M19 12a7 7 0 0 1-7 7" /><circle cx="5" cy="12" r="2" /><circle cx="19" cy="12" r="2" /></svg>
);

const EmailIcon = () => (
  <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);

const DatabaseIcon = () => (
  <svg {...iconProps}><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" /><path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg>
);

const FilterIcon = () => (
  <svg {...iconProps}><path d="M4 5h16l-6 8v5l-4 2v-7L4 5z" /></svg>
);

const DelayIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2M9 2h6" /></svg>
);

const DefaultIcon = () => (
  <svg {...iconProps}><circle cx="12" cy="12" r="3" /></svg>
);

export const NODE_ICONS = {
  customInput: InputIcon,
  customOutput: OutputIcon,
  llm: LLMIcon,
  text: TextIcon,
  api: ApiIcon,
  email: EmailIcon,
  database: DatabaseIcon,
  filter: FilterIcon,
  delay: DelayIcon,
};

export const getNodeIcon = (nodeType) => NODE_ICONS[nodeType] || DefaultIcon;