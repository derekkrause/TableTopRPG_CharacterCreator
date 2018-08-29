import React from "react";
import AthleteInfo from "../Athlete/AthleteInfo";
import AthleteComponent2 from "../Athlete/AthleteComponent2";
import "./ProfileInfo.css";
/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileInfo extends React.Component {
  render() {
    return (
      <div className="profileInfo col-lg-8">
        <div className="jr-card">
          <div className="app-main-content">
            <div className="row">
              <div className="col-lg-3">
                <img src="https://ca.slack-edge.com/T08EKJ58F-UA4DE8E2G-a70e60681ee1-512" />
                <hr />
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-8">
                    <AthleteInfo />
                    {/*  <CoachInfo /> */}
                    <div className="row" />
                  </div>
                  <div className="col-lg-4">
                    <AthleteComponent2 />
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
export default ProfileInfo;
