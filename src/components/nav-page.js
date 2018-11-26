import React from 'react';
import Page from './page';
import Nav from './nav';

function NavPage(props) {
  let pageNav = (
    <Nav
      backName={props.backName}
      forwardName={props.forwardName}
      currentPage={props.pageNumber}
      handleNav={props.handleNav}
      isFirstPage={props.isFirstPage}
      isLastPage={props.isLastPage}
    />
  );

  return (
    <Page
      pageNumber={props.pageNumber}
      header={props.header}
      subHeader={props.subHeader}
    >
      {pageNav}
      {props.children}
      {pageNav}
    </Page>
  );
}

export default NavPage;
