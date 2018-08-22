import React from "react";

const CollegeCell = props => {
  return (
    <div className="media project-list mb-3">
      <span className={`circle-shape ${props.dotColor}`} />
      <a href={"http://" + props.data.url} target="_blank" className="link-text">
        <div className="media-body">
          <h4 className="mb-1">{props.data.name}</h4>
          <p className="meta-date">
            {props.data.city},{props.data.state}
          </p>
        </div>
      </a>
    </div>
  );
};

export default CollegeCell;
