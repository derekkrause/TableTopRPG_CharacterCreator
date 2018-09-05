import React from "react";
import NotificationItem from "./NotificationItem";
import CustomScrollbars from "util/CustomScrollbars";
import { Button } from "reactstrap";

const AppNotification = props => {
  return (
    <CustomScrollbars className="messages-list scrollbar" style={{ height: 280 }}>
      {(props.notificationArray.length > 0 || props.newMessages.length > 0) && (
        <ul className="list-unstyled">
          {props.newMessages > 0 && (
            <li className="media">
              <h5>
                You have <span>{props.newMessages}</span> unread messages.
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <a href="#" onClick={e => props.dismissMessages(e)}>
                    dismiss
                  </a>
                </span>
              </h5>
            </li>
          )}
          {props.notificationArray.map((notification, index) => (
            <NotificationItem
              key={index}
              notificationNo={index}
              notification={notification}
              dismissLike={props.dismissLike}
              dismissFollow={props.dismissFollow}
            />
          ))}
          <li className="media">
            <div className="row justify-content-end">
              <div className="col-md-12">
                <Button
                  color="link"
                  onClick={() => props.dismissAll(props.currentUser.id)}
                  style={{ textAlign: "center" }}
                >
                  dismiss all notifications
                </Button>
              </div>
            </div>
          </li>
        </ul>
      )}
      {props.notificationArray.length == 0 && (
        <div>
          <br />
          <br />
          <h4 style={{ textAlign: "center" }}>You have no new notifications.</h4>
        </div>
      )}
    </CustomScrollbars>
  );
};

export default AppNotification;
