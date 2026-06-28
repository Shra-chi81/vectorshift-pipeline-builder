// nodes/apiNode.js
// --------------------------------------------------

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

const METHODS_WITH_BODY = ['POST', 'PUT'];

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const [body, setBody] = useState(data?.body || '');

  const showBody = METHODS_WITH_BODY.includes(method);

  return (
    <BaseNode
      id={id}
      title="API"
      nodeType={NODE_TYPES.API}
      inputHandles={[{ id: 'trigger' }]}
      outputHandles={[{ id: 'response' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Method</label>
        <select className="base-node__select" value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">URL</label>
        <input
          className="base-node__input"
          type="text"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      {showBody && (
        <div className="base-node__field">
          <label className="base-node__field-label">Request Body</label>
          <textarea
            className="base-node__textarea"
            placeholder='{ "key": "value" }'
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      )}
      <p className="base-node__description">Returns a JSON response.</p>
    </BaseNode>
  );
};