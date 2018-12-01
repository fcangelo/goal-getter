import React, { Component } from 'react';
import NavPage from './nav-page';
import Card from './card';
import {
  arrObjConform,
  EmptyProblem,
  stripNullEmpty
} from '../scripts/utilities';
import SortableTextGroup from './Sortable/sortable-text-group';
import SortableTextInput from './Sortable/sortable-text-input';
import { arrayMove } from 'react-sortable-hoc';

class Roadblocks extends Component {
  componentDidMount() {
    this.props.onResolveCondense();
  }

  getCurData(resolve, target) {
    let curData = resolve.slice();
    let curRoadblocks = curData[target.resolveId].roadblocks;

    curRoadblocks[target.id].problem = target.value;
    curData[target.resolveId].roadblocks = arrObjConform(curRoadblocks, EmptyProblem, this.props.defaultInputs);

    return curData;
  }

  handleChange(event, resolveId) {
    const target = {
      id: parseInt(event.target.id),
      resolveId: parseInt(resolveId),
      value: event.target.value,
    };

    this.props.onResolveChange(this.getCurData(this.props.resolve, target));
  }

  onSortEnd(moveObj, mouseEvent, resolveId) {
    let retResolve = this.props.resolve;

    retResolve[resolveId].roadblocks = arrayMove(retResolve[resolveId].roadblocks, moveObj.oldIndex, moveObj.newIndex);
    this.props.onResolveChange(retResolve);
  }

  render() {
    const resolveList = this.props.resolve;
    let resolveListInputs = resolveList.map((resolve, resolveId) => {
      if (resolve.goal) {
        const roadblockList = (resolve.roadblocks) ? resolve.roadblocks : []; // emptyArrStart(EmptyProblem, 2)
        const roadblocks = roadblockList.map((roadblock, roadblockId) => {
          const isFirstEmpty = ((roadblockId === 0) && !roadblock.problem);
          const isLastEmpty = ((roadblockId === roadblockList.length - 1) && !roadblock.problem);

          return (
            <SortableTextInput
              key={`roadblock-input-${roadblockId}`}
              index={roadblockId}
              inputId={roadblockId}
              isFirstEmpty={isFirstEmpty}
              isLastEmpty={isLastEmpty}
              placeholder={"Roadblock"}
              value={roadblock.problem}
              handleChange={(event) => this.handleChange(event, resolveId)}
              disabled={isLastEmpty}
            />
          );
        });
        const roadblocksGroup = (
          <SortableTextGroup
            lockAxis={"y"}
            textInputs={roadblocks}
            useDragHandle={true}
            onSortEnd={(moveObj, mouseEvent) => this.onSortEnd(moveObj, mouseEvent, resolveId)}
          />
        );

        return (
          <Card
            key={resolveId}
            aboveFoldMain={`Goal ${resolveId + 1}: ${resolve.goal}`}
            belowFold={roadblocksGroup}
          />
        );
      }

      return null;
    });

    if (stripNullEmpty(resolveListInputs).length === 0) {
      resolveListInputs = <h3 className="single-item">Add goals on the previous page to start adding associated roadblocks.</h3>;
    }

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Roadblocks"}
        subHeader={"List roadblocks standing in the way of stated goals:"}
        backName={"Goals"}
        forwardName={"Roadblock Solutions"}
        handleNav={this.props.onPageChange}
      >
        {resolveListInputs}
      </NavPage>
    );
  }
}

export default Roadblocks;
