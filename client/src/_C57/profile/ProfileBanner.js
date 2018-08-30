import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCarousel from "./ProfileCarousel";
import ProfilePicture from "./ProfilePicture";
import IconButtonGroup from "./IconButtonGroup";
import ProfileBio from "./ProfileBio";
/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileBanner extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <div className="row" style={{ marginTop: "-56%", marginLeft: "-12%" }}>
                <div className="col-md-12">
                  <div className="row justify-content-center" style={{ marginBottom: "8%" }}>
                    <ProfilePicture profilePic={this.props.profilePic} />
                  </div>
                  <div className="row justify-content-center">
                    <h2 style={{ fontWeight: "600" }}>
                      {this.props.sportLevel && "Varsity"} {this.props.sport ? <div /> : <div>Baseball</div>}
                    </h2>
                  </div>
                  <div className="row justify-content-center">
                    <h2 style={{ fontWeight: "600" }}>{this.props.sportPosition ? <div /> : <div>Pitcher</div>}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <ProfileInfo
                everyThing={this.props.everyThing}
                highlighting={this.props.highlighting}
                highlightUser={this.props.highlightUser}
                following={this.props.following}
                followUser={this.props.followUser}
                handleChange={this.props.handleChange}
                currentProfile={this.props.currentProfile}
                userId={this.props.userId}
                handleProfileInfoSubmit={this.props.handleProfileInfoSubmit}
                classYearOptions={this.props.classYearOptions}
                currentPageId={this.props.currentPageId}
              />
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-12">
              <ProfileBio handleChange={this.props.handleChange} bio={this.props.bio} />
        </div>
          </div> */}
        </div>
      </React.Fragment>
    );
  }
}
export default ProfileBanner;
