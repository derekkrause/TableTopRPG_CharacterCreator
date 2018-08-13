import React, { Component } from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { GoogleMap, InfoWindow, Marker, withGoogleMap } from "react-google-maps";

import CardLayout from "../../components/CardLayout";

import "./EventView.css";
import { getEventById, getEventByIdWithUser } from "../../services/Event.service";
import { getEventTypeById } from "../../services/EventType.service";
import EventAttendeesList from "./EventAttendeesList";
import {
  createEventUserPost,
  getEventUsersListByEventIdGet,
  deleteEventUserByEventIdUserIdDelete,
  getEventAttendeesListGet
} from "../../services/EventUser.service";

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
    createdBy: null,
    street: "",
    suite: "",
    city: "",
    state: "",
    zip: "",
    lat: 0.0,
    long: 0.0,
    eventId: null,
    eventItem: {},
    organizerUser: {},
    eventTypeItem: {},
    currentUser: {},
    attendingEvent: false,
    eventDataItem: {},
    attendeesList: []
  };

  handlerAttendEventBtn = () => {
    console.log("Attend Event button clicked!");

    const { currentUser, eventId } = this.state;
    const userId = currentUser.id;

    // console.log("currentUser: ", currentUser);
    // console.log("userId: ", userId);
    // console.log("eventId: ", eventId);

    const attendEventUser = { EventId: eventId, UserId: userId };

    console.log("attendEventUser: ", attendEventUser);

    createEventUserPost(attendEventUser)
      .then(response => {
        console.log("Create EventUser Ajax POST request success!");
        console.log(response);

        this.setState({ attendingEvent: true }, () => {
          const { eventId } = this.state;

          this.getEventInfo(eventId);
        });
      })
      .catch(error => {
        console.log("Create EventUser Ajax POST request failed!");
        console.log(error);
      });
  };

  handlerDontAttendEventBtn = () => {
    console.log("Don't Attend Event button clicked!");

    const { currentUser, eventId } = this.state;
    const userId = currentUser.id;

    // console.log("currentUser: ", currentUser);
    // console.log("userId: ", userId);
    // console.log("eventId: ", eventId);

    const dontAttendEventUser = { EventId: eventId, UserId: userId };

    console.log("dontAttendEventUser: ", dontAttendEventUser);

    deleteEventUserByEventIdUserIdDelete(dontAttendEventUser)
      .then(response => {
        console.log("Delete EventUser Ajax DELETE request success!");
        console.log(response);

        this.setState({ attendingEvent: false }, () => {
          const { eventId } = this.state;

          this.getEventInfo(eventId);
        });
      })
      .catch(error => {
        console.log("Delete EventUser Ajax DELETE request failed!");
        console.log(error);
      });
  };

  handlerGoBackBtn = () => {
    console.log("Go Back button clicked!");

    // this.props.history.goBack();
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
      createdBy: responseDataItem.createdBy,
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

        this.getEventAttendees(response.data.item.id);
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

  getEventItem(eventId) {
    getEventByIdWithUser(eventId)
      .then(response => {
        console.log("Get by Event ID with User Ajax GET request success!");
        console.log(response);

        this.setState({
          eventDataItem: response.data.item
          // isSuccessful: response.data.isSuccessful
        });
      })
      .catch(error => {
        console.log("Get by Event ID with User Ajax GET request error!");
        console.log(error);
      });

    getEventUsersListByEventIdGet(eventId)
      .then(response => {
        console.log("Get EventUsers List by Event ID Ajax GET request success!");
        console.log(response);

        const attendeesList = response.data.items;

        this.setState({ attendeesList: attendeesList });
      })
      .catch(error => {
        console.log("Get EventUsers List by Event ID Ajax GET request failed!");
        console.log(error);
      });
  }

  findUserInAttendees = attendeesList => {
    console.log("EventView attendeesList: ", attendeesList);

    const { currentUser, createdBy } = this.state;

    // Check if currentUser is attending the event
    const userInAttendees = attendeesList.find(user => {
      return currentUser.id === user.userId;
    });

    console.log("EventView userInAttendees: ", userInAttendees);

    // if (currentUser.id === userInAttendees.userId) {
    //   this.setState({ attendingEvent: true });
    // } else {
    //   this.setState({ attendingEvent: false });
    // }

    if (userInAttendees) {
      this.setState({ attendingEvent: true });
    } else {
      this.setState({ attendingEvent: false });
    }

    // Check if currentUser created the event among the attendees. If currentUser did, add createdEvent property to that attendee.
    // 1. Find if createdBy user is in attendeesList
    const createdEventUserInAttendees = attendeesList.find(user => {
      return createdBy === user.userId;
    });

    const createdEventUserIndexInAttendees = attendeesList.findIndex(user => {
      console.log("findIndex createdBy: ", createdBy, ", user.userId: ", user.userId);
      return createdBy === user.userId;
    });

    console.log(
      "EventView createdEventUserInAttendees: ",
      createdEventUserInAttendees,
      "createdEventUserIndexInAttendees: ",
      createdEventUserIndexInAttendees
    );

    // 2. If found, check if the currentUser.id is the same as that user found
    let currentUserCreatedEvent = null;

    if (createdEventUserIndexInAttendees > -1) {
      currentUserCreatedEvent = currentUser.id === attendeesList[createdEventUserIndexInAttendees].userId;
    } else {
      currentUserCreatedEvent = false;
    }

    console.log("EventView currentUserCreatedEvent: ", currentUserCreatedEvent);

    // 3. Create new array of attendees, with new 'createdEvent' property
    let attendeesModded = [];

    attendeesList.forEach(user => {
      const thisUser = { ...user };

      if (createdEventUserInAttendees.userId === user.userId) {
        thisUser.createdEvent = true;
      } else {
        thisUser.createdEvent = false;
      }
      attendeesModded.push(thisUser);
    });

    console.log("EventView attendeesModded: ", attendeesModded);

    this.setState({ attendeesList: attendeesModded });
  };

  getEventAttendees = eventId => {
    getEventAttendeesListGet(eventId)
      .then(response => {
        console.log("Get Event Attendees by Event ID Ajax GET request success!");
        console.log(response);

        const attendees = response.data.items;

        this.setState({ attendeesList: attendees });

        this.findUserInAttendees(attendees);
      })
      .catch(error => {
        console.log("Get Event Attendees by Event ID Ajax GET request error!");
        console.log(error);
      });
  };

  componentDidMount() {
    console.log("EventView Component Mounted");

    const defaultEventId = 8; // University of Phoenix Stadium, ID = 14
    const userId = this.props.match.params.userId;

    const eventId = this.props.match.params.eventId;

    // console.log("eventId: ", eventId);

    if (eventId) {
      this.getEventInfo(eventId);
      // this.getEventAttendees(eventId);

      this.setState({ eventId: eventId });
    }
    // else {
    //   this.getEventInfo(defaultEventId);
    // }

    const { currentUser } = this.props;

    this.setState({ currentUser: currentUser });

    // console.log("Current User: ", currentUser);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.eventTypeId !== prevState.eventTypeId) {
      const eventTypeId = this.state.eventTypeId;

      this.getEventTypeInfo(eventTypeId);
    }

    // if (this.state.attendingEvent !== prevState.attendingEvent) {
    //   const { eventId } = this.state;

    //   this.getEventInfo(eventId);
    // }

    // if (this.state.createdBy !== prevState.createdBy) {
    //   this.findUserInAttendees(attendeesList);
    // }
  }

  render() {
    let styleName = this.props.styleName;
    if (!styleName) {
      styleName = "embed-responsive-21by9";
    }

    const { lat, long } = this.state;

    const SimpleMapGoogleMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: lat, lng: long }} />
    ));

    const PopUpInfoWindowExampleGoogleMap = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} center={props.center}>
        {props.markers.map((marker, index) => (
          <Marker
            defaultIcon="assets/images/marker.png"
            key={index}
            position={marker.position}
            onClick={() => props.onMarkerClick(marker)}
          >
            {/*
  
          */}
            {marker.showInfo && (
              <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div>{marker.infoContent}</div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    ));

    const mapPosition = new google.maps.LatLng(lat, long);

    const GoogleMapWithMarker = withGoogleMap(props => (
      <GoogleMap defaultZoom={15} center={{ lat: lat, lng: long }}>
        <Marker defaultIcon="assets/images/marker.png" position={mapPosition} />
      </GoogleMap>
    ));

    const { eventId, createdBy, attendingEvent, currentUser, eventDataItem, attendeesList } = this.state;

    // console.log("EventView render createdBy: ", createdBy);

    let attendLeaveButton, editButton;

    if (attendingEvent) {
      attendLeaveButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerDontAttendEventBtn}>
          Don't Attend Event
        </Button>
      );
    } else {
      attendLeaveButton = (
        <Button color="primary" className="jr-btn" onClick={this.handlerAttendEventBtn}>
          Attend Event
        </Button>
      );
    }

    if (createdBy === currentUser.id) {
      attendLeaveButton = null;
      editButton = (
        <NavLink
          to={`${this.props.eventBaseUrl}/form/${this.state.eventId}`}
          // target="_blank"
        >
          <Button color="primary" className="jr-btn">
            Edit Event
          </Button>
        </NavLink>
      );
    } else {
      editButton = null;
    }

    // console.log("render eventDataItem: ", eventDataItem);

    const { firstName, lastName } = eventDataItem;

    console.log("EventView render attendeesList: ", attendeesList);

    return (
      <div>
        {/* Begin content */}
        <div className="app-wrapper">
          <div className="animated slideInUpTiny animation-duration-3">
            <div className="box">
              <div className="flex-title">
                {/* Event Title card */}
                <div className="jr-card">
                  <div className="d-flex justify-content-between">
                    <div className="flex-item">
                      <h4 className="text-muted">{new Date(this.state.startDate).toDateString()}</h4>
                      <h3 className="card-title my-2">{this.state.name}</h3>
                      <div className="text-muted mb-3">Organized by {this.state.organizer}</div>
                      <div className="text-muted mb-3">
                        Event created by {firstName} {lastName}
                      </div>
                      <p className="h4 text-muted">{this.state.shortName}</p>
                      <p className="h4 text-muted">Event Type: {this.state.eventTypeItem.name}</p>
                      <p className="h4 text-muted">
                        <a href={this.state.websiteUrl} target="_blank">
                          {this.state.websiteUrl}
                        </a>
                      </p>
                    </div>
                    <div className="flex-item">
                      {editButton}
                      {/* <NavLink
                        // to={`/app/events/${eventId}`}
                        // target="_blank"
                      > */}
                      <Button color="default" className="jr-btn" onClick={this.props.history.goBack}>
                        Go Back
                      </Button>
                      {/* </NavLink> */}
                      {attendLeaveButton}
                    </div>
                  </div>
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
                    {/* <SimpleMapGoogleMap
                      containerElement={<div className={`embed-responsive ${styleName}`} />}
                      mapElement={<div className="embed-responsive-item" />}
                    /> */}
                    <GoogleMapWithMarker
                      containerElement={<div className="embed-responsive embed-responsive-21by9" />}
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
                  {eventId &&
                    createdBy &&
                    attendeesList.length !== 0 && (
                      <EventAttendeesList eventId={eventId} createdBy={createdBy} attendees={attendeesList} />
                    )}
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

function mapStateToProps(state) {
  // console.log("EventView redux state: ", state);

  return { currentUser: state.currentUser };
}

// export default EventView;
export default connect(mapStateToProps)(EventView);
