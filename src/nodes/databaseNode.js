// nodes/databaseNode.js


import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

const OPERATIONS = ['SELECT', 'INSERT', 'UPDATE', 'DELETE'];

export const DatabaseNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || OPERATIONS[0]);
  const [query, setQuery] = useState(data?.query || '');

  return (
    <BaseNode
      id={id}
      title="Database"
      nodeType={NODE_TYPES.DATABASE}
      inputHandles={[{ id: 'params', label: 'params' }]}
      outputHandles={[{ id: 'rows', label: 'rows' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Operation</label>
        <select
          className="base-node__select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          {OPERATIONS.map((op) => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Query</label>
        <textarea
          className="base-node__textarea"
          placeholder="SELECT * FROM users"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};