import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import NavBar from "_C57/NavBar/NavBar";
import { Button } from "reactstrap";

class TopNav extends React.Component {
  state = {
    loggedIn: false
  };

  loginChange = () => {
    this.setState({ loggedIn: true });
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
              <Button className="btn btn-link mb-0 ml-auto border-0">Login Help</Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopNav;
