import React from "react";
import "./AthleteSportHistoryCard.css";
import { getAllSports, getClassYear, getSportLevels } from "./AddSportHistory/AddSportService";
import AddSportName from "./AddSportHistory/AddSportName";
import SchoolAutoComplete from "../CustomComponents/SchoolAutoComplete/AutoComplete";
import { schoolSearch } from "../Admin/SchoolAdmin/SchoolAdminServer";
import { connect } from "react-redux";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { updateSportHistory } from "./AddSportHistory/AddSportService";

class AthleteSportHistoryCard extends React.Component {
  state = {
    editMode: false,
    /*     selectedOption: null, */
    selectedOption: [],
    sportPositionOptions: [],
    sportPositionId: [],
    classYearOptions: [],
    sportOption: [],
    sportLevelOptions: [],
    teamName: "",
    clubName: "",
    schoolId: ""
  };

  positionArray = () => {
    const positionArray = this.props.athleteTeamInfo.sportPositions.map(pos => {
      return pos.code;
    });
    const joinedPos = positionArray.join(", ");
    return joinedPos;
  };

  multiFilterRemaining(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      return filterKeys.every(key => !~filters[key].indexOf(item[key]));
    });
  }

  multiFilterSelected(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
      return filterKeys.every(key => !!~filters[key].indexOf(item[key]));
    });
  }

  onHandleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  };

  handleChangeSport = e => {
    this.onHandleChange(e);
    const key = e.target.name;
    const val = e.target.value;
    this.setState({
      [key]: val
    });
    const array = this.state.sportOptions;
    let sportFilter = array.filter(sport => {
      return sport.id == val;
    });
    this.setState({
      sportPositionOptions: sportFilter[0].positions,
      newSportPositionList: "",
      sportPositionId: ""
    });
  };

  handleSelectedSport = () => {
    const array = this.state.sportOptions;
    let sportFilter = array.filter(sport => {
      return sport.id == this.props.athleteTeamInfo.sportId;
    });
    this.setState({ sportPositionOptions: sportFilter[0].positions });
    let newSportPositionList2 = sportFilter[0].positions.slice();
    const positionArray = this.props.athleteTeamInfo.sportPositions.map(position => {
      return position.sportPositionId;
    });
    const filters = {
      id: positionArray
    };
    var filtered = this.multiFilterRemaining(newSportPositionList2, filters);
    var sportIdList = this.multiFilterSelected(newSportPositionList2, filters);
    this.setState({
      newSportPositionList: filtered,
      sportPositionIdInitial: sportIdList,
      sportPositionId: sportIdList
    });
  };

  onHandleSchoolSelect = id => {
    this.setState({ schoolId: id });
  };

  handleChangeSportPosition = e => {
    if (!this.state.newSportPositionList) {
      const val = e.target.value;
      const newSportPositionId = this.state.sportPositionOptions.filter(position => {
        return position.id == val;
      });
      this.setState({ sportPositionId: newSportPositionId });
      const newSportPositionList = this.state.sportPositionOptions.filter(position => {
        return position.id != val;
      });
      this.setState({ newSportPositionList });
    } else {
      const key = e.target.name;
      const val = e.target.value;
      const newSportPositionId = this.state.sportPositionOptions.filter(position => {
        return position.id == val;
      });
      let sportPositionIdArray = [...this.state.sportPositionId, newSportPositionId[0]];
      this.setState({
        sportPositionId: sportPositionIdArray
      });
      const newerSportPositionList = this.state.newSportPositionList.filter(position => {
        return position.id != val;
      });
      this.setState({ newSportPositionList: newerSportPositionList });
    }
  };

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleInitialOptionChange = () => {
    this.setState({
      selectedOption: this.props.athleteTeamInfo.selectedOption,
      schoolId: this.props.athleteTeamInfo.schoolId,
      sportId: this.props.athleteTeamInfo.sportId,
      sportLevelId: this.props.athleteTeamInfo.sportLevelId,
      classYearId: this.props.athleteTeamInfo.classYearId,
      comments: this.props.athleteTeamInfo.comments,
      teamName: this.props.athleteTeamInfo.teamName,
      clubName: this.props.athleteTeamInfo.clubName
    });
  };

  deletePosition = position => {
    const sportPositionIdArray = this.state.sportPositionId.filter(pos => {
      return pos.id != position.id;
    });
    this.setState({ sportPositionId: sportPositionIdArray });
    let newestSportPositionList1 = this.state.newSportPositionList;
    newestSportPositionList1.push(position);
    newestSportPositionList1.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({ newSportPositionList: newestSportPositionList1 });
  };

  callback = () => {
    return schoolSearch(0, this.state.schoolName);
  };

  onChange = value => {
    this.setState({
      schoolName: value
    });
  };

  updateAthleteTeamSuccess = () => NotificationManager.success("SportHistory Updated!", "Success", 2000);

  onSaveClick = () => {
    let sportPositionArray = this.state.sportPositionId.map(sport => {
      return sport.id;
    });
    const sportInfo = {
      userId: this.props.athleteTeamInfo.userId,
      sportId: this.state.sportId,
      classYearId: this.state.classYearId,
      sportPositionId: sportPositionArray,
      comments: this.state.comments,
      sportLevelId: this.state.sportLevelId,
      selectedSchoolClubOrTeam: this.state.selectedOption,
      schoolId: this.state.selectedOption == 1 ? this.state.schoolId : null,
      clubName: this.state.selectedOption == 2 ? this.state.clubName : null,
      teamName: this.state.selectedOption == 3 ? this.state.teamName : null,
      id: this.state.athleteTeamInfo.id
    };
    console.log(sportInfo, this.state.athleteTeamInfo.id, "LOGGING THIS");
    updateSportHistory(sportInfo)
      .then(res => {
        this.updateAthleteTeamSuccess();
        this.props.getAthleteSportInfo();
        this.props.onEditCancel();
      })
      .catch(res => {
        console.log(res, "Update Failed");
        this.props.updateAthleteTeamNotificationError();
      });
  };

  componentDidMount() {
    if (this.props.currentUser) {
      getAllSports()
        .then(res => {
          this.setState({ sportOptions: res.data });
          getClassYear().then(
            res => this.setState({ classYearOptions: res.data.item.pagedItems }),
            getSportLevels().then(res => {
              this.setState({ sportLevelOptions: res.data });
            })
          );
          this.handleSelectedSport();
        })
        .catch(() => {
          console.log("Get All Failed");
        });
      this.handleInitialOptionChange();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.athleteTeamInfo !== state.athleteTeamInfoOriginal) {
      return {
        athleteTeamInfoOriginal: props.athleteTeamInfo,
        athleteTeamInfo: props.athleteTeamInfo
      };
    }
    return null;
  }

  render() {
    const {
      classYear,
      clubName,
      comments,
      schoolName,
      selectedOption,
      sportLevel,
      sportName,
      teamName
    } = this.props.athleteTeamInfo;
    return (
      <div className="fadeIn">
        {this.props.editMode ? (
          <React.Fragment>
            <div className="text-center">
              <h2>Change Team Type?</h2>
              <h3 className="card-heading">
                Current Team: {selectedOption == 1 && schoolName}
                {selectedOption == 2 && clubName}
                {selectedOption == 3 && teamName}
              </h3>
            </div>
            <div className="row justify-content-center">
              <div className="d-flex radio pr-3">
                <label>
                  <input
                    type="radio"
                    value="1"
                    name={this.props.athleteTeamInfo.id}
                    checked={this.state.selectedOption == 1}
                    onChange={this.handleOptionChange}
                  />
                  School
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="2"
                    name={this.props.athleteTeamInfo.id}
                    checked={this.state.selectedOption == 2}
                    onChange={this.handleOptionChange}
                  />
                  Club
                </label>
              </div>
              <div className="d-flex radio pl-3">
                <label>
                  <input
                    type="radio"
                    value="3"
                    name={this.props.athleteTeamInfo.id}
                    checked={this.state.selectedOption == 3}
                    onChange={this.handleOptionChange}
                  />
                  Other
                </label>
              </div>
            </div>
            {this.state.selectedOption == 1 && (
              <React.Fragment>
                <label>School</label>
                <SchoolAutoComplete
                  includeCityState={true}
                  onHandleSchoolSelect={this.onHandleSchoolSelect}
                  numberOfCharacters={5} // when you want callback function to fire
                  callBack={this.callback} // the call back function in the parent you want called
                  value={this.state.schoolName} // value you want changed
                  onChange={this.onChange} // onChange function in the parent
                  name={this.state.schoolName} // name
                  limit={10} // limit the results on the dropdown, recommend 10
                  className={"form-control"} // any classnames you want to include in the input
                  resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
                  placeholder={"Type school name here..."}
                />
              </React.Fragment>
            )}
            {this.state.selectedOption == 2 && (
              <React.Fragment>
                <label htmlFor="clubName">Club Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="clubName"
                  placeholder="Club Name"
                  value={this.state.clubName}
                  onChange={this.onHandleChange}
                />
              </React.Fragment>
            )}
            {this.state.selectedOption == 3 && (
              <React.Fragment>
                <label htmlFor="teamName">Team Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="teamName"
                  value={this.state.teamName}
                  onChange={this.onHandleChange}
                />
              </React.Fragment>
            )}
            <span className="body">
              <div>
                <div className="d-flex justify-content-center pb-2">
                  <span>Current Sport: {sportName}</span>
                </div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group">
                      <label>Sport Name</label>
                      <select
                        className="form-control form-control-md"
                        type="text"
                        value={this.state.sportId}
                        name="sportId"
                        onChange={this.handleChangeSport}
                      >
                        {this.state.sportOptions != "" ? (
                          <React.Fragment>
                            <option>Select Sport</option>
                            {this.state.sportOptions.map(sport => (
                              <AddSportName sport={sport} key={sport.id} />
                            ))}
                          </React.Fragment>
                        ) : (
                          <option>Loading Options...</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {this.state.sportPositionIdInitial ? (
                  <React.Fragment>
                    <div className="row justify-content-center">
                      {" "}
                      Current Positions:
                      {this.state.sportPositionIdInitial.map(position => (
                        <div name={position.id} key={position.id} className="px-2">
                          {position.code}
                        </div>
                      ))}
                    </div>
                    {this.state.sportPositionId ? (
                      <div className="row justify-content-center">
                        {" "}
                        Updated Positions:
                        {this.state.sportPositionId.map(position => (
                          <div name={position.id} key={position.id} className="px-2">
                            <a
                              href="javascript:void(0)"
                              onClick={() => this.deletePosition(position)}
                              style={{ color: "red" }}
                              className="float-right pl-1"
                            >
                              <p style={{ fontSize: "xx-small" }}>x</p>
                            </a>
                            {position.code}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </React.Fragment>
                ) : null}
                <div className="row">
                  <div className="col-md-12  pb-2">
                    <div className="form-group">
                      <label>Sport Position</label>
                      <select
                        className="form-control form-control-md"
                        type="text"
                        value={this.state.sportPosition}
                        name="sportPositionId"
                        onChange={this.handleChangeSportPosition}
                      >
                        <option>Select Position</option>
                        {this.state.newSportPositionList
                          ? this.state.newSportPositionList.map(sport => (
                              <option name={sport.name} key={sport.id} value={sport.id}>
                                {sport.name}
                              </option>
                            ))
                          : this.state.sportPositionOptions.map(sport => (
                              <option name={sport.name} key={sport.id} value={sport.id}>
                                {sport.name}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center pb-2">Current Class Year: {classYear}</div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Class Year</label>
                      <select
                        className="form-control form-control-md"
                        type="text"
                        value={this.state.classYearId}
                        name="classYearId"
                        onChange={this.onHandleChange}
                      >
                        <option>Class Year</option>
                        {this.state.classYearOptions ? (
                          this.state.classYearOptions.map(year => (
                            <option name={year.name} key={year.id} value={year.id}>
                              {year.name}
                            </option>
                          ))
                        ) : (
                          <option>Loading Options...</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center  pb-2">Current Sport Level: {sportLevel}</div>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="form-group" style={{ zIndex: 100 }}>
                      <label>Competition Level</label>
                      <select
                        className="form-control form-control-md"
                        type="text"
                        value={this.state.sportLevelId}
                        name="sportLevelId"
                        onChange={this.onHandleChange}
                      >
                        <option>Competition Level</option>
                        {this.state.sportLevelOptions ? (
                          this.state.sportLevelOptions.map(level => (
                            <option name={level.competitionLevel} key={level.id} value={level.id}>
                              {level.competitionLevel}
                            </option>
                          ))
                        ) : (
                          <option>Loading Options...</option>
                        )}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </span>
            <div className="sub-heading">
              Comments
              <textarea
                className="form-control"
                name="comments"
                placeholder="Enter comment here"
                value={this.state.comments}
                onChange={this.onHandleChange}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button onClick={this.props.onEditCancel} className="btn btn-primary">
                Cancel
              </button>
              <button onClick={this.onSaveClick} className="btn btn-primary">
                Save
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="body">
              <div className="row">
                <div className="col-md-12">
                  <h2 className="card-heading">
                    {this.state.athleteTeamInfoOriginal && (
                      <React.Fragment>
                        {selectedOption == 1 && schoolName}
                        {selectedOption == 2 && clubName}
                        {selectedOption == 3 && teamName}
                      </React.Fragment>
                    )}
                  </h2>
                </div>
              </div>
              <div className="d-flex justify-content-lg-between flex-lg-row flex-md-column flex-sm-column flex-xs-column">
                <div className="mr-3">
                  <span>{sportName}</span>
                </div>
                <div>
                  <span>{this.state.athleteTeamInfoOriginal && this.positionArray()}</span>
                </div>
              </div>
              <div className="row col-md-12">
                <div>
                  {classYear}
                  <strong>(</strong>
                  {sportLevel}
                  <strong>)</strong>
                </div>
              </div>
              <div className="row pb-3">
                <div className="sub-heading col-md-12">{comments == "null" ? "" : comments}</div>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.state.alert}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(AthleteSportHistoryCard);
