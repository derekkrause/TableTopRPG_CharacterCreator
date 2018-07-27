import React, { Component } from "react";
import ReactPlayer from "react-player";
import "./VideoPlayer.css";

class VideoPlayer extends Component {
  render() {
    const { videoUrl, controls, volume, width, height, loop } = this.props.videoParams;
    return (
      <div className="player-wrapper">
        <ReactPlayer
          controls={controls}
          height={height}
          loop={loop}
          volume={volume}
          width={width}
          url={videoUrl}
          onDuration={this.props.onDuration}
          onEnded={this.props.onEnded}
          onPause={this.props.onPause}
          onPlay={this.props.onPlay}
          onProgress={this.props.onProgress}
          onStart={this.props.onStart}
          className="react-player"
        />
      </div>
    );
  }
}

export default VideoPlayer;
