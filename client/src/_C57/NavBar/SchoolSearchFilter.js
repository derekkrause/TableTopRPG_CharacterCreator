import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { stateNames, stateAbbrevs } from "./StatesList";
import LocationAutocomplete from "./LocationAutocomplete";

class SchoolSearchFilter extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  locationRef = React.createRef();

  radiusChanged = e => {
    this.props.handleChange(e);
    this.locationRef.current.focusInput();
  };

  render() {
    return (
      //---------------------School Search Filter-------------------------
      <div className="row">
        <div className="col-md-12">
          <h3 className="mt-2 ml-2 mb-0">
            <b>Refine Your Search</b>
          </h3>
          <div className="d-flex mt-2 flex-wrap justify-content-center mb-2 ">
            <div className="d-flex mr-1 my-2 align-items-center flex-wrap ">
              <h4 className="mr-2 my-0 ">Location within </h4>
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
            </div>
            <div className="d-flex m-0 align-items-center flex-wrap">
              <h4 className="mr-2 my-0">of</h4>
              <LocationAutocomplete
                onChange={place =>
                  this.props.handleTypeAheadChange("location")({
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                  })
                }
                ref={this.locationRef}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SchoolSearchFilter;
