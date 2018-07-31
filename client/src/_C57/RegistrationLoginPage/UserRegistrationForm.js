import React from "react";
import { Button, Form, FormFeedback, FormGroup, Input, InputGroup, Label } from "reactstrap";
import { registerUser, registerCoach, registerAthlete } from "../../services/registerLogin.service";
import { validateRegistration } from "./RegValidation";
import "./RegForm.css";

class UserRegistrationForm extends React.Component {
  state = {
    //REGISTRATION INPUTS
    firstName: "",
    middleName: "",
    lastName: "",
    emailInput: "",
    password: "",
    genderSelect: null,
    userType: "",
    avatarUrl: "",
    //VALIDATION
    firstValid: null,
    lastValid: null,
    emailValid: null,
    passwordValid: null,
    formValid: false
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
          .then(result => console.log("ATHLETE REGISTERED", result))
          .catch(error => console.log("ATHLETE REG ERROR", error));
        break;
      case "Recruiter":
        registerCoach(userId)
          .then(result => console.log("RECRUITER REGISTERED", result))
          .catch(error => console.log("RECRUITER REG ERROR", error));
        break;
      case "Advocate":
        //axios call registerAdvocate(userId)
        break;
      case "Coach4Hire":
        //axios call registerCoach(userId)
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
        })
        .catch(response => {
          console.log("Registration Error", response);
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
          <h2 className="my-2 text-center">Create an Account</h2>
          <div className="login-form">
            <Form className="row pb-0" autoComplete="on">
              <FormGroup>
                <InputGroup className="col-12 my-1">
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
                  <Input
                    name="middleName"
                    id="middleName"
                    className="form-control"
                    type="text"
                    placeholder="Middle"
                    onChange={this.onChange}
                  />
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
                </InputGroup>
                <InputGroup className="col-12 my-1">
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
                </InputGroup>
                <div className="col-12 my-2 mx-auto">
                  <Label htmlFor="genderSelect">Gender</Label>
                  <div
                    className="d-flex flex-wrap form-group m-0"
                    name="genderSelect"
                    onChange={this.onChange}
                    id="genderSelect">
                    <div className="custom-control custom-radio mr-4 mx-auto">
                      <Input
                        type="radio"
                        name="genderSelect"
                        value={1}
                        id="maleRadio"
                        className="custom-control-input"
                      />
                      <Label className="custom-control-label" htmlFor="maleRadio">
                        Male
                      </Label>
                    </div>
                    <div className="custom-control custom-radio mr-4 mx-auto">
                      <Input
                        type="radio"
                        name="genderSelect"
                        value={0}
                        id="femaleRadio"
                        className="custom-control-input"
                      />
                      <Label className="custom-control-label" htmlFor="femaleRadio">
                        Female
                      </Label>
                    </div>
                    <div className="custom-control custom-radio mr-4 mx-auto">
                      <Input
                        type="radio"
                        name="genderSelect"
                        value={undefined}
                        id="otherRadio"
                        className="custom-control-input"
                      />
                      <Label className="custom-control-label" htmlFor="otherRadio">
                        Other/Decline
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="col-12 mt-2">
                  <Label htmlFor="userTypeGroup">Select User Type</Label>
                  <div
                    className="d-flex flex-wrap form-group justify-content-center mx-auto"
                    name="userTypeGroup"
                    onChange={this.onChange}
                    id="userTypeGroup">
                    <div className="custom-control custom-radio my-1 mx-auto col-5">
                      <input
                        type="radio"
                        name="userType"
                        className="custom-control-input"
                        value="Athlete"
                        id="athleteRadio"
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
                        value="Recruiter"
                        id="recruiterRadio"
                      />
                      <Label className="custom-control-label" htmlFor="recruiterRadio">
                        Recruiter
                      </Label>
                    </div>
                    <div className="custom-control custom-radio my-1 mx-auto col-5">
                      <input
                        type="radio"
                        name="userType"
                        className="custom-control-input"
                        value="Advocate"
                        id="advocateRadio"
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
                </div>
              </FormGroup>
            </Form>
          </div>
          <div className="d-flex justify-content-center">
            <Button onClick={this.signUp} className="btn btn-primary py-2 my-2" disabled={!this.state.formValid}>
              Sign-up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
