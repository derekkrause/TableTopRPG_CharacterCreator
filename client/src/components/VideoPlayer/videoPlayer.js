import React from "react";
import IntlMessages from "util/IntlMessages";

const VideoPlayer = props => {
  return (
    <div className="img-fluid">
      Video placeholder<br />
      only link URL will display here.<br />
      {props.videoUrl}
    </div>
  );
};

export default VideoPlayer;
