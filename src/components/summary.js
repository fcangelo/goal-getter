import React, { Component } from 'react';
import NavPage from './nav-page';
import FileSaver from 'file-saver';
import SummaryCard from './summary-card';
import {
  FileType,
  FileTypes,
  stripNullEmpty,
  timeFormat
} from '../scripts/utilities';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: "json",
    };
  }

  componentDidMount() {
    this.props.onResolveCondense();
  }



  exportResolve() {
    return this.props.exportResolve(this.props.resolve);
  }

  handleFormatChange(event) {
    this.setState({
      format: event.target.value,
    });
  }

  jsonToText(json) {
    let retStr = "";

    if (json.resolve) {
      for (let i = 0; i < json.resolve.length; i++) {
        const goalGroup = json.resolve[i];

        retStr += `Goal ${i + 1}: ${goalGroup.goal}\r\n`;

        if (goalGroup.roadblocks) {
          for (let j = 0; j < goalGroup.roadblocks.length; j++) {
            const roadblockGroup = goalGroup.roadblocks[j];

            retStr += `\tRoadblock ${j + 1}: ${roadblockGroup.problem}\r\n`;

            if (roadblockGroup.solutions) {
              for (let k = 0; k < roadblockGroup.solutions.length; k++) {
                const solution = roadblockGroup.solutions[k];

                retStr += `\t\tSolution ${k + 1}: ${solution}\r\n`;
              }
            }
          }
        }
      }
    }

    return retStr;
  }

  onExport() {
    if (!this.props.isDefault()) {
      const types = FileTypes([
        FileType('json', 'application/json'),
        FileType('txt', 'text/plain'),
      ]);

      if (types[this.state.format]) {
        const processedData = this.processData(this.exportResolve(), types[this.state.format].type);
        const blob = new Blob([processedData], {
          type: types[this.state.format].mime
        });
        const dateTime = timeFormat(new Date());

        FileSaver.saveAs(blob, `goal-getter-${dateTime}.${types[this.state.format].ext}`);
      } else {
        this.props.notify('Something went wrong. Sorry about that.', 'error');
      }
    } else {
      this.props.notify('Use prior pages to add data');
    }
  }

  processData(data, type) {
    if (type === 'txt') {
      return this.jsonToText(data);
    }

    return JSON.stringify(data);
  }

  render() {
    let visClass = (this.props.isDefault()) ? ' no-display' : '';
    let retGoals =  <h3 className="single-item">
                      Goals, roadblocks, and the solutions to those roadblocks will appear here once entered on the previous pages.
                    </h3>;
    const resolveList = this.props.resolve;
    const resolveListResults = resolveList.map((resolve, resolveId) => {
      if (resolve.goal) {
        let roadblocks = [];
        let retSols = <div className="faded">No roadblocks found! \o/</div>;

        if (resolve.roadblocks) {
          roadblocks = resolve.roadblocks.map((roadblock, roadblockId) => {
            if (roadblock.problem) {
              let solutionList = (
                <div
                  className="rb-sol__body faded"
                >
                  Add solutions using the previous pages.
                </div>
              );

              if (roadblock.solutions && stripNullEmpty(roadblock.solutions).length > 0) {
                solutionList = stripNullEmpty(roadblock.solutions.map((solution, solutionId) => {
                  if (solution) {
                    return (
                      <li
                        key={solutionId}
                      >
                        <span>Solution</span>
                        <span>{`${solutionId + 1}:`}</span>
                        <span>{solution}</span>
                      </li>
                    );
                  }

                  return null;
                }));

                if (solutionList.length > 0) {
                  solutionList = <ol className="rb-sol__body">{solutionList}</ol>;
                }
              }

              return (
                <div
                  key={roadblockId}
                  className="rb-sol"
                >
                  <h4
                    className="rb-sol__header paragraph"
                  >
                    {`Roadblock ${roadblockId + 1}: ${roadblock.problem}`}
                  </h4>
                  {solutionList}
                </div>
              );
            }

            return null;
          });
        }

        if (stripNullEmpty(roadblocks).length > 0) {
          retSols = roadblocks;
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
        <div className={`controls${visClass}`}>
          <div className="button-container">
            <button
              className="button"
              onClick={() => this.onExport()}
            >
              Export
            </button>
          </div>
          <div className="form-radio-group">
            <FormControl component="fieldset">
              <FormLabel component="legend">Format</FormLabel>
              <RadioGroup
                aria-label="file-format"
                name="file-format"
                className="radio-group"
                value={this.state.format}
                onChange={(event) => this.handleFormatChange(event)}
              >
                <FormControlLabel
                  value="json"
                  control={<Radio />}
                  label="GoalGetter Settings (.json)"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="txt"
                  control={<Radio />}
                  label="Text file (.txt)"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>
          </div>
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
