import React from "react";
import "../HomePage.css";
import { NavLink, Link } from "react-router-dom";

const CardHeader = props => {
  return (
    <div className="jr-card-header d-flex">
      <div className="mr-auto">
        <h3 className="card-heading">
          <i className={props.icon} style={{ color: "#5c5c5c" }} />
          &nbsp;
          {props.cardTitle}
        </h3>
        <p className="sub-heading"> {props.cardSubTitle}</p>
      </div>
      <Link to={`/app/${props.link}`} style={{ textDecoration: "none", color: "#aaaaaa" }}>
        <div className="home-header-btn" hidden={!props.cardTitle.indexOf("Trending")}>
          <h5 className="card-heading">More</h5> &nbsp;
          <i className="zmdi zmdi-chevron-right" />
        </div>
      </Link>
    </div>
  );
};

export default CardHeader;
