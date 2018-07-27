import React from "react";
import CardLayout from "components/CardLayout";
import VideoPlayerContainer from "components/VideoPlayer/VideoPlayerContainer";
import { putPresigedUrl, putUploadFile } from "services/s3.service";

class BlogCard extends React.Component {
  state = {
    title: this.props.blog.title,
    content: this.props.blog.content,
    imageUrl: "",
    videoUrl: this.props.blog.videoUrl,
    editMode: false,
    filePreview: ""
  };

  handleOnClickEdit = () => {
    this.setState({
      editMode: true
    });
  };

  handleOnclickUpdateCancel = () => {
    this.setState({
      editMode: false
    });
  };
  handleOnClickUpdate = () => {
    this.props.handleSubmitBlog({
      id: this.props.blog.id,
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished,
      videoUrl: this.state.videoUrl
    });
    this.setState({
      editMode: false
    });
  };

  handleOnClickUploader = e => {
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
        console.log("Uploaded", this.state.imageUrl);
      });

      this.setState({
        imageUrl: presignedUrl.split("?", 2)[0]
      });
    });
  };

  render() {
    return (
      <CardLayout styleName="col-lg-6">
        {this.state.editMode ? (
          <React.Fragment>
            <div className="cus-card-header">
              <div className="user-profile d-flex flex-row align-items-center">
                <img alt="..." src={this.props.blog.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail">
                  <h5 className="user-name">{this.props.blog.firstName}</h5>
                  <p className="user-description">school and sport type</p>
                </div>
              </div>
            </div>

            <form>
              {this.props.blog.imageUrl == "" ? (
                <div />
              ) : (
                <img className="img-fluid" src={this.props.blog.imageUrl} alt="Card image cap" />
              )}

              {this.props.blog.videoUrl == "" ? <div /> : <VideoPlayerContainer videoUrl={this.props.blog.videoUrl} />}

              <div className="card-body">
                {this.props.blog.videoUrl == "" ? (
                  <div />
                ) : (
                  <React.Fragment>
                    <div className="mt-4">
                      <h4> Video Link</h4>
                      <div className="input-group mb-3">
                        <input
                          className="form-control"
                          type="text"
                          value={this.state.videoUrl}
                          onChange={e => this.setState({ videoUrl: e.target.value })}
                        />
                      </div>
                    </div>
                  </React.Fragment>
                )}
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
              </div>
            </form>
            <div className="btn-container text-right">
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnclickUpdateCancel}
              >
                Cancel
              </button>
              <button type="button" className="jr-btn bg-success btn btn-success" onClick={this.handleOnClickUpdate}>
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <span className="btn-name card-text">Update</span>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="cus-card-header">
              <div className="user-profile d-flex flex-row align-items-center">
                <img alt="..." src={this.props.blog.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail cus-user-detail">
                  <h4 className="user-name">{this.props.blog.firstName}</h4>
                  <p className="user-description">school and sport type</p>
                </div>
                <div className="text-right">
                  <button
                    type="button"
                    onClick={this.props.handleModalToggle}
                    className="jr-btn jr-flat-btn btn btn-default"
                  >
                    <i className="zmdi zmdi-delete zmdi-hc-lg" /> &nbsp;Delete
                  </button>
                </div>
              </div>
            </div>
            {this.props.blog.imageUrl == "" ? (
              <div />
            ) : (
              <img className="img-fluid" src={this.props.blog.imageUrl} alt="Card image cap" />
            )}
            {this.props.blog.videoUrl == "" ? (
              <div />
            ) : (
              <div className="videoWrapper">
                <VideoPlayerContainer videoUrl={this.props.blog.videoUrl} />
              </div>
            )}
            <div className="card-body">
              <h3>{this.props.blog.title.charAt(0).toUpperCase() + this.props.blog.title.slice(1)}</h3>

              <div className="meta-wrapper">
                {this.props.blog.dateModified == this.props.blog.dateCreated ? (
                  <React.Fragment>
                    <span className="meta-date">
                      <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />&nbsp;
                      {this.props.blog.dateModified.substring(0, 10)}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="meta-date">
                      <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />&nbsp;
                      {this.props.blog.dateCreated.substring(0, 10)} &nbsp; Updated
                    </span>
                  </React.Fragment>
                )}
              </div>
              <p className="card-text text-muted">{this.props.blog.content}</p>
            </div>
            <div className="btn-container text-right">
              <button type="button" className="jr-btn jr-btn-default btn btn-default" onClick={this.handleOnClickEdit}>
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <span className="btn-name card-text">Edit</span>
              </button>
            </div>
          </React.Fragment>
        )}
      </CardLayout>
    );
  }
}

export default BlogCard;
