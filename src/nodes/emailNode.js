// nodes/emailNode.js
// --------------------------------------------------

import { useState } from 'react';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';

// Simple format check, not a full RFC 5322 validator — good enough to
// flag an obviously malformed address without blocking typing or
// adding real validation/business logic to a UI node.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailNode = ({ id, data }) => {
  const [to, setTo] = useState(data?.to || '');
  const [cc, setCc] = useState(data?.cc || '');
  const [bcc, setBcc] = useState(data?.bcc || '');
  const [subject, setSubject] = useState(data?.subject || '');
  const [preview, setPreview] = useState(data?.preview || '');

  const isToValid = to.length === 0 || EMAIL_PATTERN.test(to);

  return (
    <BaseNode
      id={id}
      title="Email"
      nodeType={NODE_TYPES.EMAIL}
      inputHandles={[{ id: 'body' }]}
      outputHandles={[{ id: 'sent' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">To</label>
        <input
          className="base-node__input"
          type="text"
          placeholder="name@example.com"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          style={!isToValid ? { borderColor: '#F87171' } : undefined}
        />
        {!isToValid && (
          <p className="base-node__description" style={{ color: '#F87171' }}>
            Enter a valid email address.
          </p>
        )}
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">CC (optional)</label>
        <input
          className="base-node__input"
          type="text"
          placeholder="name@example.com"
          value={cc}
          onChange={(e) => setCc(e.target.value)}
        />
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">BCC (optional)</label>
        <input
          className="base-node__input"
          type="text"
          placeholder="name@example.com"
          value={bcc}
          onChange={(e) => setBcc(e.target.value)}
        />
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Subject</label>
        <input
          className="base-node__input"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="base-node__field">
        <label className="base-node__field-label">Message Preview</label>
        <textarea
          className="base-node__textarea"
          placeholder="Email body preview..."
          value={preview}
          onChange={(e) => setPreview(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};