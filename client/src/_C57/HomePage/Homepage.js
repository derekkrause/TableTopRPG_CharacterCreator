import React from "react";
import { Button } from "reactstrap";
import UserRegistrationForm from "../RegistrationLoginPage/UserRegistrationForm";
import "./Homepage.css";

class HomePage extends React.Component {
  render() {
    return (
      <div
        className="container-fluid myContainer mx-auto p-0 align-self-stretch"
        style={{
          backgroundImage:
            "url('https://c.pxhere.com/photos/50/5b/baseball_diamond_sports_baseball_stadium_safeco_field_stadium_seattle_washington-682138.jpg!d')"
        }}>
        <UserRegistrationForm />
      </div>
    );
  }
}

export default HomePage;
