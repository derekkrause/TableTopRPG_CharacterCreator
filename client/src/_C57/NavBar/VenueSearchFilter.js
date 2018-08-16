import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./venueSearchFilter.css";
import VenueSearchResults from "../SearchResults/VenueSearchResults";
import LocationAutocomplete from "./LocationAutocomplete";

class VenueSearchFilter extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true
    // value: "10"
  };

  locationRef = React.createRef();

  radiusChanged = e => {
    this.props.handleChange(e);
    this.locationRef.current.focusInput();
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      //---------------------Venue Search Filter-------------------------
      <div className="row">
        <div className="col-md-12">
          <h3 className="ml-2 pr-4 mt-2">
            <b>Refine Your Search</b>
          </h3>
          <div className="d-flex flex-row mt-2 justify-content-center mb-2 primary_nav_wrap">
            <h4 style={{ margin: "10px" }}>Location within </h4>
            <select
              className="inputstyle"
              name="radius"
              value={this.props.searchCriteria.radius}
              onChange={this.radiusChanged}
            >
              <option value="10">10 miles</option>
              <option value="25">25 miles</option>
              <option value="50">50 miles</option>
              <option value="100">100 miles</option>
            </select>
            <span style={{ margin: "10px" }}> of </span>
            <LocationAutocomplete
              onChange={place =>
                this.props.handleTypeAheadChange("location")({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng()
                })
              }
              ref={this.locationRef}
            />
            {/* <input
              className="inputstyle"
              name="city"
              value={this.props.searchCriteria.city}
              onChange={this.props.handleChange}
              placeholder="City"
            /> */}
            {/* -- dropdown menu using ul and li --
            <h4 style={{ margin: "10px" }}>Location within </h4>
            <ul className="currenct-menu-item">
              <li>
                <a href="#">10 miles</a>
                <ul class="dropdown">
                  <li>
                    <a href="#">25 miles</a>
                  </li>
                  <li>
                    <a href="#">50 miles</a>
                  </li>
                </ul>
              </li>
            </ul> */}
            {/* <h4 style={{ margin: "10px" }}>of </h4>
            <input className="inputstyle" value="" placeholder="City or Postal code" /> */}
            {/* <Typeahead
              className="pr-3"
              name="locationFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="City"
              value={this.props.locationFilter}
              onChange={this.props.handleTypeAheadChange("locationFilter")}
            /> */}
            {/* <Typeahead
              className="pr-3"
              name="locationFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify state..."
              value={this.props.locationFilter}
              onChange={this.props.handleTypeAheadChange("locationFilter")}
            />
            &nbsp;
            <h4>Venue Type&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="venueTypeFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify venue type..."
              value={this.props.venueTypeFilter}
              onChange={this.props.handleTypeAheadChange("venueTypeFilter")}
            />
            &nbsp; */}
            {/* <VenueSearchResults venues={this.props.venues} /> */}
          </div>
        </div>
      </div>
    );
  }
}
export default VenueSearchFilter;
