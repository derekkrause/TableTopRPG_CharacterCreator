import React from "react";
import { Button, PaginationItem, Pagination, PaginationLink, InputGroup, Input, InputGroupAddon } from "reactstrap";
import "./WelcomePage.css";
import UserRegistrationForm from "../RegistrationLoginPage/UserRegistrationForm";
import UserTypeCards from "./UserCards";
import FeatureList from "./FeatureList";
import { Redirect } from "react-router-dom";
import IfLoginStatus from "../CustomComponents/IfLoginStatus";
import HomeInfoCarousel from "./InfoCarousel";

class WelcomePage extends React.Component {
  registerRef = React.createRef();

  state = {
    userType: ""
  };

  scrollToRegFormCoach = () => {
    this.registerRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    this.setState({ userType: "Coach" });
  };

  scrollToRegFormAthlete = () => {
    this.registerRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    this.setState({ userType: "Athlete" });
  };

  scrollToRegFormAdvocate = () => {
    this.registerRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    this.setState({ userType: "Advocate" });
  };

  redirect = () => {
    console.log("test");
    this.props.history.push("/app/home");
  };

  render() {
    return (
      <div
        className="container-fluid mainContainer mx-auto p-0 align-self-stretch"
        style={{
          backgroundImage:
            "url('https://c.pxhere.com/photos/50/5b/baseball_diamond_sports_baseball_stadium_safeco_field_stadium_seattle_washington-682138.jpg!d')"
        }}
      >
        <IfLoginStatus loggedIn={true}>
          <Redirect to={`/app/home`} />
        </IfLoginStatus>
        <div className="container-fluid py-5">
          <UserTypeCards
            regScrollCoach={this.scrollToRegFormCoach}
            regScrollAthlete={this.scrollToRegFormAthlete}
            regScrollAdvocate={this.scrollToRegFormAdvocate}
          />
        </div>

        <FeatureList className="py-5 justify-content-center" />

        <div className="col-xs-10 col-md-8 col-lg-6 py-5 mx-auto justify-content-center">
          <HomeInfoCarousel />
        </div>

        <div className="py-5" ref={this.registerRef}>
          <UserRegistrationForm userType={this.state.userType} key={this.state.userType} redirect={this.redirect} />
        </div>
      </div>
    );
  }
}

export default WelcomePage;
