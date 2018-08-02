import React from "react";
import CardLayout from "components/CardLayout";
import VideoPlayerContainer from "../CustomComponents/VideoPlayer/VideoPlayerContainer";
import FileUploader from "../FileUploader/FileUploader";

class FeedCard extends React.Component {
  state = {
    title: this.props.feed.title,
    content: this.props.feed.content,
    imageUrl: "",
    videoUrl: this.props.feed.videoUrl,
    editMode: false,
    filePreview: "",
    imageDiv: true
  };

  handleOnClickEditToggle = () => {
    this.setState({
      editMode: !this.state.editMode,
      imageDiv: true
    });
  };

  handleOnClickUpdate = () => {
    this.props.handleSubmitFeed({
      id: this.props.feed.id,
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

  handleImageUrlChange = imageUrl => {
    this.setState({
      imageUrl
    });
  };

  handleOnClickDeleteCurrent = () => {
    this.setState({
      imageDiv: false
    });
  };

  render() {
    return (
      <CardLayout styleName="col-lg-6">
        <div className="cus-card-header">
          <div className="user-profile d-flex flex-row align-items-center">
            <img alt="..." src={this.props.feed.avatarUrl} className="user-avatar rounded-circle" />
            <div className="user-detail cus-user-detail">
              <h4 className="user-name">{this.props.feed.firstName}</h4>
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
        {this.state.editMode ? (
          <React.Fragment>
            <form>
              {this.state.imageDiv && (
                <div className="preview-container">
                  <img src={this.props.feed.imageUrl} className="img" />
                  <button type="button" className="btn" onClick={this.handleOnClickDeleteCurrent}>
                    <i className="zmdi zmdi-close zmdi-hc-lg" />
                  </button>
                </div>
              )}

              {this.props.feed.videoUrl !== "" && <VideoPlayerContainer videoUrl={this.props.feed.videoUrl} />}

              <div className="card-body">
                {this.props.feed.videoUrl !== "" && (
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
                {this.props.feed.imageUrl !== "" && (
                  <React.Fragment>
                    <FileUploader onImageUrlChange={this.handleImageUrlChange} />
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
                onClick={this.handleOnClickEditToggle}
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
            {this.props.feed.imageUrl == "" ? (
              <div />
            ) : (
              <img className="img-fluid" src={this.props.feed.imageUrl} alt="Card image cap" />
            )}
            {this.props.feed.videoUrl == "" ? (
              <div />
            ) : (
              <div className="videoWrapper">
                <VideoPlayerContainer videoUrl={this.props.feed.videoUrl} />
              </div>
            )}
            <div className="card-body">
              <h3>{this.props.feed.title.charAt(0).toUpperCase() + this.props.feed.title.slice(1)}</h3>

              <div className="meta-wrapper">
                {this.props.feed.dateModified == this.props.feed.dateCreated ? (
                  <React.Fragment>
                    <span className="meta-date">
                      <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />&nbsp;
                      {this.props.feed.dateModified.substring(0, 10)}
                    </span>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <span className="meta-date">
                      <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />&nbsp;
                      {this.props.feed.dateCreated.substring(0, 10)} &nbsp; Updated
                    </span>
                  </React.Fragment>
                )}
              </div>
              <p className="card-text text-muted">{this.props.feed.content}</p>
            </div>
            <div className="btn-container text-right">
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnClickEditToggle}
              >
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

export default FeedCard;
