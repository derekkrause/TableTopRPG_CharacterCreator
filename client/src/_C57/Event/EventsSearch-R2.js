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
    // console.log("Search! button clicked!");

    const { searchTerms } = this.state;

    this.searchEventsList(searchTerms);
  };

  getEventInfo(eventId) {
    // console.log("Loading event with ID: ", eventId);

    getEventById(eventId)
      .then(response => {
        // console.log("Get by Event Id Ajax GET request success!");
        // console.log(response);

        this.setState({ eventList: response.data.item });
      })
      .catch(error => {
        // console.log("Get by Event Id Ajax GET request failed!");
        // console.log(error);
      });
  }

  getEventsList() {
    getEventsListGet()
      .then(response => {
        // console.log("Get Events Ajax GET request success!");
        // console.log(response);

        this.setState({
          eventDataItem: response.data.items,
          eventList: response.data.items
        });
      })
      .catch(error => {
        // console.log("Get Events Ajax GET request failed!");
        // console.log(error);
      });
  }

  getEventTypesList() {
    getEventTypes()
      .then(response => {
        // console.log("EventsSearch Get Event Types GET Ajax Request success!");
        // console.log(response);

        const eventTypes = response.data.items;

        const { searchCriteria } = this.state;

        this.setState({ eventTypesList: eventTypes }, () => {
          this.searchEventsList(searchCriteria);
        });
      })
      .catch(error => {
        // console.log("EventsSearch Get Event Types GET Ajax Request failed!");
        // console.log(error);
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

    // console.log("Searching Events for terms: ", searchTerms);

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

    // console.log("EventsSearch statesList: ", statesList);

    // console.log("EventsSearch searchObj: ", searchObj);

    let stateObj = statesList.find(state => {
      return searchObj.locationFilter[0] === state.stateName;
    });

    // console.log("EventsSearch stateObj: ", stateObj);

    const startDate = searchObj.eventStartDateFilter;
    const endDate = searchObj.eventEndDateFilter;

    // console.log("EventsSearch startDate: ", startDate, typeof startDate, ", endDate: ", endDate, typeof endDate);

    let sDateString, eDateString;

    // Check for startDate value
    if (startDate === "" || startDate === undefined || startDate === null) {
      let currentDate = new Date(Date.now());

      // console.log("EventsSearch currentDate: ", currentDate);

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

    // console.log(
    //   "EventsSearch sDateString: ",
    //   sDateString,
    //   typeof sDateString,
    //   ", eDateString: ",
    //   eDateString,
    //   typeof eDateString
    // );

    const { eventTypesList } = this.state;

    // console.log("EventsSearch eventTypesList: ", eventTypesList);

    let eventTypeObj = eventTypesList.find(eType => {
      return searchObj.eventTypeFilter[0] === eType.name;
    });

    // console.log("EventsSearch eventTypeObj: ", eventTypeObj);

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

    // console.log("EventsSearch eSearchObj: ", eSearchObj);

    // searchEventsWithFiltersGet(
    //   eSearchObj.searchTerms,
    //   eSearchObj.searchState,
    //   eSearchObj.searchEventType,
    //   eSearchObj.searchStartDate,
    //   eSearchObj.searchEndDate,
    //   eSearchObj.searchDistance
    // )
    //   .then(response => {
    //     // console.log("Search Events with filters GET Ajax request success!");
    //     // console.log(response);

    //     this.setState({
    //       eventDataItem: response.data.items,
    //       eventList: response.data.items
    //     });
    //   })
    //   .catch(error => {
    //     // console.log("Search Events with filters GET Ajax request failed!");
    //     // console.log(error);
    //   });

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
        // console.log("Search Events paged with filters GET Ajax request success!");
        // console.log(response);

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
      .catch(error => {
        // console.log("Search Events paged with filters GET Ajax request failed!");
        // console.log(error);
      });
  }

  pagingFirstPage = () => {
    // First page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    // this.runAllSearchPaged(0, pageSize, searchQuery);

    this.setState({ pageIndex: 0 });
  };

  pagingLastPage = () => {
    // Last page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    // this.runAllSearchPaged(totalPages - 1, pageSize, searchQuery);

    this.setState({ pageIndex: totalPages - 1 });
  };

  pagingPrevPage = () => {
    // Previous page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasPrevPage === true && pageIndex >= 0) {
      // this.runAllSearchPaged(pageIndex - 1, pageSize, searchQuery);

      this.setState({ pageIndex: pageIndex - 1 });
    }
  };

  pagingNextPage = () => {
    // Next page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasNextPage === true && pageIndex < totalPages) {
      // this.runAllSearchPaged(pageIndex + 1, pageSize, searchQuery);

      this.setState({ pageIndex: pageIndex + 1 });
    }
  };

  updatePagingData = pagingDataItem => {
    const { hasNextPage, hasPrevPage, pageIndex, pageSize, totalCount, totalPages } = pagingDataItem;

    this.setState({ pageIndex, pageSize, totalCount, totalPages, hasNextPage, hasPrevPage });
  };

  componentDidMount() {
    // console.log("EventsSearch component mounted");

    const pageIndex = 0,
      pageSize = 10;

    const { currentUser, searchCriteria } = this.props;

    this.setState({
      currentUser: currentUser,
      searchCriteria: searchCriteria,
      pageIndex: pageIndex,
      pageSize: pageSize
    });

    // console.log("EventsSearch mounted currentUser: ", currentUser, ", searchCriteria: ", searchCriteria);

    this.getEventTypesList();
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("EventsSearch component updated");

    if (this.state.eventDataItem !== prevState.eventDataItem) {
      // const eventPagedList = this.state.eventDataItem;  // Non paged
      const { eventList } = this.state;

      // const cardList = this.createCardList(eventPagedList); // For non paged
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

      // console.log("EventsSearch component updated via state pageIndex or pageSize");
      // console.log("pageIndex: ", pageIndex, ", pageSize: ", pageSize);

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

    // if (this.props !== prevProps) {
    //   console.log("EventsSearch component updated via props: ", this.props);
    // }

    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      // console.log("EventsSearch component updated via redux props searchCriteria: ", this.props.searchCriteria);

      const { currentUser, searchCriteria } = this.props;

      this.setState({ currentUser: currentUser, searchCriteria: searchCriteria });

      // console.log("EventsSearch updated currentUser: ", currentUser, ", searchCriteria: ", searchCriteria);

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
    // const title = `Events Search for "${searchTerms}"`;
    const title = `Events Search`;
    const { pageIndex, totalPages } = this.state;

    // console.log("EventsSearch render eventCardsList: ", eventCardsList);

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
                // <EventCardItem key={data.id} eventId={data.id} {...this.props} />
                <EventCard key={data.id} eventId={data.id} data={data} {...this.props} />
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
              // searchText={this.state.searchText}
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
  // console.log("EventsSearch redux state: ", state);

  return {
    currentUser: state.currentUser,
    searchCriteria: state.searchCriteria
  };
}

// export default EventsSearch;
export default connect(mapStateToProps)(EventsSearch);
