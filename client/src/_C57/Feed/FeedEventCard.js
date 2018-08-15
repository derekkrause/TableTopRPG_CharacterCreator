import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

import { getEventById, getEventByIdWithUser } from "../../services/Event.service";

const FeedEventCard = props => {
  const { name, organizer, description, id, logo, startDate, endDate } = props.data.itemData;
  return (
    <div>
      <div className="d-sm-flex flex-sm-row jr-card" style={{ borderLeft: "8px solid pink" }}>
        <div className="col-mb-3 col-sm-3 col-12 p-0">
          <img className="img-fluid" src={logo} alt="..." />
        </div>
        <div className="col-mb-9 col-sm-9 col-12">
          <h3>{name}</h3>
          <h4 className="meta-data">Organized by {organizer}</h4>
          <h4>
            <i className="zmdi zmdi-calendar-note zmdi-hc-lg" /> &nbsp;
            {startDate} - {endDate}
          </h4>
          <p>{description}</p>
          <NavLink to={`/app/events/${id}`}>
            More Info&nbsp;
            <i className="zmdi zmdi-chevron-right zmdi-hc-fw" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default FeedEventCard;
