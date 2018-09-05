import React from "react";
import { connect } from "react-redux";

import EventsSearch from "../Event/EventsSearch-R2";

class EventSearchResults extends React.Component {
  state = {
    searchCriteria: {},
    searchMode: null
  };

  componentDidMount() {
    // console.log("EventSearchResults component mounted");
    // console.log("EventSearchResults props: ", this.props);

    const { searchCriteria } = this.props;

    const { searchString, searchType } = searchCriteria;

    this.setState({ searchCriteria: searchCriteria });

    if (searchString === "" && searchType === "events") {
      this.setState({ searchMode: false });

      // this.props.history.push("/app/events");
    } else {
      this.setState({ searchMode: true });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.props !== prevProps) {
    //   console.log("EventSearchResults component updated via props");
    //   console.log("EventSearchResults updated props: ", this.props);
    // }

    if (this.props.searchCriteria !== prevProps.searchCriteria) {
      const { searchCriteria } = this.props;

      const { searchString, searchType } = searchCriteria;

      // console.log("EventSearchResults component updated via props searchCriteria: ", searchCriteria);

      this.setState({ searchCriteria: searchCriteria });

      if (searchString === "" && searchType === "events") {
        this.setState({ searchMode: false });

        // this.props.history.push("/app/events");
      } else {
        this.setState({ searchMode: true });
      }
    }
  }

  render() {
    const { searchMode } = this.state;

    return (
      <div>
        <EventsSearch {...this.props} />
      </div>
    );
  }
}
// export default EventSearchResults;

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    searchCriteria: state.searchCriteria
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchCriteria: searchCriteria => dispatch({ type: "SET_SEARCH_CRITERIA", searchCriteria })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventSearchResults);
