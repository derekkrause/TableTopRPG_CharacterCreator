import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { NavLink } from "react-router-dom";

import { getEventById, getEventByIdWithUser } from "../../services/Event.service";

class EventCardItem extends Component {
  state = {
    index: 0,
    data: {},
    eventId: 0,
    eventDataItem: {},
    isSuccessful: false
  };

  getEventItem(eventId) {
    getEventByIdWithUser(eventId)
      .then(response => {
        // console.log("Get by Event ID with User Ajax GET request success!");
        // console.log(response);

        this.setState({
          eventDataItem: response.data.item,
          isSuccessful: response.data.isSuccessful
        });
      })
      .catch(error => {
        // console.log("Get by Event ID with User Ajax GET request error!");
        // console.log(error);
      });
  }

  componentDidMount() {
    // console.log("EventCardItem Component Mounted");

    // console.log("EventCardItem props: ", this.props);

    const propsEventId = this.props.eventId;

    this.getEventItem(propsEventId);

    this.setState({ eventId: propsEventId, index: propsEventId });
  }

  componentDidUpdate(prevProps, prevState) {
    const { eventDataItem } = this.state;

    if (this.state.eventDataItem !== prevState.eventDataItem) {
      const card = {
        image: eventDataItem.avatarUrl,
        image2: eventDataItem.logo,
        name: eventDataItem.name,
        description: eventDataItem.description,
        organizer: eventDataItem.organizer,
        id: eventDataItem.id,
        firstName: eventDataItem.firstName,
        lastName: eventDataItem.lastName,
        startDate: new Date(eventDataItem.startDate).toDateString(),
        endDate: new Date(eventDataItem.endDate).toDateString()
      };

      this.setState({ data: card });
    }
  }

  render() {
    const {
      image,
      image2,
      name,
      description,
      organizer,
      id,
      firstName,
      lastName,
      startDate,
      endDate
    } = this.state.data;

    return (
      <div>
        <div className="user-list d-sm-flex flex-sm-row card" style={{ borderLeft: "8px solid red" }}>
          <div className="img-section ml-sm-4 mb-2">
            <img className="img-fluid" src={image2} alt="..." style={{ width: "150px" }} />
          </div>
          <div className="description p-4">
            <h3>{name}</h3>
            <h4>Organized by {organizer}</h4>
            <h4>
              <i className="zmdi zmdi-calendar-note zmdi-hc-lg" /> &nbsp;
              {startDate} - {endDate}
            </h4>
            <p>{description}</p>
            <NavLink className="btn btn-light jr-btn-rounded" to={`/app/events/${id}`}>
              More Info
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCardItem;
