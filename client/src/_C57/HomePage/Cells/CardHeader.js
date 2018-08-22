import React from "react";
import "../HomePage.css";
import { NavLink, Link } from "react-router-dom";

const CardHeader = props => {
  return (
    <div className="jr-card-header d-flex">
      <div className="mr-auto  home-center-text">
        <h3 className="card-heading mb-0">
          <i className={props.icon} style={{ color: "#5c5c5c" }} />
          &nbsp;
          {props.cardTitle}
        </h3>
        <p className="sub-heading"> {props.cardSubTitle}</p>
      </div>
      <Link to={`/app/${props.link}`} style={{ textDecoration: "none", color: "#aaaaaa" }}>
        <div className="home-header-btn" hidden={!props.cardTitle.indexOf("Trending")}>
          <h5 className="card-heading mb-0  home-center-text">More</h5> &nbsp;
          <i className="zmdi zmdi-chevron-right  home-center-text" />
        </div>
      </Link>
    </div>
  );
};

export default CardHeader;
