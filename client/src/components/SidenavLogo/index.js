import React from "react";
import { MINI_DRAWER } from "constants/ActionTypes";

const SidenavLogo = ({ drawerType }) => {
  const showMini = drawerType.includes(MINI_DRAWER);

  return (
    <div className="sidebar-header d-flex align-items-center">
      {showMini ? (
        <div className="mini-logo">
          <img
            className="mini-logo-img"
            alt="..."
            src="https://previews.123rf.com/images/greyjj/greyjj1407/greyjj140700009/29991248-baseball-field-ball-and-bat-composition.jpg"
          />
          <img
            className="mini-logo-img-hover"
            alt="..."
            src="https://previews.123rf.com/images/greyjj/greyjj1407/greyjj140700009/29991248-baseball-field-ball-and-bat-composition.jpg"
          />
        </div>
      ) : (
        <img
          alt="..."
          src="https://www.embroiderypanda.com/image/cache/data/A-new2/Baseball-Bats-Crossed-in-the-middle-Applique-with-a-baseball-Design-Machine-Embroidery-Digitized-Pattern---Instant-Download---4x4--5x76x10-300x300.jpg"
        />
      )}
    </div>
  );
};

export default SidenavLogo;
