import React, { Component } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";

import { verifyTokenGet, updateUserPut } from "../../services/ForgotPassword.service";
import { currentUser } from "../../services/currentUser.service";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";

class ResetPassword extends Component {
  state = {
    loginEmail: "",
    tokenId: "",
    tokenConfirmed: false,
    newPassword: "",
    newConfirmPassword: "",
    resetPasswordAlert: null,
    loader: null
  };

  handlerResetPassword = () => {
    // console.log("ResetPassword Reset Password button clicked!");

    const { loginEmail, newPassword, newConfirmPassword, tokenId, tokenConfirmed } = this.state;

    if (newPassword === newConfirmPassword && tokenConfirmed === true) {
      const updateUserData = {
        Email: loginEmail,
        Password: newPassword,
        TokenId: tokenId,
        Confirmed: tokenConfirmed
      };

      this.updateUser(updateUserData);
      this.setState({ loader: true });
    } else if (newPassword !== newConfirmPassword) {
      this.showAlert("passwordsDontMatch");
    }
  };

  updateUser = user => {
    // console.log("ResetPassword user: ", user);

    updateUserPut(user)
      .then(response => {
        // Success
        this.showAlert("resetPasswordOk");
        this.setState({ loader: false });
      })
      .catch(error => {
        // Error
        // console.log("ResetPassword Update Ajax PUT request error!");
        // console.log(error);

        this.showAlert("resetPasswordError");
        this.setState({ loader: false });
      });
  };

  verifyToken = tokenId => {
    // If token is ok, update password. If not ok, have user repeat request for a new one via a new email.

    verifyTokenGet(tokenId)
      .then(response => {
        // console.log("ResetPassword Get by Token Ajax GET request success!");
        // console.log(response);

        const rDataItem = response.data.item;

        if (rDataItem.confirmed === true && rDataItem.tokenTypeId === 2) {
          this.setState({ tokenConfirmed: true });
          this.setState({ loginEmail: rDataItem.regEmail });
        }
        this.setState({ loader: false });
      })
      .catch(error => {
        // console.log("ResetPassword Get by Token Ajax GET request failed!");
        // console.log(error);

        this.showAlert("invalidToken");
        this.setState({ loader: false });
      });
  };

  showAlert = alertType => {
    if (alertType === "invalidToken") {
      const getAlert = () => (
        <SweetAlert error title="Forgot Password" onConfirm={this.onConfirmAlertInvalid}>
          Invalid token!
        </SweetAlert>
      );

      this.setState({ resetPasswordAlert: getAlert() });
    }

    if (alertType === "passwordsDontMatch") {
      const getAlert = () => (
        <SweetAlert error title="Forgot Password" onConfirm={this.onConfirmAlertPasswords}>
          Passwords do not match! Please check your entries!
        </SweetAlert>
      );

      this.setState({ resetPasswordAlert: getAlert() });
    }

    if (alertType === "resetPasswordOk") {
      const getAlert = () => (
        <SweetAlert success title="Forgot Password" onConfirm={this.onConfirmAlertUpdateOk}>
          Password updated with new password!
        </SweetAlert>
      );

      this.setState({ resetPasswordAlert: getAlert() });
    }

    if (alertType === "resetPasswordError") {
      const getAlert = () => (
        <SweetAlert error title="Forgot Password" onConfirm={this.onConfirmAlertUpdateError}>
          Password update error!
        </SweetAlert>
      );

      this.setState({ resetPasswordAlert: getAlert() });
    }

    if (alertType === "verifySuccess") {
      const getAlert = () => (
        <SweetAlert success title="Forgot Password" onConfirm={this.onConfirmAlertSuccess}>
          Email has been sent!
        </SweetAlert>
      );
    }
  };

  onConfirmAlertInvalid = () => {
    this.setState({ tokenConfirmed: false });
    this.setState({ resetPasswordAlert: null });

    this.props.history.push("/app/forgot-password");
  };

  onConfirmAlertPasswords = () => {
    // this.setState({ newPassword: "", newConfirmPassword: "" });
    this.setState({ resetPasswordAlert: null });
  };

  onConfirmAlertUpdateOk = () => {
    this.setState({ resetPasswordAlert: null });

    currentUser().then(this.props.history.push("/app/welcome"));
  };

  onConfirmAlertUpdateError = () => {
    this.setState({ resetPasswordAlert: null });
  };

  componentDidMount() {
    // console.log("ResetPassword Component Mounted");

    // console.log("ResetPassword props: ", this.props);

    // 1. Get token, and send to state
    const tokenId = this.props.match.params.tokenId;

    this.setState({ tokenId: tokenId });

    if (tokenId) {
      this.verifyToken(tokenId);
      this.setState({ loader: true });
    } else {
      this.showAlert("invalidToken");
    }
  }

  render() {
    const { loginEmail, resetPasswordAlert, loader } = this.state;

    return (
      <div>
        <div className="login-container d-flex animated slideInUpTiny animation-duration-3">
          <div className="login-content">
            <div className="login-header text-center">
              <a className="app-logo" title="RecruitHub" href="#">
                <img
                  src="http://warriordesign.net/asr/wp-content/uploads/2016/07/as.png"
                  alt="RecruitHub"
                  title="RecruitHub"
                />
              </a>
            </div>
            <h1 className="my-2 text-center">Reset Password</h1>
            <h5 className="text-center">for Username: {loginEmail}</h5>
            <div className="login-form">
              <Form className="row pb-0" autoComplete="on">
                <FormGroup className="col-12">
                  <Label for="password">New Password</Label>
                  <Input
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    type="password"
                    placeholder="********"
                    //   onChange={this.onChange}
                    //   valid={password.length > 0 && passwordValid}
                    //   invalid={password.length > 0 && !passwordValid ? true : undefined}
                    value={this.state.newPassword}
                    onChange={e => this.setState({ newPassword: e.target.value })}
                    required
                  />
                  <FormFeedback>
                    Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character.
                  </FormFeedback>
                  <FormFeedback valid>Looks good!</FormFeedback>
                </FormGroup>
                <FormGroup className="col-12">
                  <Label for="password">Confirm Password</Label>
                  <Input
                    name="newConfirmPassword"
                    id="newConfirmPassword"
                    className="form-control"
                    type="password"
                    placeholder="********"
                    //   onChange={this.onChange}
                    //   valid={password.length > 0 && passwordValid}
                    //   invalid={password.length > 0 && !passwordValid ? true : undefined}
                    value={this.state.newConfirmPassword}
                    onChange={e => this.setState({ newConfirmPassword: e.target.value })}
                    required
                  />
                  <FormFeedback>
                    Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character.
                  </FormFeedback>
                  <FormFeedback valid>Looks good!</FormFeedback>
                </FormGroup>
              </Form>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                type="submit"
                //   onClick={loginView ? this.signin : this.signUp}
                className="btn btn-primary py-2 my-2"
                //   disabled={!formValid && !loginView}
                onClick={this.handlerResetPassword}
              >
                {/* {loginView ? "Sign-in" : "Sign-up"} */}
                Reset Password
              </Button>
            </div>
          </div>
        </div>
        {resetPasswordAlert}
        <ProgressIndicator loader={loader} />
      </div>
    );
  }
}

export default ResetPassword;
