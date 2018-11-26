import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';

const SortableTextGroup = SortableContainer(({textInputs}) => {
  return (
    <div className="sortable">{textInputs}</div>
  );
});

export default SortableTextGroup;
