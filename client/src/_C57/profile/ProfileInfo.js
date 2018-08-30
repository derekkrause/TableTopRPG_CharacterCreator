import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";
import "./Profile.css";
import AutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";
import { SaveProfileButton, CancelButton, MessageButton, StatsButton } from "../CustomComponents/Button";
import AthleteProfilePopover from "../CustomComponents/Popover/AthleteProfilePopver";
import ProfileLinksModal from "./ProfileLinksModal";
import { connect } from "react-redux";

class ProfileInfo extends React.Component {
  state = {
    editMode: false,
    schoolName: "",
    statsModal: false,
    everyThing: {},
    prevPropsEveryThing: {}
  };

  static getDerivedStateFromProps(props, state) {
    if (props.everyThing !== state.prevPropsEveryThing || props.classYearOptions !== state.prevPropsClassYearOptions) {
      return {
        everyThing: props.everyThing,
        prevPropsEveryThing: props.everyThing,
        classYearOptions: props.classYearOptions,
        prevPropsClassYearOptions: props.classYearOptions
      };
    }
    return null;
  }

  bundleProfileInfo = e => {
    e.preventDefault();
    const profileInfo = this.state.everyThing;
    this.props.handleProfileInfoSubmit(profileInfo);
    this.setState({
      editMode: false
    });
  };

  editField = () => {
    const currentState = this.state.editMode;
    this.setState({ editMode: !currentState });
  };

  saveProfile = () => {
    this.setState({
      editMode: false
    });
    this.props.handleSaveProfile();
  };

  toggle = () => {
    console.log("clicked");
    this.setState({
      statsModal: !this.state.statsModal
    });
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        [key]: val
      }
    }));
  };

  onChange = value => {
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        SchoolName: value
      }
    }));
  };

  onHandleSchoolSelect = id => {
    this.setState(prevState => ({
      everyThing: {
        ...prevState.everyThing,
        SchoolId: id
      }
    }));
  };

  onEditCancelClick = () => {
    this.setState(
      {
        everyThing: this.state.prevPropsEveryThing
      },
      () => this.editField()
    );
  };

  toggle = () => {
    console.log("clicked");
    this.setState({
      statsModal: !this.state.statsModal
    });
  };

  callback = () => {
    return schoolSearch(0, this.state.everyThing.SchoolName); // schoolSearch available in SchoolAdminServer.js
  };

  // <AthleteSportHistoryCard athleteHistory={this.state.history} /> pass in athlete history here
  render() {
    const { currentPageId } = this.props;
    return (
      <div>
        {!this.state.editMode ? (
          <React.Fragment>
            <div className="row">
              <div className="col-md-12 profileDiv">
                <div className="row" style={{ position: "relative", left: "4%", float: "right" }}>
                  <div className="col-md-3">
                    {this.props.currentUser.id == currentPageId ? (
                      <AthleteProfilePopover handleUpdate={this.editField} />
                    ) : (
                      <div />
                    )}
                  </div>
                </div>
                {this.state.everyThing.FirstName && (
                  <React.Fragment>
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <h1 style={{ fontWeight: "1000", marginBottom: "20px" }}>
                        {this.state.everyThing.FirstName}
                        &nbsp;
                        {this.state.everyThing.MiddleName}
                        &nbsp;
                        {this.state.everyThing.LastName}
                      </h1>
                    </div>

                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <h2>{this.state.everyThing.SchoolName}</h2>
                      &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                      <h2>
                        {this.state.everyThing.City}, {this.state.everyThing.State}
                      </h2>
                    </div>
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <h2>{this.state.everyThing.ClassYearName}</h2>
                      &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                      <h2 style={{ display: "inline-block" }}>Class of </h2>
                      <h2 style={{ display: "inline-block" }}>
                        &nbsp; {this.state.everyThing.HighSchoolGraduationYear}
                      </h2>
                    </div>
                    <div className="row" style={{ position: "relative", left: "4%", marginBottom: "40px" }}>
                      {this.state.everyThing.Height && (
                        <React.Fragment>
                          <h2>
                            Height: {this.state.everyThing.heightFeet}'{this.state.everyThing.heightInches}
                          </h2>
                          {this.state.everyThing.Weight && (
                            <React.Fragment>
                              &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                      {this.state.everyThing.Weight && (
                        <h2>
                          Weight: {this.state.everyThing.Weight}
                          lbs.
                        </h2>
                      )}
                    </div>
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <div role="group" className="btn-group">
                        {this.props.currentUser.id != this.props.currentPageId ? (
                          <React.Fragment>
                            {!this.props.following ? (
                              <button
                                className="jr-btn jr-btn-default btn btn-default profileInfoBtn"
                                onClick={() => this.props.followUser()}
                              >
                                Follow
                              </button>
                            ) : (
                              <button
                                className="jr-btn jr-btn-default btn btn-default profileInfoBtn px-3"
                                style={{ color: "#81c784" }}
                                onClick={() => this.props.followUser()}
                              >
                                <i className="zmdi zmdi-check-circle zmdi-hc-lg " />
                                &nbsp; Following
                              </button>
                            )}

                            {!this.props.highlighting ? (
                              <button
                                className="jr-btn jr-btn-default btn btn-default profileInfoBtn"
                                onClick={() => this.props.highlightUser()}
                              >
                                Highlight
                              </button>
                            ) : (
                              <button
                                className="jr-btn jr-btn-default btn btn-default profileInfoBtn  px-3"
                                style={{ color: "#81c784" }}
                                onClick={() => this.props.highlightUser()}
                              >
                                <i className="zmdi zmdi-check-circle zmdi-hc-lg " />
                                &nbsp; Highlighted
                              </button>
                            )}
                          </React.Fragment>
                        ) : (
                          <div />
                        )}
                      </div>

                      <div className="col-md-2" />
                      <div className="text-right col-md-6">
                        <StatsButton onClick={this.toggle} />
                        <MessageButton />
                        <ProfileLinksModal
                          statsModal={this.state.statsModal}
                          userId={this.props.userId}
                          toggle={this.toggle}
                          currentProfile={this.props.currentProfile}
                          style={{ position: "static" }}
                          currentPageId={this.props.currentPageId}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <form onSubmit={this.bundleProfileInfo}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-12">
                    <div className="row" style={{ position: "relative", left: "4%" }}>
                      <div className="col-md-3" style={{ position: "relative", left: "85%" }}>
                        <AthleteProfilePopover handleUpdate={this.editField} />
                      </div>
                    </div>
                    <div className="row addedHeight col-md-12">
                      <div className="col-md-4">
                        <label>First Name:</label>
                        <input
                          className="nameInputs form-control"
                          onChange={this.handleChange}
                          value={this.state.everyThing.FirstName}
                          name="FirstName"
                        />
                      </div>
                      <div className="col-md-4">
                        <label>Middle Name:</label>
                        <input
                          className="nameInputs form-control"
                          onChange={this.handleChange}
                          value={this.state.everyThing.MiddleName}
                          name="MiddleName"
                        />
                      </div>
                      <div className="col-md-4">
                        <label>Last Name:</label>
                        <input
                          className="nameInputs form-control"
                          onChange={this.handleChange}
                          value={this.state.everyThing.LastName}
                          name="LastName"
                        />
                      </div>
                    </div>

                    <div className="row col-md-12">
                      <div className="col-md-6">
                        <label>School:</label>
                        <AutoComplete
                          numberOfCharacters={5} // when you want callback function to fire
                          callBack={this.callback} // the call back function in the parent you want called
                          value={this.state.everyThing.SchoolName} // value you want changed
                          onChange={this.onChange} // onChange function in the parent
                          name="SchoolName" // name
                          limit={10} // limit the results on the dropdown, recommend 10
                          className={"form-control"} // any classnames you want to include in the input
                          resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
                          onHandleSchoolSelect={this.onHandleSchoolSelect}
                        />
                      </div>
                      <label> </label>
                      <div className="col-md-4">
                        <label>City:</label>
                        <input
                          className="form-control"
                          value={this.state.everyThing.City}
                          name="City"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md">
                        <label>State:</label>
                        <input
                          className="form-control"
                          value={this.state.everyThing.State}
                          max={2}
                          name="State"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row addedHeight col-md-12">
                      <div className="col-md-4">
                        <label>Class Year</label>
                        <select
                          className="form-control"
                          type="text"
                          value={this.state.everyThing.ClassYearId}
                          name="ClassYearId"
                          onChange={this.handleChange}
                          style={{ height: "2rem" }}
                        >
                          <option>Class Year</option>
                          {this.state.classYearOptions.map(year => (
                            <option name={year.name} key={year.id} value={year.id}>
                              {year.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-5">
                        <label>Class of:</label>
                        <input
                          value={this.state.everyThing.HighSchoolGraduationYear}
                          name="HighSchoolGraduationYear"
                          onChange={this.handleChange}
                          min={2000}
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="row col-md-12">
                      <div className="col">Height </div>
                    </div>
                    <div className="row col-md-12">
                      <div className="col-md-2" style={{ paddingRight: 5 }}>
                        Feet:
                        <input
                          className="form-control"
                          type="number"
                          value={this.state.everyThing.heightFeet}
                          min={4}
                          max={8}
                          name="heightFeet"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-2" style={{ paddingLeft: 5 }}>
                        Inches:
                        <input
                          className="form-control"
                          type="number"
                          value={this.state.everyThing.heightInches}
                          min={0}
                          max={12}
                          name="heightInches"
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-3">
                        <label>Weight: </label>
                        <input
                          className="form-control"
                          type="number"
                          value={this.state.everyThing.Weight}
                          max={500}
                          name="Weight"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 text-right">
                    <CancelButton type="button" className="text-right" onClick={this.onEditCancelClick} />
                    <SaveProfileButton type="submit" className="text-right" />
                  </div>
                </div>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}
export default connect(mapStateToProps)(ProfileInfo);
