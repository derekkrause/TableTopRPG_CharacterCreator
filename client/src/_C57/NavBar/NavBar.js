import React from "react";
import { Button, Form, Input, InputGroupAddon, InputGroup } from "reactstrap";

class NavBar extends React.Component {
  state = {};

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="d-flex app-toolbar align-items-center">
        <nav className="navbar bg-primary">h</nav>
      </div>
    );
  }
}

export default NavBar;
