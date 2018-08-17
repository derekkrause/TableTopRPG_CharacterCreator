import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";

const schoolOptions = ["Stanford", "Harvard", "Penn", "Cornell"];
const sportOptions = ["soccer", "football", "taco bell"];
const sportPositionOptions = ["pitcher", "catcher", "first base", "outfield"];
const sportLevelOptions = [
  "Varsity",
  "Junior Varsity",
  "Division I",
  "Division II",
  "Division III"
];
const classYearOptions = ["Freshman", "Sophomore", "Junior", "Senior"];
const gradYearOptions = ["2018", "2019", "2020", "2021", "2022"];
const stateOptions = ["California", "Texas", "North Dakota", "Mexico"];

class CoachProfileInfo extends React.Component {
  state = {
    //   firstName: "First",
    //   middleName: "Middle",
    //   lastName: "Last",
    //   schoolName: "Test School Name",
    //   city: "Test City",
    //   state: "Test State",
    //   classYear: "Test Junior",
    //   graduationYear: "Test Grad Year",
    //   sport: "Baseball",
    //   sportPosition: "Position",
    //   sportLevel: "High School Varsity",
    //   height: "7'12''",
    //   weight: "500 lbs",
    //   gpa: "5.10",
    editMode: false
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  render() {
    return (
      <div>
        {this.state.editMode === false && (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1 className="text-center">
                  {this.props.firstName}&nbsp;{this.props.middleName}&nbsp;
                  {this.props.lastName}
                </h1>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1 className="text-center">
                  {this.props.sport}&nbsp;|&nbsp;{this.props.title}&nbsp;|&nbsp;
                  {this.props.sportLevel}
                </h1>
              </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-around">
              <div className="col-md-3">
                <h2>{this.props.schoolName}</h2>
              </div>
            </div>

            <div className="row d-flex justify-content-around">
              <div className="col-md-3">
                <h2>
                  {this.props.city}, {this.props.state}
                </h2>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <button
                  className="profileBannerButtonOpacity float-right"
                  type="button"
                  onClick={this.editField}
                >
                  Edit
                </button>
              </div>
            </div>
            <hr />
          </React.Fragment>
        )}
        {this.state.editMode === true && (
          <React.Fragment>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1>
                  {this.props.firstName}&nbsp;{this.props.middleName}&nbsp;
                  {this.props.lastName}
                </h1>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-12">
                <Typeahead
                  name="sport"
                  labelKey="sport"
                  //multiple={multiple}
                  options={sportOptions}
                  placeholder="Select Sport"
                  value={this.props.sport}
                  onChange={this.props.handleTypeAheadChange("sport")}
                />
                &nbsp;|&nbsp;
                <Input
                  type="text"
                  name="title"
                  //multiple={multiple}
                  placeholder="Enter coaching title"
                  value={this.props.title}
                  onChange={this.props.handleChange}
                />
                &nbsp;|&nbsp;
                <Typeahead
                  name="sportLevel"
                  labelKey="sportLevel"
                  //multiple={multiple}
                  options={sportLevelOptions}
                  placeholder="Select Sport Level"
                  value={this.props.sportLevel}
                  onChange={this.props.handleTypeAheadChange("sportLevel")}
                />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                <Typeahead
                  name="schoolName"
                  labelKey="schoolName"
                  //multiple={multiple}
                  options={schoolOptions}
                  placeholder="Select School"
                  value={this.props.schoolName}
                  onChange={this.props.handleTypeAheadChange("schoolName")}
                />
              </div>
              <br />
            </div>

            <div className="row">
              <div className="col-md-6">
                <Input
                  type="text"
                  name="city"
                  value={this.props.city}
                  onChange={this.props.handleChange}
                  placeholder="City"
                />
                <br />

                <Typeahead
                  name="state"
                  labelKey="state"
                  //multiple={multiple}
                  options={stateOptions}
                  placeholder="State"
                  value={this.props.state}
                  onChange={this.props.handleTypeAheadChange("state")}
                />
              </div>
            </div>
            <hr />

            <hr />
            <div className="row">
              <div className="col-md-12">
                <button
                  type="button"
                  className="float-right"
                  onClick={this.editField}
                >
                  Save
                </button>
              </div>
            </div>
            <hr />
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default CoachProfileInfo;
