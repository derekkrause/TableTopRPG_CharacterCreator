import React from "react";
import "./ProfileBanner.css";

class ProfilePicture extends React.Component {
  render() {
    return (
      <div className="profileInfo">
        <img src={this.props.profilePic} className="rounded-circle mr-3 img-fluid" />
      </div>
    );
  }
}

export default ProfilePicture;
