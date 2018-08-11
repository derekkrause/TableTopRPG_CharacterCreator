import React from "react";

import EventsSearch from "../Event/EventsSearch";

class EventSearchResults extends React.Component {
  componentDidMount() {
    console.log("EventSearchResults component mounted");
  }

  render() {
    return (
      <div>
        <h1>“Now, young Skywalker, you will die.” — Emperor Palpatine</h1>
        <h1>“Do. Or do not. There is no try.” — Yoda</h1>
        <EventsSearch {...this.props} />
      </div>
    );
  }
}
export default EventSearchResults;
