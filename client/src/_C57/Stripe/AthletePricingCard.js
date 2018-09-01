import React from "react";
import "./stripe.css";

const AthletePricingCard = ({ styleName, headerStyle, itemStyle, footerStyle, email }) => {
  return (
    <div className={`${styleName}`}>
      <div className={`${headerStyle}`}>
        <div>
          <h4 className="letter-spacing-base text-uppercase mb-0 pl-2" style={{ fontSize: "20px" }}>
            Recruit Hub Sports
          </h4>
        </div>
        <div>
          <h4 className="letter-spacing-base text-uppercase mb-0 pl-2">Subscription Benefits</h4>
        </div>
      </div>
      <div className="row pl-3">
        <ul className={`pb-5 package-items ${itemStyle}`}>
          <li>
            <i className="zmdi zmdi-library zmdi-hc-fw" />
            Track favorite schools and sports programs
            <span />
          </li>
          <li>
            <i className="zmdi zmdi-search zmdi-hc-fw" />
            <span>Find coaches for hire</span>
          </li>
          <li>
            <i className="zmdi zmdi-comment-alt-text zmdi-hc-fw" />
            <span>Communicate with college coaches</span>
          </li>
          <li>
            <i className="zmdi zmdi-trending-up zmdi-hc-fw" />
            <span>Keep up with the latest trends</span>
          </li>
          <li>
            <i className="zmdi zmdi-accounts zmdi-hc-fw" />
            <span>Create new connections</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AthletePricingCard;
