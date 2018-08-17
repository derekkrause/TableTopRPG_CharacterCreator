import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";

import EventTypeTable from "./EventTypeTable";
import EventTypeForm from "./EventTypeForm";

class EventTypeAdmin extends Component {
  componentDidMount() {
    console.log("EventTypeAdmin component mounted");

    console.log("EventTypeAdmin props: ", this.props);
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={EventTypeTable} />
        {/* <Route exact path={`${this.props.match.url}`} render={props => <EventTypeTable {...props} />} /> */}
        {/* <Route exact path={`${this.props.match.url}/form`} component={EventTypeForm} /> */}
        <Route
          exact
          path={`${this.props.match.url}/form`}
          render={props => <EventTypeForm baseUrl={this.props.match.url} {...props} />}
        />
        <Route
          exact
          path={`${this.props.match.url}/form/:eventTypeId(\\d+)`}
          render={props => <EventTypeForm baseUrl={this.props.match.url} {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(EventTypeAdmin);
