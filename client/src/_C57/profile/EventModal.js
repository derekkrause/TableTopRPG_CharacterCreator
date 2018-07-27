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

  render() {
    return (
      <div className="text-center">
        <Button
          className="jr-btn btn-primary text-white mb-0"
          color="primary"
          onClick={this.toggle}
        >
          + Add New Event
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Create Event</ModalHeader>
          <ModalBody>
            Form Fields Here
            <div className="form-group mt-2">
              <label className="mb-2">Event Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Event Name..."
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="link" onClick={this.toggle}>
              Create
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EventModal;
