import React from "react";
import VenueForm from "./VenueForm";
import VenueTable from "./VenueTable";
import SearchVenue from "./SearchVenue";
import { getVenueBySearch } from "services/venuesService";
import { Route } from "react-router";
import Pagination from "./Pagination";

class AdminVenues extends React.Component {
  state = {
    searchText: "",
    venues: [],
    pageIndex: 0,
    pageSize: 5,
    totalCount: "",
    totalPages: "",
    hasResults: false
  };

  searchTextChange = (pageIndex, newtext) => {
    getVenueBySearch(pageIndex, newtext)
      .then(response => {
        console.log("Venue Search:", response.data.item);
        this.setState({
          searchText: newtext,
          venues: response.data.item.pagedItems,
          pageIndex: parseInt(response.data.item.pageIndex),
          pageSize: parseInt(response.data.item.pageSize),
          totalCount: response.data.item.totalCount,
          totalPages: response.data.item.totalPages,
          hasResults: true
        });
      })
      .catch(() => {
        console.log("Ajax error");
      });
  };

  // ----- PAGINATION -----
  firstPage = () => {
    this.searchTextChange(0, this.state.searchText);
  };

  prevPage = () => {
    const prevPage = this.state.pageIndex - 1;
    this.searchTextChange(prevPage, this.state.searchText);
  };
  nextPage = () => {
    const nextPage = this.state.pageIndex + 1;
    this.searchTextChange(nextPage, this.state.searchText);
  };

  lastPage = () => {
    const endPage = this.state.totalPages - 1;
    this.searchTextChange(endPage, this.state.searchText);
  };

  render() {
    return (
      <div className="justify-content-center">
        <div>
          <Route
            path="/app/venues/:venueId?"
            render={routeProps => (
              <VenueForm
                // {...routeProps} has history, location and match
                {...routeProps}
                venueList={this.state.venues}
              />
            )}
          />
        </div>

        <div>
          <SearchVenue onFilterTextChange={this.searchTextChange} pageIndex={this.state.pageIndex} />
          <p>Total venues: {this.state.totalCount}</p>
        </div>
        <div className="my-2" hidden={!this.state.hasResults}>
          <Pagination
            pageIndex={this.state.pageIndex}
            totalPages={this.state.totalPages}
            searchText={this.state.searchText}
            firstPage={this.firstPage}
            prevPage={this.prevPage}
            nextPage={this.nextPage}
            lastPage={this.lastPage}
          />
        </div>
        <div>
          <VenueTable venueList={this.state.venues} />
        </div>
      </div>
    );
  }
}

export default AdminVenues;
