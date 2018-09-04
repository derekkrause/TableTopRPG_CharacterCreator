import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export default class AthleteProfilePopver extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  handleDeleteToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    this.props.handleDelete();
  };

  handleUpdateToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    this.props.handleUpdate();
  };

  render() {
    return (
      <div ref={this.feedRef}>
        <Button id={"Popover-" + this.props.popover} onClick={this.toggle} className="ash p-0 mb-0">
          <i className="zmdi zmdi-more zmdi-hc-2x" />
        </Button>
        <Popover
          style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "7px", paddingBottom: "7px" }}
          placement="bottom"
          isOpen={this.state.popoverOpen}
          target={"Popover-" + this.props.popover}
          toggle={this.toggle}
        >
          <PopoverBody className=" p-1">
            <div className="mt-2">
              <Button className="btn m-auto px-1 ash" onClick={this.handleUpdateToggle}>
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
