import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { allSearchGet, allSearchPagedGet } from "../../services/AllSearch.service";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";
import AthleteProfileCard from "./AthleteProfileCard"; // Using local component
import AdvocateProfileCard from "./AdvocateProfileCard"; // Using local component
import CoachProfileCard from "./CoachProfileCard"; // Using local component

import FeedEventCard from "../HomePage/FeedEventCard";
import FeedHomeCard from "./FeedHomeCard-RR-2"; // Using local component
import VenueCard from "../Venues/Venue"; // Calling the Venue component as the VenueCard
import Pagination from "./PaginationR2"; // Using local component

class AllSearch extends Component {
  state = {
    searchQuery: "",
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: null,
    hasPrevPage: null,
    currentUser: {},
    searchCriteria: {},
    searchResults: [],
    searchResultsRender: [],
    loader: null
  };

  pagingFirstPage = () => {
    // First page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    this.runAllSearchPaged(0, pageSize, searchQuery);
  };

  pagingLastPage = () => {
    // Last page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    this.runAllSearchPaged(totalPages - 1, pageSize, searchQuery);
  };

  pagingPrevPage = () => {
    // Previous page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasPrevPage === true && pageIndex >= 0) {
      this.runAllSearchPaged(pageIndex - 1, pageSize, searchQuery);
    }
  };

  pagingNextPage = () => {
    // Next page
    const { pageIndex, pageSize, searchQuery, totalPages, hasNextPage, hasPrevPage } = this.state;

    if (hasNextPage === true && pageIndex < totalPages) {
      this.runAllSearchPaged(pageIndex + 1, pageSize, searchQuery);
    }
  };

  updatePagingData = pagingDataItem => {
    const { hasNextPage, hasPrevPage, pageIndex, pageSize, totalCount, totalPages } = pagingDataItem;

    this.setState({ pageIndex, pageSize, totalCount, totalPages, hasNextPage, hasPrevPage });
  };

  runAllSearchPaged = (pageIndex, pageSize, searchQuery) => {
    allSearchPagedGet(pageIndex, pageSize, searchQuery)
      .then(response => {
        // Search success
        // console.log("AllSearch paged search Ajax GET request success!");
        // console.log(response);

        const searchResultItems = response.data.item.pagedItems;
        const searchDataItem = response.data.item;

        this.setState({ searchResults: searchResultItems }, () => {
          this.displaySearchResults(searchResultItems);

          this.updatePagingData(searchDataItem);
          this.setState({ loader: false });
        });
      })
      .catch(error => {
        // Search failed
        // console.log("AllSearch paged search Ajax GET request failed!");
        // console.log(error);

        this.setState({ searchResults: [] }, () => {
          this.displaySearchResults(this.state.searchResults);

          this.setState({ loader: false });
        });
      });
  };

  displaySearchResults = searchResults => {
    let searchResultsRender;

    if (searchResults.length === 0 || searchResults === "" || searchResults === null) {
      searchResultsRender = "No results found!";
    } else if (searchResults) {
      searchResultsRender = searchResults.map((item, index) => {
        const newData = item;

        const itemDataCheck = item.itemData[0];

        if (itemDataCheck) {
          newData.itemData = item.itemData[0];

          if (item.type === "Event") {
            return (
              <FeedEventCard
                data={newData}
                key={item.idInTable + item.relevanceRanking}
                handleDateFormat={this.handleDateFormat}
              />
            );
          }

          if (item.type === "Blog" || item.type === "UserBlogs") {
            newData.dateCreated = newData.itemData.dateCreated;

            const { currentUser } = this.state;

            return (
              <FeedHomeCard data={newData} key={item.idInTable + item.relevanceRanking} currentUser={currentUser} />
            );
          }

          if (item.type === "Athlete") {
            return <AthleteProfileCard data={newData} key={item.idInTable + item.relevanceRanking} />;
          }

          if (item.type === "Venue") {
            return <VenueCard venue={newData.itemData} key={item.idInTable + item.relevanceRanking} />;
          }

          if (item.type === "Advocate") {
            return (
              <div>
                <AdvocateProfileCard advocateUser={newData.itemData} key={item.idInTable + item.relevanceRanking} />
              </div>
            );
          }

          if (item.type === "Coach") {
            return (
              <div>
                <CoachProfileCard data={newData} key={item.idInTable + item.relevanceRanking} />
              </div>
            );
          }
        }
      });
    }

    this.setState({ searchResultsRender: searchResultsRender });
  };

  // Copied from FeedHome component, for FeedEventCard component
  handleDateFormat = date => {
    var newDate = new Date(date.substring(0, 10));
    var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
      newDate.getMonth()
    ];
    return month + " " + newDate.getDate() + ", " + newDate.getFullYear();
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

    const { searchString, searchType } = searchCriteria;

    this.setState({ searchQuery: searchString });

    if (searchString !== "" && searchType === "all") {
      this.setState({ loader: true });

      this.runAllSearchPaged(pageIndex, pageSize, searchString);
    } else if (searchString === "") {
      this.setState({ searchResults: [] });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      const { pageIndex, pageSize } = this.state;
      const { searchCriteria } = this.props;
      const { searchString, searchType } = searchCriteria;

      this.setState({ searchQuery: searchString });

      if (searchString !== "" && searchType === "all") {
        this.setState({ loader: true });

        this.runAllSearchPaged(pageIndex, pageSize, searchString);
      } else if (searchString === "") {
        this.setState({ searchResults: [] });
      }
    }
  }

  render() {
    const { searchResults, loader, searchResultsRender } = this.state;
    const { pageIndex, totalPages } = this.state;

    const title = "All Search";

    return (
      <div>
        <div>
          <ProgressIndicator loader={loader} />
        </div>
        <div className="app-wrapper">
          <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
            <h2 className="title mb-3 mb-sm-0">{title}</h2>
          </div>
          <div className="animated slideInUpTiny animation-duration-3">
            {searchResultsRender}
            {!(searchResults.length === 0) && (
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
            )}
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps)(AllSearch));
