import React from "react";
import { Button, Form, Input, InputGroupAddon, InputGroup } from "reactstrap";
import { userLogin } from "../../services/registerLogin.service";

class UserLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      });
  };

  render() {
    return (
      <div>
        <Form inline>
          <InputGroup size="sm">
            <Input type="email" onChange={this.onChange} name="email" placeholder="Email" autoComplete="on" />
            <Input type="password" onChange={this.onChange} name="password" placeholder="Password" autoComplete="on" />
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
