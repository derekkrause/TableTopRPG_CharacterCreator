import React from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ProfileBanner.css";
import "./Profile.css";
import AutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";
import {
  SaveButton,
  CancelButton,
  MessageButton,
  StatsButton,
  FollowButton,
  HighlightButton
} from "../CustomComponents/Button";
import Popover from "../CustomComponents/Popover";
import ProfileLinksModal from "./ProfileLinksModal";

class ProfileInfo extends React.Component {
  state = {
    editMode: false,
    schoolName: "",
    statsModal: false
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

  static getDerivedStateFromProps(props, state) {
    if (props.schoolName !== state.schoolName) {
      return {
        schoolName: props.schoolName
      };
    }
    return null;
  }

  onChange = value => {
    this.setState({
      schoolName: value
    });
  };

  toggle = () => {
    console.log("clicked");
    this.setState({
      statsModal: !this.state.statsModal
    });
  };

  callback = () => {
    return schoolSearch(0, this.state.schoolName); // schoolSearch available in SchoolAdminServer.js
  };

  // <AthleteSportHistoryCard athleteHistory={this.state.history} /> pass in athlete history here
  render() {
    return (
      <div>
        {this.state.editMode === false && (
          <React.Fragment>
            <div className="row">
              <div className="col-md-12 profileDiv">
                <div className="row" style={{ position: "relative", left: "4%", float: "right" }}>
                  <div className="col-md-3">
                    <Popover handleUpdate={this.editField} />
                  </div>
                </div>
                <div className="row" style={{ position: "relative", left: "4%" }}>
                  <h1 style={{ fontWeight: "1000", marginBottom: "20px" }}>
                    {this.props.firstName}
                    &nbsp;
                    {this.props.middleName}
                    &nbsp;
                    {this.props.lastName}
                  </h1>
                </div>

                <div className="row" style={{ position: "relative", left: "4%" }}>
                  <h2>{this.props.schoolName}</h2>
                  &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                  <h2>
                    {this.props.city}, {this.props.state}
                  </h2>
                </div>
                <div className="row" style={{ position: "relative", left: "4%" }}>
                  <h2>{this.props.classYear}</h2>
                  &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                  <h2 style={{ display: "inline-block" }}>Class of </h2>{" "}
                  <h2 style={{ display: "inline-block" }}>&nbsp; {this.props.gradYear}</h2>{" "}
                </div>
                <div className="row" style={{ position: "relative", left: "4%", marginBottom: "40px" }}>
                  {this.props.height && (
                    <React.Fragment>
                      <h2>
                        Height: {this.props.heightFeet}'{this.props.heightInches}
                      </h2>
                      {this.props.weight && (
                        <React.Fragment>
                          &nbsp; <h2 className="slash"> &nbsp; | &nbsp; </h2> &nbsp;
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                  {this.props.weight && (
                    <h2>
                      Weight: {this.props.weight}
                      lbs.
                    </h2>
                  )}
                </div>
                <div className="row" style={{ position: "relative", left: "4%" }}>
                  <div role="group" className="btn-group">
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
                    />
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.state.editMode === true && (
          <React.Fragment>
            <div className="row">
              <div className="col-md-12">
                <div className="row" style={{ position: "relative", left: "4%" }}>
                  <div className="col-md-3" style={{ position: "relative", left: "85%" }}>
                    <Popover handleUpdate={this.editField} />
                  </div>
                </div>
                <form>
                  <div className="row addedHeight col-md-12">
                    <div className="form-group col-md-4">
                      <label>First Name:</label>
                      <input
                        className="nameInputs form-control"
                        onChange={this.props.handleChange}
                        value={this.props.firstName}
                        name="firstName"
                      />
                    </div>
                    <div className=" form-group col-md-4">
                      <label>Middle Name:</label>
                      <input
                        className="nameInputs form-control"
                        onChange={this.props.handleChange}
                        value={this.props.middleName}
                        name="middleName"
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label>Last Name:</label>
                      <input
                        className="nameInputs form-control"
                        onChange={this.props.handleChange}
                        value={this.props.lastName}
                        name="lastName"
                      />
                    </div>
                  </div>

                  <div className="row col-md-12">
                    <div className="form-group col-md-6">
                      <label>School:</label>
                      <AutoComplete
                        numberOfCharacters={5} // when you want callback function to fire
                        callBack={this.callback} // the call back function in the parent you want called
                        value={this.state.schoolName} // value you want changed
                        onChange={this.props.onChange} // onChange function in the parent
                        name={this.state.schoolName} // name
                        limit={10} // limit the results on the dropdown, recommend 10
                        className={"form-control"} // any classnames you want to include in the input
                        resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
                        onHandleSchoolSelect={this.props.onHandleSchoolSelect}
                      />
                    </div>
                    <label> </label>
                    <div className="form-group col-md-4">
                      <label>City:</label>
                      <input
                        className="form-control"
                        value={this.props.city}
                        name="city"
                        onChange={this.props.handleChange}
                      />
                    </div>
                    <div className="form-group col-md">
                      <label>State:</label>
                      <input
                        className="form-control"
                        value={this.props.state}
                        name="state"
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>

                  <div className="row addedHeight col-md-12">
                    <div className="form-group col-md-4">
                      <label>Class Year</label>
                      <select
                        className="form-control"
                        type="text"
                        value={this.props.classYearId}
                        name="classYearId"
                        onChange={this.props.handleChange}
                        style={{ height: "2rem" }}
                      >
                        <option>Class Year</option>
                        {this.props.classYearOptions.map(year => (
                          <option name={year.name} key={year.id} value={year.id}>
                            {year.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-md-5">
                      <label>Class of:</label>
                      <input
                        value={this.props.gradYear}
                        name="gradYear"
                        onChange={this.props.handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="row col-md-12">
                    <div className="col">Height </div>
                  </div>
                  <div className="row col-md-12">
                    <div className="form-group col-md-2" style={{ paddingRight: 5 }}>
                      Feet:
                      <input
                        className="form-control"
                        type="number"
                        value={this.props.heightFeet}
                        name="heightFeet"
                        onChange={this.props.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-2" style={{ paddingLeft: 5 }}>
                      Inches:
                      <input
                        className="form-control"
                        type="number"
                        value={this.props.heightInches}
                        name="heightInches"
                        onChange={this.props.handleChange}
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <label>weight: </label>
                      <input
                        className="form-control"
                        value={this.props.weight}
                        name="weight"
                        onChange={this.props.handleChange}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right">
                <CancelButton type="button" className="text-right" onClick={this.editField} />
                <SaveButton type="button" className="text-right" onClick={this.saveProfile} />
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
export default ProfileInfo;
