import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export default class CoachProfilePopover extends React.Component {
  render() {
    return (
      <div ref={this.feedRef}>
        <Popover
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "7px", paddingBottom: "7px" }}
          placement="bottom"
          isOpen={this.props.popoverOpen}
          onBlur={this.props.popoverToggle}
          target={"Popover-" + this.props.popover}
        >
          <PopoverBody className=" p-1">
            <div className="mt-2">
              <Button className="btn m-auto px-1 ash" onClick={this.props.editing}>
                <i className="zmdi zmdi-edit zmdi-hc-lg" />
                &nbsp; Edit
              </Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
