import React, { Component } from "react";
import AdvocateProfile from "./AdvocateProfile";
import { Route } from "react-router-dom";

class Advocate extends Component {
  render() {
    return <Route exact path={`${this.props.match.url}/:id(\\d+)`} render={props => <AdvocateProfile {...props} />} />;
  }
}

export default Advocate;
