// nodes/textNode.js
// --------------------------------------------------

import { useState, useMemo, useEffect } from 'react';
import { useUpdateNodeInternals } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { NODE_TYPES } from '../constants/nodeTypes';
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea';
import { extractVariables } from '../utils/variableDetection';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useAutoResizeTextarea(currText);
  const updateNodeInternals = useUpdateNodeInternals();

  const variableHandles = useMemo(
    () => extractVariables(currText).map((name) => ({ id: name, label: name })),
    [currText]
  );

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, variableHandles.length, updateNodeInternals]);

  return (
    <BaseNode
      id={id}
      title="Text"
      nodeType={NODE_TYPES.TEXT}
      inputHandles={variableHandles}
      outputHandles={[{ id: 'output' }]}
    >
      <div className="base-node__field">
        <label className="base-node__field-label">Text</label>
        <textarea
          ref={textareaRef}
          className="base-node__textarea base-node__textarea--auto"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
          placeholder="Use {{variable}} to create an input handle"
          rows={1}
        />
      </div>
    </BaseNode>
  );
};