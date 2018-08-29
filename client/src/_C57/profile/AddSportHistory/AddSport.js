import React from "react";
import { getAllSports, getClassYear, getSportLevels } from "./AddSportService";
import AddSportName from "./AddSportName";
import { Button } from "reactstrap";
import { schoolSearch } from "../../Admin/SchoolAdmin/SchoolAdminServer";
import SchoolAutoComplete from "../../CustomComponents/SchoolAutoComplete/AutoComplete";

class AddSport extends React.Component {
  state = {
    sportOptions: [],
    sportPositionOptions: null,
    sportPositionId: [],
    sport: "",
    positions: [],
    sportLevelId: "",
    classYear: "",
    test: "",
    sportChoice: "",
    selectedOption: "",
    schoolId: "",
    schoolName: ""
  };

  componentDidMount() {
    getAllSports()
      .then(res => {
        this.setState({ sportOptions: res.data });
        getClassYear().then(
          res => this.setState({ classYearOptions: res.data.item.pagedItems }),
          getSportLevels().then(res => {
            this.setState({ sportLevelOptions: res.data });
          })
        );
      })
      .catch(() => {
        console.log("Get All Failed");
      });
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleChangeSport = e => {
    this.props.onHandleChange(e);
    const key = e.target.name;
    const val = e.target.value;
    this.setState({
      [key]: val
    });
    const array = this.state.sportOptions;
    let sportFilter = array.filter(sport => {
      return sport.id == val;
    });
    this.setState({ sportPositionOptions: sportFilter[0].positions });
  };

  handleChangeSportPosition = e => {
    if (!this.state.newSportPositionList) {
      const val = e.target.value;
      const newSportPositionId = this.state.sportPositionOptions.filter(position => {
        return position.id == val;
      });
      this.props.onSportPositionIdChange(newSportPositionId);
      this.setState({ sportPositionId: newSportPositionId });
      this.state.sportPositionId.push(newSportPositionId[0]);
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
      let sportPositionIdArray = [...this.props.sportPositionId, newSportPositionId[0]];
      this.setState({ sportPositionId: sportPositionIdArray });
      this.props.onSportPositionIdChange(sportPositionIdArray);
      this.state.sportPositionId.push(newSportPositionId[0]);
      const newerSportPositionList = this.state.newSportPositionList.filter(position => {
        return position.id != val;
      });
      this.setState({ newSportPositionList: newerSportPositionList });
    }
  };

  callback = () => {
    return schoolSearch(0, this.state.schoolName);
  };

  onChange = value => {
    this.setState({
      schoolName: value
    });
  };

  // add in immutability, rename this code
  deletePosition = position => {
    const sportPositionIdArray = this.state.sportPositionId.filter(pos => {
      return pos.id != position.id;
    });
    this.setState({ sportPositionId: sportPositionIdArray });
    this.props.onSportPositionIdChange(sportPositionIdArray);
    let newestSportPositionList1 = this.state.newSportPositionList;
    newestSportPositionList1.push(position);
    newestSportPositionList1.sort(function(a, b) {
      return a.id - b.id;
    });
    this.setState({ newSportPositionList: newestSportPositionList1 });
  };

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
        {this.state.sportPositionOptions && (
          <React.Fragment>
            <div className="row">
              <div className="col-md-12 mb-1">
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
                  {this.state.sportPositionId ? (
                    <div className="row justify-content-center pt-2">
                      {" "}
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
            <div className="row">
              <div className="col-md-12 mb-1">
                <div className="form-group">
                  <label>Competition Level</label>
                  <select
                    className="form-control form-control-md"
                    type="text"
                    value={this.props.sportLevelId}
                    name="sportLevelId"
                    onChange={this.props.onHandleChange}
                  >
                    <option>Competition Level</option>
                    {this.state.sportLevelOptions.map(level => (
                      <option name={level.competitionLevel} key={level.id} value={level.id}>
                        {level.competitionLevel}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-1">
                <div className="form-group">
                  <label>Class Year</label>
                  <select
                    className="form-control form-control-md"
                    type="text"
                    value={this.props.classYearId}
                    name="classYearId"
                    onChange={this.props.onHandleChange}
                  >
                    <option>Class Year</option>
                    {this.state.classYearOptions.map(year => (
                      <option name={year.name} key={year.id} value={year.id}>
                        {year.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center">
              <label>What team did you play for?</label>
            </div>
            <div className="row justify-content-center">
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="1"
                    name="playedAt"
                    checked={this.props.selectedOption === "1"}
                    onChange={this.props.handleOptionChange}
                  />
                  School
                </label>
              </div>
              <div className="radio px-3">
                <label>
                  <input
                    type="radio"
                    value="2"
                    name="playedAt"
                    checked={this.props.selectedOption === "2"}
                    onChange={this.props.handleOptionChange}
                  />
                  Club
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="3"
                    name="playedAt"
                    checked={this.props.selectedOption === "3"}
                    onChange={this.props.handleOptionChange}
                  />
                  Other
                </label>
              </div>
            </div>
          </React.Fragment>
        )}
        {this.props.selectedOption == 1 && (
          <React.Fragment>
            <label>School</label>

            <SchoolAutoComplete
              includeCityState={true}
              onHandleSchoolSelect={this.props.onHandleSchoolSelect}
              numberOfCharacters={5} // when you want callback function to fire
              callBack={this.callback} // the call back function in the parent you want called
              value={this.state.schoolName} // value you want changed
              onChange={this.onChange} // onChange function in the parent
              name="schoolName" // name
              limit={10} // limit the results on the dropdown, recommend 10
              className={"form-control"} // any classnames you want to include in the input
              resultSetNumber={1} // res.data.resultSets[*] * = the number your resultsets come back on
            />
          </React.Fragment>
        )}
        {this.props.selectedOption == 2 && (
          <div className="form-group">
            <label htmlFor="clubName">Club Name</label>
            <input
              type="text"
              className="form-control"
              name="clubName"
              placeholder="Club Name"
              value={this.props.clubName}
              onChange={this.props.onHandleChange}
            />
          </div>
        )}
        {this.props.selectedOption == 3 && (
          <div>
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              className="form-control"
              name="teamName"
              value={this.props.teamName}
              onChange={this.props.onHandleChange}
            />
          </div>
        )}
        {/* needs to take into account the different selection of club/school/other and reset */}
        {(this.props.schoolId || this.props.clubName || this.props.teamName) && (
          <div>
            <label htmlFor="commments">Comments</label>
            <textarea
              type="text"
              className="form-control"
              name="comments"
              placeholder="Enter comment here"
              value={this.props.comments}
              onChange={this.props.onHandleChange}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default AddSport;
