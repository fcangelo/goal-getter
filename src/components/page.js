import React from 'react';

function Page(props) {
  return (
    <div className={`page${props.pageNumber}`}>
      <h2>{props.header}</h2>
      <h3>{props.subHeader}</h3>
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

export default Page;
