import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class CoachProfileCard extends Component {
  state = {
    userId: 0,
    coach: {}
  };

  componentDidMount() {
    // console.log("CoachProfileCard component mounted");
    // console.log("CoachProfileCard props: ", this.props);

    this.setState({ coach: this.props.data.itemData });
  }

  render() {
    const { coach } = this.state;

    // console.log("CoachProfileCard render coach: ", coach);

    // return (
    //   <div>
    //     <p>CoachProfileCard!</p>
    //   </div>
    // );

    return (
      <div>
        <div key={coach.coachId} className="user-list row card" style={{ borderLeft: "solid 8px purple" }}>
          <div className="container ">
            <div className="row ">
              <div className="col-md-3">
                <img className="myAvatar" src={coach.avatarUrl} alt="..." />
                <p>Coach</p>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-8">
                    <h2>
                      <b>
                        {coach.firstName} {coach.middleName} {coach.lastName}
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
                    <p>{coach.school}</p>
                    {/* <p>Grad Year: {athlete.highSchoolGraduationYear}</p> */}
                    <p className="line-clamp">Bio: {coach.shortBio}</p>
                  </div>
                  <div className="col-md-2" />
                </div>
                <div className="row">
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <ul className="list-inline d-sm-flex gx-btn-list list-group">
                      <li className="border-0 list-group-item">
                        <NavLink to={`/app/Profile/${coach.userId}`} className="float-right">
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
      </div>
    );
  }
}

export default CoachProfileCard;
