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
  };

  locationRef = React.createRef();

  radiusChanged = e => {
    this.props.handleChange(e);
    this.locationRef.current.focusInput();
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
                  lat: 0 || place.geometry.location.lat(),
                  lng: 0 || place.geometry.location.lng()
                })
              }
              ref={this.locationRef}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default VenueSearchFilter;
