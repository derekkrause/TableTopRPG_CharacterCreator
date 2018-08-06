import React from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { registerUser, registerCoach, registerAthlete } from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import { validateRegistration } from "./RegValidation";
import SweetAlert from "react-bootstrap-sweetalert";
import "./RegForm.css";

class UserRegistrationForm extends React.Component {
  state = {
    //REGISTRATION INPUTS
    firstName: "",
    middleName: "",
    lastName: "",
    emailInput: "",
    password: "",
    userType: "",
    avatarUrl: "",
    //VALIDATION
    firstValid: null,
    lastValid: null,
    emailValid: null,
    passwordValid: null,
    formValid: false,
    //Other
    regSuccess: false,
    regFail: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validation);
  };

  validation = () => {
    const result = validateRegistration(this.state);
    this.setState({
      firstValid: result.firstValid,
      lastValid: result.lastValid,
      emailValid: result.emailValid,
      passwordValid: result.passwordValid,
      formValid: result.formValid
    });
  };

  registerUserType = (userType, userId) => {
    switch (userType) {
      case "Athlete":
        registerAthlete(userId)
          .then(result => {
            console.log("ATHLETE REGISTERED", result);
          })
          .catch(error => console.log("ATHLETE REG ERROR", error));
        break;
      case "Coach":
        registerCoach(userId)
          .then(result => {
            console.log("COACH REGISTERED", result);
          })
          .catch(error => console.log("COACH REG ERROR", error));
        break;
      case "Advocate":
        //axios call registerAdvocate(userId) <--uncomment after Advocate CRUD is created
        break;
      case "Coach4Hire":
        //axios call registerCoach(userId) <--uncomment after Coach4Hire CRUD is created
        break;
      default:
        alert("Invalid Choice");
    }
  };

  signUp = e => {
    e.preventDefault();
    if (this.state.formValid) {
      const userData = {
        firstName: this.state.firstName,
        middleName: this.state.middleName,
        lastName: this.state.lastName,
        email: this.state.emailInput,
        passwordHash: this.state.password,
        gender: this.state.genderSelect,
        avatarUrl: this.state.avatarUrl
      };
      registerUser(userData)
        .then(result => {
          console.log("Registration Successful", result);
          this.registerUserType(this.state.userType, result.data.item);
          this.setState({ regSuccess: true });
        })
        .catch(response => {
          console.log("Registration Error", response);
          this.setState({ regFail: true });
          this.setState({ valid: false });
        });
    } else undefined;
  };

  render() {
    return (
      <div className="login-container d-flex animated slideInUpTiny animation-duration-3">
        <div className="login-content">
          <div className="login-header text-center">
            <a className="app-logo" title="RecruitHub" href="#">
              <img
                src="http://warriordesign.net/asr/wp-content/uploads/2016/07/as.png"
                alt="RecruitHub"
                title="RecruitHub"
              />
            </a>
          </div>
          <h1 className="my-2 text-center">Create an Account</h1>
          <div className="login-form">
            <SweetAlert
              success
              show={this.state.regSuccess}
              title="Welcome!"
              closeOnEsc={false}
              closeOnClickOutside={true}
              onConfirm={() => {
                this.setState({ regSuccess: false });
                currentUser();
              }}
              onClose={() => this.setState({ regSuccess: false })}
            >
              Registration Success
            </SweetAlert>
            <SweetAlert
              error
              show={this.state.regFail}
              title="Oops!"
              timer={2500}
              onConfirm={() => this.setState({ regFail: false })}
            >
              Ensure all fields are filled out correctly and try again.
            </SweetAlert>
            <Form className="row pb-0" autoComplete="on" onSubmit={this.signUp}>
              <FormGroup className="col-12">
                <Label for="firstName">First Name</Label>
                <Input
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  type="text"
                  placeholder="First"
                  onChange={this.onChange}
                  valid={this.state.firstName.length > 0 && this.state.firstValid}
                  invalid={this.state.firstName.length > 0 && !this.state.firstValid ? true : undefined}
                  required
                />
                <FormFeedback>Please enter at least 2 letters.</FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12">
                <Label for="lastName">Last Name</Label>
                <Input
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  type="text"
                  placeholder="Last"
                  onChange={this.onChange}
                  valid={this.state.lastName.length > 0 && this.state.lastValid}
                  invalid={this.state.lastName.length > 0 && !this.state.lastValid ? true : undefined}
                  required
                />
                <FormFeedback>Please enter at least 2 letters.</FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12">
                <Label for="emailInput">Email</Label>
                <Input
                  name="emailInput"
                  id="emailInput"
                  className="form-control"
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.onChange}
                  valid={this.state.emailInput.length > 0 && this.state.emailValid}
                  invalid={this.state.emailInput.length > 0 && !this.state.emailValid ? true : undefined}
                  required
                />
                <FormFeedback>Invalid Email Address</FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12">
                <Label for="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="********"
                  onChange={this.onChange}
                  valid={this.state.password.length > 0 && this.state.passwordValid}
                  invalid={this.state.password.length > 0 && !this.state.passwordValid ? true : undefined}
                  required
                />
                <FormFeedback>
                  Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character.
                </FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12">
                <Label htmlFor="userTypeGroup">Select User Type</Label>
                <div
                  className="d-flex flex-wrap form-group justify-content-center mx-auto"
                  name="userTypeGroup"
                  onChange={this.onChange}
                  id="userTypeGroup"
                >
                  <div className="custom-control custom-radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Athlete"
                      id="athleteRadio"
                      checked={this.state.userType == "Athlete" || this.props.userType == "Athlete" ? true : false}
                    />
                    <Label className="custom-control-label" htmlFor="athleteRadio">
                      Athlete
                    </Label>
                  </div>
                  <div className="custom-control custom-radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Coach"
                      id="coachRadio"
                      checked={this.state.userType == "Coach" || this.props.userType == "Coach" ? true : false}
                    />
                    <Label className="custom-control-label" htmlFor="coachRadio">
                      Coach
                    </Label>
                  </div>
                  <div className="custom-control custom-radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Advocate"
                      id="advocateRadio"
                      // checked={this.state.userType == "Advocate" || this.props.userType == "Advocate" ? true : false}
                      disabled
                    />
                    <Label className="custom-control-label" htmlFor="advocateRadio">
                      Advocate
                    </Label>
                  </div>
                  <div className="custom-control custom-radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Coach4Hire"
                      id="coach4hireRadio"
                      disabled
                    />
                    <Label className="custom-control-label" htmlFor="coach4hireRadio">
                      Coach4Hire
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Form>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              onClick={this.signUp}
              className="btn btn-primary py-2 my-2"
              disabled={!this.state.formValid}
            >
              Sign-up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
