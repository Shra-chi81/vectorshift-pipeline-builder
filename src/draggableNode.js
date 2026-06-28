// draggableNode.js
// --------------------------------------------------

  export const DraggableNode = ({ type, label, description, color, Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.classList.add('draggable-node--dragging');
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragEnd = (event) => {
    event.currentTarget.classList.remove('draggable-node--dragging');
  };

  return (
    <div
      className="draggable-node"
      title={description}
      style={{ '--chip-accent': color?.accent, '--chip-accent-soft': color?.accentSoft }}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={onDragEnd}
      draggable
    >
      {Icon && (
        <span className="draggable-node__icon">
          <Icon />
        </span>
      )}
      <span className="draggable-node__label">{label}</span>
    </div>
  );
};