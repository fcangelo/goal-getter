import React, { Component } from 'react';
import Page from './page';
import Explain from './explain';
import FileUpload from './file-upload';

class Start extends Component {
  // Thanks to: https://stackoverflow.com/a/32278428
  isJSON(str) {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }

  readJSON(reader) {
    let data = reader.target.result;

    if (this.isJSON(data)) {
      let retData = {
        page: this.props.pageNumber + 1,
        data: JSON.parse(data),
      };

      this.props.onImportPrevious(retData);
    } else {
      this.props.notify('This is not the file you are looking for', 'error');
    }
  }

  handleJSON(file) {
    let reader = new FileReader();

    reader.onloadend = this.readJSON.bind(this);
    reader.readAsText(file);
  }

  render() {
    return (
      <Page
        pageNumber={this.props.pageNumber}
        header={"Resolve Issues Blocking Your Progress"}
        subHeader={"Start New Session or Import a Previous One"}
      >
        <Explain />
        <div className="nav-start">
          <div className="button-container">
            <button
              className="button button--large"
              onClick={() => this.props.onPageChange(this.props.pageNumber + 1)}
            >
              Start
            </button>
          </div>
          <div className="button-container">
            <button
              className="button"
              onClick={() => this.props.reset()}
            >
              Reset
            </button>
          </div>
          <div className="import">
            <div className="center-text med-pad">Reviewing a previous session?</div>
            <div className="button-container">
              <FileUpload
                id="import-json"
                type=".json"
                handleFile={(file) => this.handleJSON(file)}
              />
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

export default Start;
