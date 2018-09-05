import React from "react";
import { Button } from "reactstrap";

const NotificationItem = ({ notification, dismissFollow, dismissLike, notificationNo }) => {
  let notificationTime = new Date(notification.dateCreated).toLocaleString();
  return (
    <li className="media">
      <img
        alt={notification.avatarUrl}
        src={notification.avatarUrl}
        className="avatar-sm rounded-circle mr-2 rounded-circle"
      />
      <div className="media-body align-self-center">
        {notification.notificationType === "Like" && (
          <Button
            color="link"
            onClick={() => dismissLike(notification.notificationId, notificationNo)}
            style={{ float: "right" }}
          >
            dismiss
          </Button>
        )}
        {notification.notificationType === "Follow" && (
          <Button
            color="link"
            onClick={() => dismissFollow(notification.currentUserId, notification.otherUserId, notificationNo)}
            style={{ float: "right" }}
          >
            dismiss
          </Button>
        )}
        <p className="sub-heading mb-0">{notification.fullname}</p>

        {notification.notificationType === "Follow" ? <span>followed you!</span> : <span>liked your post!</span>}
        {/* <i className={`zmdi ${icon} zmdi-hc-fw`} />  */}
        <span className="meta-date">
          <small>
            &nbsp;&nbsp;
            {notificationTime}
          </small>
        </span>
      </div>
    </li>
  );
};

export default NotificationItem;
