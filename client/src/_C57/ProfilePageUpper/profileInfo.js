import React from "react";
import AthleteInfo from "./AthleteInfo";
import AthleteComponent2 from "./AthleteComponent2";
import "./profileInfo.css";
import CoachInfo from "./CoachInfo";

class ProfileInfo extends React.Component {
  render() {
    return (
      <div className="profileInfo col-lg-12">
        <div className="jr-card">
          <div className="app-main-content">
            <div className="row">
              <div className="col-lg-3">
                <img src="https://bringmethenews.com/.image/t_share/MTU0MDQ3MjMzOTE1ODg4NzIy/image-placeholder-title.jpg" />
                <hr />
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-8">
                    <AthleteInfo />
                    {/* <CoachInfo /> */}
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
