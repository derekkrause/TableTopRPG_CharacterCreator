import React, { Component } from "react";
import { Button, Container, Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import {
  getEventTypeById,
  createEventTypePost,
  updateEventTypePut,
  deleteEventTypeDelete
} from "../../../services/EventType.service";

class EventTypeForm extends Component {
  state = {
    name: "",
    code: "",
    displayOrder: 0,
    inactive: false,
    id: 0,
    eventTypeItem: {},
    inEditMode: false,

    cancelAlert: null,
    deleteAlert: null
  };

  emptyState = {
    name: "",
    code: "",
    displayOrder: 0,
    inactive: false,
    id: 0
  };

  handlerInactive = e => {
    this.setState({ inactive: e.target.value === "true" });
  };

  getEventTypeInfo = eventTypeId => {
    console.log("Getting Event Type ID: ", eventTypeId);

    getEventTypeById(eventTypeId)
      .then(response => {
        console.log("Event Type Get by ID GET Ajax request success!");
        console.log(response);

        this.setState({
          name: response.data.item.name,
          code: response.data.item.code,
          displayOrder: response.data.item.displayOrder,
          inactive: response.data.item.inactive,
          id: response.data.item.id,
          eventTypeItem: response.data.item,
          inEditMode: true
        });
      })
      .catch(error => {
        console.log("Event Type Get by ID GET Ajax request failed!");
        console.log(error);
      });
  };

  handlerCreateBtn = () => {
    // Create button
    const newEventType = this.readForm();

    console.log("Creating new Event Type: ", newEventType);

    createEventTypePost(newEventType)
      .then(response => {
        console.log("Create Event Type POST Ajax request success!");
        console.log(response);

        this.clearForm();

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("Create Event Type POST Ajax request failed!");
        console.log(error);
      });
  };

  handlerSaveBtn = () => {
    // Save button
    const editEventType = this.readForm();

    editEventType.id = this.state.id;

    console.log("Updating Event Type: ", editEventType);

    updateEventTypePut(editEventType)
      .then(response => {
        console.log("Update Event Type PUT Ajax request success!");
        console.log(response);

        this.clearForm();
        this.setState({ inEditMode: false });

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("Update Event Type PUT Ajax request failed!");
        console.log(error);
      });
  };

  handlerDeleteBtn = () => {
    // Delete button
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
  };

  handlerCancelBtn = () => {
    // Cancel Button
    console.log("Cancel button clicked!");

    const getAlert = () => (
      <SweetAlert
        info
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="info"
        cancelBtnText="No"
        cancelBtnBsStyle="default"
        title="Cancel Event Type Form Entry?"
        onConfirm={this.cancelEventTypeForm}
        onCancel={this.cancelAlert}
      />
    );

    this.setState({ cancelAlert: getAlert() });
  };

  cancelEventTypeForm = () => {
    console.log("Cancel Event Type Form Entry!");

    this.clearForm();

    this.setState({ cancelAlert: null });

    this.props.history.goBack();
  };

  cancelAlert = () => {
    this.setState({ cancelAlert: null });
  };

  readForm = () => ({
    name: this.state.name,
    code: this.state.code,
    displayOrder: this.state.displayOrder,
    inactive: this.state.inactive
  });

  clearForm = () => {
    this.setState(this.emptyState);
  };

  deleteEventType = () => {
    const eventTypeId = this.state.id;

    console.log("Deleting Event Type ID: ", eventTypeId);

    this.setState({ deleteAlert: null });

    // deleteEventTypeDelete(eventTypeId)
    //   .then(response => {
    //     console.log("Delete Event Type DELETE Ajax request success!");
    //     console.log(response);

    //     this.setState({ deleteAlert: null });

    //     this.props.history.goBack();
    //   })
    //   .catch(error => {
    //     console.log("Delete Event Type DELETE Ajax request failed!");
    //     console.log(error);
    //   });
  };

  cancelDeleteEventType = () => {
    this.setState({ deleteAlert: null });
  };

  componentDidMount() {
    console.log("EventTypeForm Component Mounted");

    const eventTypeId = this.props.match.params.eventTypeId;

    // console.log("EventTypeForm eventId: ", eventTypeId);
    // console.log("EventTypeForm props: ", this.props);

    if (eventTypeId) {
      console.log("EventTypeForm eventId: ", eventTypeId);

      this.getEventTypeInfo(eventTypeId);
    } else {
      this.setState({ inEditMode: false });
    }
  }

  render() {
    const { inEditMode } = this.state;
    let CreateSaveButton, DeleteButton;

    if (inEditMode) {
      CreateSaveButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerSaveBtn}>
          Save
        </Button>
      );
      DeleteButton = (
        <Button color="danger" className="jr-btn" onClick={this.handlerDeleteBtn}>
          Delete
        </Button>
      );
    } else {
      CreateSaveButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerCreateBtn}>
          Create
        </Button>
      );
      DeleteButton = null;
    }

    const { cancelAlert, deleteAlert } = this.state;

    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration-3">
          <div className="jr-card">
            <Container>
              <Form>
                <Row className="justify-content-between">
                  <Col className="col-auto mr-auto">
                    <h1>Event Type Form</h1>
                  </Col>
                  <Col className="col-auto">
                    <FormGroup>
                      <Button color="default" className="jr-btn" onClick={this.handlerCancelBtn}>
                        Cancel
                      </Button>
                      {DeleteButton}
                      {CreateSaveButton}
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label>Event Type Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Event Type Code</Label>
                  <Input
                    type="text"
                    name="code"
                    id="code"
                    value={this.state.code}
                    onChange={e => this.setState({ code: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Event Type Display Order</Label>
                  <Input
                    type="text"
                    name="displayOrder"
                    id="displayOrder"
                    value={this.state.displayOrder}
                    onChange={e => this.setState({ displayOrder: e.target.value })}
                  />
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend>Event Type Inactive?</legend>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radioInactive"
                        value="true"
                        onChange={this.handlerInactive}
                        checked={this.state.inactive}
                      />
                      True
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="radioInactive"
                        value="false"
                        onChange={this.handlerInactive}
                        checked={!this.state.inactive}
                      />
                      False
                    </Label>
                  </FormGroup>
                </FormGroup>
              </Form>
            </Container>
          </div>
        </div>
        {cancelAlert} {deleteAlert}
      </div>
    );
  }
}

export default EventTypeForm;
