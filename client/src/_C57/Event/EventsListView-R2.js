import React, { Component } from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { getEventById, getEventList, getEventListPaged, getEventsListGet } from "../../services/Event.service";
import "./EventView.css";
import EventCard from "./EventCard-R2";

class EventsListView extends Component {
  state = {
    eventDataItem: {},
    eventList: [],
    userList: [],
    eventCardsList: [],
    currentUser: {}
  };

  getEventInfo(eventId) {
    getEventById(eventId)
      .then(response => {
        this.setState({ eventList: response.data.item });
      })
      .catch(error => {});
  }

  getEventList(pageIndex, pageSize) {
    getEventListPaged(pageIndex, pageSize)
      .then(response => {
        this.setState({
          eventDataItem: response.data.item,
          eventList: response.data.item.pagedItems
        });
      })
      .catch(error => {});
  }

  getEventsList() {
    getEventsListGet()
      .then(response => {
        this.setState({
          eventDataItem: response.data.items,
          eventList: response.data.items
        });
      })
      .catch(error => {});
  }

  createCardList(listArray) {
    const cardList = listArray.map(item => {
      let card = {
        image: "",
        image2: item.logo,
        name: item.name,
        description: item.description,
        organizer: item.organizer,
        id: item.id
      };

      return card;
    });

    return cardList;
  }

  componentDidMount() {
    const pageIndex = 0,
      pageSize = 10;

    this.getEventList(pageIndex, pageSize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.eventDataItem !== prevState.eventDataItem) {
      const eventPagedList = this.state.eventDataItem;

      const cardList = this.state.eventDataItem.pagedItems;

      this.setState({ eventCardsList: cardList });
    }
  }

  render() {
    const eventCardsList = this.state.eventCardsList;
    const title = "Events List";

    return (
      <div>
        <div className="app-wrapper">
          <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
            <h2 className="title mb-3 mb-sm-0">{title}</h2>
            <NavLink to={`/app/events/form`}>
              <Button color="primary" className="jr-btn">
                Add Event
              </Button>
            </NavLink>
          </div>
          <div className="animated slideInUpTiny animation-duration-3">
            {eventCardsList &&
              eventCardsList.map(data => <EventCard key={data.id} eventId={data.id} data={data} {...this.props} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default EventsListView;
