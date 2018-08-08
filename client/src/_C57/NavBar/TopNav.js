import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import { Button, Popover, PopoverBody } from "reactstrap";
import { NotificationManager, NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";

class TopNav extends React.Component {
  // registerRef = React.createRef();

  state = {
    isOpen: false
  };

  createNotification = type => {
    return () => {
      switch (type) {
        case "info":
          NotificationManager.info("Info message");
          break;
        case "success":
          NotificationManager.success("Welcome back.", "Login Success!");
          break;
        case "warning":
          NotificationManager.warning("Warning message", "Close after 3000ms", 3000);
          break;
        case "error":
          NotificationManager.error("Check email and password and try again.", "Invalid Login", 5000);
          break;
      }
    };
  };

  popdown = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  // scrollToRegForm = () => {
  //   this.registerRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  // };

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
              <UserLogin
                loginChange={this.loginChange}
                loginSuccess={this.createNotification("success")}
                loginFail={this.createNotification("error")}
              />
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
