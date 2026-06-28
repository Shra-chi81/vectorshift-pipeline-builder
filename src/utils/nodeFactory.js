// utils/nodeFactory.js

export const getInitNodeData = (nodeID, type) => {
  return { id: nodeID, nodeType: `${type}` };
};