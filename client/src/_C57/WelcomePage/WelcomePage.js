import React from "react";
import "./WelcomePage.css";
import UserRegistrationForm from "../RegistrationLoginPage/UserRegistrationForm";
import UserTypeCards from "./UserCards";
import FeatureList from "./FeatureList";
import { Redirect } from "react-router-dom";
import IfLoginStatus from "../CustomComponents/IfLoginStatus";

class WelcomePage extends React.Component {
   state = {
    userType: ""
  };

  scrollToRegFormCoach = () => {
    document.getElementById('regFormRef').scrollIntoView({ block: "start", behavior: "smooth" });
    this.setState({ userType: "Coach" });
  };

  scrollToRegFormAthlete = () => {
    document.getElementById('regFormRef').scrollIntoView({ block: "start", behavior: "smooth" });
    this.setState({ userType: "Athlete" });
  };

  scrollToRegFormAdvocate = () => {
    document.getElementById('regFormRef').scrollIntoView({ block: "start", behavior: "smooth" });
    this.setState({ userType: "Advocate" });
  };

  redirect = () => {
    console.log("test");
    this.props.history.push("/app/home");
  };

  render() {
    return (
      <div>
        <IfLoginStatus loggedIn={true}>
          <Redirect to={`home`} />
        </IfLoginStatus>
        <div
          className="container-fluid mainContainer mx-auto p-0 align-self-stretch"
          style={{
            backgroundImage:
              "url('https://c.pxhere.com/photos/50/5b/baseball_diamond_sports_baseball_stadium_safeco_field_stadium_seattle_washington-682138.jpg!d')",
            backgroundPosition: "bottom"
          }}
        >
          <div
            className="container-fluid py-5"
            style={{ background: "linear-gradient(rgba(39,55,68,0.3), rgba(39,55,68,1))" }}
          >
            <UserTypeCards
              regScrollCoach={this.scrollToRegFormCoach}
              regScrollAthlete={this.scrollToRegFormAthlete}
              regScrollAdvocate={this.scrollToRegFormAdvocate}
            />
          </div>

          <FeatureList className="py-5 justify-content-center" />

          <div className="py-5 mb-5">
            <UserRegistrationForm userType={this.state.userType} key={this.state.userType} redirect={this.redirect} />
          </div>

          <IfLoginStatus loggedIn={true}>
            <Redirect to={"/app/home"} />
          </IfLoginStatus>
        </div>
      </div>
    );
  }
}

export default WelcomePage;
