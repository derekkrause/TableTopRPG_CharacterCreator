import React from "react";
import CardLayout from "components/CardLayout";
import { defaultProps } from "recompose";
import VideoPlayer from "components/VideoPlayer/VideoPlayer";

const BlogCard = props => {
  const { blog } = props;
  // const datePosted = new Intl.DateTimeFormat("en-US").format(blog.dateCreated)}
  return (
    <CardLayout styleName="col-lg-6">
      <div className="card-header">
        <div className="user-profile d-flex flex-row align-items-center">
          <img alt="..." src={blog.avatarUrl} className="user-avatar rounded-circle" />
          <div className="user-detail">
            <h5 className="user-name">{blog.firstName}</h5>
            <p className="user-description">{blog.description}</p>
          </div>
          <div className="text-right">
            <button type="button" onClick={props.handleDeleteBlog}>
              X
            </button>
          </div>
        </div>
      </div>
      {blog.imageUrl == "" ? <div /> : <img className="img-fluid" src={blog.imageUrl} alt="Card image cap" />}
      {blog.videoUrl == "" ? <div /> : <VideoPlayer videoUrl={blog.videoUrl} />}
      <div className="card-body">
        <h3>{blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}</h3>

        <div className="meta-wrapper">
          <span className="meta-date">
            <i className="zmdi zmdi-calendar-note zmdi-hc-lg" />
            {blog.dateCreated.substring(0, 10)}
          </span>
        </div>
        {props.editMode === false ? (
          <textarea rows="8" type="text" value={blog.content} />
        ) : (
          <p className="card-text text-muted">{blog.content}</p>
        )}

        {/* <a href="javascript:void(0)" className="card-link text-uppercase"><i
                    className="zmdi zmdi-image-o zmdi-hc-fw"/>latest pictures</a> */}
      </div>
      <div className="btn-container text-right">
        <button type="button" className="jr-btn jr-btn-default btn btn-default" onClick={props.handleUpdateBlog}>
          <i className="zmdi zmdi-edit zmdi-hc-fw" />
          <span className="btn-name card-text">Edit</span>
        </button>
      </div>
    </CardLayout>
  );
};

export default BlogCard;
