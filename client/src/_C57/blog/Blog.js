import React from "react";
import IntlMessages from "util/IntlMessages";
import BlogCard from "./BlogCard";
import { getBlog, postBlog, putUpdateBlog, deleteBlog } from ".../../services/BlogServer";
import BlogForm from "./BlogForm";
import EditBlogModal from "./EditBlogModal";
import "../customStyle.css";

class Blog extends React.Component {
  state = {
    blogs: [],
    name: "",
    description: "tbd",
    body: "",
    imageUrl: "",
    title: "",
    content: "",
    avatarUrl: "",
    firstName: "",
    lastName: "",
    blogForm: false,
    formVideoLinkInput: false,
    formFileBtn: true,
    videoUrl: "",
    blogId: 0,
    updateBtn: false
  };

  componentDidMount() {
    getBlog()
      .then(response => {
        console.log("Get All", response);
        this.setState({
          blogs: response.data.item.pagedItems
        });
      })
      .catch(error => console.log(error));
  }

  handleSubmitBlog = payload => {
    let blogId = payload.id;
    if (blogId) {
      putUpdateBlog(payload, blogId)
        .then(response => {
          console.log("UPDATE/PUT", response);
          this.setState({
            title: "",
            content: "",
            imageUrl: "",
            vdeioUrl: ""
          });
          window.location.reload();
        })
        .catch(error => console.log(error));
    } else {
      postBlog(payload)
        .then(response => {
          console.log("CREATE/POST", response);
          this.setState({
            title: "",
            content: "",
            imageUrl: "",
            vdeioUrl: "",
            blogForm: false
          });
          window.location.reload();
        })
        .catch(error => console.log(error));
    }
  };

  handleUpdateBlog = blogId => {
    console.log("UPDATE", blogId);
  };

  handleDeleteBlog = blogId => {
    deleteBlog(blogId).then(response => {
      console.log("DELETE", response);
      window.location.reload();
    });
  };

  handleOnClickBlogForm = () => {
    if (this.state.blogForm === false) {
      this.setState({ blogForm: true });
    } else {
      this.setState({ blogForm: false });
    }
  };

  handleOnclickVideoLink = () => {
    if (this.state.formVideoLinkInput) {
      this.setState({
        formVideoLinkInput: false,
        imageUrl: "",
        formFileBtn: true
      });
    } else {
      this.setState({
        formVideoLinkInput: true,
        formFileBtn: false
      });
    }
  };

  hancleOnclickImageUpload = () => {};

  render() {
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration">
          <div className="row">
            <div className="animation slideInLeft">
              <div className="jr-btn-group row">
                <div className="col-md-10 col-9 mt-4">
                  <h1> Blog </h1>
                </div>
                <div className="col-md-2 col-3 mt-4 text-right">
                  {this.state.blogForm ? (
                    <div />
                  ) : (
                    <button
                      type="button"
                      className="jr-btn btn-blue-grey btn btn-default"
                      onClick={this.handleOnClickBlogForm}
                    >
                      Add post
                    </button>
                  )}
                </div>
              </div>
              {this.state.blogForm ? (
                <BlogForm
                  closeBlogForm={this.handleOnClickBlogForm}
                  videoUrl={this.state.videoUrl}
                  handleOnclickVideoLink={this.handleOnclickVideoLink}
                  formFileBtn={this.state.formFileBtn}
                  handleSubmitBlog={this.handleSubmitBlog}
                  capitalize={this.capitalize}
                  formVideoLinkInput={this.state.formVideoLinkInput}
                />
              ) : (
                <div />
              )}

              {this.state.blogs
                .sort((a, b) => a.id - b.id)
                .reverse()
                .map(blog => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    editBlog={this.handleOnClickEditBlog}
                    handleDeleteBlog={() => this.handleDeleteBlog(blog.id)}
                    handleUpdateBlog={() => this.handleUpdateBlog(blog.id)}
                    handleSubmitBlog={this.handleSubmitBlog}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
