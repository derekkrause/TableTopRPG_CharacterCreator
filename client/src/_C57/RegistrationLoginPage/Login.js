import React from "react";
import { Button, Form, FormFeedback, Input, InputGroupAddon, InputGroup } from "reactstrap";
import { userLogin } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import "./RegForm.css";

class UserLogin extends React.Component {
  state = {
    email: "",
    password: "",
    waiting: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.setState({ invalidLogin: false }));
  };

  login = e => {
    e.preventDefault();
    this.setState({ waiting: true });
    userLogin(this.state.email, this.state.password)
      .then(result => {
        console.log("LogIn Success", result);
        this.setState({ waiting: false });
        currentUser();
        this.props.loginSuccess();
      })
      .catch(error => {
        console.log("LogIn Fail", error);
        error.response.status === 403 ? this.props.loginFail(this.state.email) : this.props.loginFail();
      });
  };

  render() {
    return (
      <div>
        <Form inline onSubmit={e => this.login(e)} autoComplete="on">
          <Input type="email" onChange={this.onChange} name="email" placeholder="Email" className="border-0 mr-2" />
          <Input
            type="password"
            onChange={this.onChange}
            name="password"
            placeholder="Password"
            className="border-0 mr-2"
          />
          <InputGroupAddon addonType="append">
            <Button className="btn-sign-in" color="primary" type="submit">
              Sign-In
            </Button>
          </InputGroupAddon>
        </Form>
      </div>
    );
  }
}

export default UserLogin;
