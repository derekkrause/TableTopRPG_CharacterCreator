import React from "react";
import ProfileInfo from "./ProfileInfo";
import ProfileCarousel from "./ProfileCarousel";
import IconButtonGroup from "./IconButtonGroup";
import ProfileBio from "./ProfileBio";
import ProfilePicture from "./ProfilePicture";

/* import CoachInfo from "../Coach/CoachInfo"; */

class ProfileBanner extends React.Component {
  render() {
    return (
      <div className="container profileInfoContainer parent">
        <div className="row profileInfo">
          <div className="col-md-3 px-0">
            <ProfilePicture
              profilePic={this.props.profilePic}
              currentUser={this.props.currentUser}
              currentProfile={this.props.currentProfile}
              updateProfilePic={this.props.updateProfilePic}
            />
            <h3 className="font-weight-semibold text-center mt-3">
              {this.props.sportPosition ? (
                <div />
              ) : (
                <div>
                  Pitcher
                  <br />
                  First Base
                </div>
              )}
            </h3>
          </div>
          <div className="col-md-9 profileInfo-info pl-2">
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
      </div>
    );
  }
}
export default ProfileBanner;
