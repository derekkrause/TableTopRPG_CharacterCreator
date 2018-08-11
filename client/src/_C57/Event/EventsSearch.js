import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import {
  getEventById,
  getEventListPaged,
  getEventsListGet,
  searchEventsGet,
  searchEventsWithFiltersGet
} from "../../services/Event.service";
import { getEventTypes } from "../../services/EventType.service";
import "./EventView.css";
import EventCardItem from "./EventCardItem";
import { getStatesList } from "./EventStatesList";

class EventsSearch extends Component {
  state = {
    eventDataItem: {},
    eventList: [],
    userList: [],
    eventCardsList: [],
    searchTerms: "",
    noSearchResultsAlert: null,
    searchStatus: "",
    eventTypesList: [],

    currentUser: {},
    searchCriteria: {}
  };

  handlerSearchBtn = () => {
    console.log("Search! button clicked!");

    const { searchTerms } = this.state;

    this.searchEventsList(searchTerms);
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

  getEventTypesList() {
    getEventTypes()
      .then(response => {
        console.log("Get Event Types GET Ajax Request success!");
        console.log(response);

        const eventTypes = response.data.items;

        this.setState({ eventTypesList: eventTypes });
      })
      .catch(error => {
        console.log("Get Event Types GET Ajax Request failed!");
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

  searchEventsList(searchObj) {
    // Search Events
    let searchTerms = searchObj.searchString;

    console.log("Searching Events for terms: ", searchTerms);

    this.setState({ searchTerms: searchTerms });

    if (searchTerms === "") {
      searchTerms = null;
    }

    const statesList = getStatesList();

    // console.log("EventsSearch statesList: ", statesList);

    console.log("EventsSearch searchObj: ", searchObj);

    let stateObj = statesList.find(state => {
      // console.log("a: ", searchObj.locationFilter[0], typeof searchObj.locationFilter[0]);
      // console.log("b: ", state.stateName, typeof state.stateName);

      return searchObj.locationFilter[0] === state.stateName;
    });

    console.log("EventsSearch stateObj: ", stateObj);

    const startDate = searchObj.eventStartDateFilter;
    const endDate = searchObj.eventEndDateFilter;

    console.log("EventsSearch startDate: ", startDate, typeof startDate, ", endDate: ", endDate, typeof endDate);

    let sDateString, eDateString;

    if (startDate === "") {
      sDateString = null;
    } else {
      sDateString = startDate.toDateString();
    }

    if (endDate === "") {
      eDateString = null;
    } else {
      eDateString = endDate.toDateString();
    }

    console.log(
      "EventsSearch sDateString: ",
      sDateString,
      typeof sDateString,
      ", eDateString: ",
      eDateString,
      typeof eDateString
    );

    const { eventTypesList } = this.state;

    console.log("EventsSearch eventTypesList: ", eventTypesList);

    let eventTypeObj = eventTypesList.find(eType => {
      return searchObj.eventTypeFilter[0] === eType.name;
    });

    console.log("EventsSearch eventTypeObj: ", eventTypeObj);

    if (!stateObj) {
      stateObj = { stateAbbrev: null };
    }

    if (!eventTypeObj) {
      eventTypeObj = { id: null };
    }

    const eSearchObj = {
      searchTerms: searchTerms,
      searchState: stateObj.stateAbbrev,
      searchEventType: eventTypeObj.id,
      searchStartDate: sDateString,
      searchEndDate: eDateString,
      searchDistance: null
    };

    console.log("EventsSearch eSearchObj: ", eSearchObj);

    searchEventsWithFiltersGet(
      eSearchObj.searchTerms,
      eSearchObj.searchState,
      eSearchObj.searchEventType,
      eSearchObj.searchStartDate,
      eSearchObj.searchEndDate,
      eSearchObj.searchDistance
    )
      .then(response => {
        console.log("Search Events with filters GET Ajax request success!");
        console.log(response);

        this.setState({
          eventDataItem: response.data.items,
          eventList: response.data.items
        });
      })
      .catch(error => {
        console.log("Search Events with filters GET Ajax request failed!");
        console.log(error);
      });
  }

  componentDidMount() {
    console.log("EventsSearch component mounted");

    const pageIndex = 0,
      pageSize = 6;

    // this.getEventList(pageIndex, pageSize);
    // this.getEventsList();

    // const searchTerms = this.props.searchTerms;
    // const searchTerms = "los angeles";

    // this.setState({ searchTerms: searchTerms });

    this.getEventTypesList();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("EventsSearch component updated");

    if (this.state.eventDataItem !== prevState.eventDataItem) {
      const eventPagedList = this.state.eventDataItem;

      // const cardList = this.createCardList(eventPagedList.pagedItems);
      const cardList = this.createCardList(eventPagedList);

      this.setState({ eventCardsList: cardList });

      if (cardList.length === 0) {
        this.setState({ searchStatus: "Search results not found" });
      }

      if (cardList.length >= 1) {
        this.setState({ searchStatus: "" });
      }
    }

    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      // console.log("EventsSearch props: ", this.props);

      const { currentUser, searchCriteria } = this.props;

      this.setState({ currentUser: currentUser, searchCriteria: searchCriteria });

      console.log("EventsSearch currentUser: ", currentUser, ", searchCriteria: ", searchCriteria);

      this.searchEventsList(searchCriteria);
    }
  }

  render() {
    const { eventCardsList, noSearchResultsAlert, searchStatus } = this.state;
    // const title = `Events Search for "${searchTerms}"`;
    const title = `Events Search`;

    return (
      <div>
        <div className="app-wrapper">
          <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
            <h2 className="title mb-3 mb-sm-0">{title}</h2>
            <h3>{/* Page {this.state.eventDataItem.pageIndex + 1} of {this.state.eventDataItem.totalPages} */}</h3>
            {/* <NavLink
              to={`${this.props.match.url}/form`}
              // target="_blank"
            >
              <Button color="primary" className="jr-btn">
                Add Event
              </Button>
            </NavLink> */}
          </div>
          <div className="animated slideInUpTiny animation-duration-3">
            {/* <Form>
              <Row>
                <Col>
                  <FormGroup>
                    <Label>Search for: </Label>
                    <Input
                      type="text"
                      value={this.state.searchTerms}
                      onChange={e => this.setState({ searchTerms: e.target.value })}
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <Button color="primary" className="jr-btn" onClick={this.handlerSearchBtn}>
                    Search!
                  </Button>
                </Col>
              </Row>
            </Form> */}
            {searchStatus}
            {eventCardsList &&
              eventCardsList.map(data => <EventCardItem key={data.id} eventId={data.id} {...this.props} />)}
          </div>
        </div>
        {noSearchResultsAlert}
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("EventsSearch redux state: ", state);

  return {
    currentUser: state.currentUser,
    searchCriteria: state.searchCriteria
  };
}

// export default EventsSearch;
export default connect(mapStateToProps)(EventsSearch);
