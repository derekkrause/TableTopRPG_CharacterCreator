import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

class ForgotPasswordContainer extends Component {
  componentDidMount() {
    // console.log("ForgotPasswordContainer Component Mounted");
  }

  render() {
    return (
      <div>
        <Route exact path={`${this.props.match.url}`} component={ForgotPassword} />
        <Route exact path={`${this.props.match.url}/reset-password`} component={ResetPassword} />
        <Route
          exact
          path={`${this.props.match.url}/reset-password/:tokenId`}
          render={props => <ResetPassword {...props} />}
        />
      </div>
    );
  }
}

export default withRouter(ForgotPasswordContainer);
