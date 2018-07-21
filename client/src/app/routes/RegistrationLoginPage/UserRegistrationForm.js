import React from "react";
import { Button, Form, Input, Label } from "reactstrap";
import { registerUser, registerCoach } from "./UserAxios.js";

class UserRegistrationForm extends React.Component {
  state = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailInput: "",
    password: "",
    passwordConfirm: "",
    genderSelect: null,
    userType: "",
    avatarUrl: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  registerUserType = (userType, userId) => {
    debugger;
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
      <div className="container justify-contents-center p-0">
        <div className="card col-lg-6 col-md-8 col-xs-10 p-0 m-0">
          <div className="card-header bg-success">
            <div className="card-heading text-white">Register New User</div>
          </div>
          <div className="stack-order py-2 px-3">
            <Form className="row pb-0" autoComplete="on">
              <div className="col-12 mt-2">
                <Label htmlFor="firstName">First</Label>
                <Input
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="middleName">Middle</Label>
                <Input
                  name="middleName"
                  id="middleName"
                  className="form-control"
                  type="text"
                  placeholder="Middle Name"
                  onChange={this.onChange}
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="lastName">Last</Label>
                <Input
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  type="text"
                  placeholder="Last Name"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="emailInput">Email address</Label>
                <Input
                  name="emailInput"
                  id="emailInput"
                  className="form-control"
                  type="email"
                  placeholder="name@example.com"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="********"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  className="form-control"
                  type="password"
                  placeholder="********"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="col-12 mt-2">
                <Label htmlFor="genderSelect">Gender</Label>
                <div
                  className="d-flex flex-wrap form-group m-0"
                  name="genderSelect"
                  onChange={this.onChange}
                  id="genderSelect">
                  <div className="custom-control custom-radio mr-4">
                    <Input type="radio" name="genderSelect" value={1} id="maleRadio" className="custom-control-input" />
                    <Label className="custom-control-label" htmlFor="maleRadio">
                      Male
                    </Label>
                  </div>
                  <div className="custom-control custom-radio mr-4">
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
                  <div className="custom-control custom-radio mr-4">
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
                  className="d-flex flex-wrap form-group m-0"
                  name="userTypeGroup"
                  onChange={this.onChange}
                  id="userTypeGroup">
                  <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
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
                  <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
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
                  <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
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
                  <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
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
              <div className="col-12 mt-2">
                <Button color="success" onClick={this.signUp} className="btn form-control py-2 my-2">
                  Sign-up
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
