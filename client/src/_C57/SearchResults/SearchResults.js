import React from "react";
import { Route } from "react-router-dom";
import AthleteSearchResults from "./AthleteSearchResults";
import CoachSearchResults from "./CoachSearchResults";
import SchoolSearchResults from "./SchoolSearchResults";
import EventSearchResults from "./EventSearchResults";
import VenueSearchResults from "./VenueSearchResults";
import ArticleSearchResults from "./ArticleSearchResults";
import AllSearchResults from "./AllSearchResults";

class SearchResults extends React.Component {
  render() {
    return (
      <div className="container ">
        <div className="row " style={{ margin: "24px" }}>
          <div className="col-12">
            <Route path={`${this.props.match.url}/all`} render={props => <AllSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/athletes`} render={props => <AthleteSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/coaches`} render={props => <CoachSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/schools`} render={props => <SchoolSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/events`} render={props => <EventSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/venues`} render={props => <VenueSearchResults {...props} />} />
            <Route path={`${this.props.match.url}/articles`} render={props => <ArticleSearchResults {...props} />} />
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
