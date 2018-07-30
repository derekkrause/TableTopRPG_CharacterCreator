import React, { Component } from "react";
import { putPresigedUrl, putUploadFile } from "services/s3.service";
import axios from "axios";

class FileUploader extends Component {
  state = {
    imagePreview: "",
    imageUrl: "",
    loading: true
  };

  /*
<Instructions>
This component will:
-upload the image
-show preview after image is uploaded
-preview demention: 150px x 150px

//add this state to parent of this component. This will hold image url after upload the image.
you can set this to your payload. EX. (your img url state name) : this.state.imageUrl

 imageUrl: ""


// add this function above render of the parent of this component.
purpose of this function is sync imageUrl state on the parent so you can add this into your payload before render. 

handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  //this is the component you will need to add on render. (copy/paste)

   <FileUploader onImageUrlChange={this.handleImageUrlChange} />

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
        onUploadProgress: progressEvent => {
          console.log("uploading...", Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      };

      putUploadFile(presignedUrl, file, options).then(s3res => {
        console.log("Uploaded", s3res);
        var imageUrl = presignedUrl.split("?", 2)[0];
        this.setState(
          {
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
    this.setState({
      imagePreview: ""
    });
  };
  render() {
    return (
      <div>
        <div>
          {this.state.imagePreview == "" ? (
            <React.Fragment>
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
                className="jr-btn jr-btn-default btn btn-default"
                onClick={() => {
                  this.upload.click();
                }}
              >
                <i className="zmdi zmdi-image zmdi-hc-fw" />
                &nbsp;Upload Images
              </button>
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
