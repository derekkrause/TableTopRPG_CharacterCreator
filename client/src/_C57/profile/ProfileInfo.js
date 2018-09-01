import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";
import "./Profile.css";
import AutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";
import {
  SaveProfileButton,
  CancelButton,
  MessageButton,
  StatsButton,
  HighlightButton,
  FollowButton,
  FollowOnButton,
  HighlightOnButton
} from "../CustomComponents/Button";
import AthleteProfilePopover from "../CustomComponents/Popover/AthleteProfilePopver";
import ProfileLinksModal from "./ProfileLinksModal";
import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";
import { NotificationManager, NotificationContainer } from "react-notifications";
import { getContacts } from "../../services/message.service";
import StateOptions from "../CustomComponents/InputsDropdowns/StateOptions";

class ProfileInfo extends React.Component {
  state = {
    editMode: false,
    schoolName: "",
    statsModal: false,
    everyThing: {},
    prevPropsEveryThing: {},
    showMessageButton: false
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

  componentDidMount = () => {
    this.handleGetContacts();
  };

  bundleProfileInfo = e => {
    e.preventDefault();
    const profileInfo = this.state.everyThing;
    this.props.handleProfileInfoSubmit(profileInfo);
    this.setState({
      editMode: false
    });
    NotificationManager.success("Profile Updated!", "Success", 2000);
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

  handleGetContacts = () => {
    const id = this.props.currentUser.id;
    getContacts(id)
      .then(response => {
        const user = response.data.items.contacts;
        if (user) {
          for (let i = 0; i < user.length; i++) {
            if (user[i]["UserId"] == this.props.currentPageId) {
              this.setState({ showMessageButton: true });
            }
          }
        }
      })
      .catch(() => {
        console.log("There was an error getting your contacts");
      });
  };

  // <AthleteSportHistoryCard athleteHistory={this.state.history} /> pass in athlete history here
  render() {
    const { currentPageId } = this.props;
    const { showMessageButton } = this.state;
    return (
      <div>
        <NotificationContainer />
        {!this.state.editMode ? (
          <React.Fragment>
            <div className="container profileInfo-info px-0">
              <div className="col-md-12 mr-2 mr-md-0">
                {this.state.everyThing.FirstName && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-11 text-center text-md-left pl-4 pl-md-0 pr-0">
                        <h1 style={{ fontWeight: 800 }}>
                          {this.state.everyThing.FirstName}
                          &nbsp;
                          {this.state.everyThing.MiddleName}
                          &nbsp;
                          {this.state.everyThing.LastName}
                        </h1>
                      </div>
                      <div className="col-1 text-right p-0" id="profileInfoEdit">
                        {this.props.currentUser.id == currentPageId ? (
                          <AthleteProfilePopover handleUpdate={this.editField} popover="profileInfoEdit" />
                        ) : (
                          <div />
                        )}
                      </div>
                    </div>
                    <div className="row justify-content-center justify-content-md-start pl-0">
                      <h3>{this.state.everyThing.SchoolName}</h3>
                      &nbsp; <h4 className="slash"> &nbsp; | &nbsp; </h4> &nbsp;
                      <h3>
                        {this.state.everyThing.City}, {this.state.everyThing.State}
                      </h3>
                    </div>
                    <div className="row justify-content-center justify-content-md-start pl-0">
                      <h3>{this.state.everyThing.ClassYearName}</h3>
                      &nbsp; <h4 className="slash"> &nbsp; | &nbsp; </h4> &nbsp;
                      <h3 style={{ display: "inline-block" }}>Class of </h3>
                      <h3 style={{ display: "inline-block" }}>
                        &nbsp; {this.state.everyThing.HighSchoolGraduationYear}
                      </h3>
                    </div>
                    <div className="row mb-3 justify-content-center justify-content-md-start pl-0">
                      {this.state.everyThing.Height && (
                        <React.Fragment>
                          <h3>
                            Height: {this.state.everyThing.heightFeet}'{this.state.everyThing.heightInches}
                          </h3>
                          {this.state.everyThing.Weight && (
                            <React.Fragment>
                              &nbsp; <h3 className="slash"> &nbsp; | &nbsp; </h3> &nbsp;
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                      {this.state.everyThing.Weight && (
                        <h3>
                          Weight: {this.state.everyThing.Weight}
                          &nbsp;lbs
                        </h3>
                      )}
                    </div>
                    <div className="row justify-content-center justify-content-md-between pl-1 pl-md-0">
                      <div role="group" className="btn-group mt-3 mt-sm-3 mt-md-3 mt-lg-0">
                        {this.props.currentUser.id != this.props.currentPageId ? (
                          <React.Fragment>
                            {!this.props.following ? (
                              <FollowButton
                                margin="mb-0"
                                style="rs-btn-border-primary"
                                onClick={() => {
                                  this.props.followUser();
                                  this.handleGetContacts();
                                }}
                              />
                            ) : (
                              <FollowOnButton
                                margin="mb-0"
                                style="rs-btn-border-primary-on"
                                onClick={() => {
                                  this.props.followUser();
                                  this.setState({ showMessageButton: false });
                                }}
                              />
                            )}
                            {!this.props.highlighting ? (
                              <HighlightButton
                                margin="mb-0"
                                style="rs-btn-border-primary"
                                onClick={() => this.props.highlightUser()}
                              />
                            ) : (
                              <HighlightOnButton
                                margin="mb-0"
                                style="rs-btn-border-primary-on"
                                onClick={() => this.props.highlightUser()}
                              />
                            )}
                          </React.Fragment>
                        ) : (
                          <div />
                        )}
                      </div>

                      <div className="d-flex justify-content-end mt-3 mt-sm-3 mt-md-3 mt-lg-0 ">
                        <StatsButton margin="mb-0 mr-2" style="rs-btn-primary-light" onClick={this.toggle} />
                        {showMessageButton && (
                          <NavLink to={{ pathname: "/app/messaging", state: { id: `${currentPageId}` } }}>
                            <MessageButton margin="mb-0 mr-0" style="rs-btn-primary-light" />
                          </NavLink>
                        )}
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
              <div className="form-group profileInfo-info">
                <div className="row mt-3" style={{ position: "relative", left: "4%" }} />
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
                  <div className="col-md-4 px-md-0">
                    <label>Middle Name:</label>
                    <input
                      className="nameInputs form-control"
                      onChange={this.handleChange}
                      value={this.state.everyThing.MiddleName}
                      name="MiddleName"
                    />
                  </div>
                  <div className="col-md-4 ">
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
                  <div className="col-md-5">
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
                  <div className="col-md-3 px-md-0">
                    <label>City:</label>
                    <input
                      className="form-control"
                      value={this.state.everyThing.City}
                      name="City"
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>State:</label>
                    <StateOptions
                      className="rs-select-size"
                      name="State"
                      defaultValue={this.state.everyThing.State}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="row addedHeight col-md-12">
                  <div className="col-md-4 pr-md-0">
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
                  <div className="col-md-2">
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
                  <div className="col-md-2 px-md-0">
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
                  <div className="form-group col-md-3">
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

                <div className="row">
                  <div className="col-md-12 text-right mt-4">
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
export default withRouter(connect(mapStateToProps)(ProfileInfo));
