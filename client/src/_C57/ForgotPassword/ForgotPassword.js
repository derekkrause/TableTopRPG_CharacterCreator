import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import CircularProgress from "../../components/CircularProgress";

import { checkEmailPost } from "../../services/ForgotPassword.service";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";

// import { } from 'ForgotPassword.service';

class ForgotPassword extends Component {
  state = {
    loginEmail: "",
    forgotPasswordAlert: null,
    loader: null
  };

  handerResetPasswordSubmit = () => {
    // console.log("ForgotPassword Reset Password button clicked");

    const { loginEmail } = this.state;

    // Send out email with token
    this.getNewPassword(loginEmail);
    this.setState({ loader: true });
  };

  getNewPassword(eMail) {
    const forgotPassword = { EMail: eMail };

    checkEmailPost(forgotPassword)
      .then(response => {
        // console.log("ForgotPassword Ajax POST request success!");
        // console.log(response);

        this.showAlert("success");
        this.setState({ loader: false });
      })
      .catch(error => {
        // console.log("ForgotPassword Ajax POST request failed!");
        // console.log(error);

        this.showAlert("failed");
        this.setState({ loader: false });
      });
  }

  showAlert = alertType => {
    if (alertType === "success") {
      // Alert on success

      const getAlert = () => (
        <SweetAlert success title="Forgot Password" onConfirm={this.onConfirmAlertSuccess}>
          Email has been sent!
        </SweetAlert>
      );

      this.setState({ forgotPasswordAlert: getAlert() });
    } else if (alertType === "failed") {
      // Alert on failed

      const getAlert = () => (
        <SweetAlert error title="Forgot Password" onConfirm={this.onConfirmAlertFailed}>
          Error! Account cannot be found, or invald value entered!
        </SweetAlert>
      );

      this.setState({ forgotPasswordAlert: getAlert() });
    }
  };

  onConfirmAlertSuccess = () => {
    this.props.history.push("/app/welcome");

    this.setState({ forgotPasswordAlert: null });
  };

  onConfirmAlertFailed = () => {
    this.setState({ forgotPasswordAlert: null });
  };

  componentDidMount() {
    // console.log("ForgotPassword Component Mounted");
  }

  render() {
    const { forgotPasswordAlert, loader } = this.state;

    return (
      <div>
        <div className="app-wrapper login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="login-content">
            <div className="login-header justify-content-center">
              <Link className="app-logo" to="/" title="Jambo">
                <img
                  src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo_green.png"
                  alt="jambo"
                  title="jambo"
                />
              </Link>
            </div>

            <div className="mb-2">
              <h2>
                <p>Forgot Password</p>
              </h2>
            </div>

            <div className="login-form">
              <form method="post" action="/">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="mt-0 mb-4 form-control form-control-lg"
                  value={this.state.loginEmail}
                  onChange={e => this.setState({ loginEmail: e.target.value })}
                />

                <p className="mb-3">
                  <span>Don't remember your email?</span> &nbsp;
                  <a className="small" href="javascript:void(0)">
                    <span>Contact Support</span>
                  </a>
                </p>

                <Button className="btn btn-secondary" onClick={this.handerResetPasswordSubmit}>
                  <span>Reset Password</span>
                </Button>
                {/* <NavLink to={`${this.props.match.url}/reset-password`}>
                  <Button className="btn btn-primary">
                    <span>Reset Password</span>
                  </Button>
                </NavLink> */}
              </form>
            </div>
          </div>
        </div>
        {forgotPasswordAlert}
        {/* <div className="w-100">
          <div className="text-center">0%</div>
          <Progress />
          <div className="text-center mt-4">25%</div>
          <Progress value="25" />
          <div className="text-center mt-4">50%</div>
          <Progress value={50} />
          <div className="text-center mt-4">75%</div>
          <Progress value={75} />
          <div className="text-center mt-4">100%</div>
          <Progress value="100" />
          <div className="text-center mt-4">Multiple bars</div>
          <Progress multi>
            <Progress bar value="15" />
            <Progress bar color="success" value="30" />
            <Progress bar color="info" value="25" />
            <Progress bar color="warning" value="20" />
            <Progress bar color="danger" value="5" />
          </Progress>
        </div> */}
        {/* {loader && (
          <div className="loader-view">
            <CircularProgress />
          </div>
        )} */}
        <ProgressIndicator loader={loader} />
      </div>
    );
  }
}

export default ForgotPassword;
