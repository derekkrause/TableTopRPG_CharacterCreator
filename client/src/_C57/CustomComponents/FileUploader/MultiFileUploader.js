import React, { Component } from "react";
import { putPresigedUrl, putUploadFile } from "services/s3.service";
import VideoPlayerContainer from "../VideoPlayer/VideoPlayerContainer";
import axios from "axios";

class MultiFileUploader extends Component {
  state = {
    previewUrls: [], // { type: 'video', url: '...' }
    imageUrlArray: [],
    videoUrlArray: [],
    videoUrl: "",
    loading: true,
    formVideoLinkInput: false,
    formFileBtn: true,
    videoHeight: "130px",
    videoWidth: null,
    mediaLimit: 0
  };

  /*
<Instructions>
This component will:
-upload the image or video
-show preview after image is uploaded
-preview demention: 130px x 130px
-this will return 2 arrays of objects, one will be images and one will be videos, each object will
  have media type, url to media, and display order

//add this state to parent of this component. This will hold image and video url after upload the image.
you can set this to your payload. EX. (your img url state name) : this.state.imageUrl

 imageUrl: [],
 videoUrl: []


// add these functions above render of the parent of this component.
purpose of these functions is sync imageUrl and videoUrl state on the parent so you can add this into your payload before render. 

  handleImageUrlChange = newImageUrl => {
    this.setState({
      imageUrl: newImageUrl
    });
  };

  handleVideoUrlChange = newVideoUrl => {
    this.setState({
      videoUrl: newVideoUrl
    });
  };

  //this is the component you will need to add on render. (copy/paste)

  <MultiFileUploader onImageUrlChange={this.handleImageUrlChange}
                     onVideoUrlChange={this.handleVideoUrlChange}
                     incommingImageArray={array of image urls}*****
                     incommingVideoArray={array of video urls}*****
   />

   // ****You can pass in 2 arrays to populate the preview area with videos or images

     and 

   //if you have any question or feedback, please talk to Ji

*/

  handleOnClickUploader = e => {
    var file = e.target.files[0];

    putPresigedUrl().then(res => {
      console.log("PresignedURL", res);
      var presignedUrl = res.data.item;

      var options = {
        headers: {
          "Content-Type": file.type
        },
        withCredentials: false,
        onUploadProgress: progressEvent => {
          console.log("uploading...", Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      };
      putUploadFile(presignedUrl, file, options).then(s3res => {
        console.log("Uploaded", s3res);
        var imageUrl = presignedUrl.split("?", 2)[0];
        let newImagePreview = [...this.state.previewUrls];
        let imagePreviewObject = {
          type: "image",
          url: imageUrl
        };
        newImagePreview.push(imagePreviewObject);
        this.setState(
          {
            previewUrls: newImagePreview
          },
          () => this.dividePreviewArray()
        );
      });
    });
  };

  handleOnClickDelete = (event, index) => {
    let newPreviewUrl = [...this.state.previewUrls];
    newPreviewUrl.splice(index, 1);
    this.setState(
      {
        previewUrls: newPreviewUrl,
        mediaLimit: this.state.previewUrls.length - 1
      },
      () => this.dividePreviewArray()
    );
  };

  dividePreviewArray = () => {
    let newImageArray = [];
    let newVideoArray = [];
    let { previewUrls } = this.state;
    for (let i = 0; i < previewUrls.length; i++) {
      previewUrls[i].displayOrder = i;
      if (previewUrls[i].type == "image") {
        newImageArray.push(previewUrls[i]);
      } else {
        newVideoArray.push(previewUrls[i]);
      }
    }
    this.setState(
      {
        imageUrlArray: newImageArray,
        videoUrlArray: newVideoArray,
        mediaLimit: this.state.previewUrls.length
      },
      () => this.sendToParent()
    );
  };

  sendToParent = () => {
    const { videoUrlArray, imageUrlArray } = this.state;
    this.props.onVideoUrlChange(videoUrlArray);
    this.props.onImageUrlChange(imageUrlArray);
  };

  handleOnclickVideoLink = () => {
    if (this.state.formVideoLinkInput) {
      this.setState({
        formVideoLinkInput: false,
        imageUrlArray: [],
        formFileBtn: true
      });
    } else {
      this.setState({
        formVideoLinkInput: true,
        formFileBtn: false
      });
    }
  };

  handleAddVideoToPreview = () => {
    let newPreviewUrl = [...this.state.previewUrls];
    let videoPreviewObject = { type: "video", url: this.state.videoUrl };
    newPreviewUrl.push(videoPreviewObject);
    this.setState(
      {
        previewUrls: newPreviewUrl,
        videoUrl: ""
      },
      () => this.dividePreviewArray()
    );
  };

  componentWillMount() {
    let newPreviewArray = [...this.state.previewUrls];
    if (this.props.incommingImageArray || this.props.incommingVideoArray) {
      let incommingNewImageArray = [];
      let incommingNewVideoArray = [];
      if (this.props.incommingImageArray) {
        incommingNewImageArray = this.props.incommingImageArray.map(image => ({
          url: image,
          type: "image"
        }));
        console.log(incommingNewImageArray);
        // return incommingNewImageArray;
      }

      if (this.props.incommingVideoArray) {
        incommingNewVideoArray = this.props.incommingVideoArray.map(video => ({
          url: video,
          type: "video"
        }));
        console.log(incommingNewVideoArray);
        // return incommingNewVideoArray;
      }
      let imageobjectArray = newPreviewArray.concat(incommingNewImageArray);
      let videoObjectArray = imageobjectArray.concat(incommingNewVideoArray);
      // return videoObjectArray;
      this.setState({ previewUrls: videoObjectArray }, () => console.log(this.state.previewUrls));
    }
  }

  render() {
    return (
      <div className="text-right">
        <div>
          <React.Fragment>
            <input
              id="ImageUpload"
              type="file"
              name="key"
              ref={ref => (this.upload = ref)}
              style={{ display: "none" }}
              onChange={this.handleOnClickUploader}
            />
            <div className="preview-container mt-3">
              <div className="row">
                {this.state.previewUrls.map((imagePreview, index) => (
                  <div
                    key={index}
                    className="col-md-auto col-sm-auto col-auto"
                    style={{ paddingRight: 10, paddingLeft: 14, paddingTop: 3 }}
                  >
                    {imagePreview.type == "image" ? (
                      <React.Fragment>
                        <img src={imagePreview.url} className="img" />
                        <button type="button" className="btn" onClick={() => this.handleOnClickDelete(event, index)}>
                          <i className="zmdi zmdi-close zmdi-hc-lg" />
                        </button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <div className="videoPreview">
                          <VideoPlayerContainer
                            videoUrl={imagePreview.url}
                            height={this.state.videoHeight}
                            width={this.state.videoWidth}
                          />
                          <button type="button" className="btn" onClick={() => this.handleOnClickDelete(event, index)}>
                            <i className="zmdi zmdi-close zmdi-hc-lg" />
                          </button>
                        </div>
                      </React.Fragment>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <br />
            {this.state.formVideoLinkInput &&
              this.state.mediaLimit < 8 && (
                <div className="mt-4">
                  <h4> Video Link</h4>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      spellCheck="false"
                      type="text"
                      value={this.state.videoUrl}
                      placeholder="Paste video link here"
                      onChange={e => this.setState({ videoUrl: e.target.value })}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-success" type="button" onClick={this.handleAddVideoToPreview}>
                        <i className="zmdi zmdi-check zmdi-hc-lg" />
                      </button>
                      <button className="btn btn-secondary" type="button" onClick={this.handleOnclickVideoLink}>
                        <i className="zmdi zmdi-close zmdi-hc-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            <br />
            {this.state.mediaLimit < 8 && (
              <button
                type="button"
                id="UploadButton"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <i className="zmdi zmdi-image zmdi-hc-fw" />
                &nbsp;Upload Images
              </button>
            )}
            {this.state.mediaLimit < 8 && (
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnclickVideoLink}
              >
                <i className="zmdi zmdi-videocam zmdi-hc-fw" />
                &nbsp;Link Video
              </button>
            )}
          </React.Fragment>
        </div>
      </div>
    );
  }
}
export default MultiFileUploader;
