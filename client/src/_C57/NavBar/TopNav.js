import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import { Button, Popover, PopoverBody } from "reactstrap";
import { newEmailConfirm } from "../../services/registerLogin.service";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

class TopNav extends React.Component {
  state = {
    isOpen: false
  };

  loginSuccess = () => NotificationManager.success("Welcome back!", "Login Success", 2000);
  loginFail = email => {
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
            <h4 className="mb-0 mr-auto">Hub Scout</h4>
            <a href="#" className="mb-0 ml-auto d-md-none" onClick={this.scrollToRegForm}>
              Login/Register
            </a>
            <div className="d-none d-md-block mx-auto">
              <UserLogin loginSuccess={this.loginSuccess} loginFail={email => this.loginFail(email)} />
            </div>
            <div className="d-none d-md-block mx-auto">
              <Button className="btn btn-link mb-0 ml-auto border-0" id="loginHelpPopover" onClick={this.popdown}>
                Login Help
              </Button>
              <Popover
                style={{ width: "120px" }}
                placement="bottom"
                isOpen={this.state.isOpen}
                target={"loginHelpPopover"}
                toggle={this.toggle}
              >
                <PopoverBody className="d-flex flex-wrap justify-content-center p-1">
                  <Button className="btn m-auto px-1 pb-1" color="link">
                    Forgot Username
                  </Button>
                  <Button className="btn m-auto px-1" color="link">
                    Forgot Password
                  </Button>
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
