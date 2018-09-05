import React, { Component, Redirect } from "react";
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
    eventTypeOptions: [],
    toEventsSearch: false
  };

  //   handleChange = (event, value) => {
  //     this.setState({ value });
  //   };

  getEventTypesList() {
    getEventTypes()
      .then(response => {
        // console.log("EventSearchFilter Get Event Types GET Ajax Request success!");
        // console.log(response);

        const eventTypes = response.data.items;

        this.convertEventTypeObjToArray(eventTypes);
      })
      .catch(error => {
        // console.log("EventSearchFilter Get Event Types GET Ajax Request failed!");
        // console.log(error);
      });
  }

  convertEventTypeObjToArray = eventTypes => {
    const eventTypeOptions = eventTypes.map(eType => {
      return eType.name;
    });

    this.setState({ eventTypeOptions: eventTypeOptions, toEventsSearch: true }, () => {
      // console.log("EventSearchFilter props: ", this.props);
      // this.props.history.push("/app/search/events");
    });
  };

  componentDidMount() {
    // const {searchCriteria} = this.props;

    // console.log("EventSearchFilter component mounted");

    // console.log("EventSearchFilter redux props: ", this.props);

    this.getEventTypesList();

    // let currentDate = new Date(Date.now());

    // console.log("EventSearchFilter currentDate: ", currentDate);

    // this.props.handleDateChange(selectedDay, "eventStartDateFilter");
    // this.props.handleDateChange(currentDate, "eventStartDateFilter");
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props !== prevProps) {
  //     console.log("EventSearchFilter component updated via props: ", this.props);
  //   }

  //   if (this.props.searchCriteria !== prevProps.searchCriteria) {
  //     console.log("EventSearchFilter component updated via props searchCriteria: ", this.props.searchCriteria);
  //   }
  // }

  componentWillUnmount() {
    // console.log("EventSearchFilter component will unmount");
    // console.log("Unmount props: ", this.props);

    let currentDate = new Date(Date.now());

    // this.props.setSearchCriteria({
    //   locationFilter: "",
    //   eventTypeFilter: "",
    //   eventStartDateFilter: currentDate,
    //   eventEndDateFilter: ""
    // });
  }

  render() {
    const { eventTypeOptions, toEventsSearch } = this.state;

    // if (toEventsSearch === true) {
    //   return <Redirect to="/app/search/events" />;
    // }

    // console.log("EventSearchFilter render props: ", this.props);

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
              name="eventTypeFilter"
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
            <div className="text-center">
              {/* <p className="text-center"> */}
              Start
              <EventStartDatePicker
                handleDateChange={this.props.handleDateChange}
                handleChange={this.props.handleChange}
                eventStartDateFilter={this.props.eventStartDateFilter}
              />
              {/* </p> */}
            </div>
            &nbsp;
            <div className="text-center">
              {/* <p className="text-center"> */}
              End
              <EventEndDatePicker
                handleDateChange={this.props.handleDateChange}
                handleChange={this.props.handleChange}
                eventEndDateFilter={this.props.eventEndDateFilter}
              />
              {/* </p> */}
            </div>
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
