import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback, FormText } from "reactstrap";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Geocode from "react-geocode";
import PropTypes from "prop-types";

import CardBox from "../../components/CardBox";
import CustomDateTimePicker from "./CustomDateTimePicker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { getEventById, createEventPost, editEventPut, deleteEventDelete } from "../../services/Event.service";
import { getEventTypes } from "../../services/EventType.service";
import FileUploader from "../FileUploader/FileUploader";

class EventForm extends Component {
  state = {
    name: "",
    shortName: "",
    eventTypeId: 0,
    startDate: "",
    endDate: "",
    description: "",
    websiteUrl: "",
    logo: "",
    isOngoing: false,
    organizer: "",
    createdBy: 0,
    modifiedBy: 0,
    street: "",
    suite: "",
    city: "",
    zip: "",
    lat: 0.0,
    long: 0.0,
    eventId: 0,
    eventDataItem: {},

    eventTypeItems: [],

    imageUrl: "Image URL",

    inEditMode: false,

    selectedDay: undefined,
    isDisabled: false,
    selectedDayS: undefined,
    isDisabledS: false,
    selectedDayE: undefined,
    isDisabledE: false,

    cancelAlert: null,
    deleteAlert: null,
    alert: null,
    geocodeAlert: null,

    currentUser: {}
  };

  emptyState = {
    name: "",
    shortName: "",
    eventTypeId: 0,
    startDate: "",
    endDate: "",
    description: "",
    websiteUrl: "",
    logo: "",
    isOngoing: true,
    organizer: "",
    createdBy: 0,
    modifiedBy: 0,
    street: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    lat: 0.0,
    long: 0.0
  };

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });

    this.setState({ logo: imageUrl });
  };

  // handleDayChange = this.handleDayChange.bind(this);

  handleDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDay,
      isDisabled: modifiers.disabled === true
    });
  };

  handleStartDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDayS: selectedDay,
      isDisabledS: modifiers.disabled === true
    });

    const { inEditMode, selectedDayE } = this.state;

    if (!inEditMode && !selectedDayE) {
      this.setState({ selectedDayE: selectedDay, startDate: selectedDay, endDate: selectedDay });
    } else {
      this.setState({ startDate: selectedDay });
    }
  };

  handleEndDayChange = (selectedDay, modifiers) => {
    this.setState({
      selectedDayE: selectedDay,
      isDisabledE: modifiers.disabled === true
    });

    this.setState({ endDate: selectedDay });
  };

  handlerCreateEvent = () => {
    const createdUser = this.state.currentUser.id;

    const newAddress = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };

    const address = `${newAddress.street}, ${newAddress.city}, ${newAddress.state} ${newAddress.zip}`;

    console.log("Converting from address: ", address);
    console.log("to Lat/Long coordinates...");

    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        this.setState({ lat: lat, long: lng }, () => {
          const newEvent = this.readForm();

          newEvent.CreatedBy = createdUser;
          newEvent.ModifiedBy = createdUser;

          this.createEvent(newEvent);
        });
      },
      error => {
        console.error(error);

        console.log("Cannot save Lat/Long coordinates from address. Creating event anyway.");

        const newEvent = this.readForm();

        newEvent.CreatedBy = createdUser;
        newEvent.ModifiedBy = createdUser;

        this.createEvent(newEvent);
      }
    );

    // console.log("Conversion is temporily disabled due to API usage issue.");
  };

  handlerEditEvent = () => {
    // const modifyUser = 4;
    const modifyUser = this.state.currentUser.id;

    const editAddress = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };

    const address = `${editAddress.street}, ${editAddress.city}, ${editAddress.state} ${editAddress.zip}`;

    console.log(editAddress);
    console.log("Converting from address: ", address);
    console.log("to Lat/Long coordinates...");

    if (address.street !== "" && address.city !== "" && address.state !== "" && address.zip !== "") {
      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);

          this.setState({ lat: lat, long: lng }, () => {
            const editedEvent = this.readForm();

            editedEvent.ModifiedBy = modifyUser;
            editedEvent.Id = this.state.eventId;

            this.editEvent(editedEvent);
          });
        },
        error => {
          console.error(error);

          console.log("Cannot save Lat/Long coordinates from address. Editing/Updating event anyway.");

          const editedEvent = this.readForm();

          editedEvent.ModifiedBy = modifyUser;
          editedEvent.Id = this.state.eventId;

          this.editEvent(editedEvent);
        }
      );

      // console.log("Conversion is temporily disabled due to API usage issue.");
    } else {
      console.log("Enter a valid address!");

      //       <SweetAlert title="Here's a message!" onConfirm={this.onConfirm}>
      // It's pretty, isn't it?
      // </SweetAlert>

      const getAlert = () => (
        <SweetAlert danger title="Enter a valid address!" onConfirm={() => this.setState({ geocodeAlert: null })} />
      );

      this.setState({ geocodeAlert: getAlert() });
    }
  };

  handlerCancelButton = () => {
    // const getAlert = () => <SweetAlert info title="Cancel Event Form Entry?" onConfirm={this.hideCancelAlert} />;

    const getAlert = () => (
      <SweetAlert
        info
        showCancel
        confirmBtnText="Yes"
        confirmBtnBsStyle="info"
        cancelBtnText="No"
        cancelBtnBsStyle="default"
        title="Cancel Event Form Entry?"
        onConfirm={this.cancelEventForm}
        onCancel={this.cancelAlert}
      />
    );

    this.setState({ cancelAlert: getAlert() });
  };

  handlerDeleteEvent = () => {
    const { createdBy, currentUser } = this.state;

    if (currentUser.id === createdBy) {
      const getAlert = () => (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, delete it!"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title="Are you sure?"
          onConfirm={this.deleteEvent}
          onCancel={this.cancelDeleteEvent}
        >
          You will not be able to recover this event data!
        </SweetAlert>
      );

      this.setState({ deleteAlert: getAlert() });
    } else {
      console.log("You are not the user who created the event! Delete Event error!");
    }
  };

  handlerIsOngoing = e => {
    this.setState({ isOngoing: e.target.value === "true" });
  };

  createNotification = type => {
    // return () => {
    //     switch (type) {
    //         case 'info':
    //             NotificationManager.info(<IntlMessages id="notification.infoMsg"/>);
    //             break;
    //         case 'success':
    //             NotificationManager.success(<IntlMessages id="notification.successMessage"/>, <IntlMessages
    //                 id="notification.titleHere"/>);
    //             break;
    //         case 'warning':
    //             NotificationManager.warning(<IntlMessages id="notification.warningMessage"/>, <IntlMessages
    //                 id="notification.closeAfter3000ms"/>, 3000);
    //             break;
    //         case 'error':
    //             NotificationManager.error(<IntlMessages id="notification.errorMessage"/>, <IntlMessages
    //                 id="notification.clickMe"/>, 5000, () => {
    //                 alert('callback');
    //             });
    //             break;
    //     }
    // };

    return () => {
      switch (type) {
        case "info":
          NotificationManager.info(<IntlMessages id="notification.infoMsg" />);
          break;
        case "success":
          NotificationManager.success("Create Event Success!", "Success!");
          break;
        case "warning":
          NotificationManager.warning(
            <IntlMessages id="notification.warningMessage" />,
            <IntlMessages id="notification.closeAfter3000ms" />,
            3000
          );
          break;
        case "error":
          NotificationManager.error(
            <IntlMessages id="notification.errorMessage" />,
            <IntlMessages id="notification.clickMe" />,
            5000,
            () => {
              alert("callback");
            }
          );
          break;
      }
    };
  };

  cancelEventForm = () => {
    console.log("Cancel Event Form Entry!");

    this.clearForm();

    this.setState({ cancelAlert: null });

    this.props.history.goBack();
  };

  cancelAlert = () => {
    this.setState({ cancelAlert: null });
  };

  deleteEvent = () => {
    const { eventId } = this.state;

    console.log("Deleting Event ID: ", eventId);

    deleteEventDelete(eventId)
      .then(response => {
        console.log("Delete Event Ajax DELETE request success!");
        console.log(response);

        this.clearForm();
        this.setState({ deleteAlert: null });

        this.props.history.push("/app/events");
      })
      .catch(error => {
        console.log("Delete Event Ajax DELETE request failed!");
        console.log(error);
      });
  };

  cancelDeleteEvent = () => {
    this.setState({ deleteAlert: null });
  };

  readForm = () => ({
    Name: this.state.name,
    ShortName: this.state.shortName,
    EventTypeId: this.state.eventTypeId,
    StartDate: this.state.startDate,
    EndDate: this.state.endDate,
    Description: this.state.description,
    WebsiteUrl: this.state.websiteUrl,
    Logo: this.state.logo,
    IsOngoing: this.state.isOngoing,
    Organizer: this.state.organizer,
    CreatedBy: this.state.createdBy,
    ModifiedBy: this.state.modifiedBy,
    Street: this.state.street,
    Suite: this.state.suite,
    City: this.state.city,
    State: this.state.state,
    Zip: this.state.zip,
    Lat: this.state.lat,
    Long: this.state.long
  });

  clearForm = () => {
    this.setState(this.emptyState);
  };

  createEvent = newEvent => {
    console.log("newEvent: ", newEvent);

    createEventPost(newEvent)
      .then(response => {
        console.log("Create Event Ajax POST request success!");
        console.log(response);

        this.createNotification("success");
        this.clearForm();
        this.setState({ inEditMode: false });

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("Create Event Ajax POST request failed!");
        console.log(error);
      });
  };

  editEvent = eventToEdit => {
    console.log("eventToEdit: ", eventToEdit);

    editEventPut(eventToEdit.Id, eventToEdit)
      .then(response => {
        console.log("Edit Event Ajax PUT request success!");
        console.log(response);

        this.clearForm();
        this.setState({ inEditMode: false });

        this.props.history.goBack();
      })
      .catch(error => {
        console.log("Edit Event Ajax PUT request failed!");
        console.log(error);
      });
  };

  getEventInfo = eventId => {
    console.log("Loading event with ID: ", eventId);

    getEventById(eventId)
      .then(response => {
        console.log("Get by Event Id Ajax GET request success!");
        console.log(response);

        this.updateEventStates(response.data.item);
      })
      .catch(error => {
        console.log("Get by Event Id Ajax GET request failed!");
        console.log(error);
      });
  };

  updateEventStates = responseDataItem => {
    console.log("responseDataItem: ", responseDataItem);

    this.setState({
      name: responseDataItem.name,
      shortName: responseDataItem.shortName,
      eventTypeId: responseDataItem.eventTypeId,
      startDate: responseDataItem.startDate,
      endDate: responseDataItem.endDate,
      description: responseDataItem.description,
      websiteUrl: responseDataItem.websiteUrl,
      logo: responseDataItem.logo,
      isOngoing: responseDataItem.isOngoing,
      organizer: responseDataItem.organizer,
      createdBy: responseDataItem.createdBy,
      modifiedBy: responseDataItem.modifiedBy,
      street: responseDataItem.street,
      suite: responseDataItem.suite,
      city: responseDataItem.city,
      state: responseDataItem.state,
      zip: responseDataItem.zip,
      lat: responseDataItem.lat,
      long: responseDataItem.long,
      eventId: responseDataItem.id,
      eventDataItem: responseDataItem
    });

    const startDate = new Date(responseDataItem.startDate);
    const endDate = new Date(responseDataItem.endDate);

    this.setState({
      selectedDayS: startDate,
      selectedDayE: endDate
    });
  };

  getEventTypes = () => {
    getEventTypes()
      .then(response => {
        console.log("Get Event Types GET Ajax Request success!");
        console.log(response);

        const eventTypeItems = response.data.items;

        // console.log("eventTypeItems: ", eventTypeItems);

        this.setState({ eventTypeItems: eventTypeItems });
      })
      .catch(error => {
        console.log("Get Event Types GET Ajax Request failed!");
        console.log(error);
      });
  };

  convertAddressToLatLng = addressObj => {
    const sampleAddress = "Eiffel Tower";

    const address = `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.zip}`;

    console.log("address: ", address);

    if (address) {
      console.log("Converting from address: ", address);
      console.log("to Lat/Long coordinates...");

      Geocode.fromAddress(address).then(
        response => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);

          this.setState({ lat: lat, long: lng }, () => {});
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  componentDidMount = () => {
    console.log("EventForm Component Mounted");

    // const currentUser = 3,
    //   ongoing = true;

    const userData = {
      name: "Excursion: LA Dodgers vs San Diego Padres",
      shortName: "Excursion",
      eventTypeId: 8,
      startDate: "2018-08-25",
      endDate: "2018-08-25",
      description:
        "It's time for Dodger baseball! Join us for a night at the ballpark as one of the most exciting teams in Major League Baseball play the San Diego Padres in a NL West match-up. Get your tickets early as this expected to sell-out quick. This cost of this excursion is $30 per person and we will be seated in the Preferred Reserved section. You may purchase up to 4 tickets for this excursion.",
      websiteUrl:
        "https://www.active.com/santa-fe-springs-ca/baseball/baseball-classes/excursion-la-dodgers-vs-san-diego-padres-2018?int=72-3-A10",
      logo: "https://www.active.com/apple-touch-icon-precomposed.png",
      organizer: "Santa Fe Springs Parks and Recreation",
      street: "11740 E. Telegraph Road",
      suite: "N/A",
      city: "Santa Fe Springs",
      state: "CA",
      zip: "90670"
    };

    const currentUser = this.props.currentUser;

    this.setState({ currentUser: currentUser });

    const eventId = this.props.match.params.eventId;

    console.log("Form eventId: ", eventId);

    if (eventId) {
      this.getEventInfo(eventId);
      this.setState({ inEditMode: true, modifiedBy: currentUser.id });
    } else {
      this.setState(this.emptyState);
      this.setState({ inEditMode: false, createdBy: currentUser.id, modifiedBy: currentUser.id });
    }

    this.getEventTypes();

    const googleApiKey = "AIzaSyA6UaP-xYgEZ1ItLFGYjVYOkN5vKAV_o9A";

    Geocode.setApiKey(googleApiKey);
  };

  componentDidUpdate = (prevProps, prevState) => {
    // const currentEventId = this.props.currentEventId;
    // if (this.state.currentEventId !== prevState.currentEventId) {
    //   this.setState({ currentEventId: currentEventId, inEditMode: true });
    // }
  };

  render() {
    let showEditButton, showDeleteButton;

    if (this.state.inEditMode) {
      showEditButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerEditEvent}>
          Save Event
        </Button>
      );

      showDeleteButton = (
        <Button color="danger" className="jr-btn" onClick={this.handlerDeleteEvent}>
          Delete
        </Button>
      );
    } else {
      showEditButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerCreateEvent}>
          Create Event
        </Button>
      );

      showDeleteButton = null;
    }

    const { selectedDay, isDisabled } = this.state;
    const { selectedDayS, selectedDayE } = this.state;

    // console.log("render", this.state.isOngoing);
    // console.log("render: ");
    // console.log("selectedDay: ", selectedDay);
    // console.log("selectedDayS: ", selectedDayS);
    // console.log("selectedDayE: ", selectedDayE);

    const { eventTypeItems } = this.state;

    // console.log("render eventTypeItems: ", eventTypeItems);

    const { cancelAlert, deleteAlert, geocodeAlert } = this.state;

    return (
      <div>
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="row">
              <CardBox styleName="col-lg-12">
                <Form className="row">
                  <div className="col-md-4 col-12 mt-4">
                    <h1>Event Form</h1>
                  </div>
                  <div className="col-md-4 col-12 mt-4"> </div>
                  <div className="col-md-4 col-12 mt-4">
                    <Button color="default" className="jr-btn" onClick={this.handlerCancelButton}>
                      Cancel
                    </Button>
                    {showDeleteButton}
                    {showEditButton}
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Event Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Short Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.shortName}
                      onChange={e => this.setState({ shortName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Event Type</label>
                    <select className="form-control" onChange={e => this.setState({ eventTypeId: e.target.value })}>
                      <option> </option>
                      {/* <option>$</option>
                      <option>€</option>
                      <option>฿</option>
                      <option>¥</option> */}
                      {eventTypeItems &&
                        eventTypeItems.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-md-4 col-12 mt-4">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Description</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="4"
                        value={this.state.description}
                        onChange={e => this.setState({ description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Website URL</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.websiteUrl}
                      onChange={e => this.setState({ websiteUrl: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Logo</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.logo}
                      onChange={e => this.setState({ logo: e.target.value })}
                    />
                    <FileUploader onImageUrlChange={this.handleImageUrlChange} />
                  </div>
                  <div className="col-sm-8 col-md-4 col-12 mt-4">
                    <h4>Ongoing?</h4>
                    <div className="d-flex row">
                      <div className="custom-control custom-radio mr-4">
                        <input
                          type="radio"
                          id="customRadioTrue"
                          name="customRadioOngoing"
                          className="custom-control-input"
                          value="true"
                          onChange={this.handlerIsOngoing}
                          checked={this.state.isOngoing}
                        />
                        <label className="custom-control-label" htmlFor="customRadioTrue">
                          True
                        </label>
                      </div>
                      <div className="custom-control custom-radio mr-4">
                        <input
                          type="radio"
                          id="customRadioFalse"
                          name="customRadioOngoing"
                          className="custom-control-input"
                          value="false"
                          onChange={this.handlerIsOngoing}
                          checked={!this.state.isOngoing}
                        />
                        <label className="custom-control-label" htmlFor="customRadioFalse">
                          False
                        </label>
                      </div>
                      {/* {customRadioButtons} */}
                      {/* <div className="custom-control custom-radio mr-4">
                        <input
                          type="radio"
                          id="customRadio6"
                          name="customRadio"
                          className="custom-control-input"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customRadio6"
                        >
                          Other
                        </label>
                      </div> */}
                    </div>
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Organizer</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.organizer}
                      onChange={e => this.setState({ organizer: e.target.value })}
                    />
                  </div>

                  <div className="row mb-md-4">
                    <div className="col-md-4 col-12 mt-4">
                      <label>Street</label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.street}
                        onChange={e => this.setState({ street: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 col-12 mt-4">
                      <label>Suite</label>
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.suite}
                        onChange={e => this.setState({ suite: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6 mb-3 col-12 mt-4">
                      <label>City</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationServer03"
                        value={this.state.city}
                        onChange={e => this.setState({ city: e.target.value })}
                        required
                      />
                      <div className="invalid-feedback">Please provide a valid city.</div>
                    </div>
                    <div className="col-md-3 mb-3 col-12 mt-4">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationServer04"
                        value={this.state.state}
                        onChange={e => this.setState({ state: e.target.value })}
                        required
                      />
                      <div className="invalid-feedback">Please provide a valid state.</div>
                    </div>
                    <div className="col-md-3 mb-3 col-12 mt-4">
                      <label>Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        id="validationServer05"
                        value={this.state.zip}
                        onChange={e => this.setState({ zip: e.target.value })}
                        required
                      />
                      <div className="invalid-feedback">Please provide a valid zip.</div>
                    </div>
                    {/* <div className="col-md-4 col-12 mt-4">
                      <label>Latitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Latitude"
                        value={this.state.lat}
                        onChange={e => this.setState({ lat: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 col-12 mt-4">
                      <label>Longitude</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Longitude"
                        value={this.state.long}
                        onChange={e => this.setState({ long: e.target.value })}
                      />
                    </div> */}
                    <div className="col-md-4 col-12 mt-4">
                      <p>Start Date</p>
                      {/* <CustomDateTimePicker /> */}
                      <div>
                        <p>
                          {!selectedDayS && "🤔 Type or pick a valid day"}
                          {selectedDayS && isDisabled && "😡 This day is disabled"}
                          {selectedDayS && !isDisabled && `😄 You chose ${selectedDayS.toLocaleDateString()}`}
                        </p>
                        <DayPickerInput
                          value={selectedDayS}
                          onDayChange={this.handleStartDayChange.bind(this)}
                          dayPickerProps={{
                            selectedDays: selectedDayS,
                            disabledDays: {
                              // daysOfWeek: [0, 6]
                              daysOfWeek: []
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12 mt-4">
                      <p>End Date</p>
                      {/* <CustomDateTimePicker /> */}
                      <div>
                        <p>
                          {!selectedDayE && "🤔 Type or pick a valid day"}
                          {selectedDayE && isDisabled && "😡 This day is disabled"}
                          {selectedDayE && !isDisabled && `😄 You chose ${selectedDayE.toLocaleDateString()}`}
                        </p>
                        <DayPickerInput
                          value={selectedDayE}
                          onDayChange={this.handleEndDayChange.bind(this)}
                          dayPickerProps={{
                            selectedDays: selectedDayE,
                            disabledDays: {
                              // daysOfWeek: [0, 6]
                              daysOfWeek: []
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              </CardBox>
            </div>
          </div>
        </div>
        {/* <div className="animated slideInUpTiny animation-duration-3">
        <ContainerHeader title={<IntlMessages id="sidebar.components.textFields"/>} match={match}/>

        <div className="row mb-md-4">
            <CardBox styleName="col-lg-12" heading={<IntlMessages id="component.textFields.textfield"/>}>
                <TextFields/>
            </CardBox>
        </div>
        </div> */}
        {cancelAlert} {deleteAlert} {geocodeAlert}
        <NotificationContainer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

// export default EventForm;
export default connect(mapStateToProps)(EventForm);
