import React from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

class UserRegistrationForm extends React.Component {
  render() {
    return (
      <div className="container justify-contents-center">
        <div className="col-lg-8">
          <div className="card p-0">
            <div className="card-header bg-primary">
              <div className="card-heading text-white">Register New User</div>
            </div>
            <div className="stack-order py-2 px-3">
              <form className="row pb-0" validate autoComplete="on">
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="firstName">First</label>
                  <input
                    name="firstName"
                    id="firstName"
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="middleName">Middle</label>
                  <input
                    name="middleName"
                    id="middleName"
                    className="form-control"
                    type="text"
                    placeholder="Middle Name"
                  />
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="lastName">Last</label>
                  <input
                    name="lastName"
                    id="lastName"
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="emailInput">Email address</label>
                  <input
                    name="emailInput"
                    id="emailInput"
                    className="form-control"
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="password">Password</label>
                  <input
                    name="password"
                    id="password"
                    className="form-control"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <label htmlFor="passwordConfirm">Confirm Password</label>
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    className="form-control"
                    type="password"
                    placeholder="********"
                    required
                  />
                </div>
                <div className="col-md-8 col-12 mt-2">
                  <label htmlFor="genderGroup">Gender</label>
                  <div className="d-flex form-group m-0" name="genderGroup" id="genderGroup">
                    <div className="custom-control custom-radio mr-4">
                      <input type="radio" name="genderRadio" id="maleRadio" className="custom-control-input" />
                      <label className="custom-control-label" htmlFor="maleRadio">
                        Male
                      </label>
                    </div>
                    <div className="custom-control custom-radio mr-4">
                      <input type="radio" name="genderRadio" id="femaleRadio" className="custom-control-input" />
                      <label className="custom-control-label" htmlFor="femaleRadio">
                        Female
                      </label>
                    </div>
                    <div className="custom-control custom-radio mr-4">
                      <input type="radio" name="genderRadio" id="otherRadio" className="custom-control-input" />
                      <label className="custom-control-label" htmlFor="otherRadio">
                        Other/Decline
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-8 col-12 mt-2">
                  <label htmlFor="userTypeGroup">Select User Type</label>
                  <div className="d-flex form-group m-0" name="userTypeGroup" id="userTypeGroup">
                    <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
                      <input type="radio" name="userTypeRadio" className="custom-control-input" id="athleteRadio" />
                      <label className="custom-control-label" htmlFor="athleteRadio">
                        Athlete
                      </label>
                    </div>
                    <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
                      <input type="radio" name="userTypeRadio" className="custom-control-input" id="recruiterRadio" />
                      <label className="custom-control-label" htmlFor="recruiterRadio">
                        Recruiter
                      </label>
                    </div>
                    <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
                      <input type="radio" name="userTypeRadio" className="custom-control-input" id="advocateRadio" />
                      <label className="custom-control-label" htmlFor="advocateRadio">
                        Advocate
                      </label>
                    </div>
                    <div className="custom-control custom-Radio my-1 mr-sm-2 mb-3">
                      <input type="radio" name="userTypeRadio" className="custom-control-input" id="coach4hireRadio" />
                      <label className="custom-control-label" htmlFor="coach4hireRadio">
                        Coach 4 Hire
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 col-12 mt-2">
                  <button type="submit" className="btn btn-primary form-control py-2 my-2">
                    Sign-up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserRegistrationForm;
