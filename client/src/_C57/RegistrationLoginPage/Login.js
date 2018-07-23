import React from "react";
import { Button, Form, Input, InputGroupAddon, InputGroup } from "reactstrap";

class UserLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Form inline>
          <InputGroup size="sm">
            <Input type="email" name="email" placeholder="Email" autoComplete="on" />
            <Input type="password" name="password" placeholder="Password" autoComplete="on" />
            <InputGroupAddon addonType="append">
              <Button color="primary">Sign-In</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default UserLogin;
