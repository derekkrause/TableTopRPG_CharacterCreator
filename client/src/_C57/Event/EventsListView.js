import React, { Component } from "react";

import { getEventById, getEventList, getEventListPaged, getEventsListGet } from "../../services/Event.service";
import "./EventView.css";
import EventCardItem from "./EventCardItem";

class EventsListView extends Component {
  state = {
    eventDataItem: {},
    eventList: [],
    userList: [],
    eventCardsList: []
  };

  getEventInfo(eventId) {
    console.log("Loading event with ID: ", eventId);

    getEventById(eventId)
      .then(response => {
        console.log("Get by Event Id Ajax GET request success!");
        console.log(response);

        this.setState({ eventList: response.data.item });
      })
      .catch(error => {
        console.log("Get by Event Id Ajax GET request failed!");
        console.log(error);
      });
  }

  getEventList(pageIndex, pageSize) {
    console.log("pageIndex: ", pageIndex, "pageSize: ", pageSize);

    getEventListPaged(pageIndex, pageSize)
      .then(response => {
        console.log("Get Events Paged Ajax GET request success!");
        console.log(response);

        this.setState({
          eventDataItem: response.data.item,
          eventList: response.data.item.pagedItems
        });
      })
      .catch(error => {
        console.log("Get Events Paged Ajax GET request failed!");
        console.log(error);
      });
  }

  getEventsList() {
    getEventsListGet()
      .then(response => {
        console.log("Get Events Ajax GET request success!");
        console.log(response);

        this.setState({
          eventDataItem: response.data.items,
          eventList: response.data.items
        });
      })
      .catch(error => {
        console.log("Get Events Ajax GET request failed!");
        console.log(error);
      });
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
      pageSize = 6;

    // this.getEventList(pageIndex, pageSize);
    this.getEventsList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.eventDataItem !== prevState.eventDataItem) {
      const eventPagedList = this.state.eventDataItem;

      // const cardList = this.createCardList(eventPagedList.pagedItems);
      const cardList = this.createCardList(eventPagedList);

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
            <h3>{/* Page {this.state.eventDataItem.pageIndex + 1} of {this.state.eventDataItem.totalPages} */}</h3>
          </div>
          <div className="animated slideInUpTiny animation-duration-3">
            {eventCardsList.map(data => <EventCardItem key={data.id} eventId={data.id} {...this.props} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default EventsListView;
