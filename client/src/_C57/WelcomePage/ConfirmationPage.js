import React from "react";
import { confirmUser } from "../../services/registerLogin.service";
import SweetAlert from "react-bootstrap-sweetalert";
import { withRouter, Route, Switch, PrivateRoute, Redirect } from "react-router-dom";

class ConfirmationPage extends React.Component {
  state = {
    tokenId: "",
    confirmSuccess: false,
    confirmFail: false
  };

  getToken = string => {
    let tokenId = string.slice(7);
    this.setState({ tokenId }, this.confirmRegistration(tokenId));
  };

  confirmRegistration = token => {
    let responseObject = { tokenId: token };
    confirmUser(responseObject)
      .then(result => {
        console.log(result);
        this.setState({ confirmSuccess: true });
      })
      .catch(error => {
        console.log(error);
        this.setState({ confirmFail: true });
      });
  };

  componentDidMount() {
    //Grab the TokenId from URL
    let queryString = this.props.location.search;
    this.getToken(queryString);
  }

  render() {
    return (
      <div>
        <SweetAlert
          success
          show={this.state.confirmSuccess}
          title="Confirmed!"
          closeOnEsc={false}
          closeOnClickOutside={true}
          onConfirm={() => {
            this.setState({ confirmSuccess: false });
            this.props.history.push("/app/home");
          }}
        >
          Your account has been confirmed. Click 'OK' to Login and get started!
        </SweetAlert>
        <SweetAlert
          error
          show={this.state.confirmFail}
          title="Sorry!"
          closeOnEsc={true}
          closeOnClickOutside={true}
          onConfirm={() => {
            this.setState({ confirmFail: false });
            this.props.history.push("/app/home");
          }}
        >
          Something went wrong. Please open your email and click the confirmation link again. If the problem continues,
          please contact support.
        </SweetAlert>
      </div>
    );
  }
}

export default ConfirmationPage;
