import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class EventModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  submitAndClose = () => {
    this.props.submitGame();
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="text-center">
        <Button className="jr-btn btn-primary text-white mb-0" color="primary" onClick={this.toggle}>
          + Add Game
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add Game</ModalHeader>
          <ModalBody>
            <h4>Game Info</h4>
            <div className="form-group mt-2">
              <div className="row">
                <div className="col-md-5">
                  <input
                    type="text"
                    name="gameTeam"
                    className="form-control"
                    onChange={this.props.handleGameChange}
                    placeholder="Your Team..."
                  />
                </div>
                <div className="col-md-1">
                  <label className="mb-2 text-center">VS</label>
                </div>
                <div className="col-md-5">
                  <input
                    type="text"
                    name="gameOpponent"
                    className="form-control"
                    onChange={this.props.handleGameChange}
                    placeholder="Opponent..."
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-5">
                  <label className="mb-2">Time</label>
                  <input
                    type="datetime-local"
                    name="gameTime"
                    className="form-control"
                    onChange={this.props.handleGameChange}
                    placeholder="When?"
                  />
                </div>
                <div className="col-md-1" />
                <div className="col-md-5">
                  <label className="mb-2">Location</label>
                  <input
                    type="text"
                    name="gameLocation"
                    className="form-control"
                    onChange={this.props.handleGameChange}
                    placeholder="Where?"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="mb-2">Notes</label>
                  <input
                    type="text"
                    name="gameDescription"
                    className="form-control"
                    onChange={this.props.handleGameChange}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.submitAndClose}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EventModal;
