import React from "react";
import { Button, Form, Input, InputGroup, Label } from "reactstrap";
import { registerUser, registerCoach } from "../../services/registerLogin.service";

class UserRegistrationForm extends React.Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailInput: "",
    password: "",
    genderSelect: null,
    userType: "",
    avatarUrl: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUserType = (userType, userId) => {
    switch (userType) {
      case "Athlete":
        //axios call registerAthlete(userId)
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
      .catch(error => console.log("Registration Error", error));
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
              <InputGroup className="col-12 my-1">
                <Input
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  type="text"
                  placeholder="First"
                  onChange={this.onChange}
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
                  required
                />
                <Input
                  name="password"
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="********"
                  onChange={this.onChange}
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
                    <Input type="radio" name="genderSelect" value={1} id="maleRadio" className="custom-control-input" />
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
                  <div className="custom-control custom-Radio my-1 mx-auto col-5">
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
                  <div className="custom-control custom-Radio my-1 mx-auto col-5">
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
                  <div className="custom-control custom-Radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Advocate"
                      id="advocateRadio"
                    />
                    <Label className="custom-control-label" htmlFor="advocateRadio">
                      Advocate
                    </Label>
                  </div>
                  <div className="custom-control custom-Radio my-1 mx-auto col-5">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Coach4Hire"
                      id="coach4hireRadio"
                    />
                    <Label className="custom-control-label" htmlFor="coach4hireRadio">
                      Coach4Hire
                    </Label>
                  </div>
                </div>
              </div>
            </Form>
          </div>
          <div className="d-flex justify-content-center">
            <Button onClick={this.signUp} className="btn btn-primary py-2 my-2">
              Sign-up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
