import React, { Component } from 'react';
import NavPage from './nav-page';
import Card from './card';
import {
  arrConform,
  stripNullEmpty
} from '../scripts/utilities';
import SortableTextGroup from './Sortable/sortable-text-group';
import SortableTextInput from './Sortable/sortable-text-input';
import { arrayMove } from 'react-sortable-hoc';

class Solutions extends Component {
  componentDidMount() {
    this.props.onResolveCondense();
  }

  getCurData(resolve, target) {
    let curData = resolve.slice();
    let curSolutions = curData[target.resolveId].blocks[target.blockId].solutions;

    curSolutions[target.id] = target.value;
    curData[target.resolveId].blocks[target.blockId].solutions = arrConform(curSolutions, this.props.defaultInputs);

    return curData;
  }

  handleChange(event, resolveId, blockId) {
    const target = {
      id: parseInt(event.target.id),
      resolveId: parseInt(resolveId),
      blockId: parseInt(blockId),
      value: event.target.value,
    };

    this.props.onResolveChange(this.getCurData(this.props.resolve, target));
  }

  onSortEnd(moveObj, mouseEvent, resolveId, blockId) {
    let retResolve = this.props.resolve;

    retResolve[resolveId].blocks[blockId].solutions = arrayMove(retResolve[resolveId].blocks[blockId].solutions, moveObj.oldIndex, moveObj.newIndex);
    this.props.onResolveChange(retResolve);
  }

  render() {
    const resolveList = this.props.resolve;
    let resolveListInputs = resolveList.map((resolve, resolveId) => {
      if (resolve.blocks) {
        const blocks = resolve.blocks.map((block, blockId) => {
          if (block.problem) {
            const solutionList = (block.solutions) ? block.solutions : [];
            const solutions = solutionList.map((solution, solutionId) => {
              const isFirstEmpty = ((solutionId === 0) && !solution);
              const isLastEmpty = ((solutionId === solutionList.length - 1) && !solution);

              return (
                <SortableTextInput
                  key={`solution-input-${solutionId}`}
                  index={solutionId}
                  inputId={solutionId}
                  isFirstEmpty={isFirstEmpty}
                  isLastEmpty={isLastEmpty}
                  placeholder={"Solution"}
                  value={solution}
                  handleChange={(event) => this.handleChange(event, resolveId, blockId)}
                  disabled={isLastEmpty}
                />
              );
            });
            const solutionsGroup = (
              <SortableTextGroup
                lockAxis={"y"}
                textInputs={solutions}
                useDragHandle={true}
                onSortEnd={(moveObj, mouseEvent) => this.onSortEnd(moveObj, mouseEvent, resolveId, blockId)}
              />
            );

            return (
              <Card
                key={blockId}
                aboveFold={block.problem}
                belowFold={solutionsGroup}
              />
            );
          }

          return null;
        });

        return stripNullEmpty(blocks);
      }

      return null;
    });

    if (stripNullEmpty(resolveListInputs).length === 0) {
      resolveListInputs = <h3 className="single-item">Add blocks on the previous page to start adding associated solutions.</h3>;
    }

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Solutions"}
        subHeader={"List steps that can be taken to overcome each barrier:"}
        backName={"Blocks"}
        forwardName={"Summary"}
        handleNav={this.props.onPageChange}
      >
        {resolveListInputs}
      </NavPage>
    );
  }
}

export default Solutions;
