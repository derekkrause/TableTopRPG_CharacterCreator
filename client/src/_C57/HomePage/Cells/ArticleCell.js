import React from "react";

const RecentArticleCell = () => {
  return (
    <div>
      <div>
        <img
          className="img-fluid rounded mb-2"
          src="https://images.pexels.com/photos/20787/pexels-photo.jpg"
          alt="..."
        />
      </div>
      <div>
        <h4 className="mb-1">Title</h4>
        <p className="meta-date"> description</p>
      </div>
    </div>

    // <div className="media project-list">
    //   <span className="circle-shape bg-primary" />
    //   <div className="media-body">
    //     <a className="project-name" href="javascript:void(0)">
    //       Article
    //     </a>
    //     <span className="meta-date">Date</span>
    //   </div>
    // </div>
  );
};

export default RecentArticleCell;
