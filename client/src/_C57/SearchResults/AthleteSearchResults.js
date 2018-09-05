import React from "react";
import "./Results.css";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

class AthleteSearchResults extends React.Component {
  state = {
    Athletes: []
  };

  componentDidMount() {
    this.search();
  }

  search = () => {
    return axios
      .get(
        "api/search/athlete/?q=" +
          this.props.searchCriteria.searchString +
          "&classYear=" +
          this.props.searchCriteria.gradYearFilter +
          "&state=" +
          this.props.searchCriteria.locationFilter +
          "&school=" +
          this.props.searchCriteria.schoolFilter +
          "&sportPosition=" +
          this.props.searchCriteria.sportPositionFilter
      )
      .then(res => {
        console.log("Good Get All!", res.data);
        this.setState({
          Athletes: res.data
        });
      })
      .catch(() => {
        console.log("Get All Failed");
      });
  };

  render() {
    // const newAthletes = [];
    return (
      <React.Fragment>
        {this.state.Athletes.filter(athlete =>
          athlete.sportInfo.some(sp => sp.Id == this.props.searchCriteria.sportFilter)
        ).map(athlete => (
          <div key={athlete.athleteId} className="user-list row card playertag">
            <div className="container ">
              <div className="row col-12">
                <div className="col-md-3">
                  <img className="myAvatar" src={athlete.avatarUrl} alt="..." />
                </div>
                <div className="col-md-9">
                  <div className="row">
                    <div className="col-md-8">
                      <h2>
                        <b>
                          {athlete.firstName} {athlete.middleName} {athlete.lastName}
                        </b>
                      </h2>
                    </div>
                    <div className="col-md-4">
                      {athlete.sportInfo.map(sp => {
                        if (sp.Id == this.props.searchCriteria.sportFilter) {
                          return <p className="float-right">{sp.SportPosition}</p>;
                        }
                      })}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-10">
                      <p>{athlete.school}</p>
                      <p>Grad Year: {athlete.highSchoolGraduationYear}</p>
                      <p className="line-clamp">Bio: {athlete.shortBio}</p>
                    </div>
                    <div className="col-md-2" />
                  </div>
                  <div className="row">
                    <div className="col-md-8" />
                    <div className="col-md-4">
                      <ul className="list-inline d-sm-flex gx-btn-list list-group">
                        <li className="border-0 list-group-item">
                          <NavLink to={`/app/Profile/${athlete.userId}`} className="float-right">
                            Button to Profile! > <i className="" />
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria,
    user: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AthleteSearchResults);
