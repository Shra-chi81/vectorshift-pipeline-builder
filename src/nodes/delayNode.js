// nodes/delayNode.js
// --------------------------------------------------

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

export const DelayNode = ({ id, data }) => {
  const [seconds, setSeconds] = useState(data?.seconds ?? 1);

  return (
    <BaseNode
      id={id}
      title="Delay"
      nodeType={NODE_TYPES.DELAY}
      inputHandles={[{ id: 'in' }]}
      outputHandles={[{ id: 'out' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Seconds</label>
        <input
          className="base-node__input"
          type="number"
          min="0"
          step="0.1"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};