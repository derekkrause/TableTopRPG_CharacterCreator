import React from "react";
import { Form, FormGroup, Input } from "reactstrap";
//import createFilterOptions from "react-select-fast-filter-options";
//import "react-select/dist/react-select.css";
//import "react-virtualized/styles.css";
//import "react-virtualized-select/styles.css";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";

const schoolOptions = ["Stanford", "Harvard", "Penn", "Cornell"];
const sportOptions = [];
const sportPositionOptions = [];
const sportLevelOptions = [];
const classYearOptions = [];
const gradYearOptions = [];
const stateOptions = [];

// const filterOptions = createFilterOptions({ schoolOptions });
// const field = ({ schoolOptions }) => (
//   <Select
//     name="university"
//     value={this.props.schoolName}
//     options={schoolOptions}
//     filterOptions={filterOptions}
//     onChange={val => console.log(val)}
//   />
// );

class ProfileInfo extends React.Component {
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
                  {this.props.firstName}
                  &nbsp;
                  {this.props.middleName}
                  &nbsp;
                  {this.props.lastName}
                </h1>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h1 className="text-center">
                  {this.props.sport}
                  &nbsp;|&nbsp;
                  {this.props.sportPosition}
                  &nbsp;|&nbsp;
                  {this.props.sportLevel}
                </h1>
              </div>
            </div>
            <hr />
            <div className="row d-flex justify-content-around">
              <div className="col-md-3">
                <h2>{this.props.schoolName}</h2>
              </div>
              <div className="col-md-3">
                <h2>{this.props.classYear}</h2>
              </div>
            </div>

            <div className="row d-flex justify-content-around">
              <div className="col-md-3">
                <h2>
                  {this.props.city}, {this.props.state}
                </h2>
              </div>
              <div className="col-md-3">
                <h2>Class of {this.props.gradYear}</h2>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-12">
                <h2 className="text-center">
                  Height: {this.props.height} | Weight: {this.props.weight} | GPA: {this.props.gpa}
                </h2>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button className="profileBannerButtonOpacity float-right" type="button" onClick={this.editField}>
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
                  {this.props.firstName}
                  &nbsp;
                  {this.props.middleName}
                  &nbsp;
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
                />
                {/* <Select
                  type="select"
                  name="sport"
                  placeholder="Select Sport"
                  value={this.props.sport}
                >
                  <option>John</option>
                  <option>Stella</option>
                  <option>Dorris</option>
                  <option>Smith</option>
                  <option>Dommic</option>
                </Select>*/}
                &nbsp;|&nbsp;
                <Typeahead
                  name="sportPosition"
                  labelKey="sportPosition"
                  //multiple={multiple}
                  options={sportPositionOptions}
                  placeholder="Select Sport Position"
                  value={this.props.sportPosition}
                />
                {/* <Select
                  type="select"
                  name="sportPosition"
                  placeholder="Select Position"
                  value={this.props.sportPosition}
                >
                  <option>John</option>
                  <option>Stella</option>
                  <option>Dorris</option>
                  <option>Smith</option>
                  <option>Dommic</option>
                </Select> */}
                &nbsp;|&nbsp;
                <Typeahead
                  name="sportLevel"
                  labelKey="sportLevel"
                  //multiple={multiple}
                  options={sportLevelOptions}
                  placeholder="Select Sport Level"
                  value={this.props.sportLevel}
                />
                {/* <Select
                  type="select"
                  name="sportLevel"
                  placeholder="Select Sport Level"
                  value={this.props.sportLevel}
                >
                  <option>John</option>
                  <option>Stella</option>
                  <option>Dorris</option>
                  <option>Smith</option>
                  <option>Dommic</option>
                </Select> */}
                {/* <input type="text" name="sport" placeholder="Your Sport" value={this.props.sport} onChange={this.props.handleChange} />&nbsp;|&nbsp;
                <input type="text" name="sportPosition" placeholder="Your Position" value={this.props.sportPosition} onChange={this.props.handleChange} />&nbsp;|&nbsp;
                <input type="text" name="sportLevel" placeholder="Your Level" value={this.props.sportLevel} onChange={this.props.handleChange} /> */}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-6">
                {/* <Select
                  name="schoolName"
                  placeholder="Select School"
                  filterOptions={filterOptions}
                  options={schoolOptions}
                  value={this.state.schoolName}
                /> */}
                <Typeahead
                  name="schoolName"
                  labelKey="schoolName"
                  //multiple={multiple}
                  options={schoolOptions}
                  placeholder="Select School"
                  value={this.props.schoolName}
                />

                {/* <input
                  type="text"
                  name="schoolName"
                  value={this.props.schoolName}
                  placeholder="School Name"
                  onChange={this.props.handleChange}
                /> */}
              </div>
              <br />
              <div className="col-md-6">
                {/* <Select
                  placeholder="Select Class Year"
                  type="select"
                  name="classYear"
                  onChange={this.props.handleChange}
                  value={this.props.classYear}
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Other">Other</option>
                </Select> */}
                <Typeahead
                  name="classYear"
                  labelKey="classYear"
                  //multiple={multiple}
                  options={classYearOptions}
                  placeholder="Select Class Year"
                  value={this.props.classYear}
                />
                {/* <input
                  type="text"
                  name="classYear"
                  value={this.props.classYear}
                  placeholder="Class Year"
                  onChange={this.props.handleChange}
                /> */}
              </div>
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
                {/* <Input
                  type="text"
                  name="state"
                  value={this.props.state}
                  placeholder="State"
                  onChange={this.props.handleChange}
                /> */}
                <Typeahead
                  name="state"
                  labelKey="state"
                  //multiple={multiple}
                  options={stateOptions}
                  placeholder="State"
                  value={this.props.state}
                />
              </div>
              <div className="col-md-6">
                {/* <Input
                  type="text"
                  name="gradYear"
                  value={this.props.gradYear}
                  onChange={this.props.handleChange}
                  placeholder="Graduation Year"
                /> */}
                <Typeahead
                  name="gradYear"
                  labelKey="gradYear"
                  //multiple={multiple}
                  options={gradYearOptions}
                  placeholder="Select Graduation Year"
                  value={this.props.gradYear}
                />
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-12">
                Height:
                <Input type="text" name="height" value={this.props.height} onChange={this.props.handleChange} />
                &nbsp;| Weight:
                <Input type="text" name="weight" value={this.props.weight} onChange={this.props.handleChange} />
                &nbsp;| GPA:
                <Input type="text" name="gpa" value={this.props.gpa} onChange={this.props.handleChange} />
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-12">
                <button type="button" className="float-right" onClick={this.editField}>
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
export default ProfileInfo;
