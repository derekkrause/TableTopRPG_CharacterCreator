import React from "react";
import "./ProfileBanner.css";

class ProfilePicture extends React.Component {
  render() {
    return (
      <div className="profileInfo">
        <div>
          <img src={this.props.profilePic} />
        </div>
        <button
          className="profileBannerButtonOpacity float-right"
          type="button"
          onClick={this.editField}
        >
          Edit
        </button>
      </div>
    );
  }
}

export default ProfilePicture;
