import React, { Component } from 'react';
import NavPage from './nav-page';
import {
  arrObjConform,
  EmptyGoal
} from '../scripts/utilities';
import SortableTextGroup from './Sortable/sortable-text-group';
import SortableTextInput from './Sortable/sortable-text-input';
import { arrayMove } from 'react-sortable-hoc';

class Goals extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  getCurData(resolve, target) {
    let curData = resolve.slice();

    curData[target.id].goal = target.value;

    return arrObjConform(curData, EmptyGoal, this.props.defaultInputs);
  }

  handleChange(event) {
    const target = {
      id: parseInt(event.target.id),
      value: event.target.value,
    };

    this.props.onResolveChange(this.getCurData(this.props.resolve, target));
  }

  onSortEnd(moveObj, mouseEvent) {
    let retResolve = this.props.resolve;

    this.props.onResolveChange(arrayMove(retResolve, moveObj.oldIndex, moveObj.newIndex));
  }

  render() {
    const resolveList = this.props.resolve;
    const resolveListInputs = resolveList.map((resolve, resolveId) => {
      const isFirstEmpty = ((resolveId === 0) && !resolve.goal);
      const isLastEmpty = ((resolveId === resolveList.length - 1) && !resolve.goal);

      return (
        <SortableTextInput
          key={`resolve-input-${resolveId}`}
          index={resolveId}
          inputId={resolveId}
          isFirstEmpty={isFirstEmpty}
          isLastEmpty={isLastEmpty}
          placeholder={"Goal"}
          value={resolve.goal}
          handleChange={(event) => this.handleChange(event)}
          disabled={isLastEmpty}
        />
      );
    });

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Goals"}
        subHeader={"Start by creating a list of your goals:"}
        backName={"Start Page"}
        forwardName={"Goal Roadblocks"}
        handleNav={this.props.onPageChange}
      >
        <SortableTextGroup
          lockAxis={"y"}
          textInputs={resolveListInputs}
          useDragHandle={true}
          onSortEnd={(moveObj, mouseEvent) => this.onSortEnd(moveObj, mouseEvent)}
        />
      </NavPage>
    );
  }
}

export default Goals;
