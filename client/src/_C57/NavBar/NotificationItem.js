import React from "react";

const NotificationItem = ({ notification }) => {
  return (
    <li className="media">
      <img
        alt={notification.avatarUrl}
        src={notification.avatarUrl}
        className="avatar-sm rounded-circle mr-2 rounded-circle"
      />
      <div className="media-body align-self-center">
        <button style={{ alignContent: "right" }}>Dismiss</button>
        <p className="sub-heading mb-0">{notification.fullname}</p>

        {notification.notificationType === "Follow" ? <span>Followed You!</span> : <span>Liked your Post!</span>}
        {/* <i className={`zmdi ${icon} zmdi-hc-fw`} />  */}
        <span className="meta-date">
          <small>{notification.dateCreated}</small>
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
