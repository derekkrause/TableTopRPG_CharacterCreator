import React from "react";
import AthletePricingContainer from "./AthletePricingContainer";
import CoachPricingContainer from "./CoachPricingContainer";
import CancelSubButton from "./CancelSubButton";
import "./stripe.css";
import { connect } from "react-redux";
import { NotificationContainer, NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import ProgressIndicator from "../CustomComponents/ProgressIndicator/ProgressIndicator";
import StripeAdminConfig from "./StripeAdminConfig";

class StripeApp extends React.Component {
  state = {
    type: "",
    loader: false
  };
  componentDidMount() {
    if (this.props.currentUser) {
      if (this.props.currentUser.subNeeded === true) {
        if (this.props.currentUser.stripeUserId === null) {
          this.setState({ type: "SignUp" }, () => this.createNotification(this.state.type));
        } else {
          this.setState({ type: "SubscriptionRequired" }, () => this.createNotification(this.state.type));
        }
      }
    }
  }

  createNotification = type => {
    console.log(type, "notification");

    switch (type) {
      case "Success":
        NotificationManager.info("Thank you for your subscription!", null, 3000);
        break;
      case "SignUp":
        NotificationManager.error("We couldnt find your subscription", null, 3000);
        break;
      case "SubscriptionRequired":
        NotificationManager.error("You need to update your subscription", null, 3000);
        break;
    }
  };
  showLoader = arg => {
    if (arg === true) {
      this.setState({ loader: arg });
    }
    if (arg === false) {
      this.setState({ loader: arg, type: "Success" }, () => {
        this.createNotification(this.state.type);
      });
    }
  };

  sendNotification = type => {
    this.setState({ type: type });
    console.log("send notification");
  };
  render() {
    return (
      <div>
        {this.state.loader === true ? (
          <div className="mt-5" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ProgressIndicator loader={this.state.loader} />
            <div className="mt-3">
              <p style={{ fontWeight: "bold" }}>Please wait while we process your payment, thank you</p>
            </div>
          </div>
        ) : (
          <div className="container my-5 ">
            <div className=" justify-content-center jr-card card  " style={{ fontSize: "16px" }}>
              {this.props.currentUser.isAthlete === true && (
                <AthletePricingContainer
                  email={this.props.currentUser.email}
                  fullName={this.props.currentUser.firstName + " " + this.props.currentUser.lastName}
                  currentUserId={this.props.currentUser.id}
                  showLoader={this.showLoader}
                />
              )}
              {this.props.currentUser.isCoach === true && (
                <CoachPricingContainer
                  email={this.props.currentUser.email}
                  fullName={this.props.currentUser.firstName + " " + this.props.currentUser.lastName}
                  currentUserId={this.props.currentUser.id}
                  showLoader={this.showLoader}
                />
              )}
              {/* <StripeAdminConfig currentUserId={this.props.currentUser.id} /> */}
            </div>
            <NotificationContainer />
          </div>
        )}
        {/* <CancelSubButton /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state, "state");
  return { currentUser: state.currentUser };
}

export default connect(mapStateToProps)(StripeApp);
