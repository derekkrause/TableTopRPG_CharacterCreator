import React from "react";
import { Button } from "reactstrap";
import UserRegistrationForm from "../RegistrationLoginPage/UserRegistrationForm";
import "./Homepage.css";
import HomeInfoCarousel from "./InfoCarousel";

class HomePage extends React.Component {
  render() {
    return (
      <div
        className="container-fluid mainContainer mx-auto p-0 align-self-stretch"
        style={{
          backgroundImage:
            "url('https://c.pxhere.com/photos/50/5b/baseball_diamond_sports_baseball_stadium_safeco_field_stadium_seattle_washington-682138.jpg!d')"
        }}>
        <div
          className="container welcomeContainer rounded justify-content-center py-3"
          style={{ backgroundColor: "gray", color: "white" }}>
          <h1 className="col-12">This is the welcome page.</h1>
          <div className="container d-flex flex-wrap justify-content-around">
            <div className="col-xs-12 col-sm-5 m-sm-1 mw-sm-50">
              <div>
                <div className="row flex-nowrap">
                  <div className="col-xs-4 pr-2">
                    <i className="zmdi zmdi-account-circle zmdi-hc-3x" />
                  </div>
                  <div className="col-xs-8">
                    <h3 className="m-0">Search Colleges</h3>
                    <p>Find schools that meet your criteria.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-5 m-sm-1 mw-sm-50">
              <div>
                <div className="row flex-nowrap">
                  <div className="col-xs-4 pr-2">
                    <i className="zmdi zmdi-account-circle zmdi-hc-3x" />
                  </div>
                  <div className="col-xs-8">
                    <h3 className="m-0">Showcase Skills</h3>
                    <p>Let recruiters see you in action.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-5 m-sm-1 mw-sm-50">
              <div>
                <div className="row flex-nowrap">
                  <div className="col-xs-4 pr-2">
                    <i className="zmdi zmdi-account-circle zmdi-hc-3x" />
                  </div>
                  <div className="col-xs-8">
                    <h3 className="m-0">Search Colleges</h3>
                    <p>Find schools that meet your criteria.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-5 m-sm-1 mw-sm-50">
              <div>
                <div className="row flex-nowrap">
                  <div className="col-xs-4 pr-2">
                    <i className="zmdi zmdi-account-circle zmdi-hc-3x" />
                  </div>
                  <div className="col-xs-8">
                    <h3 className="m-0">Showcase Skills</h3>
                    <p>Let recruiters see you in action.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 mw-md-50 mx-auto justify-content-center">
          <HomeInfoCarousel />
        </div>
        <div className="py-5">
          <UserRegistrationForm />
        </div>
      </div>
    );
  }
}

export default HomePage;
