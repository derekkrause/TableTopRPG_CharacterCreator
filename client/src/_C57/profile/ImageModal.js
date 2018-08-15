import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody } from "reactstrap";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import ImageEditor from "./ImageEditor";
import ImageSettings from "./ImageSettings";
import { deleteMedia } from "./ProfileServer";
import "react-image-crop/dist/ReactCrop.css";

class ImageModal extends React.Component {
  state = {
    popoverOpen: false,
    imageUrl: "",
    editMode: false,
    newImgSrc: null,
    editImgStyles: false,

    //------Crop States------------
    src: null,
    profileCropMode: false,
    sendImage: false
  };

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  prepareEdit = () => {
    if (!this.state.editMode) {
      this.setState({ editMode: !this.state.editMode });
      this.getS3Image(this.props.images[parseInt(this.props.selectedImg)].img);
    }
    this.setState({
      editMode: !this.state.editMode,
      profileCropMode: false
    });
  };

  prepareEditProfileImg = () => {
    this.setState({
      editMode: true,
      profileCropMode: true
    });
    this.getS3Image(this.props.images[parseInt(this.props.selectedImg)].img);
  };

  getS3Image = url => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.responseType = "blob";

    xhr.onload = e => {
      var urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(xhr.response);
      console.log(imageUrl);
      this.setState({
        newImgSrc: imageUrl
      });
    };
    xhr.send();
  };

  onImgLoad = ({ target: img }) => {
    this.setState({
      naturalDimensions: {
        height: img.offsetHeight,
        width: img.offsetWidth
      }
    });
  };

  onImageLoaded = image => {
    console.log("onCropComplete", image);
  };

  togglePopover = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  };

  handleDeleteToggle = () => {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });

    deleteMedia(this.props.images[parseInt(this.props.selectedImg)].id).then(response => {
      console.log(response);
    });
  };

  componentDidMount() {}

  componentWillUnmount() {
    window.URL.revokeObjectURL(this.state.newImgSrc);
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.props.showImgModal} toggle={this.props.toggleImgModal} className={this.props.className}>
          <ModalHeader className="text-center">
            <div>
              <b>
                {this.props.showImgModal &&
                  this.props.images &&
                  typeof this.props.selectedImg === "number" &&
                  this.props.images[parseInt(this.props.selectedImg)].title}
              </b>
            </div>
            <Button id={"Popover-" + this.props.popover} onClick={this.togglePopover} className="ash">
              <i className="zmdi zmdi-more zmdi-hc-2x" />
            </Button>

            <Popover
              style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "7px", paddingBottom: "7px" }}
              placement="bottom"
              isOpen={this.state.popoverOpen}
              target={"Popover-" + this.props.popover}
              toggle={this.togglePopover}
            >
              <PopoverBody className=" p-1">
                <div>
                  <Button className="btn m-auto px-1 pb-1 ash" onClick={this.handleDeleteToggle}>
                    <i className="zmdi zmdi-delete zmdi-hc-lg" />
                    &nbsp; Delete
                  </Button>
                </div>
                <div className="mt-2">
                  <Button className="btn m-auto px-1 ash" onClick={this.prepareEdit}>
                    <i className="zmdi zmdi-edit zmdi-hc-lg" />
                    &nbsp; Edit
                  </Button>
                </div>
                <div className="mt-2">
                  <Button className="btn m-auto px-1 ash" onClick={this.prepareEditProfileImg}>
                    Set as Profile Photo
                  </Button>
                </div>
              </PopoverBody>
            </Popover>

            {/* <button type="button" className="float-right" style={{ backgroundColor: "white" }}>
              <i className="zmdi zmdi-more zmdi-hc-lg" />
            </button> */}
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-1">
                <button
                  className="btn btn-default vert-center-left"
                  disabled={this.state.editMode || this.props.selectedImg === 0 ? true : false}
                  onClick={this.props.prevImg}
                >
                  <i className="zmdi zmdi-caret-left-circle zmdi-hc-lg" />
                </button>
              </div>
              <div className="col-md-10">
                {!this.state.editMode &&
                  this.props.showImgModal &&
                  this.props.images &&
                  typeof this.props.selectedImg === "number" &&
                  this.props.images[parseInt(this.props.selectedImg)].type === "image" && (
                    <img
                      className="w-100 rounded"
                      onLoad={this.onImgLoad}
                      src={
                        this.props.showImgModal &&
                        this.props.images &&
                        typeof this.props.selectedImg === "number" &&
                        this.props.images[parseInt(this.props.selectedImg)].img
                      }
                      id={this.props.images[parseInt(this.props.selectedImg)].id}
                    />
                  )}
                {!this.state.editMode &&
                  this.props.showImgModal &&
                  this.props.images &&
                  typeof this.props.selectedImg === "number" &&
                  this.props.images[parseInt(this.props.selectedImg)].type === "video" && (
                    <VideoPlayerContainer
                      className="w-100 rounded"
                      videoUrl={
                        this.props.showImgModal &&
                        this.props.images &&
                        typeof this.props.selectedImg === "number" &&
                        this.props.images[parseInt(this.props.selectedImg)].img
                      }
                    />
                  )}
                {this.state.editMode &&
                  this.props.showImgModal &&
                  this.props.images &&
                  typeof this.props.selectedImg === "number" && (
                    <ImageEditor
                      handleImageUrlChange={this.handleImageUrlChange}
                      editImgStyles={this.state.editImgStyles}
                      sendImage={this.state.sendImage}
                      profileCropMode={this.state.profileCropMode}
                      images={this.props.images}
                      newImgSrc={this.state.newImgSrc}
                      selectedImg={this.props.selectedImg}
                      showImgModal={this.props.showImgModal}
                      profileCropMode={this.state.profileCropMode}
                    />
                  )}
              </div>
              <div className="col-md-1">
                <button
                  className="btn btn-default vert-center-right"
                  disabled={
                    this.state.editMode || this.props.selectedImg === this.props.images.length - 1 ? true : false
                  }
                  onClick={this.props.nextImg}
                >
                  <i className="zmdi zmdi-caret-right-circle zmdi-hc-lg" />
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <p>
                  {this.props.showImgModal &&
                    this.props.images &&
                    typeof this.props.selectedImg === "number" &&
                    !this.state.editMode &&
                    this.props.images[parseInt(this.props.selectedImg)].content}
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.editMode && (
              <button
                type="button"
                className="btn btn-default float-right"
                onClick={() =>
                  this.setState({
                    editImgStyles: !this.state.editImgStyles
                  })
                }
              >
                {!this.state.editImgStyles ? "Show Filter Settings" : "Hide Filter Settings"}
              </button>
            )}
            {this.state.editMode &&
              !this.state.editImgStyles && (
                <button className="btn btn-primary" onClick={this.prepareEdit}>
                  {!this.state.profileCropMode ? "Cancel Edit" : "Cancel"}
                </button>
              )}
            {this.state.editMode &&
              !this.state.editImgStyles &&
              !this.state.profileCropMode && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      sendImage: !this.state.sendImage
                    });
                  }}
                >
                  Save Changes
                </button>
              )}
            {this.state.editMode &&
              !this.state.editImgStyles &&
              this.state.profileCropMode && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      sendImage: !this.state.sendImage
                    });
                  }}
                >
                  Save as Profile Photo
                </button>
              )}
            {/* {!this.state.editMode && (
              <button
                disabled={!this.props.selectedImg && true}
                className="btn btn-primary"
                onClick={this.prepareEditProfileImg}
              >
                Set Profile Picture
              </button>
            )} */}
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ImageModal;
