import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./HomePage.css";

import "../HomePage/HomePage.css";

const FeedEventCard = props => {
  // const { name, organizer, description, id, logo, startDate, endDate } = props.data.itemData;
  const { name, organizer, description, id, logo, startDate, endDate } = props.data;

  return (
    <div className="d-sm-flex flex-sm-row jr-card pr-2" style={{ borderLeft: "8px solid pink" }}>
      <div className="col-md-3 col-sm-3 col-12 px-0">
        <img className="img-fluid event-mini-card-img mb-3 mb-md-0 rounded" src={logo} alt="..." />
      </div>
      <div className="col-mb-9 col-sm-9 col-12">
        <h3 className="mb-1 font-weight-bold">{name}</h3>
        <p className="meta-date mb-2">Organized by {organizer}</p>
        <div className="meta-wrapper">
          <span className="meta-date">
            <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
            &nbsp;
            {props.handleDateFormat(startDate)} - {props.handleDateFormat(endDate)}
          </span>
        </div>
        <p className="card-text line-clamp mb-2" style={{ height: "40px" }}>
          {description}
        </p>
        <Link to={`/app/events/${id}`} style={{ textDecoration: "none", color: "#aaaaaa", width: "100%" }}>
          <div className="home-header-btn float-right" style={{ width: "100px" }}>
            <h5 className="card-heading mb-0 home-center-text">More Info</h5> &nbsp;
            <i className="zmdi zmdi-chevron-right home-center-text" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FeedEventCard;

/* <div className="text-right">
<NavLink to={`/app/events/${id}`} className="link-text">
  More Info&nbsp;
  <i className="zmdi zmdi-chevron-right zmdi-hc-fw" />
</NavLink>
</div> */
