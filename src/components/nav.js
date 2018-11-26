import React from 'react';
import ArrowLeftIcon from 'mdi-react/ArrowLeftIcon';
import ArrowRightIcon from 'mdi-react/ArrowRightIcon';

function Nav(props) {
  const backPage = (props.isFirstPage) ? 1 : props.currentPage - 1;
  const forwardPage = (props.isLastPage) ? 1 : props.currentPage + 1;
  const backName = (props.backName) ? ' ' + props.backName : '';
  const forwardName = (props.forwardName) ? props.forwardName + ' ' : '';

  return (
    <nav className="nav nav--flex">
      <button
        className="button nav__button"
        onClick={() => props.handleNav(backPage)}
      >
        <span className="nav__icon">
          <ArrowLeftIcon />
        </span>
        <span className="nav__text nav__text--left">
          {backName}
        </span>
      </button>
      <button
        className="button nav__button"
        onClick={() => props.handleNav(forwardPage)}
      >
        <span className="nav__text nav__text--right">
          {forwardName}
        </span>
        <span className="nav__icon">
          <ArrowRightIcon />
        </span>
      </button>
    </nav>
  );
}

export default Nav;
