import React, { Component } from "react";
import { Button } from "reactstrap";
import Geocode from "react-geocode";

import CardBox from "../../components/CardBox";
// import CustomDateTimePicker from "./CustomDateTimePicker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

import { getEventById, createEventPost, editEventPut } from "../../services/Event.service";
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
    imageUrl: "Image URL",

    inEditMode: false,

    startSelectedDay: undefined,
    startIsDisabled: false,
    endSelectedDay: undefined,
    endIsDisabled: false
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

  handleStartDayChange(startSelectedDay, modifiers) {
    this.setState({
      startSelectedDay,
      startIsDisabled: modifiers.disabled === true
    });
  }

  handleEndDayChange(endSelectedDay, modifiers) {
    this.setState({
      endSelectedDay,
      endIsDisabled: modifiers.disabled === true
    });
  }

  handlerCreateEvent = event => {
    event.preventDefault();

    const newAddress = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };

    this.convertAddressToLatLng(newAddress);

    const newEvent = this.readForm();

    this.createEvent(newEvent);
  };

  handlerEditEvent = event => {
    event.preventDefault();

    const modifyUser = 4;

    const editAddress = {
      street: this.state.street,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    };

    this.convertAddressToLatLng(editAddress);

    const editedEvent = this.readForm();

    editedEvent.ModifiedBy = modifyUser;
    editedEvent.Id = this.state.eventId;

    this.editEvent(editedEvent);
  };

  checkIsOngoing() {
    const isOngoing = this.state.isOngoing;

    // if (newEvent.IsOngoing === "true") {
    //   newEvent.IsOngoing = true;
    // }

    // if (newEvent.IsOngoing === "false") {
    //   newEvent.IsOngoing = false;
    // }

    if (isOngoing === "true") {
      editedEvent.IsOngoing = true;
    }

    if (isOngoing === "false") {
      editedEvent.IsOngoing = false;
    }
  }

  handlerIsOngoing = e => {
    this.setState({ isOngoing: e.target.value === "true" });
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

        this.clearForm();
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
      })
      .catch(error => {
        console.log("Edit Event Ajax PUT request failed!");
        console.log(error);
      });
  };

  getEventInfo(eventId) {
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
  }

  updateEventStates(responseDataItem) {
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
      eventItem: responseDataItem
    });
  }

  convertLatLngToAddress(lat, long) {
    const sampleLatLong = ["48.8583701", "2.2922926"];

    Geocode.fromLatLng(lat, long).then(
      response => {
        const address = response.results[0].formatted_address;
        console.log(address);
      },
      error => {
        console.error(error);
      }
    );
  }

  convertAddressToLatLng(addressObj) {
    const sampleAddress = "Eiffel Tower";

    const address = `${addressObj.street}, ${addressObj.city}, ${addressObj.state} ${addressObj.zip}`;

    console.log("Converting from address: ", address);
    console.log("to Lat/Long coordinates...");

    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        this.setState({ lat: lat, long: lng });
      },
      error => {
        console.error(error);
      }
    );
  }

  componentDidMount = () => {
    const currentUser = 3,
      ongoing = true;

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

    const eventId = this.props.match.params.eventId;

    console.log("Form eventId: ", eventId);

    if (eventId) {
      this.getEventInfo(eventId);
      this.setState({ inEditMode: true });
    } else {
      this.setState({
        createdBy: currentUser,
        modifiedBy: currentUser,
        isOngoing: ongoing,
        inEditMode: false
      });
      this.setState(userData);
    }

    const googleApiKey = "AIzaSyD7iu5CfoFeysqETwfFNxbBnnwupWKewWU";

    Geocode.setApiKey(googleApiKey);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentEventId = this.props.currentEventId;

    if (this.state.currentEventId !== prevState.currentEventId) {
      this.setState({ currentEventId: currentEventId, inEditMode: true });
    }
  };

  render() {
    let showButton;

    if (this.state.inEditMode) {
      showButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerEditEvent}>
          Edit Event
        </Button>
      );
    } else {
      showButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerCreateEvent}>
          Create Event
        </Button>
      );
    }

    let customRadioButtons;

    if (this.state.isOngoing) {
      customRadioButtons = (
        <div>
          <div className="custom-control custom-radio mr-4">
            <input
              type="radio"
              id="customRadioTrue"
              name="customRadioOngoing"
              className="custom-control-input"
              value="true"
              onChange={this.handlerIsOngoing}
              checked
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
            />
            <label className="custom-control-label" htmlFor="customRadioFalse">
              False
            </label>
          </div>
        </div>
      );
    } else {
      customRadioButtons = (
        <div>
          <div className="custom-control custom-radio mr-4">
            <input
              type="radio"
              id="customRadioTrue"
              name="customRadioOngoing"
              className="custom-control-input"
              value="true"
              onChange={this.handlerIsOngoing}
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
              checked
            />
            <label className="custom-control-label" htmlFor="customRadioFalse">
              False
            </label>
          </div>
        </div>
      );
    }

    const { startSelectedDay, startIsDisabled } = this.state;
    const { endSelectedDay, endIsDisabled } = this.state;

    console.log("render", this.state.isOngoing);

    return (
      <div>
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <h2>Event Form</h2>
            <div className="row">
              <CardBox styleName="col-lg-12">
                <form className="row" noValidate autoComplete="off">
                  <div className="col-md-4 col-12 mt-4">
                    <label>Event Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Event Name"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Short Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Short Name"
                      value={this.state.shortName}
                      onChange={e => this.setState({ shortName: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Event Type</label>
                    <select className="form-control">
                      <option>Event Type</option>
                      <option>$</option>
                      <option>€</option>
                      <option>฿</option>
                      <option>¥</option>
                    </select>
                  </div>

                  <div className="col-md-4 col-12 mt-4">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">Description</label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="2"
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
                      placeholder="Website URL"
                      value={this.state.websiteUrl}
                      onChange={e => this.setState({ websiteUrl: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 col-12 mt-4">
                    <label>Logo</label>
                    <input className="form-control" type="text" placeholder="Logo" value={this.state.logo} />
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
                      placeholder="Organizer"
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
                        placeholder="Street"
                        value={this.state.street}
                        onChange={e => this.setState({ street: e.target.value })}
                      />
                    </div>
                    <div className="col-md-4 col-12 mt-4">
                      <label>Suite</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Suite"
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
                        placeholder="City"
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
                        placeholder="State"
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
                        placeholder="Zip"
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
                          {!startSelectedDay && "🤔 Type or pick a valid day"}
                          {startSelectedDay && startIsDisabled && "😡 This day is disabled"}
                          {startSelectedDay &&
                            !startIsDisabled &&
                            `😄 You chose ${startSelectedDay.toLocaleDateString()}`}
                        </p>
                        <DayPickerInput
                          value={startSelectedDay}
                          onDayChange={this.handleStartDayChange}
                          dayPickerProps={{
                            selectedDays: startSelectedDay,
                            disabledDays: {
                              daysOfWeek: [0, 6]
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
                          {!endSelectedDay && "🤔 Type or pick a valid day"}
                          {endSelectedDay && endIsDisabled && "😡 This day is disabled"}
                          {endSelectedDay && !endIsDisabled && `😄 You chose ${endSelectedDay.toLocaleDateString()}`}
                        </p>
                        <DayPickerInput
                          value={endSelectedDay}
                          onDayChange={this.handleEndDayChange}
                          dayPickerProps={{
                            selectedDays: endSelectedDay,
                            disabledDays: {
                              daysOfWeek: [0, 6]
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-md-4 col-12 mt-4">{showButton}</div>
                  </div>
                </form>
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
      </div>
    );
  }
}

export default EventForm;
