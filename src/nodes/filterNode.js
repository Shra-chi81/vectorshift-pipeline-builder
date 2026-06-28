// nodes/filterNode.js
// --------------------------------------------------

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

const CONDITION_TYPES = ['Equals', 'Not Equals', 'Greater Than', 'Less Than', 'Contains'];

export const FilterNode = ({ id, data }) => {
  const [conditionType, setConditionType] = useState(data?.conditionType || CONDITION_TYPES[0]);
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      nodeType={NODE_TYPES.FILTER}
      inputHandles={[{ id: 'items', label: 'items' }]}
      outputHandles={[
        { id: 'matched', label: 'matched' },
        { id: 'rejected', label: 'rejected' },
      ]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Condition Type</label>
        <select
          className="base-node__select"
          value={conditionType}
          onChange={(e) => setConditionType(e.target.value)}
        >
          {CONDITION_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Value</label>
        <input
          className="base-node__input"
          type="text"
          placeholder="0"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <p className="base-node__description">
        Items that match go to <strong>matched</strong>, the rest go to <strong>rejected</strong>.
      </p>
    </BaseNode>
  );
};