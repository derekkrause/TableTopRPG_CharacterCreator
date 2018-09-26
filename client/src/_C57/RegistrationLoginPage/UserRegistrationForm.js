import React from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import {
  registerUser,
  registerCoach,
  registerAdvocate,
  registerAthlete,
  userLogin,
  newEmailConfirm
} from "../../services/registerLogin.service";
import { currentUser } from "../../services/currentUser.service";
import { NotificationManager, NotificationContainer } from "react-notifications";
import { validateRegistration } from "./RegValidation";
import SweetAlert from "react-bootstrap-sweetalert";
import "react-notifications/lib/notifications.css";
import "./RegForm.css";
import { getConfigById } from "../../services/config.service";
import { addSubExpirationToUser } from "../Stripe/stripe.server";

class UserRegistrationForm extends React.Component {
  state = {
    //REGISTRATION INPUTS
    firstName: "",
    lastName: "",
    emailInput: "",
    password: "",
    userType: this.props.userType,
    //VALIDATION
    firstValid: null,
    lastValid: null,
    emailValid: null,
    passwordValid: null,
    formValid: false,
    //Other
    loginView: false,
    regSuccess: false,
    width: window.innerWidth,
    regFail: false,
    emailUsed: false,
    errorMessage: ""
  };

  updateWindowSize = () => {
    this.setState({ width: window.innerWidth });
    if (this.state.width >= 768) {
      this.setState({ loginView: false });
    }
  };

  componentDidMount = () => {
    this.updateWindowSize();
    window.addEventListener("resize", this.updateWindowSize);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateWindowSize);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value }, this.validation);
  };

  toggle = e => {
    e.preventDefault();
    this.setState({ loginView: !this.state.loginView });
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
          .catch(error => console.log("ATHLETE REG", error));
        break;
      case "Coach":
        registerCoach(userId)
          .then(result => {
            console.log("COACH REGISTERED", result);
          })
          .catch(error => console.log("COACH REG", error));
        break;
      case "Advocate":
        registerAdvocate(userId)
          .then(result => {
            console.log("ADVOCATE REGISTERED", result);
          })
          .catch(error => console.log("ADVOCATE REG", error));
        break;
      case "Coach4Hire":
        //axios call registerCoach(userId) <--uncomment after Coach4Hire CRUD is created
        break;
      default:
        alert("Invalid Choice");
    }
  };

  signin = e => {
    e.preventDefault();
    userLogin(this.state.emailInput, this.state.password)
      .then(result => {
        console.log("LogIn Success", result);
        currentUser();
      })
      .catch(error => {
        console.log("LogIn Fail", error);
        NotificationManager.error("Check email and password and try again.", "Invalid Login", 5000);
      });
  };

  sendNewConfirmation = () => {
    if (this.state.formValid) {
      const data = { Email: this.state.emailInput };
      newEmailConfirm(data)
        .then(result => {
          console.log("Confirmation Email", result);
          this.setState(
            { regFail: false, emailUsed: false },
            NotificationManager.success(`A confirmation email has been sent to ${this.state.emailInput}.`, "Done", 4000)
          );
        })
        .catch(error => console.log("Confirmation Email", error));
    }
  };

  signUp = e => {
    let userId = 0;
    e.preventDefault();
    if (this.state.formValid) {
      const userData = {
        firstName: this.state.firstName,
        // middleName: this.state.middleName,
        lastName: this.state.lastName,
        email: this.state.emailInput,
        passwordHash: this.state.password
        // gender: this.state.genderSelect,
        // avatarUrl: this.state.avatarUrl
      };
      registerUser(userData)
        .then(result => {
          console.log("Registration", result);
          this.registerUserType(this.state.userType, result.data.item);
          this.setState({ regSuccess: true });

          userId = result.data.item;
        })
        .then(() => {
          getConfigById(55).then(res => {
            console.log(res.data.item.Value, "55 results");
            if (res.data.item.Value == "true" || res.data.item.Value == "True") {
              console.log(res.data.item.Value, "wut");
              getConfigById(54).then(res => {
                const freeTrialPeriod = parseInt(res.data.item.Value);
                const oneDayInMilliseconds = 1000 * 60 * 60 * 24;
                const setTrialPeriod = freeTrialPeriod * oneDayInMilliseconds;
                const date = new Date();
                const midnight = date.setHours(24, 0, 0, 0);
                //  console.log(midnight);
                const trialEnds = midnight + setTrialPeriod;
                console.log(trialEnds);
                const newDate = new Date(trialEnds)
                  .toISOString()
                  .slice(0, 19)
                  .replace("T", " ");

                const payload = {
                  subExpiration: newDate
                };
                //  console.log(newDate, "newDate");
                addSubExpirationToUser(userId, payload).then(res => {
                  //  console.log(res, "addsub expiration");
                });
              });
            } else {
              console.log(res.data.item.Value, "wut1");
            }
          });
        })
        .catch(error => {
          error.response.status && error.response.status === 409
            ? this.setState({ errorMessage: error.response.data.message, emailUsed: true, valid: false })
            : this.setState({ regFail: true, valid: false });
        });
    } else undefined;
  };

  render() {
    const {
      emailInput,
      emailUsed,
      emailValid,
      errorMessage,
      firstName,
      firstValid,
      formValid,
      lastName,
      lastValid,
      loginView,
      password,
      passwordValid,
      regFail,
      regSuccess,
      userType
    } = this.state;

    return (
      <div className="login-container d-flex animated slideInUpTiny animation-duration-3">
        <NotificationContainer />
        <div className="login-content">
          <div className="login-header text-center">
            <a className="app-logo" title="RecruitHub" href="#" id="regFormRef">
              <img
                src="https://sabio-training.s3.us-west-2.amazonaws.com/C57/RS_logo_green.png"
                alt="RecruitHub"
                title="RecruitHub"
              />
            </a>
          </div>
          <h1 className="my-2 text-center">{loginView ? "Log in" : "Create an Account"}</h1>
          <div className="d-block d-md-none">
            <h5 className="text-center d-md-hidden">
              {loginView ? "Not a user? " : "Already a user? "}
              <a href="#" onClick={this.toggle}>
                {loginView ? "Register" : "Login"}
              </a>
            </h5>
          </div>
          <div className="login-form">
            <SweetAlert
              success
              show={regSuccess}
              title={`Welcome ${firstName}!`}
              closeOnEsc={false}
              closeOnClickOutside={true}
              onConfirm={() => {
                this.setState({ regSuccess: false });
                currentUser();
              }}
              onClose={() => this.setState({ regSuccess: false })}
            >
              Almost complete! A Confirmation link has been sent to {emailInput}. Once confirmed, you'll be ready to get
              started!
            </SweetAlert>
            <SweetAlert
              info
              showCancel
              confirmBtnText="Login"
              cancelBtnText="Email New Confirmation"
              cancelBtnBsStyle="info"
              show={emailUsed}
              title="Oops!"
              timer={2500}
              onConfirm={() => this.setState({ regFail: false, emailUsed: false })}
              onCancel={() => {
                this.sendNewConfirmation(), this.setState({ regFail: false });
              }}
            >
              "Looks like you've already registered. Try logging in, or request a new account confirmation email."
            </SweetAlert>
            <SweetAlert
              error
              show={regFail}
              title="Oops!"
              timer={2500}
              onConfirm={() => this.setState({ regFail: false })}
            >
              Something went wrong. Please verify your information and try again.
            </SweetAlert>
            <Form className="row pb-0" autoComplete="on" onSubmit={this.signUp}>
              <FormGroup className="col-12" hidden={loginView}>
                <Label for="firstName">First Name</Label>
                <Input
                  name="firstName"
                  id="firstName"
                  className="form-control"
                  type="text"
                  placeholder="First"
                  onChange={this.onChange}
                  valid={firstName.length > 0 && firstValid}
                  invalid={firstName.length > 0 && !firstValid ? true : undefined}
                  required
                />
                <FormFeedback>Please enter at least 2 letters.</FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12" hidden={loginView}>
                <Label for="lastName">Last Name</Label>
                <Input
                  name="lastName"
                  id="lastName"
                  className="form-control"
                  type="text"
                  placeholder="Last"
                  onChange={this.onChange}
                  valid={lastName.length > 0 && lastValid}
                  invalid={lastName.length > 0 && !lastValid ? true : undefined}
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
                  valid={emailInput.length > 0 && emailValid}
                  invalid={emailInput.length > 0 && !emailValid ? true : undefined}
                  required
                />
                <FormFeedback>Enter Valid Email Address</FormFeedback>
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
                  valid={password.length > 0 && passwordValid}
                  invalid={password.length > 0 && !passwordValid ? true : undefined}
                  required
                />
                <FormFeedback>
                  Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character.
                </FormFeedback>
                <FormFeedback valid>Looks good!</FormFeedback>
              </FormGroup>
              <FormGroup className="col-12" hidden={loginView}>
                <Label htmlFor="userTypeGroup">Select User Type</Label>
                <div
                  className="d-flex flex-wrap form-group justify-content-between"
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
                      defaultChecked={userType == "Athlete" ? true : false}
                    />
                    <Label className="custom-control-label" active="true" htmlFor="athleteRadio">
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
                      defaultChecked={userType == "Coach" ? true : false}
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
                      defaultChecked={userType == "Advocate" ? true : false}
                    />
                    <Label className="custom-control-label" htmlFor="advocateRadio">
                      Advocate
                    </Label>
                  </div>
                  <div className="custom-control custom-radio my-1 mx-auto col-5 pr-0">
                    <input
                      type="radio"
                      name="userType"
                      className="custom-control-input"
                      value="Coach4Hire"
                      id="coach4hireRadio"
                      disabled
                    />
                    <Label className="custom-control-label" htmlFor="coach4hireRadio">
                      Trainer <span className="badge badge-info badge-pill">Soon</span>
                    </Label>
                  </div>
                </div>
              </FormGroup>
            </Form>
          </div>
          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              onClick={loginView ? this.signin : this.signUp}
              className="btn btn-primary py-2 my-2"
              disabled={!formValid && !loginView}
            >
              {loginView ? "Sign-in" : "Sign-up"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
