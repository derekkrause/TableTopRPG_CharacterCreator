import React, { Component } from "react";
import { Button, Form, Input, InputGroup, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import options from "../profile/data";
import { connect } from "react-redux";
import AutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";

class AthleteSearchFilter extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true,
    states: [],
    classYear: [],
    sportPosition: [],
    school: ""
  };

  callback = () => {
    return schoolSearch(0, this.props.searchCriteria.schoolFilter); // schoolSearch available in SchoolAdminServer.js
  };

  onChange = value => {
    this.setState({
      school: value
    });
  };

  componentDidMount() {
    const statesArray = [];
    const classYearArray = [];
    const sportPositionArray = [];

    this.props.dropdownOptions.state.map(data => {
      statesArray.push(data.name);
    });
    this.props.dropdownOptions.classYear.map(data => {
      classYearArray.push(data.name);
    });
    this.props.dropdownOptions.sportPosition.map(data => {
      sportPositionArray.push(data.name);
    });
    this.setState({
      states: statesArray,
      classYear: classYearArray,
      sportPosition: sportPositionArray
    });
  }

  render() {
    return (
      //---------------------Athlete Search Filter-------------------------

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
              labelKey="name"
              options={this.state.states}
              placeholder="Specify state..."
              value={this.props.searchCriteria.locationFilter || null}
              onChange={this.props.handleTypeAheadChange("locationFilter")}
              onKeyDown={this.props.handleKeyPress}
            />
            &nbsp;
            <h4>Graduation Year&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="gradYearFilter"
              {...this.state}
              labelKey="name"
              options={this.state.classYear}
              placeholder="Specify graduation year..."
              value={this.props.searchCriteria.gradYearFilter || null}
              onChange={this.props.handleTypeAheadChange("gradYearFilter")}
              onKeyDown={this.props.handleKeyPress}
            />
            &nbsp;
            <h4>School&nbsp;</h4>
            <AutoComplete
              numberOfCharacters={5}
              includeCityState={false}
              callBack={this.callback}
              value={this.props.searchCriteria.schoolFilter || null}
              onChange={this.props.handleTypeAheadChange("schoolFilter")}
              name="schoolFilter"
              placeholder="Specify school..."
              limit={500}
              className={"form-control"}
              resultSetNumber={1}
              onKeyPress={this.props.handleKeyPress}
            />
            &nbsp;
            <h4>Athlete Position&nbsp;</h4>
            <Typeahead
              className="pr-3"
              name="sportPositionFilter"
              {...this.state}
              labelKey="name"
              options={this.state.sportPosition || null}
              placeholder="Specify position..."
              value={this.props.searchCriteria.sportPositionFilter}
              onChange={this.props.handleTypeAheadChange("sportPositionFilter")}
              onKeyDown={this.props.handleKeyPress}
            />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ searchCriteria, dropdownOptions }) {
  return {
    searchCriteria: searchCriteria,
    dropdownOptions: dropdownOptions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AthleteSearchFilter);
