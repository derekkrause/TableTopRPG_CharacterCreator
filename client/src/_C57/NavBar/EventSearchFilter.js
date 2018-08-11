import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import options from "../profile/data";
import EventStartDatePicker from "./EventStartDatePicker";
import EventEndDatePicker from "./EventEndDatePicker";

import { getEventTypes } from "../../services/EventType.service";

class EventSearchFilter extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true,

    eventTypeOptions: []
  };

  //   handleChange = (event, value) => {
  //     this.setState({ value });
  //   };

  getEventTypesList() {
    getEventTypes()
      .then(response => {
        console.log("Get Event Types GET Ajax Request success!");
        console.log(response);

        const eventTypes = response.data.items;

        this.convertEventTypeObjToArray(eventTypes);
      })
      .catch(error => {
        console.log("Get Event Types GET Ajax Request failed!");
        console.log(error);
      });
  }

  convertEventTypeObjToArray = eventTypes => {
    const eventTypeOptions = eventTypes.map(eType => {
      return eType.name;
    });

    this.setState({ eventTypeOptions: eventTypeOptions });
  };

  componentDidMount() {
    console.log("EventSearchFilter component mounted");

    this.getEventTypesList();
  }

  render() {
    const { eventTypeOptions } = this.state;

    return (
      //---------------------Event Search Filter-------------------------
      <div className="row">
        <div className="col-md-12">
          <h3 className="ml-2 pr-4 mt-2">
            <b>Refine Your Search</b>
          </h3>
          <div className="d-flex flex-row mt-2 justify-content-center mb-2">
            <h4>Location&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="locationFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify state..."
              value={this.props.locationFilter}
              onChange={this.props.handleTypeAheadChange("locationFilter")}
            />
            &nbsp;
            <h4>Event Type&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="evenTypeFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={eventTypeOptions}
              placeholder="Specify event type..."
              value={this.props.eventTypeFilter}
              onChange={this.props.handleTypeAheadChange("eventTypeFilter")}
            />
            &nbsp;
            <h4>Event Dates&nbsp;</h4>
            <p className="text-center">
              Start
              <EventStartDatePicker
                handleDateChange={this.props.handleDateChange}
                handleChange={this.props.handleChange}
                eventStartDateFilter={this.props.eventStartDateFilter}
              />
            </p>
            <p className="text-center">
              End
              <EventEndDatePicker
                handleDateChange={this.props.handleDateChange}
                handleChange={this.props.handleChange}
                eventEndDateFilter={this.props.eventEndDateFilter}
              />
            </p>
            {/* <Typeahead
              className="pr-3"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify event dates..."
              value={this.props.eventDateFilter}
              onChange={this.props.handleChange}
            /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default EventSearchFilter;
