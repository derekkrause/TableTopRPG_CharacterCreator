import React from "react";
import "./ProfileBanner.css";
import ImageModal from "./ImageModal";

class ProfilePicture extends React.Component {
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

  render() {
    return (
      <React.Fragment>
        <div className="d-flex profileInfo justify-content-center">
          <div style={{ width: "150px" }}>
            <img src={this.props.profilePic} />
            {this.props.currentUser.id == this.props.currentProfile && (
              <button className="change-pic photoBtn" onClick={this.toggleImgModal}>
                <i className="zmdi zmdi-camera-add zmdi-hc-2x text-white" />
              </button>
            )}
          </div>
        </div>
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
          updateProfilePic={this.props.updateProfilePic}
        />
      </React.Fragment>
    );
  }
}

export default ProfilePicture;
