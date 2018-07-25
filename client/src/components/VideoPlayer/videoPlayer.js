import React, { Component } from "react";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  render() {
    return <ReactPlayer url={this.props.videoUrl} controls="true" volume="0.3" width="640" height="390" />;
  }
}

export default VideoPlayer;
