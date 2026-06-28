// // llmNode.js

// import { Handle, Position } from 'reactflow';

// export const LLMNode = ({ id, data }) => {

//   return (
//     <div style={{width: 200, height: 80, border: '1px solid black'}}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-system`}
//         style={{top: `${100/3}%`}}
//       />
//       <Handle
//         type="target"
//         position={Position.Left}
//         id={`${id}-prompt`}
//         style={{top: `${200/3}%`}}
//       />
//       <div>
//         <span>LLM</span>
//       </div>
//       <div>
//         <span>This is a LLM.</span>
//       </div>
//       <Handle
//         type="source"
//         position={Position.Right}
//         id={`${id}-response`}
//       />
//     </div>
//   );
// }


// nodes/llmNode.js
// --------------------------------------------------
// Thin wrapper around BaseNode. Two input handles (system, prompt)
// and one output handle (response), plus realistic model-config
// fields (Model, Temperature, Max Tokens) — these are the inputs an
// actual LLM call needs, and they double as a demonstration that
// BaseNode's content slot can hold any mix of form controls a node
// requires without BaseNode itself knowing anything about LLMs.

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

const MODEL_OPTIONS = [
  'gpt-4o',
  'gpt-4o-mini',
  'claude-sonnet-4-6',
  'claude-haiku-4-5',
];

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || MODEL_OPTIONS[0]);
  const [temperature, setTemperature] = useState(data?.temperature ?? 0.7);
  const [maxTokens, setMaxTokens] = useState(data?.maxTokens ?? 1024);

  return (
    <BaseNode
      id={id}
      title="LLM"
      nodeType={NODE_TYPES.LLM}
      inputHandles={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputHandles={[{ id: 'response' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Model</label>
        <select
          className="base-node__select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          {MODEL_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Temperature</label>
        <input
          className="base-node__input"
          type="number"
          min="0"
          max="2"
          step="0.1"
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
        />
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Max Tokens</label>
        <input
          className="base-node__input"
          type="number"
          min="1"
          step="1"
          value={maxTokens}
          onChange={(e) => setMaxTokens(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};