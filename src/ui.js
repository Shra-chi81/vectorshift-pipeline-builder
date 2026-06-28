// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

// ---------- React Flow Setup ----------
import { useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, useReactFlow, ReactFlowProvider } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiNode } from './nodes/apiNode';
import { EmailNode } from './nodes/emailNode';
import { DatabaseNode } from './nodes/databaseNode';
import { FilterNode } from './nodes/filterNode';
import { DelayNode } from './nodes/delayNode';
import { NODE_TYPES } from './constants/nodeTypes';
import { getNodeColor } from './constants/nodeColors';
import { getInitNodeData } from './utils/nodeFactory';

import 'reactflow/dist/style.css';
import './ui.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  [NODE_TYPES.INPUT]: InputNode,
  [NODE_TYPES.LLM]: LLMNode,
  [NODE_TYPES.OUTPUT]: OutputNode,
  [NODE_TYPES.TEXT]: TextNode,
  [NODE_TYPES.API]: ApiNode,
  [NODE_TYPES.EMAIL]: EmailNode,
  [NODE_TYPES.DATABASE]: DatabaseNode,
  [NODE_TYPES.FILTER]: FilterNode,
  [NODE_TYPES.DELAY]: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const CANVAS_THEME = {
  dark: {
    gridDot: '#2A3245',
    minimapMask: 'rgba(10, 13, 20, 0.65)',
    minimapBg: '#11151F',
    minimapBorder: 'rgba(255,255,255,0.08)',
  },
  light: {
    gridDot: '#D6DCE8',
    minimapMask: 'rgba(244, 246, 251, 0.7)',
    minimapBg: '#FFFFFF',
    minimapBorder: 'rgba(15,23,42,0.1)',
  },
};

const PipelineCanvas = ({ theme }) => {
    const reactFlowWrapper = useRef(null);
    const { screenToFlowPosition } = useReactFlow();
    const canvasTheme = CANVAS_THEME[theme];
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    // ---------- Drag & Drop ----------
    const onDrop = useCallback(
        (event) => {
          event.preventDefault();

          const rawData = event?.dataTransfer?.getData('application/reactflow');
          if (!rawData) {
            return;
          }

          let appData;
          try {
            appData = JSON.parse(rawData);
          } catch (error) {
            console.warn('Ignored drop with invalid drag data:', error);
            return;
          }

          const type = appData?.nodeType;
          if (typeof type === 'undefined' || !type) {
            return;
          }

          const position = screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          });

          const nodeID = getNodeID(type);
          const newNode = {
            id: nodeID,
            type,
            position,
            data: getInitNodeData(nodeID, type),
          };

          addNode(newNode);
        },
        [screenToFlowPosition, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // ---------- Rendering ----------
    return (
        <>
        <div ref={reactFlowWrapper} className="pipeline-canvas-wrapper">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                fitView
            >
                <Background color={canvasTheme.gridDot} gap={gridSize} size={1.5} />
                <Controls className="pipeline-controls" />
                <MiniMap
                    nodeColor={(node) => getNodeColor(node.type).accent}
                    nodeBorderRadius={4}
                    maskColor={canvasTheme.minimapMask}
                    style={{ background: canvasTheme.minimapBg, border: `1px solid ${canvasTheme.minimapBorder}` }}
                />
            </ReactFlow>
        </div>
        </>
    )
}

export const PipelineUI = ({ theme }) => (
    <ReactFlowProvider>
        <PipelineCanvas theme={theme} />
    </ReactFlowProvider>
);









