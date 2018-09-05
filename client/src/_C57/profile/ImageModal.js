import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Popover, PopoverBody } from "reactstrap";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import ImageEditor from "./ImageEditor";
import ImageSettings from "./ImageSettings";
import { deleteMedia, postMedia } from "./ProfileServer";
import "react-image-crop/dist/ReactCrop.css";
import "./ProfileBanner.css";
import "./ImageModal.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MultiFileUploader from "../CustomComponents/FileUploader/MultiFileUploader";
import FileUploader from "../CustomComponents/FileUploader/FileUploader";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";
import { CSSTransition } from "react-transition-group";

class ImageModal extends React.Component {
  state = {
    pLoader: false,
    popoverOpen: false,
    imgUrl: "",
    editMode: false,
    newImgSrc: null,
    editImgStyles: false,
    showImgModal: this.props.showImgModal,
    //-----Uploader States----------
    imageUrl: [],
    videoUrl: [],
    reviewMode: false,
    newTitle: "",
    newCaption: "",
    selectedReview: 0,
    naturalDimensions: "",

    //------Crop States------------
    src: null,
    profileCropMode: false,
    sendImage: false
  };

  resetImageUrl = () => {
    this.setState({
      imageUrl: [],
      newImgSrc: "",
      pLoader: false,
      editMode: false,
      profileCropMode: false
    });
  };

  cropProfilePic = () => {
    this.getS3Image(this.state.imageUrl[0]);
    this.setState({
      editMode: true,
      profileCropMode: true
    });
  };

  toggleLoader = () => {
    this.setState({
      pLoader: !this.state.pLoader
    });
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  static getDerivedStateFromProps(props) {
    if (!props.uploadMode) {
      return {
        reviewMode: false,
        imageUrl: []
      };
    }
  }

  uploadProfilePic = newImageUrl => {
    let newArr = [newImageUrl];
    this.setState({
      imageUrl: newArr
    });
  };

  handleImageUrlChange = newImageUrl => {
    let newArr = [];
    for (let i = 0; i < newImageUrl.length; i++) {
      newArr.push(newImageUrl[i].url);
    }
    this.setState({
      imageUrl: newArr
    });
  };

  handleVideoUrlChange = newVideoUrl => {
    let newArr = [];
    // for (let i = 0; i < newVideoUrl.length; i++) {
    //   newArr.push(newVideoUrl[i].url);
    // }
    newVideoUrl.map(video => newArr.push(video.url));
    this.setState({
      videoUrl: newArr
    });
  };

  discardReview = () => {
    if (this.state.imageUrl.length > 0) {
      let reviewArray = [...this.state.imageUrl];
      reviewArray.shift();
      if (reviewArray.length === 0 && this.state.videoUrl.length === 0) {
        this.props.toggleImgModal();
        this.setState({
          reviewMode: false,
          imageUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      } else {
        this.setState({
          imageUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      }
    } else if (this.state.videoUrl.length > 0) {
      let reviewArray = [...this.state.videoUrl];
      reviewArray.shift();
      if (reviewArray.length === 0) {
        this.props.toggleImgModal();
        this.setState({
          reviewMode: false,
          videoUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      } else {
        this.setState({
          videoUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      }
    }
  };
  saveReview = () => {
    if (this.state.imageUrl.length > 0) {
      let mediaObject = {
        userId: this.props.currentUser.id,
        type: "image",
        url: this.state.imageUrl[0],
        displayOrder: null,
        width: this.state.naturalDimensions.width,
        height: this.state.naturalDimensions.height,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      let addedPhoto = {
        type: "image",
        src: this.state.imageUrl[0],
        thumbnail: this.state.imageUrl[0],
        thumbnailWidth: this.state.naturalDimensions.width,
        thumbnailHeight: this.state.naturalDimensions.height,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      this.props.addNewMediaToState(addedPhoto);
      postMedia(mediaObject).then(response => {
        //console.log("Post to Media Table", response);
        let reviewArray = [...this.state.imageUrl];
        reviewArray.shift();
        if (reviewArray.length === 0 && this.state.videoUrl.length === 0) {
          this.props.toggleImgModal();
          this.setState({
            reviewMode: false,
            imageUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        } else {
          this.setState({
            imageUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        }
      });
    } else if (this.state.videoUrl.length > 0) {
      let mediaObject = {
        userId: this.props.currentUser.id,
        type: "video",
        url: this.state.videoUrl[0],
        displayOrder: null,
        width: 320,
        height: 180,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      let addedVideo = {
        type: "video",
        src: this.state.videoUrl[0],
        thumbnail: this.state.videoUrl[0],
        width: 320,
        height: 180,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      this.props.addNewMediaToState(addedVideo);
      postMedia(mediaObject).then(response => {
        //console.log("Post to Media Table", response);
        let reviewArray = [...this.state.videoUrl];
        reviewArray.shift();
        if (reviewArray.length === 0) {
          this.props.toggleImgModal();
          this.setState({
            reviewMode: false,
            videoUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        } else {
          this.setState({
            videoUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        }
      });
    }
  };

  handleImgUrlChange = imgUrl => {
    this.setState({
      imgUrl
    });
  };

  handleEditImageStylesChange = () => {
    if (!this.state.editImageStyles) {
      this.setState({
        editImageStyles: true
      });
    } else {
      this.setState({
        editImageStyles: false
      });
    }
  };

  handleChange = e => {
    let key = e.target.name;
    let val = e.target.value;

    this.setState({
      [key]: val
    });
  };

  static getDerivedStateFromProps(props) {
    if (!props.uploadMode) {
      return {
        reviewMode: false
      };
    }
  }

  handleImageUrlChange = newImageUrl => {
    let newArr = [];
    for (let i = 0; i < newImageUrl.length; i++) {
      newArr.push(newImageUrl[i].url);
    }
    this.setState({
      imageUrl: newArr
    });
  };

  handleVideoUrlChange = newVideoUrl => {
    let newArr = [];
    // for (let i = 0; i < newVideoUrl.length; i++) {
    //   newArr.push(newVideoUrl[i].url);
    // }
    newVideoUrl.map(video => newArr.push(video.url));
    this.setState({
      videoUrl: newArr
    });
  };

  discardReview = () => {
    if (this.state.imageUrl.length > 0) {
      let reviewArray = [...this.state.imageUrl];
      reviewArray.shift();
      if (reviewArray.length === 0 && this.state.videoUrl.length === 0) {
        this.props.toggleImgModal();
        this.setState({
          reviewMode: false,
          imageUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      } else {
        this.setState({
          imageUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      }
    } else if (this.state.videoUrl.length > 0) {
      let reviewArray = [...this.state.videoUrl];
      reviewArray.shift();
      if (reviewArray.length === 0) {
        this.props.toggleImgModal();
        this.setState({
          reviewMode: false,
          videoUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      } else {
        this.setState({
          videoUrl: reviewArray,
          newTitle: "",
          newCaption: ""
        });
      }
    }
  };
  saveReview = () => {
    if (this.state.imageUrl.length > 0) {
      let mediaObject = {
        userId: this.props.currentUser.id,
        type: "image",
        url: this.state.imageUrl[0],
        displayOrder: null,
        width: this.state.naturalDimensions.width,
        height: this.state.naturalDimensions.height,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      let addedPhoto = {
        type: "image",
        src: this.state.imageUrl[0],
        thumbnail: this.state.imageUrl[0],
        thumbnailWidth: this.state.naturalDimensions.width,
        thumbnailHeight: this.state.naturalDimensions.height,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      this.props.addNewMediaToState(addedPhoto);
      postMedia(mediaObject).then(response => {
        //console.log("Post to Media Table", response);
        let reviewArray = [...this.state.imageUrl];
        reviewArray.shift();
        if (reviewArray.length === 0 && this.state.videoUrl.length === 0) {
          this.props.toggleImgModal();
          this.setState({
            reviewMode: false,
            imageUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        } else {
          this.setState({
            imageUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        }
      });
    } else if (this.state.videoUrl.length > 0) {
      let mediaObject = {
        userId: this.props.currentUser.id,
        type: "video",
        url: this.state.videoUrl[0],
        displayOrder: null,
        width: 320,
        height: 180,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      let addedVideo = {
        type: "video",
        src: this.state.videoUrl[0],
        thumbnail: this.state.videoUrl[0],
        width: 320,
        height: 180,
        title: this.state.newTitle,
        caption: this.state.newCaption
      };
      this.props.addNewMediaToState(addedVideo);
      postMedia(mediaObject).then(response => {
        //console.log("Post to Media Table", response);
        let reviewArray = [...this.state.videoUrl];
        reviewArray.shift();
        if (reviewArray.length === 0) {
          this.props.toggleImgModal();
          this.setState({
            reviewMode: false,
            videoUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        } else {
          this.setState({
            videoUrl: reviewArray,
            newTitle: "",
            newCaption: ""
          });
        }
      });
    }
  };

  handleImgUrlChange = imgUrl => {
    this.setState({
      imgUrl
    });
  };

  handleEditImageStylesChange = () => {
    if (!this.state.editImageStyles) {
      this.setState({
        editImageStyles: true
      });
    } else {
      this.setState({
        editImageStyles: false
      });
    }
  };

  prepareEdit = () => {
    if (!this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, imageUrl: "" });
      this.getS3Image(this.props.images[this.props.selectedImg].src);
    }
    this.setState({
      editMode: !this.state.editMode,
      profileCropMode: false,
      popoverOpen: false,
      imageUrl: ""
    });
  };

  prepareEditProfileImg = () => {
    this.setState({
      editMode: true,
      profileCropMode: true,
      popoverOpen: false
    });
    this.getS3Image(this.props.images[this.props.selectedImg].src);
  };

  getS3Image = url => {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", url, true);

    xhr.responseType = "blob";

    xhr.onload = e => {
      var urlCreator = window.URL || window.webkitURL;
      let imageUrl = urlCreator.createObjectURL(xhr.response);
      console.log("new blob", imageUrl);
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
    //console.log("onCropComplete", image);
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

    if (this.props.showPhotos) {
      deleteMedia(this.props.images[this.props.selectedImg].alt).then(response => {
        this.props.removeDeletedMedia(this.props.selectedImg);
      });
    } else {
      deleteMedia(this.props.videos[this.props.selectedVideo].alt).then(response => {
        this.props.removeDeletedMedia(this.props.selectedVideo);
      });
    }
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
                {!this.props.uploadMode &&
                  this.props.showImgModal &&
                  this.props.images &&
                  this.props.showPhotos &&
                  typeof this.props.selectedImg === "number" &&
                  this.props.images[this.props.selectedImg].title}
                {!this.props.uploadMode &&
                  this.props.showImgModal &&
                  this.props.videos &&
                  !this.props.showPhotos &&
                  typeof this.props.selectedVideo === "number" &&
                  this.props.videos[this.props.selectedVideo].title}
                {!this.props.updatePic &&
                  this.state.reviewMode && (
                    <input
                      type="text"
                      placeholder="Add title..."
                      value={this.state.newTitle}
                      onChange={this.handleChange}
                      name="newTitle"
                      style={{
                        borderRadius: "15px",
                        width: "100%",
                        resize: "none",
                        outline: "0",
                        padding: "7px"
                      }}
                    />
                  )}
              </b>
            </div>
            {this.props.currentUser.id == this.props.userProfile &&
              !this.props.uploadMode &&
              !this.state.pLoader && (
                <Button id="imageModal" onClick={this.togglePopover} className="ash">
                  <i className="zmdi zmdi-more zmdi-hc-2x" />
                </Button>
              )}
            {this.props.currentUser.id == this.props.userProfile &&
              this.state.pLoader && <ProgressIndicator loader={this.state.pLoader} />}

            {this.props.currentUser.id == this.props.userProfile &&
              !this.props.uploadMode && (
                <Popover
                  style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "7px", paddingBottom: "7px" }}
                  placement="bottom"
                  isOpen={this.state.popoverOpen}
                  target="imageModal"
                  toggle={this.togglePopover}
                >
                  <PopoverBody className=" p-1">
                    <div>
                      <Button className="btn m-auto px-1 pb-1 ash" onClick={this.handleDeleteToggle}>
                        <i className="zmdi zmdi-delete zmdi-hc-lg" />
                        &nbsp; Delete
                      </Button>
                    </div>
                    {this.props.showPhotos && (
                      <div className="mt-2">
                        <Button className="btn m-auto px-1 ash" onClick={this.prepareEdit}>
                          <i className="zmdi zmdi-edit zmdi-hc-lg" />
                          &nbsp; Edit
                        </Button>
                      </div>
                    )}
                    {this.props.showPhotos && (
                      <div className="mt-2">
                        <Button className="btn m-auto px-1 ash" onClick={this.prepareEditProfileImg}>
                          Set as profile photo
                        </Button>
                      </div>
                    )}
                  </PopoverBody>
                </Popover>
              )}
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {!this.props.uploadMode &&
                this.props.showPhotos && (
                  <div className="col-md-1">
                    <button
                      className="btn btn-default vert-center-left"
                      disabled={this.state.editMode || this.props.selectedImg === 0 ? true : false}
                      onClick={this.props.prevImg}
                    >
                      <i className="zmdi zmdi-caret-left-circle zmdi-hc-lg" />
                    </button>
                  </div>
                )}
              {!this.props.uploadMode &&
                !this.props.showPhotos && (
                  <div className="col-md-1">
                    <button
                      className="btn btn-default vert-center-left"
                      disabled={this.state.editMode || this.props.selectedVideo === 0 ? true : false}
                      onClick={this.props.prevImg}
                    >
                      <i className="zmdi zmdi-caret-left-circle zmdi-hc-lg" />
                    </button>
                  </div>
                )}
              <div className="col-md-10">
                {!this.state.editMode &&
                  !this.props.uploadMode &&
                  this.props.showPhotos &&
                  this.props.showImgModal &&
                  this.props.images &&
                  this.props.images[parseInt(this.props.selectedImg)].type === "image" &&
                  typeof this.props.selectedImg === "number" && (
                    <CSSTransition
                      in={this.props.fade}
                      timeout={300}
                      unmountOnExit={false}
                      onEntered={this.props.fadeOut}
                      classNames="image"
                    >
                      <img
                        className="mw-100 rounded"
                        onLoad={this.onImgLoad}
                        src={
                          this.props.showImgModal &&
                          this.props.images &&
                          typeof this.props.selectedImg === "number" &&
                          this.props.images[parseInt(this.props.selectedImg)].src
                        }
                        style={{ display: "block", margin: "auto" }}
                      />
                    </CSSTransition>
                  )}
                {this.state.reviewMode &&
                  this.props.showImgModal &&
                  (this.state.imageUrl.length > 0 || this.state.videoUrl.length > 0) && (
                    <img
                      className="mw-100 rounded"
                      onLoad={this.onImgLoad}
                      src={this.state.imageUrl[0]}
                      style={{ display: "block", margin: "auto" }}
                    />
                  )}
                {this.state.reviewMode &&
                  this.props.showImgModal &&
                  this.state.imageUrl.length === 0 &&
                  this.state.videoUrl.length > 0 && (
                    <VideoPlayerContainer className="w-100" videoUrl={this.state.videoUrl[0]} />
                  )}
                {!this.state.editMode &&
                  !this.props.uploadMode &&
                  !this.props.showPhotos &&
                  this.props.showImgModal &&
                  this.props.videos[parseInt(this.props.selectedVideo)].type === "video" && (
                    <CSSTransition
                      in={this.props.fade}
                      timeout={300}
                      unmountOnExit={false}
                      onEntered={this.props.fadeOut}
                      classNames="image"
                    >
                      <VideoPlayerContainer
                        className="w-100 rounded"
                        videoUrl={
                          this.props.showImgModal &&
                          this.props.videos &&
                          typeof this.props.selectedVideo === "number" &&
                          this.props.videos[parseInt(this.props.selectedVideo)].src
                        }
                      />
                    </CSSTransition>
                  )}
                {this.state.editMode &&
                  this.props.showImgModal &&
                  this.props.images &&
                  typeof this.props.selectedImg === "number" && (
                    <ImageEditor
                      handleImgUrlChange={this.handleImgUrlChange}
                      editImgStyles={this.state.editImgStyles}
                      sendImage={this.state.sendImage}
                      profileCropMode={this.state.profileCropMode}
                      images={this.props.images}
                      newImgSrc={this.state.newImgSrc}
                      selectedImg={this.props.selectedImg}
                      showImgModal={this.props.showImgModal}
                      toggleImgModal={this.props.toggleImgModal}
                      toggleLoader={this.toggleLoader}
                      replaceCroppedImg={this.props.replaceCroppedImg}
                    />
                  )}
                {this.props.updatePic &&
                  this.state.editMode &&
                  this.props.showImgModal && (
                    <ImageEditor
                      handleImgUrlChange={this.handleImgUrlChange}
                      editImgStyles={this.state.editImgStyles}
                      sendImage={this.state.sendImage}
                      profileCropMode={this.state.profileCropMode}
                      newImgSrc={this.state.newImgSrc}
                      showImgModal={this.props.showImgModal}
                      toggleImgModal={this.props.toggleImgModal}
                      toggleLoader={this.toggleLoader}
                      replaceCroppedImg={this.props.replaceCroppedImg}
                      profilePic={this.state.imageUrl}
                      updatePic={this.props.updatePic}
                      imageUrl={this.state.imageUrl}
                      resetImageUrl={this.resetImageUrl}
                      updateProfilePic={this.props.updateProfilePic}
                    />
                  )}
                {!this.state.editMode &&
                  !this.state.reviewMode &&
                  this.props.uploadMode && (
                    <React.Fragment>
                      {this.state.imageUrl.length === 0 &&
                        this.state.videoUrl.length === 0 && (
                          <div
                            className="mb-4"
                            style={{
                              border: "3px dotted black",
                              borderRadius: "10px",
                              height: "130px",
                              width: "130px"
                            }}
                          />
                        )}
                      {!this.props.updatePic && (
                        <MultiFileUploader
                          onImageUrlChange={this.handleImageUrlChange}
                          onVideoUrlChange={this.handleVideoUrlChange}
                          toggleLoader={this.toggleLoader}
                          pLoader={this.state.pLoader}
                        />
                      )}
                      {this.props.updatePic && <FileUploader uploadProfilePic={this.uploadProfilePic} />}
                    </React.Fragment>
                  )}
              </div>
              {!this.props.uploadMode &&
                this.props.showPhotos && (
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
                )}
              {!this.props.uploadMode &&
                !this.props.showPhotos && (
                  <div className="col-md-1">
                    <button
                      className="btn btn-default vert-center-right"
                      disabled={
                        this.state.editMode || this.props.selectedVideo === this.props.videos.length - 1 ? true : false
                      }
                      onClick={this.props.nextImg}
                    >
                      <i className="zmdi zmdi-caret-right-circle zmdi-hc-lg" />
                    </button>
                  </div>
                )}
            </div>
            <div className="row justify-content-center">
              <div className="col-md-10">
                <br />
                <h4>
                  {!this.props.uploadMode &&
                    this.props.showImgModal &&
                    this.props.showPhotos &&
                    this.props.images &&
                    typeof this.props.selectedImg === "number" &&
                    !this.state.editMode &&
                    this.props.images[this.props.selectedImg].caption}
                  {!this.props.uploadMode &&
                    this.props.showImgModal &&
                    this.props.videos &&
                    !this.props.showPhotos &&
                    typeof this.props.selectedVideo === "number" &&
                    !this.state.editMode &&
                    this.props.videos[this.props.selectedVideo].caption}
                  {!this.props.updatePic &&
                    this.state.reviewMode && (
                      <textarea
                        value={this.state.newCaption}
                        onChange={this.handleChange}
                        name="newCaption"
                        rows="1"
                        style={{
                          borderRadius: "15px",
                          width: "100%",
                          resize: "none",
                          outline: "0",
                          padding: "7px"
                        }}
                        placeholder="Add a caption..."
                      />
                    )}
                </h4>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {!this.state.reviewMode &&
              !this.props.updatePic &&
              this.props.uploadMode &&
              (this.state.imageUrl.length > 0 || this.state.videoUrl.length > 0) && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({ reviewMode: true });
                  }}
                >
                  Review Uploads
                </button>
              )}
            {!this.state.reviewMode &&
              !this.state.profileCropMode &&
              this.props.updatePic &&
              this.props.uploadMode &&
              this.state.imageUrl.length > 0 && (
                <button type="button" className="btn btn-primary" onClick={this.cropProfilePic}>
                  Review and Crop
                </button>
              )}
            {this.state.reviewMode &&
              (this.state.imageUrl || this.state.videoUrl) && (
                <div>
                  <button type="button" className="btn btn-warning" onClick={this.discardReview}>
                    Discard
                  </button>
                  <button type="button" className="btn btn-primary" onClick={this.saveReview}>
                    Save
                  </button>
                </div>
              )}
            {/* {this.state.editMode && (
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
            )} */}
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
                  disabled={this.state.pLoader && "true"}
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      sendImage: !this.state.sendImage,
                      pLoader: true
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
                  disabled={this.state.pLoader && "true"}
                  className="btn btn-primary"
                  onClick={() => {
                    this.setState({
                      sendImage: !this.state.sendImage,
                      pLoader: true
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

ImageModal.propTypes = {
  ImageUserId: PropTypes.number
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(ImageModal);
