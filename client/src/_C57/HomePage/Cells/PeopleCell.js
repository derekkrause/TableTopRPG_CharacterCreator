import React from "react";
import { NavLink } from "react-router-dom";

const PeopleCell = props => {
  return (
    <div className="media project-list">
      <div className="bg-white ize-40 z-index-20 align-itm-slef mr-3">
        {/* <i className="zmdi zmdi-apple text-primary zmdi-hc-fw" /> */}
        {props.data.avatarUrl == "" ? (
          <img
            src="http://wattleparkkgn.sa.edu.au/wp-content/uploads/2017/06/placeholder-profile-sq.jpg"
            className="user-avatar rounded-circle"
            alt="..."
          />
        ) : (
          <img src={props.data.avatarUrl} className={`rs-user-pic ${props.borderColor}`} alt="..." />
        )}
      </div>
      <NavLink to={`${props.path}/${props.data.userId}`} className="link-text">
        {/* <span className="circle-shape bg-primary" /> */}
        <div className="media-body">
          <h4 className="mb-1">{props.data.firstName + " " + props.data.lastName}</h4>
          {props.data.sportPosition ? (
            <p className="meta-date">{props.data.sportPosition[0].name}</p>
          ) : (
            <p className="meta-date">{props.data.school}</p>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default PeopleCell;
