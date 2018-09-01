import React from "react";
import IntlMessages from "util/IntlMessages";
import AppNotification from "./AppNotification";
import NotificationItem from "./NotificationItem";
import { Dropdown, DropdownToggle, DropdownMenu, CardHeader } from "reactstrap";
import { connect } from "react-redux";
import axios from "axios";
const $ = window.$;

class Notifications extends React.Component {
  state = {
    notifications: true,
    clicked: true,
    notificationArray: []
  };

  componentDidMount() {
    this.checkNotifications();

    this.notificationHubProxy = $.connection.notificationsHub;
    this.notificationHubProxy.client.newNotification = notification => {
      // console.log(notification);
      // arr.push(notification);
      // this.setState({ notificationArray: arr });
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
        notifications: false
      });
    } else {
      this.setState({
        clicked: false
      });
    }
  };

  checkNotifications = () => {
    return axios
      .get("api/notifications/3")
      .then(res => {
        console.log("Boom Notifications!", res.data);
        this.setState({
          notificationArray: res.data
        });
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
          <AppNotification notificationArray={this.state.notificationArray} />
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
