import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import options from "../profile/data";

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

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      //---------------------School Search Filter-------------------------
      <div className="row">
        <div className="col-md-12">
          <h3 className="ml-2 pr-4 mt-2">
            <b>Refine Your Search</b>
          </h3>
          <div className="d-flex flex-row mt-2 justify-content-center mb-2">
            <h4>Location&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="locationFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify state..."
              value={this.props.locationFilter}
              onChange={this.props.handleTypeAheadChange("locationFilter")}
            />&nbsp;
            <h4>Competition Level&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="sportLevelFilter"
              {...this.state}
              //emptyLabel={emptyLabel ? "" : undefined}
              labelKey="name"
              options={options}
              placeholder="Specify competition level..."
              value={this.props.sportLevelFilter}
              onChange={this.props.handleTypeAheadChange("sportLevelFilter")}
            />&nbsp;
          </div>
        </div>
      </div>
    );
  }
}
export default SchoolSearchFilter;
