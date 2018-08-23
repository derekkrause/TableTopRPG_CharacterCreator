import React from "react";
import { getVenueBySearch } from "services/venuesService";
import VenueTable from "./VenueTable";
import { FormGroup, Button, Input, InputGroup, InputGroupAddon } from "reactstrap";

class SearchVenue extends React.Component {
  state = {
    filterText: ""
  };

  onKeyUp = e => {
    if (e.keyCode === 13) {
      console.log("Enter Key pressed");
      this.handleOnClickSearch();
    }
  };

  handleOnClickSearch = () => {
    this.props.onFilterTextChange(this.state.filterText);
  };

  render() {
    return (
      <div>
        <div className="row">
          <InputGroup>
            <Input
              className="col-4 form-control search-input search-input-flash"
              type="text"
              placeholder="Search..."
              value={this.state.filterText}
              onChange={e => this.setState({ filterText: e.target.value })}
              onKeyUp={this.onKeyUp}
            />
            <InputGroupAddon addonType="append" className="search-input-button">
              <Button color="primary" type="submit" className="btn btn-default" onClick={this.handleOnClickSearch}>
                <i className="zmdi zmdi-search zmdi-hc-lg" />
              </Button>
            </InputGroupAddon>
          </InputGroup>

          {/* <VenueTable venues={this.props.venues} /> */}

          {/* <button className="search-icon">
          <i className="zmdi zmdi-search zmdi-hc-lg" />
        </button> */}
        </div>
      </div>
    );
  }
}

export default SearchVenue;
