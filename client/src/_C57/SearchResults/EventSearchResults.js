import React from "react";
import EventsSearch from "../Event/EventsSearch";

class EventSearchResults extends React.Component {
  // componentDidMount() {
  //   console.log("EventSearchResults component mounted");
  // }

  render() {
    return (
      <div>
        <EventsSearch {...this.props} />
      </div>
    );
  }
}
export default EventSearchResults;
