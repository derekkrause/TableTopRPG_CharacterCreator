import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import CardLayout from "../../components/CardLayout";

import "./EventView.css";
import { getEventById } from "../../services/Event.service";
import { getEventTypeById } from "../../services/EventType.service";

class EventView extends Component {
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
    street: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    lat: 0.0,
    long: 0.0,
    eventId: 0,
    eventItem: {},
    organizerUser: {},
    eventTypeItem: {}
  };

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

  getEventTypeInfo(eventTypeId) {
    console.log("eventTypeId: ", eventTypeId);

    getEventTypeById(eventTypeId)
      .then(response => {
        console.log("Get by EventType Id Ajax GET request success!");
        console.log(response);

        this.setState({ eventTypeItem: response.data.item });
      })
      .catch(error => {
        console.log("Get by EventType Id Ajax GET request failed!");
        console.log(error);
      });
  }

  componentDidMount() {
    const defaultEventId = 8; // University of Phoenix Stadium, ID = 14
    const userId = this.props.match.params.userId;

    const eventId = this.props.match.params.eventId;

    console.log("eventId: ", eventId);

    if (eventId) {
      this.getEventInfo(eventId);
    } else {
      this.getEventInfo(defaultEventId);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.eventTypeId !== prevState.eventTypeId) {
      const eventTypeId = this.state.eventTypeId;

      this.getEventTypeInfo(eventTypeId);
    }
  }

  render() {
    const lat = this.state.lat,
      long = this.state.long;

    let styleName = this.props.styleName;
    if (!styleName) {
      styleName = "embed-responsive-21by9";
    }

    const SimpleMapGoogleMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: this.state.lat, lng: this.state.long }} />
    ));

    return (
      <div>
        {/* Begin content */}
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="box">
              <div className="flex-title">
                {/* Event Title card */}
                <div className="jr-card">
                  <h4 className="text-muted">{new Date(this.state.startDate).toDateString()}</h4>
                  <h3 className="card-title my-2">{this.state.name}</h3>
                  <div className="text-muted mb-3">Organized by {this.state.organizer}</div>
                  <p className="h4 text-muted">{this.state.shortName}</p>
                  <p className="h4 text-muted">Event Type: {this.state.eventTypeItem.name}</p>
                  <p className="h4 text-muted">
                    <a href={this.state.websiteUrl} target="_blank">
                      {this.state.websiteUrl}
                    </a>
                  </p>
                  <NavLink
                    // className="btn btn-light jr-btn-rounded"
                    to={`${this.props.eventBaseUrl}/form/${this.state.eventId}`}
                    target="_blank"
                  >
                    <Button color="primary" className="jr-btn">
                      Edit Event
                    </Button>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="box box-two">
              {/* Event Date card */}
              <div className="flex-one">
                <div className="jr-card">
                  <h3>Start Date: {new Date(this.state.startDate).toDateString()}</h3>
                  <h3>End Date: {new Date(this.state.endDate).toDateString()}</h3>
                  <h3>Location:</h3>
                  <h4>
                    <p>
                      {this.state.street}, Suite {this.state.suite}
                    </p>
                    <p>
                      {this.state.city}, {this.state.state} {this.state.zip}
                    </p>
                  </h4>
                  <div>
                    <SimpleMapGoogleMap
                      containerElement={<div className={`embed-responsive ${styleName}`} />}
                      mapElement={<div className="embed-responsive-item" />}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-two">
                {/* Event Logo card */}
                <CardLayout styleName="col-lg-6">
                  <img
                    className="card-img-top"
                    // src="http://via.placeholder.com/500x330"
                    src={this.state.logo}
                    alt="Card image cap"
                  />
                </CardLayout>
                <div className="jr-card">
                  <h3 className="card-title my-2">Description</h3>
                  <p className="h4 text-muted">{this.state.description}</p>
                </div>
                <div className="jr-card">
                  <h4 className="text-muted">Attendees</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End content */}
      </div>
    );
  }
}

export default EventView;
