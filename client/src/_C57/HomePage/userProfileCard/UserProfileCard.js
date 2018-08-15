import React from "react";
import "../HomePage.css";

const UserProfileCard = ({ headerStyle }) => {
  return (
    <div className="card jr-card-full-height text-center overflow-hidden">
      <div>
        <div className="div-with-bg" />
        <img className="size-100 mb-3 img-float" src="http://via.placeholder.com/150x150" alt="Team Member" />
        <div className="jr-card-hd-content">
          <h4 className="mb-0">Chris Harris</h4>
          <p className="sub-heading mb-0">Graphic Designer Graphic Graphic</p>
        </div>
      </div>
      <div className="card-body">
        <p>Cenas in erat accumsan, hendrerit lorem vel, pulvinar odio. Quisque eu conva.</p>
      </div>
    </div>
  );
};

export default UserProfileCard;
UserProfileCard.defaultProps = {
  headerStyle: ""
};
