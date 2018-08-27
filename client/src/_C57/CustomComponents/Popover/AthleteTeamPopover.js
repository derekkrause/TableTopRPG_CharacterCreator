import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

export default class AthleteTeamPopover extends React.Component {
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

  addNewToggle = () => {
    this.setState({ popoverOpen: !this.state.popoverOpen });
    this.props.onAddNewToggle();
  };

  handleDeleteToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    this.props.onDelete();
  };

  handleUpdateToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
    this.props.onEditClick();
  };
  render() {
    return (
      <div>
        <Button id={"Popover-" + this.props.popover} onClick={this.toggle} className="ash">
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
            <div>
              <Button className="btn m-auto px-1 ash" onClick={this.addNewToggle}>
                <i className="zmdi zmdi-delete zmdi-edit zmdi-hc-lg" />
                &nbsp; Add New
              </Button>
            </div>
            <div className="mt-2">
              <Button className="btn m-auto px-1 ash" onClick={this.handleUpdateToggle}>
                <i className="zmdi zmdi-edit zmdi-hc-lg" />
                &nbsp; Edit
              </Button>
            </div>
            <div className="mt-2">
              <Button className="btn m-auto px-1 pb-1 ash" onClick={this.handleDeleteToggle}>
                <i className="zmdi zmdi-delete zmdi-hc-lg" />
                &nbsp; Delete
              </Button>
            </div>
          </PopoverBody>
        </Popover>
      </div>
    );
  }
}
