import React from "react";
import "./Results.css";
import axios from "axios";
import { connect } from "react-redux";

class AthleteSearchResults extends React.Component {
  state = {
    Athletes: []
  };

  componentDidMount() {
    this.search();
  }

  search = () => {
    return axios
      .get("api/search/athlete/?q=" + this.props.searchCriteria.searchString)
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
    return (
      <div>
        {this.state.Athletes.map(athlete => {
          console.log(athlete);
          return (
            <div className="user-list row card" style={{ borderLeft: "solid 20px red" }}>
              <div className="container ">
                <div className="row ">
                  <div className="col-4">
                    <img className="img-fluid myAvatar border-0" src={athlete.avatarUrl} alt="..." />
                  </div>
                  <div className="col-4" style={{ textAlign: "center" }}>
                    {" "}
                    <h2>
                      <b>
                        {athlete.firstName} {athlete.middleName} {athlete.lastName}
                      </b>
                    </h2>
                    <p>Sport: {athlete.sportName}</p>
                    <p>Position: {athlete.sportPosition}</p>
                    <p>{athlete.classYear}</p>
                    <p>Grad Year: {athlete.highSchoolGraduationYear}</p>
                  </div>
                  <div className="col-4" style={{ textAlign: "center" }}>
                    <p>Player School</p>
                    <p>
                      <span>{athlete.City}</span>
                      &nbsp;
                      <span>{athlete.State}</span>
                    </p>
                    <ul className="list-inline d-sm-flex gx-btn-list list-group">
                      <li className="border-0 list-group-item">
                        <a className="btn btn-light jr-btn-rounded" href="javascript:void(0)">
                          Button to Profile!
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria
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
