import React, { Component } from "react";

import { Route, withRouter } from "react-router-dom";

// import EventApp from "./EventApp";
import EventView from "./EventView";
import EventsListView from "./EventsListView-R2";
import EventForm from "./EventForm-R2";
import EventsSearch from "./EventsSearch-R2";

class EventContainer extends Component {
  componentDidMount() {
    // console.log("EventContainer Component Mounted");
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-3 ml-1">
            <div className="col-12">
              {/* <Route exact path={`${this.props.match.url}/main`} component={EventApp} /> */}
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
              {/* <Route exact path={`${this.props.match.url}/search`} render={props => <EventsSearch {...props} />} /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventContainer);
