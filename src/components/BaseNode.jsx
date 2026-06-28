// components/BaseNode.jsx

import { Handle, Position } from 'reactflow';
import { getNodeColor } from '../constants/nodeColors';
import { getNodeIcon } from '../constants/nodeIcons';
import "./BaseNode.css";

const distributeTop = (index, count) => {
  return `${((index + 1) / (count + 1)) * 100}%`;
};

export const BaseNode = ({
  id,
  title,
  icon,
  nodeType,
  inputHandles = [],
  outputHandles = [],
  fields,
  styles,
  children,
  minWidth,
  minHeight,
}) => {
  const { accent, accentSoft } = getNodeColor(nodeType);
  const Icon = icon || getNodeIcon(nodeType);

  return (
    <div
      className="base-node"
      style={{
        '--node-accent': accent,
        '--node-accent-soft': accentSoft,
        minWidth: minWidth ?? 220,
        minHeight: minHeight ?? undefined,
        ...styles,
      }}
    >
      {inputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="target"
          position={Position.Left}
          id={`${id}-${handle.id}`}
          className="base-node__handle base-node__handle--target"
          style={{ top: distributeTop(index, inputHandles.length), ...handle.style }}
        />
      ))}

      <div className="base-node__header">
        <span className="base-node__icon-chip">
          <Icon />
        </span>
        <span className="base-node__title">{title}</span>
      </div>

      <div className="base-node__content">
        {fields}
        {children}
      </div>

      {outputHandles.map((handle, index) => (
        <Handle
          key={handle.id}
          type="source"
          position={Position.Right}
          id={`${id}-${handle.id}`}
          className="base-node__handle base-node__handle--source"
          style={{ top: distributeTop(index, outputHandles.length), ...handle.style }}
        />
      ))}

      {inputHandles.some((h) => h.label) && (
        <div className="base-node__handle-labels base-node__handle-labels--left">
          {inputHandles.map((handle, index) => handle.label && (
            <span
              key={handle.id}
              className="base-node__handle-label"
              style={{ top: distributeTop(index, inputHandles.length) }}
            >
              {handle.label}
            </span>
          ))}
        </div>
      )}
      {outputHandles.some((h) => h.label) && (
        <div className="base-node__handle-labels base-node__handle-labels--right">
          {outputHandles.map((handle, index) => handle.label && (
            <span
              key={handle.id}
              className="base-node__handle-label"
              style={{ top: distributeTop(index, outputHandles.length) }}
            >
              {handle.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};