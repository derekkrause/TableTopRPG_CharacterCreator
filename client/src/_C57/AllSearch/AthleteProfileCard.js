import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class AthleteProfileCard extends Component {
  state = {
    userId: 0,
    athlete: {}
  };

  componentDidMount() {
    // console.log("AthleteProfileCard component mounted");
    // console.log("AthleteProfileCard props: ", this.props);

    this.setState({ athlete: this.props.data.itemData });
  }

  render() {
    const { athlete } = this.state;

    // console.log("AthleteProfileCard render athlete: ", athlete);

    // return (
    //   <div>
    //     <p>AthleteProfileCard!</p>
    //   </div>
    // );

    return (
      <div>
        <div className="user-list card" style={{ borderLeft: "solid 8px blue" }}>
          <div className="container ">
            <div className="row ">
              <div className="col-md-3">
                <img className="myAvatar" src={athlete.avatarUrl} alt="..." />
                <p>Athlete</p>
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
                    {/* {athlete.sportInfo.map(sp => {
                      if (sp.Id == this.props.searchCriteria.sportFilter) {
                        return <p className="float-right">{sp.SportPosition}</p>;
                      }
                    })} */}
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
                          View Profile
                          <i className="" />
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AthleteProfileCard;
