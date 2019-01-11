import React from 'react';
import Start from './start';
import Goals from './goals';
import Roadblocks from './roadblocks';
import Solutions from './solutions';
import Summary from './summary';

function GoalGetter(props) {
  if (props.page === 2) {
    return (
      <Goals
        pageNumber={props.page}
        onPageChange={props.onPageChange}
        resolve={props.resolve}
        onResolveChange={props.onResolveChange}
        defaultInputs={props.defaultInputs}
      />
    );
  } else if (props.page === 3) {
    return (
      // Clean what is being passed in
      <Roadblocks
        pageNumber={props.page}
        onPageChange={props.onPageChange}
        resolve={props.resolve}
        onResolveChange={props.onResolveChange}
        onResolveCondense={props.onResolveCondense}
        defaultInputs={props.defaultInputs}
      />
    );
  } else if (props.page === 4) {
    return (
      <Solutions
        pageNumber={props.page}
        onPageChange={props.onPageChange}
        resolve={props.resolve}
        onResolveChange={props.onResolveChange}
        onResolveCondense={props.onResolveCondense}
        defaultInputs={props.defaultInputs}
      />
    );
  } else if (props.page === 5) {
    return (
      <Summary
        pageNumber={props.page}
        onPageChange={props.onPageChange}
        resolve={props.resolve}
        onResolveChange={props.onResolveChange}
        onResolveCondense={props.onResolveCondense}
        defaultInputs={props.defaultInputs}
        exportResolve={props.exportResolve}
        notify={props.notify}
        isDefault={props.isDefault}
      />
    );
  }

  return (
    <Start
      pageNumber={1}
      onPageChange={props.onPageChange}
      onImportPrevious={props.onImportPrevious}
      notify={props.notify}
      reset={props.reset}
      isDefault={props.isDefault}
    />
  );
}

export default GoalGetter;
