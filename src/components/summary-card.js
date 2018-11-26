import React from 'react';

function SummaryCard(props) {
  return (
    <div
      className="summary card"
    >
      <h3
        className="paragraph summary__header"
      >
        {`${props.itemPrefix} ${props.itemId + 1}: ${props.itemHeader}`}
      </h3>
      <div
        className="summary__body"
      >
        {props.itemBody}
      </div>
    </div>
  );
}

export default SummaryCard;
