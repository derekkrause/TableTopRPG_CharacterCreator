import React from "react";
import { Button, Label } from "reactstrap";
import SweetAlert from "react-bootstrap-sweetalert";
import { currentUser as getUser } from "../../services/currentUser.service";
import { registerCoach, registerAthlete, registerAdvocate } from "../../services/registerLogin.service";

class UserTypeSweetAlert extends React.Component {
  state = {
    noUserType: true,
    userType: "",
    confirmChoice: false
  };

  checkUserType = () => {
    const userTypeTest =
      !this.props.currentUser.isAdvocate &&
      !this.props.currentUser.isCoach &&
      !this.props.currentUser.isAthlete &&
      !this.props.currentUser.isAdmin;
    this.setState({ noUserType: userTypeTest });
  };

  confirmChoice = userType => {
    this.setState({ userType, confirmChoice: true, noUserType: false });
  };

  registerUserType = userType => {
    const currentUser = this.props.currentUser;
    switch (userType) {
      case "Athlete":
        registerAthlete(currentUser.id)
          .then(result => {
            this.setState({ confirmChoice: false });
            console.log("ATHLETE REGISTERED", result);
            getUser().then(this.checkUserType);
          })
          .catch(error => {
            console.log("ATHLETE REG", error);
            getUser().then(this.checkUserType);
          });
        break;
      case "Coach":
        registerCoach(currentUser.id)
          .then(result => {
            this.setState({ confirmChoice: false });
            console.log("COACH REGISTERED", result);
            getUser().then(this.checkUserType);
          })
          .catch(error => {
            console.log("COACH REG", error);
            getUser().then(this.checkUserType);
          });
        break;
      case "Advocate":
        registerAdvocate(currentUser.id)
          .then(result => {
            this.setState({ confirmChoice: false });
            console.log("ADVOCATE REGISTERED", result);
            getUser().then(this.checkUserType);
          })
          .catch(error => {
            console.log("ADVOCATE REG", error);
            getUser().then(this.checkUserType);
          });
        break;
      case "Coach4Hire":
        //axios call registerCoach(currentUser.id) <--uncomment after Coach4Hire CRUD is created
        break;
      default:
        console.log("no usertype selected");
    }
  };

  render() {
    return (
      <div>
        <SweetAlert
          custom
          style={{ top: "", marginTop: "auto" }}
          show={this.state.noUserType}
          title={""}
          showConfirm={false}
          onConfirm={this.checkUserType}
          closeOnEsc={false}
          closeOnClickOutside={false}
          beforeMount={this.checkUserType}
        >
          <h1 className="pb-2">
            Which of the following best describes your desired user experience, {this.props.currentUser.firstName}?
          </h1>

          <Label className="form-control" for="coachBtn">
            You're here to post events and find athletes for your team.
          </Label>
          <Button
            id="coachBtn"
            className="jr-btn form-control jr-btn-lg"
            color="purple"
            onClick={() => this.confirmChoice("Coach")}
          >
            Coach
          </Button>

          <Label className="form-control" for="athleteBtn">
            You're here to connect with coaches, recruiters and other athletes.
          </Label>
          <Button
            id="athleteBtn"
            className="jr-btn form-control jr-btn-lg"
            color="primary"
            onClick={() => this.confirmChoice("Athlete")}
          >
            Athlete
          </Button>

          <Label className="form-control" for="advocateBtn">
            You provide credibility and connect your athletes with recruiters
          </Label>
          <Button
            id="advocateBtn"
            className="jr-btn form-control jr-btn-lg"
            color="grey"
            onClick={() => this.confirmChoice("Advocate")}
          >
            Advocate
          </Button>
        </SweetAlert>
        <SweetAlert
          warning
          showCancel
          style={{ top: "", marginTop: "auto" }}
          show={this.state.confirmChoice}
          confirmBtnText="Yep!"
          cancelBtnText="Let me look again"
          confirmBtnBsStyle="primary"
          cancelBtnBsStyle="default"
          title={this.state.userType}
          onConfirm={() => this.registerUserType(this.state.userType)}
          onCancel={() => this.setState({ userType: "", confirmChoice: false, noUserType: true })}
        >
          You selected {this.state.userType}. Is that correct?
        </SweetAlert>
      </div>
    );
  }
}

export default UserTypeSweetAlert;
