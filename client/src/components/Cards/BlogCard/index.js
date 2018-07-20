import React from "react";
import CardLayout from "components/CardLayout";
import { defaultProps } from "recompose";

const PostCard = props => {
  const { blog } = props;
  return (
    <CardLayout styleName="col-lg-6">
      <div className="card-header">
        <div className="user-profile d-flex flex-row align-items-center">
          <img
            alt="..."
            src={blog.avatarUrl}
            className="user-avatar rounded-circle"
          />

          <div className="user-detail">
            <h5 className="user-name">{blog.firstName}</h5>
            <p className="user-description">{blog.description}</p>
          </div>
        </div>
      </div>
      <img className="img-fluid" src={blog.imageUrl} alt="Card image cap" />
      <div className="card-body">
        <p className="card-title">{blog.title}</p>
        <p className="card-text text-muted">{blog.content}</p>

        {/* <a href="javascript:void(0)" className="card-link text-uppercase"><i
                    className="zmdi zmdi-image-o zmdi-hc-fw"/>latest pictures</a> */}
      </div>
      <div className="btn-container text-right">
        <button type="button" className="jr-btn jr-btn-default btn btn-default">
          <i className="zmdi zmdi-edit zmdi-hc-fw" />
          <span className="btn-name card-text" onClick={props.editBlog}>
            Edit
          </span>
        </button>
      </div>
    </CardLayout>
  );
};

export default PostCard;
