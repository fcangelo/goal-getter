import React from 'react';

function CardHeaderContainer(props) {
  return (
    <div className="card__header">
      {props.children}
    </div>
  );
}

function CardHeaderMain(props) {
  return (
    <h3 className="card__header-main paragraph">
      {props.headerMain}
    </h3>
  );
}

function CardHeaderSub(props) {
  return (
    <h4 className="card__header-sub paragraph">
      {props.headerSub}
    </h4>
  );
}

function CardHeader(props) {
  if (props.headerMain || props.headerSub) {
    const headerMain = (props.headerMain) ? <CardHeaderMain headerMain={props.headerMain} /> : null;
    const headerSub = (props.headerSub) ? <CardHeaderSub headerSub={props.headerSub} /> : null;

    return (
      <CardHeaderContainer>
        {headerMain}
        {headerSub}
      </CardHeaderContainer>
    );
  }

  return null;
}

export default CardHeader;
