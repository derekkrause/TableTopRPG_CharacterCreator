import React, { Component } from "react";
import { putPresigedUrl, putUploadFile } from "services/s3.service";
import axios from "axios";
import { runInThisContext } from "vm";

class FileUploader extends Component {
  state = {
    imagePreview: "",
    imageUrl: "",
    loading: false,
    progress: ""
  };

  /*
<Instructions>
This component will:
-upload the image
-show preview after image is uploaded
-preview demention: 150px x 150px
-generate text 

//this is the component you will need to add on render. (copy/paste)

<FileUploader onImageUrlChange={this.handleImageUrlChange} />

//add imageUrl state (one below) to where FileUploader is pasted (code above) This will hold image url after upload the image.
you can set this to your payload by this.setState({your img url state name on payload : this.state.imageUrl}) 

imageUrl: ""


// add handleImageUrlChange function (one below) above render() of where FileUplaoder is placed.
Purpose of this function is sync imageUrl state as it generate the url, so you can add this into your payload before render since normally states are async. 

handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

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
          this.setState({ loading: true, progress: Math.round((progressEvent.loaded * 100) / progressEvent.total) });
          console.log("uploading...", Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      };

      putUploadFile(presignedUrl, file, options).then(s3res => {
        console.log("Uploaded", s3res);
        var imageUrl = presignedUrl.split("?", 2)[0];
        this.setState(
          {
            loading: false,
            imageUrl: presignedUrl.split("?", 2)[0],
            imagePreview: presignedUrl.split("?", 2)[0]
          },
          this.props.onImageUrlChange(imageUrl),
          () => console.log("finalURL", this.state.imageUrl)
        );
      });
    });
  };

  handleOnClickDelete = () => {
    this.setState(
      {
        imagePreview: "",
        imageUrl: ""
      },
      this.props.onImageUrlChange("")
    );
  };
  render() {
    return (
      <div>
        <div>
          {this.state.imagePreview == "" ? (
            <React.Fragment>
              <form>
                <fieldset disabled={this.state.loading}>
                  <input
                    id="ImageUpload"
                    type="file"
                    name="key"
                    ref={ref => (this.upload = ref)}
                    style={{ display: "none" }}
                    onChange={this.handleOnClickUploader}
                  />
                  <button
                    type="button"
                    id="UploadButton"
                    className={`jr-btn jr-btn-default btn btn-default ${this.props.cssClassName}`}
                    onClick={() => {
                      this.upload.click();
                    }}
                  >
                    {this.state.loading ? (
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          aria-valuenow={this.state.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style={{ width: this.state.progress + "%" }}
                        >
                          {this.state.progress} %
                        </div>
                      </div>
                    ) : (
                      <i className="zmdi zmdi-image zmdi-hc-fw" />
                    )}
                    {this.props.uploaderName ? this.props.uploaderName : <p>&nbsp;Upload Images</p>}
                  </button>
                </fieldset>
              </form>
            </React.Fragment>
          ) : (
            <div className="preview-container">
              <img src={this.state.imagePreview} className="img" />
              <button type="button" className="btn" onClick={this.handleOnClickDelete}>
                <i className="zmdi zmdi-close zmdi-hc-lg" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default FileUploader;
