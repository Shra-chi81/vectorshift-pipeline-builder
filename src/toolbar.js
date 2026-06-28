// toolbar.js
// --------------------------------------------------

import { DraggableNode } from './draggableNode';
import { NODE_TYPES } from './constants/nodeTypes';
import { getNodeColor } from './constants/nodeColors';
import { getNodeIcon } from './constants/nodeIcons';
import './toolbar.css';

const TOOLBAR_ITEMS = [
  { type: NODE_TYPES.INPUT, label: 'Input', description: 'Entry point for pipeline data' },
  { type: NODE_TYPES.OUTPUT, label: 'Output', description: 'Final result of the pipeline' },
  { type: NODE_TYPES.LLM, label: 'LLM', description: 'Run a prompt through a language model' },
  { type: NODE_TYPES.TEXT, label: 'Text', description: 'Static or templated text with variables' },
  { type: NODE_TYPES.API, label: 'API', description: 'Call external APIs' },
  { type: NODE_TYPES.EMAIL, label: 'Email', description: 'Compose and send an email' },
  { type: NODE_TYPES.DATABASE, label: 'Database', description: 'Query a database' },
  { type: NODE_TYPES.FILTER, label: 'Filter', description: 'Split items into matched and rejected' },
  { type: NODE_TYPES.DELAY, label: 'Delay', description: 'Pause the pipeline for a set duration' },
];

export const PipelineToolbar = ({ theme, toggleTheme }) => {
  return (
    <div className="pipeline-toolbar">
      <div className="pipeline-toolbar__brand">VectorShift Workflow Builder</div>
      <div className="pipeline-toolbar__subtitle">Drag nodes onto the canvas to build your pipeline.</div>
      <div className="pipeline-toolbar__nodes">
        {TOOLBAR_ITEMS.map((item) => (
          <DraggableNode
            key={item.type}
            type={item.type}
            label={item.label}
            description={item.description}
            color={getNodeColor(item.type)}
            Icon={getNodeIcon(item.type)}
          />
        ))}
        <button
          type="button"
          className="pipeline-toolbar__theme-toggle"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </div>
  );
};