import React from "react";
import { Button, Form, FormFeedback, Input, InputGroupAddon, InputGroup } from "reactstrap";
import { userLogin } from "../../services/registerLogin.service";

class UserLogin extends React.Component {
  state = {
    email: "",
    password: "",
    invalidLogin: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.setState({ invalidLogin: false }));
  };

  login = e => {
    e.preventDefault();
    userLogin(this.state.email, this.state.password)
      .then(result => {
        console.log("LogIn Success", result);
        this.props.loginChange();
      })
      .catch(error => {
        console.log("LogIn Fail", error);
        this.setState({ invalidLogin: true });
      });
  };

  render() {
    return (
      <div>
        <Form inline>
          <InputGroup size="sm">
            <Input
              type="email"
              onChange={this.onChange}
              name="email"
              placeholder="Email"
              autoComplete="on"
              invalid={this.state.invalidLogin}
            />
            <Input
              type="password"
              onChange={this.onChange}
              name="password"
              placeholder="Password"
              autoComplete="on"
              invalid={this.state.invalidLogin}
            />
            <FormFeedback tooltip>Email or Password Invalid</FormFeedback>
            <InputGroupAddon addonType="append">
              <Button color="primary" onClick={this.login}>
                Sign-In
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default UserLogin;
