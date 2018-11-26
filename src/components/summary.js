import React, { Component } from 'react';
import NavPage from './nav-page';
import FileSaver from 'file-saver';
import SummaryCard from './summary-card';
import {
  stripNullEmpty,
  timeFormat
} from '../scripts/utilities';

class Summary extends Component {
  componentDidMount() {
    this.props.onResolveCondense();
  }

  exportResolve() {
    return this.props.exportResolve(this.props.resolve);
  }

  onExport() {
    if (!this.props.isDefault()) {
      const blob = new Blob([this.exportResolve()], {
        type: 'application/json'
      });
      const dateTime = timeFormat(new Date());

      FileSaver.saveAs(blob, `block-resolver-${dateTime}.json`);
    } else {
      this.props.notify('Use prior pages to add data');
    }
  }

  render() {
    let retGoals = <h3 className="single-item">Enter some goals</h3>;
    const resolveList = this.props.resolve;
    const resolveListResults = resolveList.map((resolve, resolveId) => {
      if (resolve.goal) {
        let blocks = [];
        let retSols = "(Add solutions using the previous pages.)";

        if (resolve.blocks) {
          blocks = resolve.blocks.map((block, blockId) => {
            if (block.solutions) {
              const solutions = block.solutions.map((solution, solutionId) => {
                if (solution) {
                  return (
                    <li
                      key={solutionId}
                    >
                      {solution}
                    </li>
                  );
                }

                return null;
              });

              return stripNullEmpty(solutions);
            }

            return null;
          });
        }

        if (stripNullEmpty(blocks).length > 0) {
          retSols = <ul>{blocks}</ul>;
        }

        return (
          <SummaryCard
            key={resolveId}
            itemPrefix="Goal"
            itemId={resolveId}
            itemHeader={resolve.goal}
            itemBody={retSols}
          />
        );
      }

      return null;
    });

    if (stripNullEmpty(resolveListResults).length > 0) {
      retGoals = resolveListResults;
    }

    return (
      <NavPage
        pageNumber={this.props.pageNumber}
        header={"Summary"}
        subHeader={"This summary shows the solutions associated with stated goals:"}
        backName={"Solutions"}
        forwardName={"Return to Start"}
        handleNav={this.props.onPageChange}
        isLastPage={true}
      >
        <div className="button-container">
          <button
            className="button"
            onClick={() => this.onExport()}
          >
            Export
          </button>
        </div>
        <div
          className="goals"
        >
          {retGoals}
        </div>
      </NavPage>
    );
  }
}

export default Summary;
