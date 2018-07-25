import React from "react";
import UserLogin from "_C57/RegistrationLoginPage/Login.js";
import NavBar from "_C57/NavBar/NavBar";

class TopNav extends React.Component {
  state = {
    loggedIn: true
  };

  render() {
    return (
      <div>
        {!this.state.loggedIn ? (
          <NavBar />
        ) : (
          <div className="d-flex app-toolbar align-items-center justify-content-center">
            <UserLogin />
          </div>
        )}
      </div>
    );
  }
}

export default TopNav;
