import React from "react";
import { Button, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import PropTypes from "prop-types";

import "./ProfileBanner.css";

function ProfileImages(props) {
  return (
    <div className="gl-image">
      <div className="gl row no-gutters g-ul">
        {props.images.map((tile, index) => (
          <div key={parseInt(index)} className={`col-${tile.cols ? 8 : 4}`} style={{ height: 160 }}>
            <div className="grid img-grid">
              {tile.type === "image" ? (
                <img src={tile.img} alt={tile.title} id={tile.id} className="img-grid-item" />
              ) : (
                <VideoPlayerContainer videoUrl={tile.img} alt={tile.title} id={tile.id} className="img-grid-item" />
              )}
              <button onClick={() => props.toggleImgModal(parseInt(index))}>view</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProfileImages.propTypes = {
  selectedImg: PropTypes.number
};

export default ProfileImages;
