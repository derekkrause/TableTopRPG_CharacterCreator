import React from "react";

const DotListCell = props => {
  return (
    <div className="media project-list">
      <span className={`circle-shape ${props.dotColor}`} />
      <div className="media-body">
        <h4 className="mb-1">{props.data.Name}</h4>
        <p className="meta-date"> {props.data.City}</p>
      </div>
    </div>
  );
};

export default DotListCell;
