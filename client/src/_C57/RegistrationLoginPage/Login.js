import React from "react";
import { Button, Form, FormFeedback, Input, InputGroupAddon, InputGroup } from "reactstrap";
import { userLogin } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";

class UserLogin extends React.Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.setState({ invalidLogin: false }));
  };

  login = e => {
    e.preventDefault();
    userLogin(this.state.email, this.state.password)
      .then(result => {
        console.log("LogIn Success", result);
        currentUser();
        this.props.loginSuccess;
      })
      .catch(error => {
        console.log("LogIn Fail", error);
        this.props.loginFail;
      });
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => this.login(e)} autoComplete="on">
          <InputGroup size="sm">
            <Input type="email" onChange={this.onChange} name="email" placeholder="Email" />
            <Input type="password" onChange={this.onChange} name="password" placeholder="Password" />
            <InputGroupAddon addonType="append">
              <Button className="rounded-right" color="primary" type="submit">
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
