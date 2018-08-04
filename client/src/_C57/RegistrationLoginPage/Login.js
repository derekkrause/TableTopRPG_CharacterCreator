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
        <Form inline onSubmit={e => this.login(e)} autoComplete="on">
          <InputGroup size="sm">
            <Input
              type="email"
              onChange={this.onChange}
              name="email"
              placeholder="Email"
              invalid={this.state.invalidLogin ? true : undefined}
            />
            <Input
              type="password"
              onChange={this.onChange}
              name="password"
              placeholder="Password"
              invalid={this.state.invalidLogin ? true : undefined}
            />
            <InputGroupAddon addonType="append">
              <Button className="rounded-right" color="primary" type="submit">
                Sign-In
              </Button>
            </InputGroupAddon>
            <FormFeedback>Email or Password Invalid</FormFeedback>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

export default UserLogin;
