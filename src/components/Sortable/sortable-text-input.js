import React from 'react';
import SortableTextHandle from './sortable-text-handle';
import TextInput from '../text-input';
import { SortableElement } from 'react-sortable-hoc';

const SortableTextInput = SortableElement(({inputId, isFirstEmpty, isLastEmpty, placeholder, value, handleChange}) => {
  return (
    <div className="draggable">
      <SortableTextHandle
        disabled={isLastEmpty}
      />
      <div className="draggable__content">
        <TextInput
          key={`input-${inputId}`}
          id={inputId}
          isFocused={isFirstEmpty}
          preFocusClassName={(isLastEmpty) ? 'add button' : ''}
          preFocusPlaceholder={(isLastEmpty) ? `Add ${placeholder}` : ''}
          placeholder={`${placeholder} ${inputId + 1}`}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
});

export default SortableTextInput;
