import React from "react";
import VideoPlayer from "./VideoPlayer";

class VideoPlayerContainer extends React.Component {
  state = {
    controls: true,
    height: "100%",
    width: "100%",
    volume: 0.8,
    playing: false,
    played: 0,
    loaded: 0,
    duration: 0,
    startTime: 0,
    timeWatched: 0,
    percentageWatched: 0,
    totalViews: 0,
    loop: false
  };

  onDuration = duration => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };

  onEnded = () => {
    const endTime = new Date();
    const watched = (endTime.getTime() - this.state.startTime) / 1000 + this.state.timeWatched;
    const watchPercent = (watched / this.state.duration) * 100;
    console.log("onEnded", watchPercent);
    this.setState({
      playing: this.state.loop,
      percentageWatched: watchPercent,
      timeWatched: 0,
      totalViews: watchPercent >= 0.9 ? this.state.totalViews + 1 : this.state.totalViews
    });
  };

  onPause = () => {
    const pauseTime = new Date();
    const watched = (pauseTime.getTime() - this.state.startTime) / 1000 + this.state.timeWatched;
    console.log("Paused", watched);
    this.setState({
      playing: false,
      timeWatched: watched
    });
  };

  onPlay = () => {
    const startTime = new Date();
    console.log("onPlay", startTime.getTime());
    this.setState({
      playing: true,
      startTime: startTime.getTime()
    });
  };

  onProgress = state => {
    console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state);
    }
  };

  onStart = () => {
    console.log("onStart");
    this.setState({ timeWatched: 0 });
  };

  componentWillUnmount() {
    this.onEnded();
  }
  render() {
    let videoHeight = null;
    let videoWidth = null;
    if (this.props.height) {
      videoHeight = this.props.height;
    } else {
      videoHeight = this.state.height;
    }
    if (this.props.width) {
      videoWidth = this.props.width;
    } else {
      videoWidth = this.state.width;
    }
    const videoParams = {
      controls: this.state.controls,
      height: videoHeight,
      width: videoWidth,
      videoUrl: this.props.videoUrl,
      volume: this.state.volume
    };

    return (
      <div>
        <VideoPlayer
          videoParams={videoParams}
          onDuration={this.onDuration}
          onEnded={this.onEnded}
          onPause={this.onPause}
          onPlay={this.onPlay}
          onProgress={this.onProgress}
          onStart={this.onStart}
        />
      </div>
    );
  }
}
export default VideoPlayerContainer;
