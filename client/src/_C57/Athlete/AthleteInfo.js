import React from "react";

class AthleteInfo extends React.Component {
  state = {
    firstName: "First",
    middleName: "Middle",
    lastName: "Last",
    schoolName: "Test School Name",
    city: "Test City",
    state: "Test State",
    classYear: "Test Junior",
    graduationYear: "Test Grad Year",
    sport: "Baseball",
    sportPosition: "Position",
    sportLevel: "High School Varsity",
    height: "7'12''",
    weight: "500 lbs",
    gpa: "5.10",
    editMode: false
  };

  handlerOnEditClick = (/* e */) => {
    /*     e.preventDefault(); */
    this.setState({
      editMode: true
    });
  };

  handlerOnUpdateClick = () => {
    this.setState({
      editMode: false
    });
  };
  handlerOnCancelEditClick = () => {
    this.setState({
      editMode: false
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="AthleteInfo container">
          {this.state.editMode === false && (
            <React.Fragment>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <h1>
                    {this.state.firstName} {this.state.middleName} {this.state.lastName}
                  </h1>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <h1>
                    {this.state.sport} | {this.state.sportPosition} | {this.state.sportLevel}
                  </h1>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-7">
                  <h2>School: {this.state.schoolName}</h2>
                </div>
                <div className="col-md-5">
                  <h2>Class: {this.state.classYear}</h2>
                </div>
              </div>

              <div className="row">
                <div className="col-md-7">
                  <h2>
                    {this.state.city}, {this.state.state}
                  </h2>
                </div>
                <div className="col-md-5">
                  <h2>Graduation Year: {this.state.graduationYear}</h2>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <h2>
                    Height: {this.state.height} | Weight: {this.state.weight} | GPA: {this.state.gpa}
                  </h2>
                </div>
                <div className="row justify-content-center">
                  <button className="editButton" type="button" onClick={this.handlerOnEditClick}>
                    Edit
                  </button>
                </div>
              </div>
              <hr />
            </React.Fragment>
          )}
          {this.state.editMode === true && (
            <React.Fragment>
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <h1>
                    {this.state.firstName} {this.state.middleName} {this.state.lastName}
                  </h1>
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className="row justify-content-center">
                  THESE WILL ALL BE DROPDOWNS
                  <input type="text" value={this.state.sport} />
                  <input type="text" value={this.state.sportPosition} />
                  <input type="text" value={this.state.sportLevel} />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-7">
                  School Name: <br />
                  <input type="text" value={this.state.schoolName} />
                </div>
                <br />
                <div className="col-md-5">
                  Class Year: DROPDOWN<br />
                  <input type="text" value={this.state.classYear} />
                </div>
              </div>

              <div className="row">
                <div className="col-md-7">
                  City: <br />
                  <input type="text" value={this.state.city} />
                  <br />
                  State: DROPDOWN<br />
                  <input type="text" value={this.state.state} />
                </div>
                <div className="col-md-5">
                  Graduation Year: DROPDOWN <br />
                  <input type="text" value={this.state.graduationYear} />
                </div>
              </div>
              <hr />
              <div className="col-md-12">
                <div className="row justify-content-center">
                  Height:
                  <input type="text" value={this.state.height} /> Weight:
                  <input type="text" value={this.state.weight} />
                  GPA:<input type="text" value={this.state.gpa} />
                </div>{" "}
                <hr />
                <div className="row justify-content-center">
                  <button type="button" onClick={this.handlerOnUpdateClick}>
                    Save
                  </button>
                  <button type="button" onClick={this.handlerOnCancelEditClick}>
                    Cancel
                  </button>
                </div>
              </div>
              <hr />
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}
export default AthleteInfo;
