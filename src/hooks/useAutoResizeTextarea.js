// hooks/useAutoResizeTextarea.js
// --------------------------------------------------

import { useRef, useLayoutEffect } from 'react';

export const useAutoResizeTextarea = (value) => {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    const node = textareaRef.current;
    if (!node) return;

    node.style.height = 'auto';
    node.style.height = `${node.scrollHeight}px`;
  }, [value]);

  return textareaRef;
};