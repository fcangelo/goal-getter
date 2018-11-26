import React, { Component } from 'react';
import {
  ToastContainer,
  toast
} from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import BlockResolver from './components/block-resolver';
import * as utils from './scripts/utilities';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.min.css';
// import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      navDirForward: true,
      resolve: this.getEmptyStart(),
    };
  }

  addToResolve(updResolve) {
    this.setState({
      resolve: updResolve,
    });
  }

  condense(resolveState) {
    return this.prepare(resolveState, this.getDefaultInputs());
  }

  condenseResolve() {
    this.setState({
      resolve: this.condense(this.state.resolve),
    });
  }

  exportResolve(resolveState) {
    let obj = {
      resolve: this.prepare(resolveState, 0),
    };

    return JSON.stringify(obj);
  }

  getDefaultInputs() {
    return 2;
  }

  getEmptyStart() {
    return utils.arrObjConform([], utils.EmptyGoal, this.getDefaultInputs());
  }

  getIsGoingForward(to) {
    return (to >= this.state.page) ? true : false;
  }

  importPrevious(session) {
    const imported = session.data.resolve;

    try {
      const importResolve = this.getIsGoingForward(session.page);

      this.setState({
        page: session.page,
        navDirForward: importResolve,
        resolve: this.condense(imported),
      });
    } catch (error) {
      this.notify('Does not contain Block Resolver data', 'error');
    }
  }

  isDefault() {
    return utils.arrObjEqual(this.state.resolve, this.getEmptyStart(), utils.getFirstKey(utils.EmptyGoal()));
  }

  notify(message, type = 'default') {
    if (type !== 'default') {
      return toast[type](message);
    }

    return toast(message);
  }

  prepare(resolveState, addExtra) {
    let retArr = utils.arrObjCondense(resolveState, utils.EmptyGoal, addExtra);

    for (let i = 0; i < retArr.length; i++) {
      const blocks = (retArr[i].blocks !== undefined) ? retArr[i].blocks : [];

      retArr[i].blocks = utils.arrObjCondense(blocks, utils.EmptyProblem, addExtra);

      for (let j = 0; j < retArr[i].blocks.length; j++) {
        const hasSolutions = (retArr[i].blocks[j].solutions !== undefined);
        const solutions = (hasSolutions) ? retArr[i].blocks[j].solutions : [];
        const condensedSolutions = utils.arrCondense(solutions, addExtra);

        if (condensedSolutions.length > 0) {
          retArr[i].blocks[j].solutions = condensedSolutions;
        } else if (hasSolutions && condensedSolutions.length === 0) {
          delete retArr[i].blocks[j].solutions;
        }
      }
    }

    return retArr;
  }

  reset() {
    if (!this.isDefault()) {
      this.setState({
        resolve: this.getEmptyStart(),
      });

      this.notify('Data cleared');
    }
  }

  turnPage(to) {
    this.setState({
      page: to,
      navDirForward: this.getIsGoingForward(to),
    });
  }

  render() {
    const navDir = (this.state.navDirForward) ? '' : ' back';

    return (
      <div className="App">
        <h1 className="App__title">Block Resolver</h1>
        {/* Maybe focus textbox on done? */}
        <TransitionGroup className={`App__body page-slider${navDir}`}>
          <CSSTransition
            key={this.state.page}
            timeout={500}
            classNames="slide"
          >
            <BlockResolver
              page={this.state.page}
              resolve={this.state.resolve}
              onPageChange={(page) => this.turnPage(page)}
              onResolveChange={(update) => this.addToResolve(update)}
              onResolveCondense={() => this.condenseResolve()}
              onImportPrevious={(session) => this.importPrevious(session)}
              defaultInputs={this.getDefaultInputs()}
              exportResolve={(data) => this.exportResolve(data)}
              notify={(message, type) => this.notify(message, type)}
              isDefault={() => this.isDefault()}
              reset={() => this.reset()}
            />
          </CSSTransition>
        </TransitionGroup>
        <ToastContainer
          position="bottom-right"
          // autoClose={5000}
          hideProgressBar
          newestOnTop
          // closeOnClick
          // rtl={false}
          // pauseOnVisibilityChange
          // draggable
          // pauseOnHover
        />
        {/* Idea for what to do later: */}
        {/* <div className="progress">
          <span className="progress__bar"></span>
        </div> */}
      </div>
    );
  }
}

export default App;
