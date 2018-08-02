import React from "react";
import ButtonDemo from "./Button/ButtonDemo";
import VideoPlayerContainer from "./VideoPlayer/VideoPlayerContainer";
import FileUploader from "./FileUploader/FileUploader";
import SweetAlert from "./SweetAlert";

class Examples extends React.Component {
  state = {
    videoUrl: "https://www.youtube.com/watch?v=uzorkQxyc-g",
    imageUrl: ""
  };

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="jr-card">
          <h3 className="card-heading">
            <span> Buttons</span>
          </h3>
          <ButtonDemo />
        </div>
        <div className="jr-card">
          <h3 className="card-heading">
            <span>Video Player</span>
          </h3>
          <VideoPlayerContainer videoUrl={this.state.videoUrl} />
        </div>
        <div className="jr-card">
          <h3 className="card-heading">
            <span>Image Uploader</span>
          </h3>
          <FileUploader onImageUrlChange={this.handleImageUrlChange} />
        </div>
        <div className="jr-card">
          <h3 className="card-heading">
            <span>SweetAlert on delete</span>
          </h3>
          <SweetAlert />
        </div>
      </div>
    );
  }
}

export default Examples;
