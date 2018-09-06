import React from "react";
import { Route, withRouter } from "react-router-dom";
import AthleteSearchResults from "./AthleteSearchResults";
import CoachSearchResults from "./CoachSearchResults";
import SchoolSearchResults from "./SchoolSearchResults";
import EventSearchResults from "./EventSearchResults";
import VenueSearchResults from "./VenueSearchResults";
import ArticleSearchResults from "./ArticleSearchResults";
import AllSearchResults from "./AllSearchResults";
import { connect } from "react-redux";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row mt-3 ml-1">
          <div className="col-12">
            <Route
              path={`${this.props.match.url}/all`}
              render={props => <AllSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            <Route
              path={`${this.props.match.url}/athletes`}
              render={props => <AthleteSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            <Route
              path={`${this.props.match.url}/coaches`}
              render={props => <CoachSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            <Route
              path={`${this.props.match.url}/schools`}
              render={props => <SchoolSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            <Route
              path={`${this.props.match.url}/events`}
              render={props => <EventSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            <Route
              path={`${this.props.match.url}/venues`}
              render={props => <VenueSearchResults key={this.props.searchCriteria.currentSearchNumber} {...props} />}
            />
            {/* <Route path={`${this.props.match.url}/articles`} render={props => <ArticleSearchResults {...props} />} /> */}
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    searchCriteria: state.searchCriteria
  };
}

export default withRouter(connect(mapStateToProps)(SearchResults));
