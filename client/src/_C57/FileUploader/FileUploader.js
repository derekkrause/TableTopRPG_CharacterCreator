import React, { Component } from "react";
import { putPresigedUrl, putUploadFile } from "services/s3.service";

class FileUploader extends Component {
  state = {
    filePreview: "",
    fileUrl: this.props.fileUrl
  };

  handleOnClick = e => {
    var file = e.target.files[0];

    putPresigedUrl().then(res => {
      console.log("PresignedURL", res);
      var presignedUrl = res.data.item;
      var options = {
        headers: {
          "Content-Type": file.type
        }
      };

      putUploadFile(presignedUrl, file, options).then(s3res => {
        console.log("Uploaded", this.state.fileUrl);
      });

      this.setState({
        fileUrl: presignedUrl.split("?", 2)[0],
        filePreview: presignedUrl.split("?", 2)[0]
      });
    });
  };
  render() {
    return (
      <div>
        <input
          id="ImageUpload"
          type="file"
          name="key"
          ref={ref => (this.upload = ref)}
          style={{ display: "none" }}
          onChange={this.handleOnClick}
        />
        <button
          type="button"
          id="UploadButton"
          className="fileUploader-btn color-gray"
          onClick={() => {
            this.upload.click();
          }}
        >
          <i className="zmdi zmdi-image zmdi-hc-lg color-gray" />
          <br />
          Upload Images
        </button>
      </div>
    );
  }
}
export default FileUploader;
