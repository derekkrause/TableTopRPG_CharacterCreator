import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfileBanner.css";

const IconButtonGroup = ({ isVertical }) => {
  return (
    <div>
      {/* <ButtonGroup className="float-right" vertical={isVertical}> */}
      <button className="btn-lg btn-default mx-2 profileButtonPressedAnimation">
        <i className="zmdi zmdi-account-add zmdi-hc-fw " />
      </button>
      <button className="fistbump-button btn-lg btn-default mx-2 profileButtonPressedAnimation">
        <FontAwesomeIcon icon="hand-rock" className="fistbump-animate" />

        {/* <i className="zmdi zmdi-thumb-up zmdi-hc-fw " /> */}
      </button>
      <button className="btn-lg btn-default mx-2 profileButtonPressedAnimation message-button">
        <i className="zmdi zmdi-mail-send zmdi-hc-fw message-animate" />
      </button>
      {/* </ButtonGroup> */}
    </div>
  );
};

export default IconButtonGroup;
