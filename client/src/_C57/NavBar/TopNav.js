import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import { Button, Popover, PopoverBody } from "reactstrap";
import { newEmailConfirm } from "../../services/registerLogin.service";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

import { Link } from "react-router-dom"; // Added by RR

class TopNav extends React.Component {
  state = {
    isOpen: false
  };

  loginSuccess = () => NotificationManager.success("Welcome back!", "Login Success", 2000);

  loginFail = email => {
    if (email) {
      const data = { Email: email };
      NotificationManager.warning(
        "Click on this notification to request a new confirmation email.",
        "Account Unconfirmed",
        15000,
        () =>
          newEmailConfirm(data).then(
            NotificationManager.success(`A confirmation email has been sent to ${email}.`, "Done", 4000)
          )
      );
    } else {
      NotificationManager.error(
        "Incorrect Email or Password. Please verify your information and try again.",
        "Error",
        4000
      );
    }
  };

  popdown = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        <NotificationContainer />
        <div className="app-main-header appNav">
          <div className="app-toolbar d-flex justify-content-center justify-content-md-between align-items-center mx-md-3 m-0">
            <div className="mx-0 mx-md-auto">
              <Link to={`${this.props.match.url}/welcome`}>
                <picture>
                  <source
                    media="(min-width: 80px)"
                    srcSet="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo.png, https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo@2x.png 2x"
                  />
                  <img
                    src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo.png"
                    srcSet="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo@2x.png 2x"
                    alt="..."
                    // className="img-fluid"
                  />
                </picture>
              </Link>
            </div>
            <a href="#" className="mb-0 ml-auto d-md-none text-white" onClick={this.scrollToRegForm}>
              Login/Register
            </a>
            <div className="d-none d-md-block">
              <UserLogin loginSuccess={this.loginSuccess} loginFail={email => this.loginFail(email)} />
            </div>
            <div className="d-none d-md-block mx-auto">
              <Button
                className="btn btn-link mb-0 ml-auto border-0 text-white"
                id="loginHelpPopover"
                onClick={this.popdown}
              >
                Login Help
              </Button>
              <Popover
                style={{ width: "120px" }}
                placement="bottom"
                isOpen={this.state.isOpen}
                target={"loginHelpPopover"}
                toggle={this.toggle}
                className="border-0 p-2"
              >
                <PopoverBody className="d-flex flex-wrap justify-content-center p-1">
                  <Button className="btn m-auto px-1 pb-2 color-gray " color="link" onClick={this.popdown}>
                    Forgot Username
                  </Button>
                  {/* Modified by RR */}
                  <Link
                    className="btn m-auto px-1 color-gray"
                    color="link"
                    to="/app/forgot-password"
                    onClick={this.popdown}
                  >
                    <span>Forgot Password</span>
                  </Link>
                </PopoverBody>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
