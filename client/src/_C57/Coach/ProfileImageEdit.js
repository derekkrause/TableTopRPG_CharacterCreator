import React from "react";
import "../profile/profileBanner.css";
import ImageModal from "../profile/ImageModal";
import { getProfilePic } from "../profile/ProfileServer";

class ProfileImageEdit extends React.Component {
  state = {
    updatePic: false,
    uploadMode: false,
    imageUrl: "",
    showImgModal: false,
    images: [],
    videos: []
  };

  toggleImgModal = () => {
    if (!this.state.updatePic) {
      this.setState({
        showImgModal: !this.state.showImgModal,
        uploadMode: !this.state.uploadMode,
        updatePic: true
      });
    } else {
      this.setState({
        showImgModal: !this.state.showImgModal,
        uploadMode: !this.state.uploadMode,
        updatePic: false
      });
    }
  };

  updateProfilePic = () => {
    getProfilePic(this.props.viewedProfileId).then(res => {
      console.log(res);
      let newPic = res.data.resultSets[0][0].AvatarUrl;
      this.props.updateImage(newPic);
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.props.profileId == this.props.userId && (
          <button
            className="change-pic photoBtn"
            style={{ zIndex: 1, transform: "translateX(-125px)" }}
            onClick={this.toggleImgModal}
          >
            <i className="zmdi zmdi-camera-add zmdi-hc-2x text-white" />
          </button>
        )}
        <ImageModal
          images={this.state.images}
          videos={this.state.videos}
          replaceCroppedImg={this.replaceCroppedImg}
          userProfile={this.props.userProfile}
          uploadMode={this.state.uploadMode}
          showImgModal={this.state.showImgModal}
          toggleImgModal={this.toggleImgModal}
          className={this.props.className}
          changeProfilePic={this.props.changeProfilePic}
          addNewMediaToState={this.addNewMediaToState}
          updatePic={this.state.updatePic}
          updateProfilePic={this.updateProfilePic}
        />
      </React.Fragment>
    );
  }
}

export default ProfileImageEdit;
