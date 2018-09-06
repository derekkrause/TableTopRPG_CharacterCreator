import React from "react";
import IntlMessages from "util/IntlMessages";
import AppNotification from "./AppNotification";
import NotificationItem from "./NotificationItem";
import { Dropdown, DropdownToggle, DropdownMenu, CardHeader } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
import {
  dismissAllNotifications,
  dismissFollowNotification,
  dismissLikeNotification,
  getUnreadMessages,
  dismissMessageNotifications
} from "../../services/notifications.service";
const $ = window.$;

class Notifications extends React.Component {
  state = {
    notifications: false,
    clicked: true,
    notificationArray: [],
    newMessages: 0
  };

  componentDidMount() {
    this.checkNotifications();
    this.messageNotifications();

    this.notificationHubProxy = $.connection.notificationsHub;
    this.notificationHubProxy.client.newNotification = notification => {
      this.checkNotifications();
    };
    $.connection.hub
      .start()
      .done(() => {
        console.log("Now connected, connection ID=" + $.connection.hub.id);
      })
      .fail(function(err) {
        console.log("Could not Connect!", err);
      });
  }

  notificationsExist = () => {
    if (this.state.notificationArray.length < 1 && this.state.newMessages < 0) {
      this.setState({
        notifications: false
      });
    } else {
      this.setState({
        notifications: true
      });
    }
  };

  dismissLike = (likeId, index) => {
    dismissLikeNotification(likeId).then(res => {
      let notifications = [...this.state.notificationArray];
      notifications.splice(index, 1);
      this.setState(
        {
          notificationArray: notifications
        },
        this.notificationsExist()
      );
    });
  };

  dismissFollow = (userId, followerId, index) => {
    dismissFollowNotification(userId, followerId).then(res => {
      let notifications = [...this.state.notificationArray];
      notifications.splice(index, 1);
      this.setState(
        {
          notificationArray: notifications
        },
        this.notificationsExist()
      );
    });
  };
  dismissAll = userId => {
    dismissAllNotifications(userId).then(res => {
      console.log(res);
      this.setState({
        notificationArray: [],
        notifications: false
      });
    });
  };

  messageNotifications = () => {
    getUnreadMessages(this.props.currentUser.id).then(res => {
      if (parseInt(res.data.resultSets[0][0].UnreadMessages) > 0) {
        this.setState(
          {
            newMessages: parseInt(res.data.resultSets[0][0].UnreadMessages)
          },
          this.notificationsExist()
        );
      }
    });
  };

  dismissMessages = e => {
    e.preventDefault();
    dismissMessageNotifications(this.props.currentUser.id).then(res => {
      console.log(res);
      this.setState({
        newMessages: 0
      });
    });
  };

  onAppNotificationSelect = () => {
    this.setState({
      appNotification: !this.state.appNotification,
      notifications: false
    });
  };

  handleNotificationClick = () => {
    if (!this.state.clicked) {
      this.setState({
        clicked: true,
        notifications: true
      });
    } else {
      this.setState({
        clicked: false
      });
    }
  };

  checkNotifications = () => {
    return axios
      .get("api/notifications/" + this.props.currentUser.id)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            notificationArray: res.data,
            notifications: true
          });
        }
      })
      .catch(() => {
        console.log("Get All Failed");
      });
  };

  render() {
    const notifications = this.state.notifications;
    return (
      <Dropdown className="quick-menu" isOpen={this.state.appNotification} toggle={this.onAppNotificationSelect}>
        <DropdownToggle className="d-inline-block" tag="span" data-toggle="dropdown">
          <span className="pointer px-2 px-md-3">
            {notifications ? (
              <i className="zmdi zmdi-notifications-active zmdi-hc-md zmdi-hc-2x text-white icon-alert" />
            ) : (
              <i className="zmdi zmdi-notifications-active zmdi-hc-md zmdi-hc-2x text-white" />
            )}
          </span>
        </DropdownToggle>

        <DropdownMenu right>
          {/* <CardHeader styleName="align-items-center" heading={<IntlMessages id="appNotification.title" />} /> */}
          <AppNotification
            notificationArray={this.state.notificationArray}
            dismissLike={this.dismissLike}
            dismissFollow={this.dismissFollow}
            dismissAll={this.dismissAll}
            currentUser={this.props.currentUser}
            newMessages={this.state.newMessages}
            dismissMessages={this.dismissMessages}
          />
        </DropdownMenu>
      </Dropdown>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Notifications);
