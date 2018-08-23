import React from "react";
import VenueForm from "./VenueForm";
import VenueTable from "./VenueTable";
import SearchVenue from "./SearchVenue";
import { getVenueBySearch, getAllVenues } from "services/venuesService";
import { Route } from "react-router";
import Pagination from "./Pagination";

class AdminVenues extends React.Component {
  state = {
    searchText: "",
    venues: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: "",
    totalPages: "",
    hasResults: false
  };

  componentDidMount() {
    this.getAllVenueList();
  }

  getAllVenueList = () => {
    getAllVenues()
      .then(response => {
        console.log("getAllVenues:", response.data.item.pagedItems);
        this.setState({ venues: response.data.item.pagedItems });
        this.setState({ totalCount: response.data.item.totalCount });
      })
      .catch(error => console.log("getAllVenues: Ajax Request failed!", error));
  };

  searchTextChange = searchString => {
    getVenueBySearch(searchString, this.state.pageIndex, this.state.pageSize)
      .then(response => {
        console.log("Venue Search:", response.data.item);
        this.setState({
          searchText: searchString,
          venues: response.data.item.pagedItems,
          pageIndex: parseInt(response.data.item.pageIndex),
          pageSize: parseInt(response.data.item.pageSize),
          totalCount: response.data.item.totalCount,
          totalPages: response.data.item.totalPages,
          hasResults: true
        });
      })
      .catch(() => {
        console.log("Search Venue: Ajax error");
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
      <div className="col-md-12">
        <div className="container mt-4">
          <div>
            <SearchVenue onFilterTextChange={this.searchTextChange} pageIndex={this.state.pageIndex} />
            <p>Total venues: {this.state.totalCount}</p>
          </div>
          <Route
            path="/app/admin/venues/:venueId?"
            render={routeProps => (
              <VenueForm
                // {...routeProps} has history, location and match
                {...routeProps}
                venueList={this.state.venues}
              />
            )}
          />
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
      </div>
    );
  }
}

export default AdminVenues;
