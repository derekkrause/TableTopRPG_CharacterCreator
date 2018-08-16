import React from "react";
import { getVenueBySearch } from "services/venuesService";
import VenueTable from "./VenueTable";
import { FormGroup, Button, Input } from "reactstrap";

class SearchVenue extends React.Component {
  state = {
    filterText: ""
  };

  handleOnClickSearch = () => {
    this.props.onFilterTextChange(this.props.pageIndex, this.state.filterText);
  };

  onKeyUp = e => {
    if (e.keyCode === 13) {
      console.log(e.keyCode);
      this.handleOnClickSearch();
    }
  };

  render() {
    return (
      <div>
        {/* <FormGroup> */}
        <input
          className="d-flex justify-content-left"
          type="text"
          placeholder="Search..."
          value={this.state.filterText}
          onChange={e => this.setState({ filterText: e.target.value })}
          onKeyUp={this.onKeyUp}
        />
        {/* <Button className="search-icon">
            <i className="zmdi zmdi-search zmdi-hc-lg" />
          </Button> */}
        <button
          className="btn btn defalt"
          onClick={this.handleOnClickSearch}
          ref={enter => {
            this.searchBtn = enter;
          }}
        >
          Search
        </button>
        {/* </FormGroup> */}

        {/* <VenueTable venues={this.props.venues} /> */}
      </div>
    );
  }
}

export default SearchVenue;
