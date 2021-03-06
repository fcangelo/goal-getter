import React, { Component } from 'react';
import {
  ToastContainer,
  toast
} from 'react-toastify';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import GoalGetter from './components/goal-getter';
import * as utils from './scripts/utilities';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      navDirForward: true,
      resolve: this.getEmptyStart(),
    };
  }

  addToResolve(updResolve) {
    this.onSetState({
      resolve: updResolve,
    });
  }

  componentDidMount() {
    // The basic idea is from: https://www.robinwieruch.de/local-storage-react/
    let savedResolve = localStorage.getItem('goal-getter');

    if (savedResolve) {
      this.setState(JSON.parse(savedResolve));
    }
  }

  condense(resolveState) {
    return this.prepare(resolveState, this.getDefaultInputs());
  }

  condenseResolve() {
    this.onSetState({
      resolve: this.condense(this.state.resolve),
    });
  }

  exportResolve(resolveState) {
    let obj = {
      resolve: this.prepare(resolveState, 0),
    };

    return obj;
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

      this.onSetState({
        page: session.page,
        navDirForward: importResolve,
        resolve: this.condense(imported),
      });
    } catch (error) {
      this.notify('Does not contain GoalGetter data', 'error');
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

  onSetState(stateObj) {
    this.setState(stateObj, this.setLocalStorage);
  }

  prepare(resolveState, addExtra) {
    let retArr = utils.arrObjCondense(resolveState, utils.EmptyGoal, addExtra);

    for (let i = 0; i < retArr.length; i++) {
      const roadblocks = (retArr[i].roadblocks !== undefined) ? retArr[i].roadblocks : [];

      retArr[i].roadblocks = utils.arrObjCondense(roadblocks, utils.EmptyProblem, addExtra);

      for (let j = 0; j < retArr[i].roadblocks.length; j++) {
        const hasSolutions = (retArr[i].roadblocks[j].solutions !== undefined);
        const solutions = (hasSolutions) ? retArr[i].roadblocks[j].solutions : [];
        const condensedSolutions = utils.arrCondense(solutions, addExtra);

        if (condensedSolutions.length > 0) {
          retArr[i].roadblocks[j].solutions = condensedSolutions;
        } else if (hasSolutions && condensedSolutions.length === 0) {
          delete retArr[i].roadblocks[j].solutions;
        }
      }

      if (retArr[i].roadblocks.length === 0) {
        delete retArr[i].roadblocks;
      }
    }

    return retArr;
  }

  reset() {
    // // Uncomment this to add default object check
    // if (!this.isDefault()) {
    //   this.setState({
    //     resolve: this.getEmptyStart(),
    //   });
    // }

    this.setState({
      resolve: this.getEmptyStart(),
    });
    localStorage.removeItem('goal-getter');
    this.notify('Data cleared');
  }

  turnPage(to) {
    this.onSetState({
      page: to,
      navDirForward: this.getIsGoingForward(to),
    });
  }

  setLocalStorage() {
    localStorage.setItem('goal-getter', JSON.stringify(this.state));
  }

  render() {
    const navDir = (this.state.navDirForward) ? '' : ' back';

    return (
      <div className="App container container--max">
        <h1 className="App__title">GoalGetter</h1>
        {/* Maybe focus textbox on done? */}
        <TransitionGroup className={`App__body page-slider${navDir}`}>
          <CSSTransition
            key={this.state.page}
            timeout={500}
            classNames="slide"
          >
            <GoalGetter
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
