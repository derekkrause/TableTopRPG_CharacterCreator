import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";

import EventAdminListView from "./EventAdminListView";
import EventView from "../../Event/EventView";
import EventForm from "../../Event/EventForm-R2";

class EventAdmin extends Component {
  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={EventAdminListView} />
        <Route
          exact
          path={`${this.props.match.url}/events/:eventId(\\d+)`}
          render={props => <EventView eventBaseUrl={this.props.match.url} {...props} adminUser="true" />}
        />
        <Route
          exact
          path={`${this.props.match.url}/form`}
          render={props => <EventForm {...props} adminUser="true" />}
        />
        <Route
          exact
          path={`${this.props.match.url}/form/:eventId(\\d+)`}
          render={props => <EventForm {...props} adminUser="true" />}
        />
      </div>
    );
  }
}

export default withRouter(EventAdmin);
