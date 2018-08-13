import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Table } from "reactstrap";
import { NavLink } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";

import EventTypeForm from "./EventTypeForm";
import { updateEventTypePut, deleteEventTypeDelete } from "../../../services/EventType.service";

class EventTypeTableCell extends Component {
  state = {
    id: 0,
    modal: false,
    deleteAlert: null
  };

  handlerDeleteBtn = () => {
    // Delete button

    // console.log("Button props: ", this.props);

    const getAlert = () => (
      <SweetAlert
        warning
        showCancel
        confirmBtnText="Yes, delete it!"
        confirmBtnBsStyle="danger"
        cancelBtnBsStyle="default"
        title="Are you sure?"
        onConfirm={this.deleteEventType}
        onCancel={this.cancelDeleteEventType}
      >
        You will not be able to recover this event type data!
      </SweetAlert>
    );

    this.setState({ deleteAlert: getAlert() });

    const eventTypeId = this.props.data.id;

    this.setState({ id: eventTypeId });
  };

  deleteEventType = () => {
    const eventTypeId = this.state.id;

    console.log("Deleting Event Type ID: ", eventTypeId);

    // this.setState({ deleteAlert: null });

    deleteEventTypeDelete(eventTypeId)
      .then(response => {
        console.log("Delete Event Type DELETE Ajax request success!");
        console.log(response);

        this.setState({ deleteAlert: null });
        this.props.history.goBack();
      })
      .catch(error => {
        console.log("Delete Event Type DELETE Ajax request failed!");
        console.log(error);
      });
  };

  cancelDeleteEventType = () => {
    this.setState({ deleteAlert: null });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });

    console.log("toggle called!");
  }

  componentDidMount() {
    console.log("EventTypeTableCells Component Mounted");
  }

  render() {
    const { data } = this.props;

    this.toggle = this.toggle.bind(this);

    // console.log("props: ", this.props);

    const { deleteAlert } = this.state;

    return (
      <tr key={data.id} eventTypeId={data.id}>
        <td>
          <NavLink to={`${this.props.match.url}/form/${data.id}`}>
            <button className="btn btn-link">Edit</button>
          </NavLink>
          <button className="btn btn-link" onClick={this.handlerDeleteBtn}>
            Delete
          </button>
        </td>
        <td>{data.name}</td>
        <td>{data.code}</td>
        {/* <td>{data.displayOrder}</td>
        <td>{data.inactive ? "true" : "false"}</td> */}
        <td>
          {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Use Google's location service?</ModalHeader>
            <ModalBody>
              <EventTypeForm data={data} />
            </ModalBody>
            <ModalFooter>
              <Button color="link" onClick={this.toggle}>
                {" "}
                Disagree
              </Button>{" "}
              <Button color="link" onClick={this.toggle}>
                {" "}
                Agree
              </Button>
            </ModalFooter>
          </Modal> */}
          {deleteAlert}
        </td>
      </tr>
    );
  }
}

export default EventTypeTableCell;
