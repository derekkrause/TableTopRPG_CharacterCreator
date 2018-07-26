import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import NavBar from "_C57/NavBar/NavBar";
import { Button, Popover, PopoverBody } from "reactstrap";

class TopNav extends React.Component {
  state = {
    loggedIn: false,
    isOpen: false
  };

  loginChange = () => {
    this.setState({ loggedIn: true });
  };

  popdown = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
        {this.state.loggedIn ? (
          <NavBar />
        ) : (
          <div className="app-main-header appNav">
            <div className="app-toolbar d-flex justify-content-between align-items-center mx-md-3 m-0">
              <h4 className="mb-0 mr-auto">Recruit Hub</h4>
              <UserLogin loginChange={this.loginChange} className="mx-auto" />
              <Button className="btn btn-link mb-0 ml-auto border-0" id="loginHelpPopover" onClick={this.popdown}>
                Login Help
              </Button>
              <Popover placement="bottom" isOpen={this.state.isOpen} target={"loginHelpPopover"} toggle={this.toggle}>
                <PopoverBody innerClassName="d-flex flex-wrap justify-content-center">
                  <Button className="btn btn-link no-border">Forgot Username</Button>
                  <Button className="btn btn-link no-border">Forgot Password</Button>
                </PopoverBody>
              </Popover>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopNav;
