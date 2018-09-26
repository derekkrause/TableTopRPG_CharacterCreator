import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import SweetAlert from "react-bootstrap-sweetalert";

import Pagination from "./PaginationR2";

import {
  getEventById,
  getEventListPaged,
  getEventsListGet,
  searchEventsGet,
  searchEventsWithFiltersGet,
  searchEventsPagedWithFiltersGet
} from "../../services/Event.service";
import { getEventTypes } from "../../services/EventType.service";
import "./EventView.css";
import { getStatesList } from "./EventStatesList";
import EventCard from "./EventCard-R2";

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
    searchCriteria: {},

    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: null,
    hasPrevPage: null
  };

  jumpRef = React.createRef();

  handlerSearchBtn = () => {
    const { searchTerms } = this.state;

    this.searchEventsList(searchTerms);
  };

  getEventInfo(eventId) {
    getEventById(eventId)
      .then(response => {
        this.setState({ eventList: response.data.item });
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

  getEventTypesList() {
    getEventTypes()
      .then(response => {
        const eventTypes = response.data.items;

        const { searchCriteria } = this.state;

        this.setState({ eventTypesList: eventTypes }, () => {
          this.searchEventsList(searchCriteria);
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
        id: item.id,
        itemData: item
      };

      return card;
    });

    return cardList;
  }

  searchEventsList(searchObj) {
    const { pageIndex, pageSize } = this.state;
    let searchTerms = searchObj.searchString;

    this.setState({ searchTerms: searchTerms });

    if (searchTerms === "") {
      searchTerms = "";
    }

    let newPageSize = 0;
    if (pageSize === 0) {
      newPageSize = 10;
    } else {
      newPageSize = pageSize;
    }

    const statesList = getStatesList();

    let stateObj = statesList.find(state => {
      return searchObj.locationFilter[0] === state.stateName;
    });

    const startDate = searchObj.eventStartDateFilter;
    const endDate = searchObj.eventEndDateFilter;

    let sDateString, eDateString;

    if (startDate === "" || startDate === undefined || startDate === null) {
      let currentDate = new Date(Date.now());

      sDateString = currentDate.toDateString();

      this.setCriteriaProperties({ eventStartDateFilter: currentDate });
    } else {
      sDateString = startDate.toDateString();
    }

    if (endDate === "" || endDate === undefined || endDate === null) {
      eDateString = "";
    } else {
      eDateString = endDate.toDateString();
    }

    const { eventTypesList } = this.state;

    let eventTypeObj = eventTypesList.find(eType => {
      return searchObj.eventTypeFilter[0] === eType.name;
    });

    if (!stateObj) {
      stateObj = { stateAbbrev: "" };
    }

    if (!eventTypeObj) {
      eventTypeObj = { id: "" };
    }

    const eSearchObj = {
      searchTerms: searchTerms,
      searchState: stateObj.stateAbbrev,
      searchEventType: eventTypeObj.id,
      searchStartDate: sDateString,
      searchEndDate: eDateString,
      searchDistance: null
    };

    const paginatedSearchObj = {
      pageIndex: pageIndex,
      pageSize: newPageSize,
      searchTerms: searchTerms,
      searchState: stateObj.stateAbbrev,
      searchEventType: eventTypeObj.id,
      searchStartDate: sDateString,
      searchEndDate: eDateString,
      searchDistance: null
    };

    searchEventsPagedWithFiltersGet(
      paginatedSearchObj.pageIndex,
      paginatedSearchObj.pageSize,
      paginatedSearchObj.searchTerms,
      paginatedSearchObj.searchState,
      paginatedSearchObj.searchEventType,
      paginatedSearchObj.searchStartDate,
      paginatedSearchObj.searchEndDate,
      paginatedSearchObj.searchDistance
    )
      .then(response => {
        const searchDataItem = response.data.item;

        this.setState(
          {
            eventDataItem: response.data.item,
            eventList: response.data.item.pagedItems
          },
          () => {
            this.updatePagingData(searchDataItem);

            this.jumpRef.current.scrollIntoView({ block: "start", behavior: "instant" });
          }
        );
      })
      .catch(error => {});
  }

  pagingFirstPage = () => {
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    this.setState({ pageIndex: 0 });
  };

  pagingLastPage = () => {
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    this.setState({ pageIndex: totalPages - 1 });
  };

  pagingPrevPage = () => {
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasPrevPage === true && pageIndex >= 0) {
      this.setState({ pageIndex: pageIndex - 1 });
    }
  };

  pagingNextPage = () => {
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasNextPage === true && pageIndex < totalPages) {
      this.setState({ pageIndex: pageIndex + 1 });
    }
  };

  updatePagingData = pagingDataItem => {
    const { hasNextPage, hasPrevPage, pageIndex, pageSize, totalCount, totalPages } = pagingDataItem;

    this.setState({ pageIndex, pageSize, totalCount, totalPages, hasNextPage, hasPrevPage });
  };

  componentDidMount() {
    const pageIndex = 0,
      pageSize = 10;

    const { currentUser, searchCriteria } = this.props;

    this.setState({
      currentUser: currentUser,
      searchCriteria: searchCriteria,
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    this.getEventTypesList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.eventDataItem !== prevState.eventDataItem) {
      const { eventList } = this.state;

      const cardList = this.createCardList(eventList);

      this.setState({ eventCardsList: cardList });

      if (cardList.length === 0) {
        this.setState({ searchStatus: "Search results not found" });
      }

      if (cardList.length >= 1) {
        this.setState({ searchStatus: "" });
      }
    }

    if (this.state.pageIndex !== prevState.pageIndex || this.state.pageSize !== prevState.pageSize) {
      const { pageIndex, pageSize } = this.state;
      const { searchCriteria } = this.props;

      let newPageSize = 0;
      if (pageSize === 0) {
        newPageSize = 10;
      } else {
        newPageSize = pageSize;
      }

      this.setState({ searchCriteria: searchCriteria }, () => {
        this.searchEventsList(searchCriteria);
      });
    }

    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      const { currentUser, searchCriteria } = this.props;

      this.setState({ currentUser: currentUser, searchCriteria: searchCriteria });

      this.searchEventsList(searchCriteria);
    }
  }

  setCriteriaProperties = properties => {
    this.props.setSearchCriteria({
      ...this.props.searchCriteria,
      ...properties
    });
  };

  render() {
    const { eventCardsList, noSearchResultsAlert, searchStatus, eventList } = this.state;
    const title = `Events Search`;
    const { pageIndex, totalPages } = this.state;

    return (
      <div>
        <div className="app-wrapper" ref={this.jumpRef}>
          <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
            <h2 className="title mb-3 mb-sm-0">{title}</h2>
            <NavLink to={`/app/events/form`}>
              <Button color="primary" className="jr-btn">
                Add Event
              </Button>
            </NavLink>
          </div>
          <div className="animated slideInUpTiny animation-duration-3">
            {searchStatus}
            {eventCardsList &&
              eventCardsList.map(data => (
                <EventCard key={data.id} eventId={data.id} data={data.itemData} {...this.props} />
              ))}
          </div>
          <div>
            <h3>
              <center>
                Page {totalPages === 0 ? 0 : pageIndex + 1} of {totalPages}
              </center>
            </h3>
            <Pagination
              pageIndex={this.state.pageIndex}
              totalPages={this.state.totalPages}
              firstPage={this.pagingFirstPage}
              prevPage={this.pagingPrevPage}
              nextPage={this.pagingNextPage}
              lastPage={this.pagingLastPage}
            />
          </div>
        </div>
        {noSearchResultsAlert}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    searchCriteria: state.searchCriteria
  };
}

export default connect(mapStateToProps)(EventsSearch);
