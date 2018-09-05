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
import { putAthleteTargetSport } from "../../services/athleteTargetSport.service";

class AddTargetSportCard extends React.Component {
  state = {
    editMode: false,
    sportPositionOptions: [],
    sportPositionId: [],
    sportOptions: []
  };

  positionArray = () => {
    if (this.props.targetSportInfo.sportPositions) {
      const positionArray = this.props.targetSportInfo.sportPositions.map(pos => {
        return pos.Name;
      });
      const joinedPos = positionArray.join(", ");
      this.setState({ sportPositions: joinedPos });
    } else {
      this.setState({ sportPositions: "" });
    }
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
    const array = this.props.dropdownOptions.sportPosition;
    let positionFilter = array.filter(position => {
      return position.sportId == val;
    });
    this.setState({
      sportPositionOptions: positionFilter,
      newSportPositionList: "",
      sportPositionId: ""
    });
  };

  handleSelectedSport = () => {
    const array = this.props.dropdownOptions.sportPosition;
    if (this.state.sportId) {
      let positionFilter = array.filter(position => {
        return position.sportId == this.state.sportId;
      });
      this.setState({ sportPositionOptions: positionFilter });
      let newSportPositionList2 = [...positionFilter];
      const positionArray = this.props.targetSportInfo.sportPositions.map(position => {
        return position.Id;
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
    } else {
      let positionFilter = array.filter(position => {
        return position.sportId == this.props.targetSportInfo.sportId;
      });
      this.setState({ sportPositionOptions: positionFilter });
      let newSportPositionList2 = [...positionFilter];
      const positionArray = this.props.targetSportInfo.sportPositions.map(position => {
        return position.Id;
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
    }
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

  handleInitialOptionChange = () => {
    this.setState({
      sportId: this.props.targetSportInfo.sportId,
      sportName: this.props.targetSportInfo.sportName,
      sportPositionId: this.props.targetSportInfo.sportPositions
    });
    const array = this.props.dropdownOptions.sportPosition;
    let positionFilter = array.filter(position => {
      return position.sportId == this.props.targetSportInfo.sportId;
    });
    this.setState({
      sportPositionOptions: positionFilter,
      newSportPositionList: "",
      sportPositionId: ""
    });
  };

  deletePosition = position => {
    const sportPositionIdArray = this.state.sportPositionId.filter(pos => {
      return pos.id != position.id;
    });
    this.setState({ sportPositionId: sportPositionIdArray });
    console.log(sportPositionIdArray, "NEW ARRAY");
    let newestSportPositionList1 = this.state.newSportPositionList;
    newestSportPositionList1.push(position);
    newestSportPositionList1.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({ newSportPositionList: newestSportPositionList1 });
  };

  updateTargetSportSuccess = () => NotificationManager.success("Target Sport Updated!", "Success", 2000);

  onSaveClick = () => {
    /*     let sportPositions = this.state.sportPositionId; */
    let sportPositionArray = this.state.sportPositionId.map(sport => {
      return sport.id;
    });
    const sportInfo = {
      userId: this.props.currentUser.id,
      sportId: this.state.sportId,
      sportPositionIdJson: JSON.stringify(sportPositionArray),
      id: this.state.targetSportInfo.id
    };
    putAthleteTargetSport(sportInfo)
      .then(res => {
        this.updateTargetSportSuccess();
        this.props.getTargetSportInfo();
        this.props.onEditCancel();
        console.log(res, "Update SUCCESS");
      })
      .catch(res => {
        console.log(res, "Update Failed");
        this.props.updateTargetSportNotificationError();
      });
  };

  componentDidMount() {
    const { sportPosition, sport } = this.props.dropdownOptions;
    this.setState(
      {
        sportPositionOptionsAll: sportPosition,
        sportOptions: sport
      },
      this.handleInitialOptionChange()
    );
    if (this.props.targetSportInfo.sportPositions) {
      this.positionArray();
      this.handleSelectedSport();
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.targetSportInfo !== state.targetSportInfoOriginal) {
      return {
        targetSportInfoOriginal: props.targetSportInfo,
        targetSportInfo: props.targetSportInfo
      };
    }
    return null;
  }

  render() {
    const { sportName } = this.props.targetSportInfo;
    const { sportPositions } = this.state;
    return (
      <div className="fadeIn">
        {this.props.editMode ? (
          <React.Fragment>
            <div className="text-center">
              <h2>Edit Target Sport</h2>
              <h3 className="card-heading">Current Sport: {sportName}</h3>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <label>Sport Options</label>
                  <select
                    className="form-control form-control-md"
                    type="text"
                    value={this.state.sportId}
                    name="sportId"
                    onChange={this.handleChangeSport}
                  >
                    {this.props.dropdownOptions.sport != "" ? (
                      <React.Fragment>
                        <option>Select Sport</option>
                        {this.props.dropdownOptions.sport.map(sport => (
                          <option sport={sport.name} key={sport.id} value={sport.id}>
                            {sport.name}
                          </option>
                        ))}
                      </React.Fragment>
                    ) : (
                      <option>Loading Options...</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            {this.state.sportPositionIdInitial || this.state.sportPositionId ? (
              <React.Fragment>
                <div className="row justify-content-center">
                  {" "}
                  Current Positions:
                  {this.state.sportPositionIdInitial ? (
                    this.state.sportPositionIdInitial.map(position => (
                      <div name={position.id} key={position.id} className="px-2">
                        {position.code}
                      </div>
                    ))
                  ) : (
                    <div>No positions selected</div>
                  )}
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
                ) : null}{" "}
              </React.Fragment>
            ) : null}
            {this.state.sportPositionId.length < 3 ? (
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
            ) : (
              <div>The maximum number of target positions is 3</div>
            )}
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
              {this.props.targetSportInfo ? (
                <React.Fragment>
                  <div className="d-flex  flex-md-column flex-sm-column flex-xs-column">
                    <div className="d-flex justify-content-center">
                      <span>
                        <b>{sportName}</b>
                      </span>
                    </div>
                    <div style={{ height: "50px" }}>
                      {this.props.targetSportInfo.sportPositions
                        ? this.props.targetSportInfo.sportPositions.map(pos => (
                            <React.Fragment>
                              <div className="text-center" key={pos.Name}>
                                {pos.Name}
                              </div>
                            </React.Fragment>
                          ))
                        : console.log(sportPositions, "UNCHARTED WATERS")}
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
            </div>
          </React.Fragment>
        )}
        {this.state.alert}
      </div>
    );
  }
}

function mapStateToProps({ searchCriteria }) {
  return {
    searchCriteria: searchCriteria
  };
}

export default connect(mapStateToProps)(AddTargetSportCard);
