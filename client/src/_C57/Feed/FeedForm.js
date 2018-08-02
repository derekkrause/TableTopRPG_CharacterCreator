import React from "react";
import IntlMessages from "util/IntlMessages";
import "./Feed.css";
import axios from "axios";
import FileUploader from "../FileUploader/FileUploader";

class FeedForm extends React.Component {
  state = {
    title: "",
    content: "",
    imageUrl: "",
    imagePreview: "",
    authorId: 13,
    isPublished: 1,
    videoUrl: "",
    presignedUrl: "",
    fileUrl: ""
  };

  handleOnClickPayload = () => {
    this.props.handleSubmitFeed({
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
  };

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  render() {
    return (
      <div>
        <div className="undifined card">
          <div className="bg-primary text-white card-header">
            <div className="row">
              <div className="col-md-8 col-8">Add Your Story</div>
              <div className="col-md-4 col-4 text-right">
                <button
                  type="button"
                  onClick={this.props.closeFeedForm}
                  className="btn btn-sm  btn-primary text-white btn btn-default"
                >
                  <i className="zmdi zmdi-close zmdi-hc-lg" />
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
                placeholder="What are you sharing today?"
                onChange={e => this.setState({ title: e.target.value })}
              />
              <div className="mt-4">
                <h4> Content</h4>
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Write your thoughts, moments and tips "
                  value={this.state.content}
                  onChange={e => this.setState({ content: e.target.value })}
                />
              </div>
              {this.props.formVideoLinkInput ? (
                <div className="mt-4">
                  <h4> Video Link</h4>
                  <div className="input-group mb-3">
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.videoUrl}
                      placeholder="Paste video link here"
                      onChange={e => this.setState({ videoUrl: e.target.value })}
                    />
                    <div className="input-group-append">
                      <button className="btn btn-secondary" type="button" onClick={this.props.handleOnclickVideoLink}>
                        <i className="zmdi zmdi-close zmdi-hc-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div />
              )}
            </form>

            <div className="mt-4 row">
              <div className="col-md-8 col-8">
                {!this.props.formVideoLinkInput && (
                  <React.Fragment>
                    <div className="row">
                      <div className="col-md-6 col-6">
                        <FileUploader onImageUrlChange={this.handleImageUrlChange} />
                      </div>
                      <div className="col-me-6 col-6">
                        {this.state.imageUrl == "" && (
                          <React.Fragment>
                            <button
                              type="button"
                              className="jr-btn jr-btn-default btn btn-default"
                              onClick={this.props.handleOnclickVideoLink}
                            >
                              <i className="zmdi zmdi-videocam zmdi-hc-fw" />
                              &nbsp;Link Video
                            </button>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                )}
              </div>
              <div className="col-md-4 col-4 text-right">
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

export default FeedForm;
