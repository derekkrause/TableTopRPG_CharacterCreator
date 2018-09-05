import React from "react";
import { NavLink } from "react-router-dom";
import "../ProfileBanner.css";

const PeopleCell = props => {
  return (
    <div>
      <NavLink to={`/app/advocates/${props.data.advocateUserId}`} className="link-text">
        <div className="d-flex media project-list align-items-center">
          <div className="bg-white ize-40 z-index-20 mr-3">
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

          <div className="media-body">
            <h4 className="mb-1">{props.data.firstName + " " + props.data.lastName}</h4>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default PeopleCell;
