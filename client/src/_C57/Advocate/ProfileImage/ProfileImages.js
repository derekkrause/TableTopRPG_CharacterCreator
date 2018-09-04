import React from "react";
import { Button, ButtonGroup, Popover, PopoverBody, PopoverHeader } from "reactstrap";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import PropTypes from "prop-types";
// import Gallery from "react-grid-gallery";
import Gallery from "./Gallery";

import "./ProfileBanner.css";

class ProfileImages extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        {/* <div role="group" className="btn-group mb-3">
          <button className="jr-btn jr-btn-default btn btn-default" onClick={this.props.photoView} active="true">
            Photos
          </button>

          <button className="jr-btn jr-btn-default btn btn-default" onClick={this.props.videoView}>
            Videos
          </button>
        </div> */}
        {/* <div className="btn-group mb-3" data-toggle="buttons">
          <label className="btn btn-default">
            <input type="radio" onClick={this.props.photoView} />
            Photos
          </label>
          <label className="btn btn-default">
            <input type="radio" onClick={this.props.videoView} />
            Videos
          </label>
        </div> */}
        <ButtonGroup className="mb-3">
          <Button className="jr-btn jr-btn-default" onClick={this.props.photoView} color="default">
            Photos
          </Button>
          <Button className="jr-btn jr-btn-default" onClick={this.props.videoView} color="default">
            Videos
          </Button>
        </ButtonGroup>
        {this.props.showPhotos && (
          <div>
            <Gallery
              images={this.props.images}
              enableLigthbox={true}
              toggleImgModal={this.props.toggleImgModal}
              margin={4}
            />
          </div>
        )}
        {!this.props.showPhotos && (
          <React.Fragment>
            <div className="row">
              {this.props.videos.map((tile, index) => (
                <div key={parseInt(index)} className={`col-${tile.cols ? 8 : 4}`} style={{ height: 180 }}>
                  {/* <div key={parseInt(index)} className={`col-4`} style={{ height: 180 }}> */}
                  <div className="grid img-grid pb-3">
                    <VideoPlayerContainer
                      videoUrl={tile.src}
                      alt={tile.caption}
                      id={tile.id}
                      className="img-grid-item"
                    />

                    <button onClick={() => this.props.toggleImgModal(parseInt(index))}>view</button>
                  </div>
                </div>
              ))}
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

ProfileImages.propTypes = {
  selectedImg: PropTypes.number
};

export default ProfileImages;
