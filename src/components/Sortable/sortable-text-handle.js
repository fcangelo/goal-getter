import React from 'react';
import { SortableHandle } from 'react-sortable-hoc';
import DragVerticalIcon from 'mdi-react/DragVerticalIcon';

const SortableTextHandle = SortableHandle(({disabled}) => {
  return (
    <div className={`draggable__handle${(disabled) ? ' draggable__handle--disabled' : ''}`}>
      <DragVerticalIcon />
    </div>
  );
});

export default SortableTextHandle;
