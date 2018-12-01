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
    let curSolutions = curData[target.resolveId].roadblocks[target.roadblockId].solutions;

    curSolutions[target.id] = target.value;
    curData[target.resolveId].roadblocks[target.roadblockId].solutions = arrConform(curSolutions, this.props.defaultInputs);

    return curData;
  }

  handleChange(event, resolveId, roadblockId) {
    const target = {
      id: parseInt(event.target.id),
      resolveId: parseInt(resolveId),
      roadblockId: parseInt(roadblockId),
      value: event.target.value,
    };

    this.props.onResolveChange(this.getCurData(this.props.resolve, target));
  }

  onSortEnd(moveObj, mouseEvent, resolveId, roadblockId) {
    let retResolve = this.props.resolve;

    retResolve[resolveId].roadblocks[roadblockId].solutions = arrayMove(retResolve[resolveId].roadblocks[roadblockId].solutions, moveObj.oldIndex, moveObj.newIndex);
    this.props.onResolveChange(retResolve);
  }

  render() {
    const resolveList = this.props.resolve;
    let resolveListInputs = resolveList.map((resolve, resolveId) => {
      if (resolve.roadblocks) {
        const roadblocks = resolve.roadblocks.map((roadblock, roadblockId) => {
          if (roadblock.problem) {
            const solutionList = (roadblock.solutions) ? roadblock.solutions : [];
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
                  handleChange={(event) => this.handleChange(event, resolveId, roadblockId)}
                  disabled={isLastEmpty}
                />
              );
            });
            const solutionsGroup = (
              <SortableTextGroup
                lockAxis={"y"}
                textInputs={solutions}
                useDragHandle={true}
                onSortEnd={(moveObj, mouseEvent) => this.onSortEnd(moveObj, mouseEvent, resolveId, roadblockId)}
              />
            );

            return (
              <Card
                key={roadblockId}
                aboveFoldMain={`Goal ${resolveId + 1}: ${resolve.goal}`}
                aboveFoldSub={`Roadblock ${roadblockId + 1}: ${roadblock.problem}`}
                belowFold={solutionsGroup}
              />
            );
          }

          return null;
        });

        return stripNullEmpty(roadblocks);
      }

      return null;
    });

    if (stripNullEmpty(resolveListInputs).length === 0) {
      resolveListInputs = <h3 className="single-item">Add roadblocks on the previous page to start adding associated solutions.</h3>;
    }

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Solutions"}
        subHeader={"List steps that can be taken to overcome each barrier:"}
        backName={"Roadblocks"}
        forwardName={"Summary"}
        handleNav={this.props.onPageChange}
      >
        {resolveListInputs}
      </NavPage>
    );
  }
}

export default Solutions;
