import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
<<<<<<< HEAD
import NavBar from "_C57/NavBar/NavBar";
=======
>>>>>>> origin/master
import { Button, Popover, PopoverBody } from "reactstrap";

class TopNav extends React.Component {
  state = {
<<<<<<< HEAD
    loggedIn: false,
    isOpen: false
  };

  loginChange = () => {
    this.setState({ loggedIn: true });
  };
=======
    // loggedIn: false,
    isOpen: false
  };

  // loginChange = () => {
  //   this.setState({ loggedIn: true });
  // };
>>>>>>> origin/master

  popdown = e => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div>
<<<<<<< HEAD
        {this.state.loggedIn ? (
          <NavBar />
        ) : (
          <div className="app-main-header appNav">
            <div className="app-toolbar d-flex justify-content-between align-items-center mx-md-3 m-0">
              <h4 className="mb-0 mr-auto">Hub Scout</h4>
              <UserLogin loginChange={this.loginChange} className="mx-auto" />
              <Button className="btn btn-link mb-0 ml-auto border-0" id="loginHelpPopover" onClick={this.popdown}>
                Login Help
              </Button>
              <Popover
                style={{ width: "120px" }}
                placement="bottom"
                isOpen={this.state.isOpen}
                target={"loginHelpPopover"}
                toggle={this.toggle}>
                <PopoverBody className="d-flex flex-wrap justify-content-center p-1">
                  <Button className="btn m-auto px-1 pb-1" color="link">
                    Forgot Username
                  </Button>
                  <Button className="btn  m-auto px-1" color="link">
                    Forgot Password
                  </Button>
                </PopoverBody>
              </Popover>
            </div>
=======
        <div className="app-main-header appNav">
          <div className="app-toolbar d-flex justify-content-between align-items-center mx-md-3 m-0">
            <h4 className="mb-0 mr-auto">Hub Scout</h4>
            <UserLogin loginChange={this.loginChange} className="mx-auto" />
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
                <Button className="btn  m-auto px-1" color="link">
                  Forgot Password
                </Button>
              </PopoverBody>
            </Popover>
>>>>>>> origin/master
          </div>
        </div>
      </div>
    );
  }
}

export default TopNav;
