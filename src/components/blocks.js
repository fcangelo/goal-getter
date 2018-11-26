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

class Blocks extends Component {
  componentDidMount() {
    this.props.onResolveCondense();
  }

  getCurData(resolve, target) {
    let curData = resolve.slice();
    let curBlocks = curData[target.resolveId].blocks;

    curBlocks[target.id].problem = target.value;
    curData[target.resolveId].blocks = arrObjConform(curBlocks, EmptyProblem, this.props.defaultInputs);

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

    retResolve[resolveId].blocks = arrayMove(retResolve[resolveId].blocks, moveObj.oldIndex, moveObj.newIndex);
    this.props.onResolveChange(retResolve);
  }

  render() {
    const resolveList = this.props.resolve;
    let resolveListInputs = resolveList.map((resolve, resolveId) => {
      if (resolve.goal) {
        const blockList = (resolve.blocks) ? resolve.blocks : []; // emptyArrStart(EmptyProblem, 2)
        const blocks = blockList.map((block, blockId) => {
          const isFirstEmpty = ((blockId === 0) && !block.problem);
          const isLastEmpty = ((blockId === blockList.length - 1) && !block.problem);

          return (
            <SortableTextInput
              key={`block-input-${blockId}`}
              index={blockId}
              inputId={blockId}
              isFirstEmpty={isFirstEmpty}
              isLastEmpty={isLastEmpty}
              placeholder={"Block"}
              value={block.problem}
              handleChange={(event) => this.handleChange(event, resolveId)}
              disabled={isLastEmpty}
            />
          );
        });
        const blocksGroup = (
          <SortableTextGroup
            lockAxis={"y"}
            textInputs={blocks}
            useDragHandle={true}
            onSortEnd={(moveObj, mouseEvent) => this.onSortEnd(moveObj, mouseEvent, resolveId)}
          />
        );

        return (
          <Card
            key={resolveId}
            aboveFold={resolve.goal}
            belowFold={blocksGroup}
          />
        );
      }

      return null;
    });

    if (stripNullEmpty(resolveListInputs).length === 0) {
      resolveListInputs = <h3 className="single-item">Add goals on the previous page to start adding associated blocks.</h3>;
    }

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Blocks"}
        subHeader={"List barriers that are blocking stated goals:"}
        backName={"Goals"}
        forwardName={"Block Solutions"}
        handleNav={this.props.onPageChange}
      >
        {resolveListInputs}
      </NavPage>
    );
  }
}

export default Blocks;
