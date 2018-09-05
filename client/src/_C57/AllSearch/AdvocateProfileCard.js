import React, { Component } from "react";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";

import "../Advocate/AdvocateStyle.css";

class AdvocateProfileCard extends Component {
  state = {
    advocateId: 0
  };

  componentDidMount() {
    console.log(this.props, "advocate props");
    // console.log("AdvocateProfileCard component mounted");
  }

  render() {
    return (
      <div>
        <div className="user-list card" style={{ borderLeft: "solid 8px orange" }}>
          <div className="container ">
            <div className="row ">
              <div className="col-md-3">
                <img className="myAvatar" src={this.props.advocateUser.AvatarUrl} alt="..." />
                <p>Advocate</p>
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-8">
                    <h2 className="font-weight-bold">
                      {this.props.advocateUser.FirstName} {this.props.advocateUser.LastName}
                    </h2>
                    <p className="meta-date">{this.props.advocateUser.schoolName}</p>
                  </div>

                  <div className="col-md-4" />
                </div>
                <div className="row">
                  <div className="col-md-10">
                    <p className="line-clamp card-text">Bio: {this.props.advocateUser.ShortBio}</p>
                  </div>
                  <div className="col-md-2" />
                </div>
                <div className="row">
                  <div className="col-md-8" />
                  <div className="col-md-4">
                    <ul className="list-inline d-sm-flex gx-btn-list list-group mt-5">
                      <li className="border-0 list-group-item">
                        <NavLink to={`/app/Profile/` + this.props.advocateUser.Id} className="float-right">
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

export default AdvocateProfileCard;
