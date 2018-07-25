import React from "react";
import IntlMessages from "util/IntlMessages";
import "../customStyle.css";
import axios from "axios";

class BlogForm extends React.Component {
  state = {
    title: "",
    content: "",
    imageUrl: "",
    imagePreview: "",
    authorId: 13,
    isPublished: 1,
    videoUrl: ""
  };

  handleOnClickPayload = () => {
    this.props.handleSubmitBlog({
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
  };

  handleChange = e => {
    this.setState({
      imagePreview: URL.createObjectURL(e.target.files[0])
    });
    const formData = new FormData();
    formData.append("fileName", e.target.files[0]);
    axios.put("api/files", formData).then(response => {
      console.log("tempURL", response);
      this.setState(
        {
          imageUrl: response.data.item
        },
        () => console.log("checking URL", this.state.imageUrl)
      );
    });
  };

  render() {
    return (
      <div>
        <div className="undifined card">
          <div className="bg-primary text-white card-header">
            <div className="row">
              <div className="col-md-10 col-10">Add Your Story</div>
              <div className="col-md-2 col-2 text-right">
                <button
                  type="button"
                  onClick={this.props.closeBlogForm}
                  className="btn btn-sm  btn-primary text-white btn btn-default"
                >
                  <i className="zmdi zmdi-close-circle-o zmdi-hc-lg" />
                  &nbsp;Close
                </button>
              </div>
            </div>
          </div>
          <div className="card-body">
            <form className="form-container" noValidate autoComplete="off">
              <h4> Title </h4>
              <input
                className="form-control"
                type="text"
                value={this.state.title}
                onChange={e => this.setState({ title: e.target.value })}
              />
              <div className="mt-4">
                <h4> Content</h4>
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Share your thoughts, moments and tips "
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                />
              </div>
              {this.state.imagePreview == "" ? (
                <div />
              ) : (
                <div className="mt-4">
                  <img src={this.state.imagePreview} className="upload-img-preview" />
                </div>
              )}
              {this.props.formVideoLinkInput ? (
                <div className="mt-4">
                  <h4> Video Link</h4>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.videoUrl}
                      onChange={e => this.setState({ videoUrl: e.target.value })}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button" onClick={this.props.handleOnclickVideoLink}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </form>

            <div className="row mt-5">
              <div className="col-md-10 col-10">
                <div>
                  <button type="button" className="jr-btn jr-btn-default btn btn-default">
                    <i className="zmdi zmdi-collection-text zmdi-hc-fw" />
                    Write an article
                  </button>
                  <button
                    type="button"
                    className="jr-btn jr-btn-default btn btn-default"
                    onClick={this.props.handleOnclickVideoLink}
                  >
                    <i className="zmdi zmdi-videocam zmdi-hc-fw" />
                    Link Video
                  </button>
                  <input
                    id="ImageUpload"
                    type="file"
                    ref={ref => (this.upload = ref)}
                    style={{ display: "none" }}
                    onChange={this.handleChange}
                    // multiple
                  />
                  <button
                    type="button"
                    id="UploadButton"
                    className="jr-btn jr-btn-default btn btn-default"
                    onClick={() => {
                      this.upload.click();
                    }}
                    // runat="server"
                  >
                    <i className="zmdi zmdi-image zmdi-hc-fw" />
                    Upload Images
                  </button>

                  {/* <input type="file" onChange={this.handleChange} /> */}
                </div>
                <div />
              </div>

              <div className="col-md-2 col-2 text-right">
                <button type="button" className="jr-btn btn btn-primary" onClick={this.handleOnClickPayload}>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogForm;
