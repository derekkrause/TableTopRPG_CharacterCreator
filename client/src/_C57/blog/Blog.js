import React from "react";
import BlogCard from "./BlogCard";
import { getBlog, postBlog, putUpdateBlog, deleteBlog } from "../../services/blog.sevice";
import BlogForm from "./BlogForm";
import "./Blog.css";
import ConfirmModal from "./ConfirmModal";

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
    updateBtn: false,
    modal: false
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
            videoUrl: ""
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
            videoUrl: "",
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

  handleDeleteBlog = () => {
    const blogId = this.state.blogId;
    deleteBlog(blogId).then(response => {
      console.log("DELETE", response);
      this.setState({
        modal: !this.state.modal,
        blogId: ""
      });
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

  handleModalToggle = blogId => {
    this.setState({
      modal: !this.state.modal,
      blogId
    });
  };

  render() {
    return (
      <div className="app-wrapper">
        <div className="animated slideInUpTiny animation-duration">
          <div className="row">
            <div className="animation slideInLeft">
              <div className="row cus-page-header-container">
                <div className="col-md-6 col-6 mt-4">
                  <h1> Feed </h1>
                </div>
                <div className="col-md-6 col-6 mt-4 text-right">
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
              <div className="cus-card-container">
                {this.state.blogs
                  .sort((a, b) => Date.parse(new Date(a.dateModified)) - Date.parse(new Date(b.dateModified)))
                  .reverse()
                  .map(blog => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      editBlog={this.handleOnClickEditBlog}
                      handleUpdateBlog={() => this.handleUpdateBlog(blog.id)}
                      handleModalToggle={() => this.handleModalToggle(blog.id)}
                      handleSubmitBlog={this.handleSubmitBlog}
                      imageUrl={this.state.imageUrl}
                      handleOnClickUploader={this.handleOnClickUploader}
                    />
                  ))}
              </div>
              <div>
                <ConfirmModal
                  handleModalToggle={this.handleModalToggle}
                  modal={this.state.modal}
                  handleDeleteBlog={this.handleDeleteBlog}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Blog;
