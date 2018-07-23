import React from "react";
import IntlMessages from "util/IntlMessages";

class BlogForm extends React.Component {
  state = {
    title: "",
    content: "",
    imageUrl: "",
    authorId: 13,
    isPublished: 1
  };

  handleOnClickPayload = () => {
    this.props.handleSubmitBlog({
      title: this.state.title,
      content: this.state.content,
      imageUrl: this.state.imageUrl,
      slug: this.state.title,
      authorId: this.state.authorId,
      isPublished: this.state.isPublished
    });
  };
  render() {
    return (
      <div>
        <div className="jr-card">
          <div className="jr-card-body">
            <div className="text-right">
              <button type="button" onClick={this.props.closeBlogForm}>
                X
              </button>
            </div>

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
              {this.props.formVideoLinkInput ? (
                <div className="mt-4">
                  <h4> Video Link</h4>
                  <div className="input-group mb-3">
                    <input className="form-control" type="text" />
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

                  <button type="button" className="jr-btn jr-btn-default btn btn-default">
                    <i className="zmdi zmdi-image zmdi-hc-fw" />
                    Upload Images
                  </button>

                  <button
                    type="button"
                    className="jr-btn jr-btn-default btn btn-default"
                    onClick={this.props.handleOnclickVideoLink}
                  >
                    <i className="zmdi zmdi-videocam zmdi-hc-fw" />
                    Link Video
                  </button>
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
