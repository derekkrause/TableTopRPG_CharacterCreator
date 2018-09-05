import React, { Component } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { connect } from "react-redux";
import AddSportName from "./AddSportHistory/AddSportName";
import AthleteTargetSportPopover from "../CustomComponents/Popover/AthleteTargetSportPopover";
import { getAthleteTargetSportById } from "../../services/athleteTargetSport.service";

class AddTargetSport extends React.Component {
  state = {
    //------------Filter Settings-------------
    disabled: false,
    dropup: false,
    flip: false,
    highlightOnlyResult: false,
    minLength: 2,
    selectHintOnEnter: true,
    sportPositionOptions: [],
    sportOptions: [],
    targetSport: "",
    editMode: false,
    addMode: false
  };

  handleChangeSport = e => {
    this.props.onHandleChange(e);
    const val = e.target.value;
    const array = this.state.sportPositionOptionsAll;
    let positionFilter = array.filter(position => {
      return position.sportId == val;
    });
    this.setState({
      sportPositionOptions: positionFilter,
      sportId: val,
      sportPositionId: "",
      newSportPositionList: ""
    });
    this.props.onSportPositionIdChange(null);
    console.log(positionFilter);
  };

  handleChangeSportPosition = e => {
    if (!this.state.newSportPositionList) {
      const val = e.target.value;
      const newSportPositionId = this.state.sportPositionOptions.filter(position => {
        return position.id == val;
      });
      this.props.onSportPositionIdChange(newSportPositionId);
      this.setState({ sportPositionId: newSportPositionId });
      const newSportPositionList = this.state.sportPositionOptions.filter(position => {
        return position.id != val;
      });
      this.setState({ newSportPositionList });
    } else {
      const val = e.target.value;
      const newSportPositionId = this.state.sportPositionOptions.filter(position => {
        return position.id == val;
      });
      let sportPositionIdArray = [...this.state.sportPositionId, newSportPositionId[0]];
      this.setState({
        sportPositionId: sportPositionIdArray
      });
      this.props.onSportPositionIdChange(sportPositionIdArray);
      const newerSportPositionList = this.state.newSportPositionList.filter(position => {
        return position.id != val;
      });
      this.setState({ newSportPositionList: newerSportPositionList });
    }
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
    this.props.onSportPositionIdChange(sportPositionIdArray);
  };

  componentDidMount() {
    const { sportPosition, sport } = this.props.dropdownOptions;
    this.setState({
      sportPositionOptionsAll: sportPosition,
      sportOptions: sport
    });
    getAthleteTargetSportById(this.props.currentUser.id).then(res => console.log(res));
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12 mb-1">
            <div className="form-group">
              <label>Sport Name</label>
              <select
                className="form-control form-control-md"
                type="text"
                value={this.state.sportId}
                name="sportId"
                onChange={this.handleChangeSport}
              >
                {this.props.dropdownOptions ? (
                  <React.Fragment>
                    <option>Select Sport</option>
                    {this.props.dropdownOptions.sport.map(sport => (
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
        {this.state.sportId ? (
          <div className="row">
            <div className="col-md-12 mb-1">
              <div className="form-group">
                {this.state.sportPositionId.length < 3 ? (
                  <React.Fragment>
                    <label>Sport Position</label>
                    <select
                      className="form-control form-control-md"
                      type="text"
                      value={this.state.sportPosition}
                      name="sportPositionId"
                      onChange={this.handleChangeSportPosition}
                    >
                      <option>Select Position</option>
                      {this.state.newSportPositionList.length > 1
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
                  </React.Fragment>
                ) : (
                  <div className="textalign-center"> You may only select up to three positions per sport</div>
                )}

                {this.state.sportPositionId ? (
                  <div className="row justify-content-center pt-2">
                    Selected Positions:
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
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps({ dropdownOptions, currentUser }) {
  return {
    dropdownOptions: dropdownOptions,
    currentUser: currentUser
  };
}

export default connect(mapStateToProps)(AddTargetSport);
