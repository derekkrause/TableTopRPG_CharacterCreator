import React, { Component } from "react";

import { Route, withRouter } from "react-router-dom";

import Event from "./Event";
import EventApp from "./EventApp";
import EventView from "./EventView";
import EventsListView from "./EventsListView";
import EventTypeListView from "./EventTypeListView";
import EventForm from "./EventForm";

class EventContainer extends Component {
  render() {
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <div>
        <Route exact path={`${this.props.match.url}/main`} component={EventApp} />
        <Route exact path={`${this.props.match.url}`} render={props => <EventsListView {...props} />} />
        <Route
          exact
          path={`${this.props.match.url}/:eventId(\\d+)`}
          render={props => <EventView eventBaseUrl={this.props.match.url} {...props} />}
        />
        <Route exact path={`${this.props.match.url}/form`} component={EventForm} />
        <Route
          exact
          path={`${this.props.match.url}/form/:eventId(\\d+)`}
          render={props => <EventForm eventBaseUrl={this.props.match.url} {...props} />}
        />
        <Route exact path={`${this.props.match.url}/eventtype`} component={EventTypeListView} />
      </div>
    );
  }
}

export default withRouter(EventContainer);
