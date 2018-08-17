import React from "react";
import { NavLink } from "react-router-dom";

const UpcomingEventCell = props => {
  var date = new Date(props.data.startDate.substring(0, 10));
  var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
  var newStartDate = month + " " + date.getDate() + ", " + date.getFullYear();
  return (
    <div className="list-line-item">
      <div className="list-line-badge bg-red" />
      <NavLink to={`events/${props.data.id}`} className="link-text" target="_blank">
        <div className="media-body">
          <h4 className="mb-1">{props.data.name}</h4>
          <p className="meta-date"> {newStartDate}</p>
        </div>
      </NavLink>
    </div>
  );
};

export default UpcomingEventCell;
