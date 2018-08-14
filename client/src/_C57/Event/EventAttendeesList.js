import React, { Component } from "react";
import { Badge, ListGroup, ListGroupItem } from "reactstrap";

import { getEventUsersListByEventIdGet, getUserInfoByIdGet } from "../../services/EventUser.service";

const users = [
  { id: 1, image: "http://via.placeholder.com/150x150", email: "henrric@example.com" },
  { id: 2, image: "http://via.placeholder.com/150x150", email: "stella02@example.com" },
  { id: 3, image: "http://via.placeholder.com/150x150", email: "chrris@example.com" },
  { id: 4, image: "http://via.placeholder.com/150x150", email: "jhonson@example.com" },
  { id: 5, image: "http://via.placeholder.com/150x150", email: "domnic@example.com" }
];

// From component CheckBoxListControl

class EventAttendeesList extends Component {
  state = {
    checked: [1],

    attendees: [],
    eventUsersList: []
  };

  handleToggle = (event, value) => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked
    });
  };

  // getEventUsersByEventId = (eventId, createdBy) => {
  //   getEventUsersListByEventIdGet(eventId)
  //     .then(response => {
  //       console.log("Get EventUsers GET Ajax request success!");
  //       console.log(response);

  //       this.setState({ eventUsersList: response.data.items });
  //       this.getAttendeesInfo(response.data.items, createdBy);
  //     })
  //     .catch(error => {
  //       console.log("Get EventUsers GET Ajax request failed!");
  //       console.log(error);
  //     });
  // };

  getAttendeesInfo = (eventUsersList, createdBy) => {
    let attendees = [];

    // console.log("EventAttendeesList eventUserList: ", eventUsersList);

    eventUsersList.forEach(user => {
      getUserInfoByIdGet(user.userId)
        .then(response => {
          // console.log("Get User by ID GET Ajax request success!");
          // console.log(response);

          const thisUser = response.data.item;

          // console.log("thisUserId: ", thisUser.id, typeof thisUser.id);
          // console.log("createdBy: ", createdBy, typeof createdBy);

          if (thisUser.id === createdBy) {
            thisUser.createdEvent = true;
          } else {
            thisUser.createdEvent = false;
          }

          attendees.push(thisUser);

          this.setState({ attendees: attendees });
        })
        .catch(error => {
          // console.log("Get User by ID GET Ajax request failed!");
          // console.log(error);
        });
    });
  };

  componentDidMount = () => {
    // console.log("EventAttendeesList Component Mounted");

    const { attendees, eventId, createdBy } = this.props;

    // console.log("EventAttendeesList props: ", this.props);
    // console.log("EventAttendeesList attendees: ", attendees);
    // console.log("EventAttendeesList Event ID: ", eventId);

    // this.getEventUsersByEventId(eventId, createdBy);

    // this.setState({ eventUsersList: attendees });
    // this.getAttendeesInfo(attendees, createdBy);

    this.setState({ attendees: attendees });
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { attendees } = this.props;

    if (this.props.attendees !== prevProps.attendees) {
      this.setState({ attendees: attendees });
    }
  };

  render() {
    const { attendees, eventUsersList } = this.state;

    // console.log("EventAttendeesList render attendees: ", attendees);
    // console.log("render eventUsersList: ", eventUsersList);

    return (
      <ListGroup>
        {attendees &&
          attendees.map(user => (
            <ListGroupItem className="d-flex align-items-center" key={user.id}>
              <div className="media">
                <div className="mr-3 mb-2">
                  <img className="user-avatar size-50" alt="Remy Sharp" src={user.avatarUrl} />
                </div>
                <div className="media-body">
                  <h3 className="mb-0">
                    {user.firstName} {user.lastName}
                  </h3>
                  <h3 className="mb-0">{user.email}</h3>
                  <span className="text-muted">{/* <small>March 9, 2018</small> */}</span>
                </div>
              </div>

              <Badge className="text-uppercase ml-auto" color="success" pill>
                User
              </Badge>

              <div className="form-checkbox mx-3 ">
                <input type="checkbox" color="primary" checked={user.createdEvent} tabIndex="-1" disabled />
                <span className="check">
                  <i className="zmdi zmdi-check zmdi-hc-lg" />
                </span>
              </div>
            </ListGroupItem>
          ))}
      </ListGroup>
    );
  }
}

export default EventAttendeesList;
