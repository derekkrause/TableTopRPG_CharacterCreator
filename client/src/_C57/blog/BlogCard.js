import React from "react";
import CardLayout from "components/CardLayout";
import VideoPlayer from "components/VideoPlayer/videoPlayer";

class BlogCard extends React.Component {
  state = {
    title: this.props.blog.title,
    content: this.props.blog.content,
    imageUrl: "",
    videoUrl: "",
    editMode: false
  };

  handleOnClickEdit = () => {
    this.setState({
      editMode: true
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
  render() {
    return (
      <CardLayout styleName="col-lg-6">
        {this.state.editMode ? (
          <React.Fragment>
            <div className="card-header">
              <div className="user-profile d-flex flex-row align-items-center">
                <img alt="..." src={this.props.blog.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail">
                  <h5 className="user-name">{this.props.blog.firstName}</h5>
                  <p className="user-description">{this.props.blog.description}</p>
                </div>
                <div className="text-right">
                  <button type="button" onClick={this.props.handleDeleteBlog}>
                    X
                  </button>
                </div>
              </div>
            </div>
            {this.props.blog.imageUrl == "" ? (
              <div />
            ) : (
              <img className="img-fluid" src={this.props.blog.imageUrl} alt="Card image cap" />
            )}
            {this.props.blog.videoUrl == "" ? <div /> : <VideoPlayer videoUrl={this.props.blog.videoUrl} />}
            <form>
              <div className="card-body">
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

                {/* <a href="javascript:void(0)" className="card-link text-uppercase"><i
                    className="zmdi zmdi-image-o zmdi-hc-fw"/>latest pictures</a> */}
              </div>
            </form>
            <div className="btn-container text-right">
              <button
                type="button"
                className="jr-btn jr-btn-default btn btn-default"
                onClick={this.handleOnClickUpdate}
              >
                <i className="zmdi zmdi-edit zmdi-hc-fw" />
                <span className="btn-name card-text">Update</span>
              </button>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="card-header">
              <div className="user-profile d-flex flex-row align-items-center">
                <img alt="..." src={this.props.blog.avatarUrl} className="user-avatar rounded-circle" />
                <div className="user-detail">
                  <h5 className="user-name">{this.props.blog.firstName}</h5>
                  <p className="user-description">{this.props.blog.description}</p>
                </div>
                <div className="text-right">
                  <button type="button" onClick={this.props.handleDeleteBlog}>
                    X
                  </button>
                </div>
              </div>
            </div>
            {this.props.blog.imageUrl == "" ? (
              <div />
            ) : (
              <img className="img-fluid" src={this.props.blog.imageUrl} alt="Card image cap" />
            )}
            {this.props.blog.videoUrl == "" ? <div /> : <VideoPlayer videoUrl={this.props.blog.videoUrl} />}
            <div className="card-body">
              <h3>{this.props.blog.title.charAt(0).toUpperCase() + this.props.blog.title.slice(1)}</h3>

              <div className="meta-wrapper">
                <span className="meta-date">
                  <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
                  {this.props.blog.dateCreated.substring(0, 10)}
                </span>
              </div>
              <p className="card-text text-muted">{this.props.blog.content}</p>

              {/* <a href="javascript:void(0)" className="card-link text-uppercase"><i
                    className="zmdi zmdi-image-o zmdi-hc-fw"/>latest pictures</a> */}
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
