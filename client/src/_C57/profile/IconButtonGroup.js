import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ProfileBanner.css";

const IconButtonGroup = ({ isVertical }) => {
  return (
    <ButtonGroup className="float-right" vertical={isVertical}>
      <Button color="default" className="jr-btn jr-btn-default">
        <i className="zmdi zmdi-account-add zmdi-hc-fw " />
      </Button>
      <Button color="default" className="jr-btn jr-btn-default">
        <FontAwesomeIcon icon="hand-rock" className="fistbump-animate" />

        {/* <i className="zmdi zmdi-thumb-up zmdi-hc-fw " /> */}
      </Button>
      <Button color="default" className="jr-btn jr-btn-default">
        <i className="zmdi zmdi-mail-send zmdi-hc-fw" />
      </Button>
    </ButtonGroup>
  );
};

export default IconButtonGroup;
