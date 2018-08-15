import React from "react";

const FollowCell = () => {
  return (
    <div className="media project-list">
      <div className="border-primary bg-white icon-btn user-avatar size-40 z-index-20 align-itm-slef mr-3">
        <i className="zmdi zmdi-apple text-primary zmdi-hc-fw" />
      </div>
      {/* <span className="circle-shape bg-primary" /> */}
      <div className="media-body">
        <a className="project-name" href="javascript:void(0)">
          Recent Follow
        </a>
        <span className="meta-date">Date</span>
      </div>
    </div>
  );
};

export default FollowCell;
