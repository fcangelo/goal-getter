import React, { Component } from 'react';
import ReactModal from 'react-modal';
import Page from './page';
import Explain from './explain';
import FileUpload from './file-upload';

ReactModal.setAppElement(document.getElementById('root'));

class Start extends Component {
  constructor() {
    super();

    this.state = {
      isModalOpen: false,
    };
  }

  closeModal() {
    this.setState({
      isModalOpen: false,
    });
  }

  handleJSON(file) {
    if (this.state.isModalOpen === false) {
      let reader = new FileReader();

      reader.onloadend = this.readJSON.bind(this);
      reader.readAsText(file);
    }
  }

  handleModal() {
    // if (!this.props.isDefault()) {
    //   this.openModal();
    // }
    this.openModal();
  }

  handlePageChange() {
    if (this.state.isModalOpen === false) {
      this.props.onPageChange(this.props.pageNumber + 1);
    }
  }

  handleReset() {
    this.props.reset();
    this.closeModal();
  }

  // Thanks to: https://stackoverflow.com/a/32278428
  isJSON(str) {
    try {
      return (JSON.parse(str) && !!str);
    } catch (e) {
      return false;
    }
  }

  openModal() {
    this.setState({
      isModalOpen: true,
    });
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

  render() {
    let noData = '';

    if (this.props.isDefault()) {
      noData = <div>(no data currently saved)</div>;
    }

    return (
      <Page
        pageNumber={this.props.pageNumber}
        header={"Find Solutions to Roadblocks Standing in the Way of Goals"}
        subHeader={"Start New Session or Import a Previous One"}
      >
        <Explain />
        <ReactModal
          isOpen={this.state.isModalOpen}
          contentLabel="Reset Dialogue"
          className="modal"
          overlayClassName="modal-overlay"
          onRequestClose={() => this.closeModal()}
        >
          <div className="modal__text">
            <div>Are you sure you want to reset all data?</div>
            {noData}
          </div>
          <div className="modal__buttons">
            <button
              className="button button--error"
              onClick={() => this.handleReset()}
            >
              Reset All Data
            </button>
            <button
              className="button"
              onClick={() => this.closeModal()}
            >
              Cancel
            </button>
          </div>
        </ReactModal>
        <div className="nav-start">
          <div className="button-container">
            <button
              className="button button--large"
              onClick={() => this.handlePageChange()}
            >
              Start
            </button>
          </div>
          <div className="button-container">
            <button
              className="button button--error"
              onClick={() => this.handleModal()}
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
